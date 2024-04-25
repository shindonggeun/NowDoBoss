package com.ssafy.backend.domain.district.dto;

import java.util.Map;

public record FootTrafficDistrictListByGenderInfo(
        String summary,
        Map<String, Long> data
) {
}
