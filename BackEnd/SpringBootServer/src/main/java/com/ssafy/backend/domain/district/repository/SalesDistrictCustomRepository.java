package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;

import java.util.List;


public interface SalesDistrictCustomRepository {
    List<SalesDistrictTopTenInfo> getTopTenSalesDistrictByPeriodCode();
}
