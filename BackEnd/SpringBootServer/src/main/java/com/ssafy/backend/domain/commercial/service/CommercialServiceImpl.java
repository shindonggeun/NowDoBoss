package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.administration.dto.info.AdministrationTotalIncomeInfo;
import com.ssafy.backend.domain.administration.dto.info.AdministrationTotalSalesInfo;
import com.ssafy.backend.domain.administration.entity.IncomeAdministration;
import com.ssafy.backend.domain.administration.entity.SalesAdministration;
import com.ssafy.backend.domain.administration.repository.IncomeAdministrationRepository;
import com.ssafy.backend.domain.administration.repository.SalesAdministrationRepository;
import com.ssafy.backend.domain.commercial.dto.info.*;
import com.ssafy.backend.domain.commercial.dto.response.*;
import com.ssafy.backend.domain.commercial.entity.*;
import com.ssafy.backend.domain.commercial.exception.CoordinateTransformationException;
import com.ssafy.backend.domain.commercial.repository.*;
import com.ssafy.backend.domain.commercial.repository.SalesCommercialRepository;
import com.ssafy.backend.domain.district.dto.info.DistrictTotalIncomeInfo;
import com.ssafy.backend.domain.district.dto.info.DistrictTotalSalesInfo;
import com.ssafy.backend.domain.district.entity.IncomeDistrict;
import com.ssafy.backend.domain.district.entity.SalesDistrict;
import com.ssafy.backend.domain.district.entity.enums.ServiceType;
import com.ssafy.backend.domain.district.repository.IncomeDistrictRepository;
import com.ssafy.backend.domain.district.repository.SalesDistrictRepository;
import com.ssafy.backend.global.util.CoordinateConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommercialServiceImpl implements CommercialService {
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
                .orElseThrow(() -> new RuntimeException("유동인구 데이터가 존재하지 않습니다."));

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
        com.ssafy.backend.domain.commercial.entity.SalesCommercial salesCommercial = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
                .orElseThrow(() -> new RuntimeException("매출분석 데이터가 없습니다."));

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
            String periodCode, String districtCode, String administrationCode, String commercialCode, String serviceCode) {
        SalesDistrict salesDistrict = salesDistrictRepository.findByPeriodCodeAndDistrictCodeAndServiceCode(periodCode, districtCode, serviceCode)
                .orElseThrow(() -> new RuntimeException("해당 분기의 추정매출_자치구 데이터가 없습니다."));

        SalesAdministration salesAdministration = salesAdministrationRepository.findByPeriodCodeAndAdministrationCodeAndServiceCode(periodCode, administrationCode, serviceCode)
                .orElseThrow(() -> new RuntimeException("해당 분기의 추정매출_행정동 데이터가 없습니다."));

        SalesCommercial salesCommercial = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
                .orElseThrow(() -> new RuntimeException("해당 분기의 추정매출_상권 데이터가 없습니다."));

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

        return new AllSalesResponse(districtTotalSalesInfo, administrationTotalSalesInfo, commercialTotalSalesInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialPopulationResponse getPopulationByPeriodAndCommercialCode(String periodCode, String commercialCode) {
        PopulationCommercial populationCommercial = populationCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new RuntimeException("상주인구 분석 데이터가 없습니다."));

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
                .orElseThrow(() -> new RuntimeException("집객시설 분석 데이터가 없습니다."));

        CommercialSchoolInfo school = new CommercialSchoolInfo(
                facilityCommercial.getElementarySchoolCnt() + facilityCommercial.getMiddleSchoolCnt() + facilityCommercial.getHighSchoolCnt(),
                facilityCommercial.getUniversityCnt()
        );

        Long facilityCnt = facilityCommercial.getFacilityCnt();
        Long totalTransportCnt = facilityCommercial.getSubwayStationCnt() + facilityCommercial.getBusStopCnt();

        return new CommercialFacilityResponse(facilityCnt, school, totalTransportCnt);
    }

    @Override
    public CommercialAdministrationAreaResponse getAdministrationInfoByCommercialCode(String commercialCode) {
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
                .orElseThrow(() -> new RuntimeException("점포 분석 데이터가 없습니다."));

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
                .orElseThrow(() -> new RuntimeException("해당 분기에 따른 상권의 소득소비 데이터가 없습니다."));

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
                .orElseThrow(() -> new RuntimeException("해당 분기의 소득소비_자치구 데이터가 없습니다."));

        IncomeAdministration incomeAdministration = incomeAdministrationRepository.findByPeriodCodeAndAdministrationCode(periodCode, administrationCode)
                .orElseThrow(() -> new RuntimeException("해당 분기의 소득소비_행정동 데이터가 없습니다."));

        IncomeCommercial incomeCommercial = incomeCommercialRepository.findByPeriodCodeAndCommercialCode(periodCode, commercialCode)
                .orElseThrow(() -> new RuntimeException("해당 분기의 소득소비_상권 데이터가 없습니다."));

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
