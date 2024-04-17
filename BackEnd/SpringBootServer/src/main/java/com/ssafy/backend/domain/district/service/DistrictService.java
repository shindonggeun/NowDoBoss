package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.DistrictTopFiveResponse;

public interface DistrictService {

    DistrictTopFiveResponse getTopFiveDistricts();
}
