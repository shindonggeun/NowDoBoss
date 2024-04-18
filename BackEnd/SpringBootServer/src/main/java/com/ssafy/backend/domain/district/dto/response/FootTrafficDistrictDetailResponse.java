package com.ssafy.backend.domain.district.dto.response;

import java.util.List;

public record FootTrafficDistrictDetailResponse(
        List<Long> footTrafficDistrictListByPeriod,
        List<Long> footTrafficDistrictListByTime,
        List<Long> footTrafficDistrictListByGender,
        List<Long> footTrafficDistrictListByAge,
        List<Long> footTrafficDistrictListByDay
) {
}
