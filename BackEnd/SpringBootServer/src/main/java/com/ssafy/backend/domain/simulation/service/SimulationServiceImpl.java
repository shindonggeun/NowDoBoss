package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.district.entity.SalesDistrict;
import com.ssafy.backend.domain.district.repository.SalesDistrictRepository;
import com.ssafy.backend.domain.simulation.dto.*;
import com.ssafy.backend.domain.simulation.entity.Franchisee;
import com.ssafy.backend.domain.simulation.entity.Rent;
import com.ssafy.backend.domain.simulation.entity.ServiceType;
import com.ssafy.backend.domain.simulation.exception.SimulationErrorCode;
import com.ssafy.backend.domain.simulation.exception.SimulationException;
import com.ssafy.backend.domain.simulation.repository.FranchiseeRepository;
import com.ssafy.backend.domain.simulation.repository.RentRepository;
import com.ssafy.backend.domain.simulation.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService {
    private static final double SQUARE_METER_CONVERSION = 3.3;
    private static final int THOUSAND_MULTIPLIER = 1000;

    private final FranchiseeRepository franchiseeRepository;
    private final ServiceRepository serviceRepository;
    private final RentRepository rentRepository;
    private final SalesDistrictRepository salesDistrictRepository;

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


    private Long calculateFranchisee(Long totalPrice, String brandName) {
        Franchisee franchisee = franchiseeRepository.findByBrandName(brandName)
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_BRAND));

        // 가맹 사업자 부담금
        Long levy = franchisee.getLevy();

        // 인테리어 비용
        Long interior = franchisee.getTotalInterior();

        System.out.println("=========================== 가맹 사업자 부담금 : " + levy);
        System.out.println("=========================== 인테리어 비용 : " + interior);

//        totalPrice += (levy + interior);

        return totalPrice + levy + interior;
    }

    private long calculateTotalRentalCosts(Rent rent, int storeSize, String floor) {
        // 임대료
        int rentPrice = rent.calculateRent(storeSize, floor);
        
        // 보증금
        int deposit = rent.calculateDeposit(rentPrice);

        System.out.println("=========================== 임대료 : " + rentPrice);
        System.out.println("=========================== 보증금 : " + deposit);

        return rentPrice + deposit;
    }

    private long calculateFranchiseeCosts(String brandName) {
        Franchisee franchisee = franchiseeRepository.findByBrandName(brandName)
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_BRAND));

        long totalLevy = franchisee.getLevy();
        long totalInterior = franchisee.getTotalInterior();

        System.out.println("=========================== 가맹 사업자 부담금 : " + totalLevy);
        System.out.println("=========================== 인테리어 비용 : " + totalInterior);

        return totalLevy + totalInterior;
    }

    private long calculateNonFranchiseeInteriorCost(String serviceCode, int storeSize) {
        double unitArea = franchiseeRepository.findAvgByService(serviceCode);

        System.out.println("=========================== 단위면적당 인테리어비용 평균값 : " + unitArea);

        long interiorCost = (long) (storeSize / SQUARE_METER_CONVERSION * unitArea * THOUSAND_MULTIPLIER);

        System.out.println("=========================== 인테리어 비용 : " + interiorCost);

        return interiorCost;
    }

    @Override
    public SimulationResponse simulate(CreateSimulationRequest request) {
        //////////////////////////////////////////////////////////// 전체 비용 계산
        ServiceType serviceType = serviceRepository.findByServiceCode(request.serviceCode())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        Rent rent = rentRepository.findByDistrictCodeName(request.gugun())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        long totalPrice = calculateTotalRentalCosts(rent, request.storeSize(), request.floor());

        int rentPrice = rent.calculateRent(request.storeSize(), request.floor());
        int deposit = rent.calculateDeposit(rentPrice);

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

        KeyMoneyInfo keyMoneyInfo = KeyMoneyInfo.builder()
                .keyMoneyRatio(serviceType.getKeyMoneyRatio())
                .keyMoney(serviceType.getKeyMoney())
                .keyMoneyLevel(serviceType.getKeyMoneyLevel())
                .build();

        DetailInfo detailInfo = DetailInfo.builder()
                .rentPrice(rentPrice)
                .deposit(deposit)
                .interior(totalInterior)
                .levy(totalLevy)
                .build();

        //////////////////////////////////////////////////////////// 분석

        // 성별, 연령대 분석
        GenderAndAgeAnalysisInfo analysisInfo = analyzeGenderAndAge(request.gugun(), request.serviceCode());

        // 성수기, 비성수기 분석
        MonthAnalysisInfo monthAnalysisInfo = analyzePeakAndOffPeak(request.gugun(), request.serviceCode());

        //////////////////////////////////////////////////////////// 프랜차이즈 상위 5개 비교
        // 비용 >> 보증금 + 임대료 + 아래 내용
        int franchiseePrice = rentPrice + deposit;

        List<FranchiseeInfo> franchisees = franchiseeRepository.findByServiceCode(franchiseePrice, totalPrice, request.serviceCode());

        return SimulationResponse.builder()
                .totalPrice(totalPrice)
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
        System.out.println("============== 비성수기 : " + offPeakQuarter);

        // 성수기
        int peakQuarter = getQuarter(quarterSales, size - 1);
        System.out.println("============== 성수기 : " + peakQuarter);

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

}
