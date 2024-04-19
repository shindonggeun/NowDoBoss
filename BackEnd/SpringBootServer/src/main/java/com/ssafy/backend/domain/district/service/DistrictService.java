package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.response.DistrictDetailResponse;
import com.ssafy.backend.domain.district.dto.response.DistrictTopTenResponse;

public interface DistrictService {
    DistrictTopTenResponse getTopTenDistricts();
    DistrictDetailResponse getDistrictDetail(String districtCode);
}
