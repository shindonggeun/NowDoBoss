package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.DistrictTopFiveResponse;
import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.repository.FootTrafficDistrictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DistrictServiceImpl implements DistrictService {
    private final FootTrafficDistrictRepository footTrafficDistrictRepository;

    @Override
    public DistrictTopFiveResponse getTopFiveDistricts() {
        //DistrictTopFiveResponse districtTopFiveResponse = new DistrictTopFiveResponse();
        List<FootTrafficDistrictTopFiveInfo> footTrafficList = getTopFiveFootTrafficDistrictByPeriodCode();
//        if (footTrafficList.isEmpty()){
//
//        }
        return null;
    }

    public List<FootTrafficDistrictTopFiveInfo> getTopFiveFootTrafficDistrictByPeriodCode() {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        return footTrafficDistrictRepository.getTopFiveFootTrafficDistrictByPeriodCode(pageable);
    }
}
