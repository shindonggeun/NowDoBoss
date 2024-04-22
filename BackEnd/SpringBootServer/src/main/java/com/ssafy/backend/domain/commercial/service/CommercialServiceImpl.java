package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialAreaResponse;
import com.ssafy.backend.domain.commercial.entity.AreaCommercial;
import com.ssafy.backend.domain.commercial.repository.AreaCommercialRepository;
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


}
