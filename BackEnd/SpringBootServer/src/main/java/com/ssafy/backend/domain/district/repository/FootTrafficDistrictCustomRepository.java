package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.response.FootTrafficDistrictTopTenResponse;

import java.util.List;

public interface FootTrafficDistrictCustomRepository {
    List<FootTrafficDistrictTopTenResponse> getTopTenFootTrafficDistrictByPeriodCode();
}
