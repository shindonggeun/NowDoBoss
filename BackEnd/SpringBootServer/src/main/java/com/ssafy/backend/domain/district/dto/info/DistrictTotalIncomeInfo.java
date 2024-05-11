package com.ssafy.backend.domain.district.dto.info;

public record DistrictTotalIncomeInfo(
        String districtCode,
        String districtCodeName,
        Long totalPrice
) {
}
