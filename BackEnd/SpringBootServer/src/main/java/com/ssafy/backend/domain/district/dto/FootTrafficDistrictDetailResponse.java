package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record FootTrafficDistrictDetailResponse(
        List<Long> footTrafficDistrictListByPeriod,
        List<Long> footTrafficDistrictListByTime,
        List<Long> footTrafficDistrictListByGender,
        List<Long> footTrafficDistrictListByAge,
        List<Long> footTrafficDistrictListByDay
) {
}
