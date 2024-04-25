package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopTenResponse;

import java.util.List;

public interface FootTrafficDistrictCustomRepository {
    List<FootTrafficDistrictTopTenResponse> getTopTenFootTrafficDistrictByPeriodCode();
}
