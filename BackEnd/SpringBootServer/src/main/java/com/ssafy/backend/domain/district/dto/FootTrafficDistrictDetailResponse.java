package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record FootTrafficDistrictDetailResponse(
        List<Map<String, Long>> footTrafficDistrictListByPeriod,
        List<Map<String, Long>> footTrafficDistrictListByTime,
        List<Map<String, Long>> footTrafficDistrictListByGender,
        List<Map<String, Long>> footTrafficDistrictListByAge,
        List<Map<String, Long>> footTrafficDistrictListByDay
) {
}
