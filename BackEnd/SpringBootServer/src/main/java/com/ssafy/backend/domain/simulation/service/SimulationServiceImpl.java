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

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService {
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

    @Override
    public SimulationResponse simulate(CreateSimulationRequest request) {
        //////////////////////////////////////////////////////////// 전체 비용 계산
        // 임대료, 보증금 계산 >> ServiceType, Rent 이용
        ServiceType serviceType = serviceRepository.findByServiceCode(request.serviceCode())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        Rent rent = rentRepository.findByDistrictCodeName(request.location().gugun())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        Long totalPrice = 0L;

        // 임대료
        int rentPrice = rent.calculateRent(request.storeSize(), request.floor());
        
        // 보증금
        int deposit = calculateDeposit(rentPrice);

        System.out.println("=========================== 임대료 : " + rentPrice);
        System.out.println("=========================== 보증금 : " + deposit);

        totalPrice += rentPrice;
        totalPrice += deposit;

        Long totalLevy = 0L;
        Long totalInterior = 0L;

        // 프랜차이즈O
        if (request.isFranchisee()) {
            Franchisee franchisee = franchiseeRepository.findByBrandName(request.brandName())
                    .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_BRAND));

            // 가맹 사업자 부담금
            totalLevy = franchisee.getLevy();

            // 인테리어 비용
            totalInterior = franchisee.getTotalInterior();

            System.out.println("=========================== 가맹 사업자 부담금 : " + totalLevy);
            System.out.println("=========================== 인테리어 비용 : " + totalInterior);

            totalPrice += (totalLevy + totalInterior);

        } else {    // 프랜차이즈X
            // 인테리어 비용
            // avg(해당 업종의 프랜차이즈 단위면적 인테리어 비용) * (입력한 면적 / 3.3)
            Double unitArea = franchiseeRepository.findAvgByService(request.serviceCode());
            System.out.println("=========================== 단위면적당 인테리어비용 중앙값 : " + unitArea);
            totalInterior = (long) (request.storeSize() / 3.3 * unitArea * 1000L);
            System.out.println("=========================== 인테리어 비용 : " + totalInterior);
            totalPrice += totalInterior;
            totalLevy = null;
        }

        //////////////////////////////////////////////////////////// 분석

        // 성별, 연령대 분석
        SalesDistrict salesDistrict = salesDistrictRepository.findSalesDistrictByOption("20233", request.location().gugun(), request.serviceCode())
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SALES));

        GenderAndAgeAnalysisInfo analysisInfo = GenderAndAgeAnalysisInfo.create(salesDistrict);

        // 성수기, 비성수기 분석
        List<QuarterSalesInfo> quarterSales = salesDistrictRepository.findMonthSalesByOption("2022", request.location().gugun(), request.serviceCode());

        int size = quarterSales.size();

        // 비성수기
        String offSeasonPeriodCode = quarterSales.get(0).periodCode();
        int offPeakQuarter = offSeasonPeriodCode.charAt(offSeasonPeriodCode.length() - 1) - '0';

        System.out.println("============== 비성수기 : " + offPeakQuarter);

        // 성수기
        String seasonPeriodCode = quarterSales.get(size - 1).periodCode();
        int peakQuarter = seasonPeriodCode.charAt(seasonPeriodCode.length() - 1) - '0';

        System.out.println("============== 성수기 : " + peakQuarter);
        MonthAnalysisInfo monthAnalysisInfo = MonthAnalysisInfo.builder()
                .peak(peakQuarter)
                .offPeak(offPeakQuarter)
                .build();


        return SimulationResponse.builder()
                .totalPrice(totalPrice)
                .detail(DetailInfo.builder()
                        .rentPrice(rentPrice)
                        .deposit(deposit)
                        .interior(totalInterior)
                        .levy(totalLevy)
                        .build()
                )
                .genderAndAgeAnalysisInfo(analysisInfo)
                .monthAnalysisInfo(monthAnalysisInfo)
                .build();
    }

    private int calculateDeposit(int rentPrice) {
        return rentPrice * 10;
    }

}
