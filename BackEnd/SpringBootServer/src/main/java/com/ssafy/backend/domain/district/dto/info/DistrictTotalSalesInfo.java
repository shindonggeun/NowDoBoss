package com.ssafy.backend.domain.district.dto.info;

public record DistrictTotalSalesInfo(
        String districtCode,
        String districtCodeName,
        Long totalSales
) {
}
