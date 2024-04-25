package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record SalesDistrictTopTenInfo(
    String districtCode,
    String districtCodeName,
    Long curTotalSales,
    Long prevTotalSales
){
    public SalesDistrictTopTenInfo(String districtCode, String districtCodeName, Long curTotalSales, Long prevTotalSales) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curTotalSales = curTotalSales;
        this.prevTotalSales = prevTotalSales;
    }
}
