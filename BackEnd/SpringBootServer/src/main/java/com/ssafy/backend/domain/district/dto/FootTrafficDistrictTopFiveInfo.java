package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FootTrafficDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalFootTraffic;

    private Long prevTotalFootTraffic;
}
