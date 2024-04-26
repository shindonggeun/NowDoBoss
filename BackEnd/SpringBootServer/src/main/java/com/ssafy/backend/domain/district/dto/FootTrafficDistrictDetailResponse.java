package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record FootTrafficDistrictDetailResponse(
        FootTrafficDistrictListByInfo footTrafficDistrictListByPeriod,
        FootTrafficDistrictListByInfo footTrafficDistrictListByTime,
        FootTrafficDistrictListByInfo footTrafficDistrictListByGender,
        FootTrafficDistrictListByInfo footTrafficDistrictListByAge,
        FootTrafficDistrictListByInfo footTrafficDistrictListByDay
) {
}
