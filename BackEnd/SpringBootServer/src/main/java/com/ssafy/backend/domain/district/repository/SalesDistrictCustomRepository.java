package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;

import java.util.List;


public interface SalesDistrictCustomRepository {
    List<SalesDistrictTopTenInfo> getTopTenSalesDistrictByPeriodCode();
    List<SalesDistrictMonthSalesTopFiveInfo> getTopFiveMonthSalesByServiceCode(String districtCode, String periodCode);
}
