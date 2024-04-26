package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record SalesDistrictTopTenResponse(
        String districtCode,
        String districtCodeName,
        Long totalMonthSales,
        Double totalMonthSalesChangeRate,
        int level

) {
    public SalesDistrictTopTenResponse(String districtCode, String districtCodeName, Long totalMonthSales, Double totalMonthSalesChangeRate, int level) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.totalMonthSales = totalMonthSales;
        this.totalMonthSalesChangeRate = totalMonthSalesChangeRate;
        this.level = level;
    }
}
