package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.DistrictDetailResponse;
import com.ssafy.backend.domain.district.dto.DistrictTopTenResponse;

public interface DistrictService {
    DistrictTopTenResponse getTopTenDistricts();
    DistrictDetailResponse getDistrictDetail(String districtCode);
}
