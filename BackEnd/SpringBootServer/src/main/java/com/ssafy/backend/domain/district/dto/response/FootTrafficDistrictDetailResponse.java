package com.ssafy.backend.domain.district.dto.response;

import com.ssafy.backend.domain.district.dto.info.FootTrafficDistrictListByInfo;
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
