package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record FootTrafficDistrictDetailResponse(
        FootTrafficDistrictListByPeriodInfo footTrafficDistrictListByPeriod,
        FootTrafficDistrictListByTimeInfo footTrafficDistrictListByTime,
        FootTrafficDistrictListByGenderInfo footTrafficDistrictListByGender,
        FootTrafficDistrictListByAgeInfo footTrafficDistrictListByAge,
        FootTrafficDistrictListByDayInfo footTrafficDistrictListByDay
) {
}
