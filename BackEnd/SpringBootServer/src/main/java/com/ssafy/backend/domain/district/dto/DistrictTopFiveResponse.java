package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record DistrictTopFiveResponse(
        List<FootTrafficDistrictTopFiveInfo> footTrafficTopFiveList,
        List<Map<String, Object>> salesTopFiveList,
        List<Map<String, Object>> openedRateTopFiveList,
        List<Map<String, Object>> closedRateTopFiveList
) {
}
