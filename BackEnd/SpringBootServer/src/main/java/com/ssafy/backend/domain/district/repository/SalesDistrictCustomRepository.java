package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenResponse;

import java.util.List;


public interface SalesDistrictCustomRepository {
    List<SalesDistrictTopTenResponse> getTopTenSalesDistrictByPeriodCode();
    List<SalesDistrictMonthSalesTopFiveInfo> getTopFiveMonthSalesByServiceCode(String districtCode, String periodCode);
}
