package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.administration.dto.info.AdministrationTotalIncomeInfo;
import com.ssafy.backend.domain.administration.dto.info.AdministrationTotalSalesInfo;
import com.ssafy.backend.domain.administration.entity.IncomeAdministration;
import com.ssafy.backend.domain.administration.entity.SalesAdministration;
import com.ssafy.backend.domain.administration.exception.AdministrationErrorCode;
import com.ssafy.backend.domain.administration.exception.AdministrationException;
import com.ssafy.backend.domain.administration.repository.IncomeAdministrationRepository;
import com.ssafy.backend.domain.administration.repository.SalesAdministrationRepository;
import com.ssafy.backend.domain.commercial.document.CommercialAnalysis;
import com.ssafy.backend.domain.commercial.dto.info.*;
import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisKafkaRequest;
import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisSaveRequest;
import com.ssafy.backend.domain.commercial.dto.request.ConversionCodeNameRequest;
import com.ssafy.backend.domain.commercial.dto.response.*;
import com.ssafy.backend.domain.commercial.entity.*;
import com.ssafy.backend.domain.commercial.exception.CommercialErrorCode;
import com.ssafy.backend.domain.commercial.exception.CommercialException;
import com.ssafy.backend.domain.commercial.exception.CoordinateTransformationException;
import com.ssafy.backend.domain.commercial.repository.*;
import com.ssafy.backend.domain.commercial.repository.SalesCommercialRepository;
import com.ssafy.backend.domain.district.dto.info.DistrictTotalIncomeInfo;
import com.ssafy.backend.domain.district.dto.info.DistrictTotalSalesInfo;
import com.ssafy.backend.domain.district.entity.IncomeDistrict;
import com.ssafy.backend.domain.district.entity.SalesDistrict;
import com.ssafy.backend.domain.district.entity.enums.ServiceType;
import com.ssafy.backend.domain.district.exception.DistrictErrorCode;
import com.ssafy.backend.domain.district.exception.DistrictException;
import com.ssafy.backend.domain.district.repository.IncomeDistrictRepository;
import com.ssafy.backend.domain.district.repository.SalesDistrictRepository;
import com.ssafy.backend.global.common.document.DataDocument;
import com.ssafy.backend.global.common.dto.PageResponse;
import com.ssafy.backend.global.common.repository.DataRepository;
import com.ssafy.backend.global.component.kafka.KafkaConstants;
import com.ssafy.backend.global.component.kafka.dto.info.DataInfo;
import com.ssafy.backend.global.component.kafka.producer.KafkaProducer;
import com.ssafy.backend.global.util.CoordinateConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommercialServiceImpl implements CommercialService {
    private static final String DISTRICT = "district";
    private static final String ADMINISTRATION = "administration";

    private final AreaCommercialRepository areaCommercialRepository;
    private final FootTrafficCommercialRepository footTrafficCommercialRepository;
    private final SalesCommercialRepository salesCommercialRepository;
    private final PopulationCommercialRepository populationCommercialRepository;
    private final FacilityCommercialRepository facilityCommercialRepository;
    private final StoreCommercialRepository storeCommercialRepository;
    private final IncomeCommercialRepository incomeCommercialRepository;
    private final SalesDistrictRepository salesDistrictRepository;
    private final SalesAdministrationRepository salesAdministrationRepository;
    private final IncomeDistrictRepository incomeDistrictRepository;
    private final IncomeAdministrationRepository incomeAdministrationRepository;
    private final CommercialAnalysisRepository commercialAnalysisRepository;
    private final KafkaProducer kafkaProducer;
    private final DataRepository dataRepository;

    @Override
    @Transactional(readOnly = true)
    public ConversionCodeResponse conversionCodeNameToCode(ConversionCodeNameRequest request) {
        // 자치구
        if (DISTRICT.equals(request.type())) {
            return areaCommercialRepository.findDistrictInfoByDistrictCodeName(request.codeName());
        }
        
        // 행정동
        if (ADMINISTRATION.equals(request.type())) {
            return areaCommercialRepository.findAdministrationInfoByAdministrationCodeName(request.codeName());
        }

        // 상권
        return areaCommercialRepository.findCommercialInfoByCommercialCodeName(request.codeName());


        /*// 자치구 변환
        String districtCode = areaCommercialRepository.findDistrictCodeByDistrictCodeName(request.districtCodeName());

        // 행정동 변환
        String administrationCode = convertAdministrationCodeNameToAdministrationCode(request.administrationCodeName());

        // 상권 변환
        String commercialCode = convertCommercialCodeNameToCommercialCode(request.commercialCodName());

        return ConversionCodeResponse.builder()
                .districtCodeName(request.districtCodeName())
                .districtCode(districtCode)
                .administrationCodeName(request.administrationCodeName())
                .administrationCode(administrationCode)
                .commercialCodeName(request.commercialCodName())
                .commercialCode(commercialCode)
                .build();*/
    }

    private String convertAdministrationCodeNameToAdministrationCode(final String administrationCodeName) {
        if (StringUtils.isBlank(administrationCodeName)) {
            return null;
        }
        return areaCommercialRepository.findAdministrationCodeByAdministrationCodeName(administrationCodeName);
    }

    private String convertCommercialCodeNameToCommercialCode(final String commercialCodeName) {
        if (StringUtils.isBlank(commercialCodeName)) {
            return null;
        }
        return areaCommercialRepository.findCommercialCodeByCommercialCodeName(commercialCodeName);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommercialAdministrationResponse> getAdministrativeAreasByDistrict(String districtCode) {
        List<AreaCommercial> areaCommercialList = areaCommercialRepository.findAllByDistrictCode(districtCode);

        Set<String> seenAdministrationCodes = new HashSet<>();
        List<CommercialAdministrationResponse> result = new ArrayList<>();

        for (AreaCommercial ac : areaCommercialList) {
            if (!seenAdministrationCodes.contains(ac.getAdministrationCode())) {
                Point transformedPoint = null;
                try {
                    transformedPoint = CoordinateConverter.transform(ac.getX(), ac.getY());
                } catch (Exception e) {
                    throw new CoordinateTransformationException("좌표 변환에 실패했습니다.", e);
                }
                result.add(new CommercialAdministrationResponse(
                        ac.getAdministrationCodeName(),
                        ac.getAdministrationCode(),
                        transformedPoint != null ? transformedPoint.getX() : 0,
                        transformedPoint != null ? transformedPoint.getY() : 0
                ));
                seenAdministrationCodes.add(ac.getAdministrationCode());
            }
        }

        return result; // 중복 제거된 결과를 반환
    }


    @Override
    @Transactional(readOnly = true)
    public List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode) {
        List<AreaCommercial> areaCommercialList = areaCommercialRepository.findByAdministrationCode(administrationCode);
        return areaCommercialList.stream()
                .map(ac -> {
                    Point transformedPoint = null;
                    try {
                        transformedPoint = CoordinateConverter.transform(ac.getX().doubleValue(), ac.getY().doubleValue());
                    } catch (Exception e) {
                        throw new CoordinateTransformationException("좌표 변환에 실패했습니다.", e);
                    }
                    // 변환된 좌표를 사용하여 CommercialAreaResponse 생성
                    return new CommercialAreaResponse(
                            ac.getCommercialCode(),
                            ac.getCommercialCodeName(),
                            ac.getCommercialClassificationCode(),
                            ac.getCommercialClassificationCodeName(),
                            transformedPoint != null ? transformedPoint.getX() : 0,
                            transformedPoint != null ? transformedPoint.getY() : 0
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialFootTrafficResponse getFootTrafficByPeriodAndCommercialCode(String periodCode, String commercialCode) {
        FootTrafficCommercial footTrafficCommercial = footTrafficCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_FOOT_TRAFFIC));

        CommercialTimeSlotFootTrafficInfo timeSlotFootTraffic = new CommercialTimeSlotFootTrafficInfo(
                footTrafficCommercial.getFootTraffic00(),
                footTrafficCommercial.getFootTraffic06(),
                footTrafficCommercial.getFootTraffic11(),
                footTrafficCommercial.getFootTraffic14(),
                footTrafficCommercial.getFootTraffic17(),
                footTrafficCommercial.getFootTraffic21()
        );

        CommercialDayOfWeekFootTrafficInfo dayOfWeekFootTraffic = new CommercialDayOfWeekFootTrafficInfo(
                footTrafficCommercial.getMonFootTraffic(),
                footTrafficCommercial.getTueFootTraffic(),
                footTrafficCommercial.getWedFootTraffic(),
                footTrafficCommercial.getThuFootTraffic(),
                footTrafficCommercial.getFriFootTraffic(),
                footTrafficCommercial.getSatFootTraffic(),
                footTrafficCommercial.getSunFootTraffic()
        );

        CommercialAgeGroupFootTrafficInfo ageGroupFootTraffic = new CommercialAgeGroupFootTrafficInfo(
                footTrafficCommercial.getTeenFootTraffic(),
                footTrafficCommercial.getTwentyFootTraffic(),
                footTrafficCommercial.getThirtyFootTraffic(),
                footTrafficCommercial.getFortyFootTraffic(),
                footTrafficCommercial.getFiftyFootTraffic(),
                footTrafficCommercial.getSixtyFootTraffic()
        );

        CommercialAgeGenderPercentFootTrafficInfo ageGenderPercentFootTraffic = calculateAgeGenderPercentFootTraffic(footTrafficCommercial);

        return new CommercialFootTrafficResponse(timeSlotFootTraffic, dayOfWeekFootTraffic, ageGroupFootTraffic, ageGenderPercentFootTraffic);
    }

    @Override
    public List<CommercialServiceResponse> getServiceByCommercialCode(String commercialCode) {
        List<ServiceCodeProjection> serviceCodeProjectionList = salesCommercialRepository.findDistinctServiceCodesByCommercialCode(commercialCode);

        return serviceCodeProjectionList.stream()
                .map(projection -> new CommercialServiceResponse(
                        projection.getServiceCode(),
                        projection.getServiceCodeName(),
                        projection.getServiceType())
                )
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode) {
        SalesCommercial salesCommercial = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_SALES));

        CommercialTimeSalesInfo timeSales = new CommercialTimeSalesInfo(
                salesCommercial.getSales00(),
                salesCommercial.getSales06(),
                salesCommercial.getSales11(),
                salesCommercial.getSales14(),
                salesCommercial.getSales17(),
                salesCommercial.getSales21()
        );

        CommercialDaySalesInfo daySales = new CommercialDaySalesInfo(
                salesCommercial.getMonSales(),
                salesCommercial.getTueSales(),
                salesCommercial.getWedSales(),
                salesCommercial.getThuSales(),
                salesCommercial.getFriSales(),
                salesCommercial.getSatSales(),
                salesCommercial.getSunSales()
        );

        CommercialAgeSalesInfo ageSales = new CommercialAgeSalesInfo(
                salesCommercial.getTeenSales(),
                salesCommercial.getTwentySales(),
                salesCommercial.getThirtySales(),
                salesCommercial.getFortySales(),
                salesCommercial.getFiftySales(),
                salesCommercial.getSixtySales()
        );

        CommercialAgeGenderPercentSalesInfo ageGenderPercentSales = calculateAgeGenderPercentSales(salesCommercial);

        CommercialDaySalesCountInfo daySalesCount = new CommercialDaySalesCountInfo(
                salesCommercial.getMonSalesCount(),
                salesCommercial.getTueSalesCount(),
                salesCommercial.getWedSalesCount(),
                salesCommercial.getThuSalesCount(),
                salesCommercial.getFriSalesCount(),
                salesCommercial.getSatSalesCount(),
                salesCommercial.getSunSalesCount()
        );

        CommercialTimeSalesCountInfo timeSalesCount = new CommercialTimeSalesCountInfo(
                salesCommercial.getSalesCount00(),
                salesCommercial.getSalesCount06(),
                salesCommercial.getSalesCount11(),
                salesCommercial.getSalesCount14(),
                salesCommercial.getSalesCount17(),
                salesCommercial.getSalesCount21()
        );

        CommercialGenderSalesCountInfo genderSalesCount = new CommercialGenderSalesCountInfo(
                salesCommercial.getMaleSalesCount(),
                salesCommercial.getFemaleSalesCount()
        );

        // 최근 4분기의 기간 코드를 계산
        List<String> periodCodes = calculateLastFourQuarters(periodCode);

        List<SalesCommercial> salesCommercials = salesCommercialRepository.findByCommercialCodeAndServiceCodeAndPeriodCodeIn(
                commercialCode, serviceCode, periodCodes);

        List<CommercialAnnualQuarterSalesInfo> annualQuarterSalesInfos = salesCommercials.stream()
                .map(sales -> new CommercialAnnualQuarterSalesInfo(
                        sales.getPeriodCode(),
                        salesCommercial.getMonthSales())
                ).toList();

        return new CommercialSalesResponse(
                timeSales,
                daySales,
                ageSales,
                ageGenderPercentSales,
                daySalesCount,
                timeSalesCount,
                genderSalesCount,
                annualQuarterSalesInfos
        );
    }

    @Override
    public AllSalesResponse getAllSalesByPeriodAndDistrictCodeAndAdministrationCodeAndCommercialCodeAndServiceCode(
            Long memberId, String periodCode, String districtCode, String administrationCode, String commercialCode, String serviceCode) {
        SalesDistrict salesDistrict = salesDistrictRepository.findByPeriodCodeAndDistrictCodeAndServiceCode(periodCode, districtCode, serviceCode)
                .orElseThrow(() -> new DistrictException(DistrictErrorCode.NOT_SALES));

        SalesAdministration salesAdministration = salesAdministrationRepository.findByPeriodCodeAndAdministrationCodeAndServiceCode(periodCode, administrationCode, serviceCode)
                .orElseThrow(() -> new AdministrationException(AdministrationErrorCode.NOT_SALES));

        SalesCommercial salesCommercial = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_SALES));

        DistrictTotalSalesInfo districtTotalSalesInfo = new DistrictTotalSalesInfo(
                salesDistrict.getDistrictCode(),
                salesDistrict.getDistrictCodeName(),
                salesDistrict.getMonthSales()
        );

        AdministrationTotalSalesInfo administrationTotalSalesInfo = new AdministrationTotalSalesInfo(
                salesAdministration.getAdministrationCode(),
                salesAdministration.getAdministrationCodeName(),
                salesAdministration.getMonthSales()
        );

        CommercialTotalSalesInfo commercialTotalSalesInfo = new CommercialTotalSalesInfo(
                salesCommercial.getCommercialCode(),
                salesCommercial.getCommercialCodeName(),
                salesCommercial.getMonthSales()
        );

        // 카프카 토픽에 메시지 저장하기 위해 변환
        CommercialAnalysisKafkaRequest analysisKafkaRequest = new CommercialAnalysisKafkaRequest(
                salesDistrict.getDistrictCodeName(),
                salesAdministration.getAdministrationCodeName(),
                salesCommercial.getCommercialCodeName(),
                salesDistrict.getServiceCodeName()
        );

        kafkaProducer.publish(KafkaConstants.KAFKA_TOPIC_ANALYSIS, analysisKafkaRequest);

        // 추천용 데이터 카프카 토픽으로
        DataInfo dataInfo = new DataInfo(memberId,commercialCode, "analysis");
        if (!dataInfo.commercialCode().equals("0")) {
            DataDocument dataDocument = DataDocument.builder()
                    .userId(dataInfo.userId())
                    .commercialCode(Long.parseLong(dataInfo.commercialCode()))
                    .action(dataInfo.action())
                    .build();
            dataRepository.save(dataDocument);
        }

        return new AllSalesResponse(districtTotalSalesInfo, administrationTotalSalesInfo, commercialTotalSalesInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialPopulationResponse getPopulationByPeriodAndCommercialCode(String periodCode, String commercialCode) {
        PopulationCommercial populationCommercial = populationCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_POPULATION));

        CommercialPopulationInfo population = new CommercialPopulationInfo(
                populationCommercial.getTotalPopulation(),
                populationCommercial.getTeenPopulation(),
                populationCommercial.getTwentyPopulation(),
                populationCommercial.getThirtyPopulation(),
                populationCommercial.getFortyPopulation(),
                populationCommercial.getFiftyPopulation(),
                populationCommercial.getSixtyPopulation()
        );

        // 남자 여자 인구 비율 소수점 첫째자리까지
        Double malePercentage = Math.round((double) populationCommercial.getMalePopulation() / populationCommercial.getTotalPopulation() * 1000) / 10.0;
        Double femalePercentage = Math.round((double) populationCommercial.getFemalePopulation() / populationCommercial.getTotalPopulation() * 1000) / 10.0;

        return new CommercialPopulationResponse(population, malePercentage, femalePercentage);
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialFacilityResponse getFacilityByPeriodAndCommercialCode(String periodCode, String commercialCode) {
        FacilityCommercial facilityCommercial = facilityCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_FACILITY));

        CommercialSchoolInfo school = new CommercialSchoolInfo(
                facilityCommercial.getElementarySchoolCnt() + facilityCommercial.getMiddleSchoolCnt() + facilityCommercial.getHighSchoolCnt(),
                facilityCommercial.getUniversityCnt()
        );

        Long facilityCnt = facilityCommercial.getFacilityCnt();
        Long totalTransportCnt = facilityCommercial.getSubwayStationCnt() + facilityCommercial.getBusStopCnt();

        return new CommercialFacilityResponse(facilityCnt, school, totalTransportCnt);
    }

    @Override
    public CommercialAdministrationAreaResponse getAdministrationInfoByCommercialCode(Long memberId, String commercialCode) {
//        // 추천용 데이터 카프카 토픽으로
//        DataInfo dataInfo = new DataInfo(memberId,commercialCode, "click");
//        kafkaProducer.publish(KafkaConstants.KAFKA_TOPIC_DATA, dataInfo);

        return areaCommercialRepository.findByCommercialCode(commercialCode);
    }

    @Override
    public CommercialStoreResponse getStoreByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode) {
        ServiceType serviceType = storeCommercialRepository.findServiceTypeByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode);

        List<StoreCommercial> otherStores = storeCommercialRepository.findOtherServicesInSameCategory(periodCode, commercialCode, serviceType);

        List<CommercialSameStoreInfo> sameStores = otherStores.stream()
                .map(store -> new CommercialSameStoreInfo(
                        store.getServiceCodeName(),
                        store.getTotalStore())
                ).toList();

        long sameTotalStore = sameStores.stream()
                .mapToLong(CommercialSameStoreInfo::totalStore)
                .sum();

        StoreCommercial storeCommercial = storeCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_STORE));

        long totalStores = storeCommercial.getTotalStore() + storeCommercial.getFranchiseStore();
        double normalStorePercentage = totalStores > 0 ? Math.round((double) storeCommercial.getTotalStore() / totalStores * 100.0 * 100.0) / 100.0 : 0.0;
        double franchiseStorePercentage = totalStores > 0 ? Math.round((double) storeCommercial.getFranchiseStore() / totalStores * 100.0 * 100.0) / 100.0 : 0.0;

        CommercialFranchiseeStoreInfo franchiseeStore = new CommercialFranchiseeStoreInfo(
                storeCommercial.getTotalStore(),
                storeCommercial.getFranchiseStore(),
                normalStorePercentage,
                franchiseStorePercentage
        );

        CommercialOpenAndCloseStoreInfo openAndCloseStore = new CommercialOpenAndCloseStoreInfo(
                storeCommercial.getOpenedRate(),
                storeCommercial.getClosedRate()
        );

        return new CommercialStoreResponse(sameStores, sameTotalStore, franchiseeStore, openAndCloseStore);
    }

    @Override
    public CommercialIncomeResponse getIncomeByPeriodCodeAndCommercialCode(String periodCode, String commercialCode) {
        IncomeCommercial incomeCommercial = incomeCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_INCOME));

        CommercialAvgIncomeInfo avgIncome = new CommercialAvgIncomeInfo(
                incomeCommercial.getMonthAvgIncome(),
                incomeCommercial.getIncomeSectionCode()
        );

        // 최근 4분기의 기간 코드를 계산
        List<String> periodCodes = calculateLastFourQuarters(periodCode);

        List<IncomeCommercial> incomeCommercials = incomeCommercialRepository.findByCommercialCodeAndPeriodCodeInOrderByPeriodCode(commercialCode, periodCodes);

        List<CommercialAnnualQuarterIncomeInfo> annualQuarterIncomeInfos = incomeCommercials.stream()
                .map(income -> new CommercialAnnualQuarterIncomeInfo(
                        income.getPeriodCode(),
                        income.getTotalPrice()
                ))
                .toList();

        CommercialTypeIncomeInfo typeIncome = new CommercialTypeIncomeInfo(
                incomeCommercial.getGroceryPrice(),
                incomeCommercial.getClothesPrice(),
                incomeCommercial.getMedicalPrice(),
                incomeCommercial.getLifePrice(),
                incomeCommercial.getTrafficPrice(),
                incomeCommercial.getLeisurePrice(),
                incomeCommercial.getCulturePrice(),
                incomeCommercial.getEducationPrice(),
                incomeCommercial.getLuxuryPrice()
        );

        return new CommercialIncomeResponse(
                avgIncome,
                annualQuarterIncomeInfos,
                typeIncome
        );
    }

    @Override
    public AllIncomeResponse getAllIncomeByPeriodCodeAndDistrictCodeAndAdministrationCodeAndCommercialCode(String periodCode, String districtCode, String administrationCode, String commercialCode) {
        IncomeDistrict incomeDistrict = incomeDistrictRepository.findByPeriodCodeAndDistrictCode(periodCode, districtCode)
                .orElseThrow(() -> new DistrictException(DistrictErrorCode.NOT_INCOME));

        IncomeAdministration incomeAdministration = incomeAdministrationRepository.findByPeriodCodeAndAdministrationCode(periodCode, administrationCode)
                .orElseThrow(() -> new AdministrationException(AdministrationErrorCode.NOT_INCOME));

        IncomeCommercial incomeCommercial = incomeCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new CommercialException(CommercialErrorCode.NOT_INCOME));

        DistrictTotalIncomeInfo districtTotalIncomeInfo = new DistrictTotalIncomeInfo(
                incomeDistrict.getDistrictCode(),
                incomeDistrict.getDistrictCodeName(),
                incomeDistrict.getTotalPrice()
        );

        AdministrationTotalIncomeInfo administrationTotalIncomeInfo = new AdministrationTotalIncomeInfo(
                incomeAdministration.getAdministrationCode(),
                incomeAdministration.getAdministrationCodeName(),
                incomeAdministration.getTotalPrice()
        );

        CommercialTotalIncomeInfo commercialTotalIncomeInfo = new CommercialTotalIncomeInfo(
                incomeCommercial.getCommercialCode(),
                incomeCommercial.getCommercialCodeName(),
                incomeCommercial.getTotalPrice()
        );

        return new AllIncomeResponse(districtTotalIncomeInfo, administrationTotalIncomeInfo, commercialTotalIncomeInfo);
    }

    @Override
    public void saveAnalysis(Long memberId, CommercialAnalysisSaveRequest analysisSaveRequest) {
        boolean existAnalysis = commercialAnalysisRepository.existsByDistrictCodeAndAdministrationCodeAndCommercialCodeAndServiceCode(
                analysisSaveRequest.districtCode(), analysisSaveRequest.administrationCode(),
                analysisSaveRequest.commercialCode(), analysisSaveRequest.serviceCode());

        if (existAnalysis) {
            throw new CommercialException(CommercialErrorCode.EXIST_ANALYSIS);
        }

        CommercialAnalysis commercialAnalysis = CommercialAnalysis.builder()
                .memberId(memberId)
                .districtCode(analysisSaveRequest.districtCode())
                .districtCodeName(analysisSaveRequest.districtCodeName())
                .administrationCode(analysisSaveRequest.administrationCode())
                .administrationCodeName(analysisSaveRequest.administrationCodeName())
                .commercialCode(analysisSaveRequest.commercialCode())
                .commercialCodeName(analysisSaveRequest.commercialCodeName())
                .serviceType(analysisSaveRequest.serviceType())
                .serviceCode(analysisSaveRequest.serviceCode())
                .serviceCodeName(analysisSaveRequest.serviceCodeName())
                .createdAt(LocalDateTime.now())
                .build();
        commercialAnalysisRepository.save(commercialAnalysis);

        // 카프카 토픽에 메시지 저장하기 위해 변환
        CommercialAnalysisKafkaRequest analysisKafkaRequest = new CommercialAnalysisKafkaRequest(
                analysisSaveRequest.districtCodeName(),
                analysisSaveRequest.administrationCodeName(),
                analysisSaveRequest.commercialCodeName(),
                analysisSaveRequest.serviceCodeName()
        );

        kafkaProducer.publish(KafkaConstants.KAFKA_TOPIC_ANALYSIS, analysisKafkaRequest);

        // 추천용 데이터 카프카 토픽으로
        DataInfo dataInfo = new DataInfo(memberId, analysisSaveRequest.commercialCode(), "save");
        if (!dataInfo.commercialCode().equals("0")) {
            DataDocument dataDocument = DataDocument.builder()
                    .userId(dataInfo.userId())
                    .commercialCode(Long.parseLong(dataInfo.commercialCode()))
                    .action(dataInfo.action())
                    .build();
            dataRepository.save(dataDocument);
        }
    }

    @Override
    public PageResponse<CommercialAnalysisResponse> getMyAnalysisListByMemberId(Long memberId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CommercialAnalysis> commercialAnalysisPage = commercialAnalysisRepository.findByMemberIdOrderByCreatedAt(memberId, pageable);

        Page<CommercialAnalysisResponse> responsePage = commercialAnalysisPage.map(ca -> new CommercialAnalysisResponse(
                ca.getDistrictCode(),
                ca.getDistrictCodeName(),
                ca.getAdministrationCode(),
                ca.getAdministrationCodeName(),
                ca.getCommercialCode(),
                ca.getCommercialCodeName(),
                ca.getServiceType(),
                ca.getServiceCode(),
                ca.getServiceCodeName(),
                ca.getCreatedAt()
        ));

        return PageResponse.of(responsePage);
    }


    private CommercialAgeGenderPercentFootTrafficInfo calculateAgeGenderPercentFootTraffic(FootTrafficCommercial trafficCommercial) {
        Long total = trafficCommercial.getTotalFootTraffic();

        return new CommercialAgeGenderPercentFootTrafficInfo(
                calculatePercent(trafficCommercial.getTeenFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getTeenFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getTwentyFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getTwentyFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getThirtyFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getThirtyFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getFortyFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getFortyFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getFiftyFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getFiftyFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getSixtyFootTraffic(), trafficCommercial.getMaleFootTraffic(), total),
                calculatePercent(trafficCommercial.getSixtyFootTraffic(), trafficCommercial.getFemaleFootTraffic(), total)
        );
    }

    private CommercialAgeGenderPercentSalesInfo calculateAgeGenderPercentSales(com.ssafy.backend.domain.commercial.entity.SalesCommercial salesCommercial) {
        Long total = salesCommercial.getMaleSales() + salesCommercial.getFemaleSales();

        return new CommercialAgeGenderPercentSalesInfo(
                calculatePercent(salesCommercial.getTeenSales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getTeenSales(), salesCommercial.getFemaleSales(), total),
                calculatePercent(salesCommercial.getTwentySales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getTwentySales(), salesCommercial.getFemaleSales(), total),
                calculatePercent(salesCommercial.getThirtySales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getThirtySales(), salesCommercial.getFemaleSales(), total),
                calculatePercent(salesCommercial.getFortySales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getFortySales(), salesCommercial.getFemaleSales(), total),
                calculatePercent(salesCommercial.getFiftySales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getFiftySales(), salesCommercial.getFemaleSales(), total),
                calculatePercent(salesCommercial.getSixtySales(), salesCommercial.getMaleSales(), total),
                calculatePercent(salesCommercial.getSixtySales(), salesCommercial.getFemaleSales(), total)
        );
    }

    private double calculatePercent(Long ageGroupCount, Long genderCount, Long total) {
        if (total == 0) return 0.0;
        double percent = 100.0 * (ageGroupCount.doubleValue() * (genderCount.doubleValue() / total)) / total;
        return Math.round(percent * 100.0) / 100.0;
    }

    private List<String> calculateLastFourQuarters(String currentPeriod) {
        List<String> periods = new ArrayList<>();
        int year = Integer.parseInt(currentPeriod.substring(0, 4));
        int quarter = Integer.parseInt(currentPeriod.substring(4));

        for (int i = 0; i < 5; i++) {
            periods.add(year + "" + quarter);
            if (quarter == 1) {
                quarter = 4;
                year--;
            } else {
                quarter--;
            }
        }

        return periods;
    }

}
