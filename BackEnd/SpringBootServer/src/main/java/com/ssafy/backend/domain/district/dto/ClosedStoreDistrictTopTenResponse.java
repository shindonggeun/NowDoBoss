package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record ClosedStoreDistrictTopTenResponse(
        String districtCode,
        String districtCodeName,
        Float curClosedRate,
        Float closedRateChangeRate,
        int level
) {
}
