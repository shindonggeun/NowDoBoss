package com.ssafy.backend.domain.district.dto;

import lombok.Data;

@Data
public class FootTrafficDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalFootTraffic;

    private Float footTrafficChangeRate;
}
