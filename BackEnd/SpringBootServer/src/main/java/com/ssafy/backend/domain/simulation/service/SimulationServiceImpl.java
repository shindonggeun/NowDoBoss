package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.district.entity.SalesDistrict;
import com.ssafy.backend.domain.district.repository.SalesDistrictRepository;
import com.ssafy.backend.domain.simulation.document.SimulationDocument;
import com.ssafy.backend.domain.simulation.dto.info.*;
import com.ssafy.backend.domain.simulation.dto.request.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.request.SimulationRequest;
import com.ssafy.backend.domain.simulation.dto.request.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.response.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationDocumentResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationResponse;
import com.ssafy.backend.domain.simulation.dto.response.StoreResponse;
import com.ssafy.backend.domain.simulation.entity.Franchisee;
import com.ssafy.backend.domain.simulation.entity.Rent;
import com.ssafy.backend.domain.simulation.entity.ServiceType;
import com.ssafy.backend.domain.simulation.exception.SimulationErrorCode;
import com.ssafy.backend.domain.simulation.exception.SimulationException;
import com.ssafy.backend.domain.simulation.repository.FranchiseeRepository;
import com.ssafy.backend.domain.simulation.repository.RentRepository;
import com.ssafy.backend.domain.simulation.repository.ServiceRepository;
import com.ssafy.backend.domain.simulation.repository.SimulationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService {
    private static final double SQUARE_METER_CONVERSION = 3.3;
    private static final int THOUSAND_MULTIPLIER = 1000;
    private static final int TEN_THOUSAND_MULTIPLIER = 10000;

    private final FranchiseeRepository franchiseeRepository;
    private final ServiceRepository serviceRepository;
    private final RentRepository rentRepository;
    private final SalesDistrictRepository salesDistrictRepository;
    private final SimulationRepository simulationRepository;

    @Override
    public List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request) {
        return franchiseeRepository.searchFranchisee(request);
    }

    @Override
    public StoreResponse selectStoreSize(String serviceCode) {
        ServiceType serviceType = serviceRepository.findByServiceCode(serviceCode)
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        return StoreResponse.builder()
                .small(SizeInfo.builder().squareMeter(serviceType.getSmallSize()).build())
                .medium(SizeInfo.builder().squareMeter(serviceType.getMediumSize()).build())
                .large(SizeInfo.builder().squareMeter(serviceType.getLargeSize()).build())
                .build();
    }

    private long calculateNonFranchiseeInteriorCost(String serviceCode, int storeSize) {
        double unitArea = franchiseeRepository.findAvgByService(serviceCode);

        System.out.println("=========================== 단위면적당 인테리어비용 평균값(천원) : " + unitArea);

        long interiorCost = (long) (storeSize / SQUARE_METER_CONVERSION * unitArea * THOUSAND_MULTIPLIER);

        System.out.println("=========================== 인테리어 비용(원) : " + interiorCost);

        return interiorCost;
    }

    @Override
    public SimulationResponse simulate(SimulationRequest request) {
        //////////////////////////////////////////////////////////// 전체 비용 계산
        ServiceType serviceType = serviceRepository.findByServiceCode(request.serviceCode())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        Rent rent = rentRepository.findByDistrictCodeName(request.gugun())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));


        long rentPrice = rent.calculateRent(request.storeSize(), request.floor());
        long deposit = rent.calculateDeposit(rentPrice);
        long totalPrice = rentPrice + deposit;

        log.info("임대료(원): {}", rentPrice);
        log.info("보증금(원) : {}", deposit);

        Long totalLevy = 0L;
        Long totalInterior = 0L;

        // 프랜차이즈O
        if (request.isFranchisee()) {
            Franchisee franchisee = franchiseeRepository.findByBrandName(request.brandName())
                    .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_BRAND));

            totalLevy = franchisee.getLevy();
            totalInterior = franchisee.getTotalInterior();
            totalPrice += (totalLevy + totalInterior);
        } else {    // 프랜차이즈X
            // 인테리어 비용
            // avg(해당 업종의 프랜차이즈 단위면적 인테리어 비용) * (입력한 면적 / 3.3)
            totalInterior = calculateNonFranchiseeInteriorCost(request.serviceCode(), request.storeSize());
            totalPrice += totalInterior;
            totalLevy = null;
        }

        log.info("부담금(원) : {}", totalLevy);
        log.info("인테리어비용(원) : {}", totalInterior);
        log.info("창업 비용(원) : {}", totalPrice);

        KeyMoneyInfo keyMoneyInfo = KeyMoneyInfo.builder()
                .keyMoneyRatio(serviceType.getKeyMoneyRatio())
                .keyMoney(serviceType.getKeyMoney())
                .keyMoneyLevel(serviceType.getKeyMoneyLevel())
                .build();

        if (totalLevy != null) {
            totalLevy /= TEN_THOUSAND_MULTIPLIER;
        }

        DetailInfo detailInfo = DetailInfo.builder()
                .rentPrice(rentPrice/TEN_THOUSAND_MULTIPLIER)
                .deposit(deposit/TEN_THOUSAND_MULTIPLIER)
                .interior(totalInterior/TEN_THOUSAND_MULTIPLIER)
                .levy(totalLevy)
                .build();

        //////////////////////////////////////////////////////////// 분석

        // 성별, 연령대 분석
        GenderAndAgeAnalysisInfo analysisInfo = analyzeGenderAndAge(request.gugun(), request.serviceCode());

        // 성수기, 비성수기 분석
        MonthAnalysisInfo monthAnalysisInfo = analyzePeakAndOffPeak(request.gugun(), request.serviceCode());

        //////////////////////////////////////////////////////////// 프랜차이즈 상위 5개 비교
        // 비용(원) >> 보증금 + 임대료 + 아래 내용
        long franchiseePrice = rentPrice + deposit;

        List<FranchiseeInfo> franchisees = franchiseeRepository.findByServiceCode(franchiseePrice, totalPrice, request.serviceCode());

        return SimulationResponse.builder()
                .request(request)
                .totalPrice(totalPrice/TEN_THOUSAND_MULTIPLIER) // 원
                .keyMoneyInfo(keyMoneyInfo)
                .detail(detailInfo)
                .franchisees(franchisees)
                .genderAndAgeAnalysisInfo(analysisInfo)
                .monthAnalysisInfo(monthAnalysisInfo)
                .build();
    }

    private MonthAnalysisInfo analyzePeakAndOffPeak(String district, String serviceCode) {
        List<QuarterSalesInfo> quarterSales = salesDistrictRepository.findMonthSalesByOption("2022", district, serviceCode);

        int size = quarterSales.size();

        // 비성수기
        int offPeakQuarter = getQuarter(quarterSales, 0);
        log.info("비성수기 : {}", offPeakQuarter);

        // 성수기
        int peakQuarter = getQuarter(quarterSales, size - 1);
        log.info("성수기 : {}", peakQuarter);

        return MonthAnalysisInfo.builder()
                .peak(peakQuarter)
                .offPeak(offPeakQuarter)
                .build();
    }

    private static int getQuarter(List<QuarterSalesInfo> quarterSales, int index) {
        String seasonPeriodCode = quarterSales.get(index).periodCode();
        return seasonPeriodCode.charAt(seasonPeriodCode.length() - 1) - '0';
    }


    private GenderAndAgeAnalysisInfo analyzeGenderAndAge(String district, String serviceCode) {
        SalesDistrict salesDistrict = salesDistrictRepository.findSalesDistrictByOption("20233", district, serviceCode)
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SALES));

        return GenderAndAgeAnalysisInfo.create(salesDistrict);
    }

    @Override
    public void createSimulation(Long memberId, CreateSimulationRequest request) {
        SimulationDocument simulationDocument = SimulationDocument.builder()
                .memberId(memberId)
                .totalPrice(request.totalPrice())
                .isFranchisee(request.isFranchisee())
                .brandName(request.brandName())
                .gugun(request.gugun())
                .serviceCode(request.serviceCode())
                .serviceCodeName(request.serviceCodeName())
                .storeSize(request.storeSize())
                .floor(request.floor())
                .build();

        if (!simulationRepository.existsBySimulationDocument(simulationDocument)) {
            simulationRepository.save(simulationDocument);
        }
    }

    @Override
    public List<SimulationDocumentResponse> selectSimulation(Long memberId) {
        return simulationRepository.findByMemberId(memberId).stream().map(
                s -> new SimulationDocumentResponse(s)
        ).toList();
    }
}
