package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.*;
import com.ssafy.backend.domain.commercial.entity.*;
import com.ssafy.backend.domain.commercial.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    @Override
    @Transactional(readOnly = true)
    public List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode) {
        List<AreaCommercial> areaCommercialList = areaCommercialRepository.findAllByDistrictCode(districtCode);
        return areaCommercialList.stream()
                .map(ac -> new CommercialAdministrationAreaResponse(
                        ac.getAdministrationCodeName(),
                        ac.getAdministrationCode())
                )
                .distinct() // 중복 제거
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode) {
        List<AreaCommercial> areaCommercialList = areaCommercialRepository.findByAdministrationCode(administrationCode);
        return areaCommercialList.stream()
                .map(ac -> new CommercialAreaResponse(
                        ac.getCommercialCode(),
                        ac.getCommercialCodeName(),
                        ac.getCommercialClassificationCode(),
                        ac.getCommercialClassificationCodeName())
                )
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

        return new CommercialFootTrafficResponse(timeSlotFootTraffic, dayOfWeekFootTraffic, ageGroupFootTraffic);
    }

    @Override
    public List<CommercialServiceResponse> getServiceByCommercialCode(String commercialCode) {
        List<ServiceCodeProjection> serviceCodeProjectionList = salesCommercialRepository.findDistinctServiceCodesByCommercialCode(commercialCode);

        return serviceCodeProjectionList.stream()
                .map(projection -> new CommercialServiceResponse(
                        projection.getServiceCode(),
                        projection.getServiceCodeName())
                )
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode) {
        SalesCommercial salesCommercial = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndServiceCode(periodCode, commercialCode, serviceCode)
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

        return new CommercialSalesResponse(timeSales, daySales, ageSales);
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


}
