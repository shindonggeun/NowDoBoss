package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.info.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.response.SalesDistrictTopTenResponse;

import java.util.List;


public interface SalesDistrictCustomRepository {
    List<SalesDistrictTopTenResponse> getTopTenSalesDistrictByPeriodCode();
    List<SalesDistrictMonthSalesTopFiveInfo> getTopFiveMonthSalesByServiceCode(String districtCode, String periodCode);
}
