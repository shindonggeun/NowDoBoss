package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record SalesDistrictTopFiveResponse(
        String districtCodeName,
        Long totalMonthSales,
        Float totalMonthSalesChangeRate

) {
}
