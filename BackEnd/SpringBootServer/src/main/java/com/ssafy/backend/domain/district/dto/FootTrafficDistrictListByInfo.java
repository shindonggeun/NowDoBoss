package com.ssafy.backend.domain.district.dto;

import java.util.Map;

public record FootTrafficDistrictListByInfo(
        String summary,
        Map<String, Long> data
) {
}
