package com.ssafy.backend.domain.district.dto.info;

import lombok.Builder;

@Builder
public record SalesDistrictMonthSalesTopFiveInfo(
        String serviceCode,
        String serviceCodeName,
        Double monthSalesChangeRate
) {
}
