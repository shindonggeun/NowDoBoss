package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopTenInfo;

import java.util.List;

public interface FootTrafficDistrictCustomRepository {
    List<FootTrafficDistrictTopTenInfo> getTopTenFootTrafficDistrictByPeriodCode();
}