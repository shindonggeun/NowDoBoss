package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record StoreDistrictTotalTopEightInfo(
        String serviceCode,
        String serviceCodeName,
        Double totalStoreChangeRate
) {
}
