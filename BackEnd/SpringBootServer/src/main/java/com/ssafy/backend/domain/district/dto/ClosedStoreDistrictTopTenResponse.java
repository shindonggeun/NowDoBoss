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
    public ClosedStoreDistrictTopTenResponse(String districtCode, String districtCodeName, Double curClosedRate, Double closedRateChangeRate, int level) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curClosedRate = curClosedRate;
        this.closedRateChangeRate = closedRateChangeRate;
        this.level = level;
    }
}
