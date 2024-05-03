package com.ssafy.backend.domain.district.dto.response;

import com.ssafy.backend.domain.administration.dto.info.SalesAdministrationTopFiveInfo;
import com.ssafy.backend.domain.district.dto.info.SalesDistrictMonthSalesTopFiveInfo;

import java.util.List;

public record SalesDistrictDetailResponse(
        List<SalesDistrictMonthSalesTopFiveInfo> salesDistrictSalesTopFiveList,
        List<SalesAdministrationTopFiveInfo> salesAdministrationTopFiveList

) {
}
