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
    public OpenedStoreDistrictTopTenResponse(String districtCode, String districtCodeName, Double curOpenedRate, Double openedRateChangeRate, int level) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curOpenedRate = curOpenedRate;
        this.openedRateChangeRate = openedRateChangeRate;
        this.level = level;
    }
}
