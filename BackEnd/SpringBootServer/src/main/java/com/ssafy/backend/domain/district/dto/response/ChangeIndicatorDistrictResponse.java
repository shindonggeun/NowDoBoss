package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record ChangeIndicatorDistrictResponse(
        String changeIndicator,
        String changeIndicatorName,
        int openedMonths,
        int closedMonths
) {
}
