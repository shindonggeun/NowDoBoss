package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalSales;

    private Long prevTotalSales;
}
