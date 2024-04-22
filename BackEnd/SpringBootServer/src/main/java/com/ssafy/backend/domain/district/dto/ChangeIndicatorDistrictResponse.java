package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

@Builder
public record ChangeIndicatorDistrictResponse(
        String changeIndicator,
        String changeIndicatorName,
        int openedMonths,
        int closedMonths
) {
}
