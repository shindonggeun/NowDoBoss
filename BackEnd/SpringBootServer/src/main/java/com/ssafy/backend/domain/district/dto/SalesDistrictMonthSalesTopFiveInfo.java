package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record SalesDistrictMonthSalesTopFiveInfo(
        String serviceCode,
        String serviceCodeName,
        Double monthSalesChangeRate
) {
}
