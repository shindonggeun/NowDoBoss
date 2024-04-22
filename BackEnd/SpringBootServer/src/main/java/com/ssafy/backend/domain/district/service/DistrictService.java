package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.DistrictInfo;
import com.ssafy.backend.domain.district.dto.response.DistrictTopFiveResponse;

import java.util.List;

public interface DistrictService {
    DistrictTopFiveResponse getTopFiveDistricts();

    List<DistrictInfo> getAllDistricts();
}
