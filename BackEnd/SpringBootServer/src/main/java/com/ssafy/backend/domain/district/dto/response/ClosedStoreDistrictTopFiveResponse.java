package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record ClosedStoreDistrictTopFiveResponse(
        String districtCodeName,
        Float curClosedRate,
        Float closedRateChangeRate
) {
}
