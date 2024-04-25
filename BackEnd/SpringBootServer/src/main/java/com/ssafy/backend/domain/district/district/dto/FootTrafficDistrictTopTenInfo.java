package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record FootTrafficDistrictTopTenInfo (
    String districtCode,

    String districtCodeName,

    Long curTotalFootTraffic,

    Long prevTotalFootTraffic
) {
    public FootTrafficDistrictTopTenInfo(String districtCode, String districtCodeName, Long curTotalFootTraffic, Long prevTotalFootTraffic){
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curTotalFootTraffic = curTotalFootTraffic;
        this.prevTotalFootTraffic = prevTotalFootTraffic;
    }
}
