package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record FootTrafficDistrictTopFiveResponse(
        String districtCodeName,
        Long totalFootTraffic,
        Float totalFootTrafficChangeRate

) {
}
