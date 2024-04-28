package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record OpenedStoreDistrictTopTenResponse(
        String districtCode,
        String districtCodeName,
        Double curOpenedRate,
        Double openedRateChangeRate,
        int level
) {
}
