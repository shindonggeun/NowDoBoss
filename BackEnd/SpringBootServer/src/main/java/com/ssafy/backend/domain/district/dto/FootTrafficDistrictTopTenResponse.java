package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record FootTrafficDistrictTopTenResponse(
        String districtCode,
        String districtCodeName,
        Long totalFootTraffic,
        Double totalFootTrafficChangeRate,
        int level

) {
    public FootTrafficDistrictTopTenResponse(String districtCode, String districtCodeName, Long totalFootTraffic, Double totalFootTrafficChangeRate, int level){
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.totalFootTraffic = totalFootTraffic;
        this.totalFootTrafficChangeRate = totalFootTrafficChangeRate;
        this.level = level;
    }
}
