package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record ClosedStoreDistrictTopTenResponse(
        String districtCode,
        String districtCodeName,
        Double curClosedRate,
        Double closedRateChangeRate,
        int level
) {
}
