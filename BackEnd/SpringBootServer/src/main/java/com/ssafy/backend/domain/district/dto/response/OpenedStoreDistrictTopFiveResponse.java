package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record OpenedStoreDistrictTopFiveResponse(
        String districtCodeName,
        Float curOpenedRate,
        Float openedRateChangeRate
) {
}
