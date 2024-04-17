package com.ssafy.backend.domain.district.dto;

import lombok.Data;

@Data
public class SalesDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalSales;

    private Long prevTotalSales;
}
