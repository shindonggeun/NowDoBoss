package com.ssafy.backend.domain.district.dto;

import com.ssafy.backend.domain.administration.dto.SalesAdministrationTopFiveInfo;

import java.util.List;

public record SalesDistrictDetailResponse(
        List<SalesDistrictMonthSalesTopFiveInfo> salesDistrictSalesTopFiveList,
        List<SalesAdministrationTopFiveInfo> salesAdministrationTopFiveList

) {
}
