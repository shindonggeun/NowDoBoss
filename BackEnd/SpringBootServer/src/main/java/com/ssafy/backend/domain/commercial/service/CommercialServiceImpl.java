package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.*;
import com.ssafy.backend.domain.commercial.entity.AreaCommercial;
import com.ssafy.backend.domain.commercial.entity.FootTrafficCommercial;
import com.ssafy.backend.domain.commercial.repository.AreaCommercialRepository;
import com.ssafy.backend.domain.commercial.repository.FootTrafficCommercialRepository;
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


}
