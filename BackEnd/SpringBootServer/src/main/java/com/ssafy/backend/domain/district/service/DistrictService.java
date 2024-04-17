package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.response.DistrictTopFiveResponse;

public interface DistrictService {
    DistrictTopFiveResponse getTopFiveDistricts();
}
