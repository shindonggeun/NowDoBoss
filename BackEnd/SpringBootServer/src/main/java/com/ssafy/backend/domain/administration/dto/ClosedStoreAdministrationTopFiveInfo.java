package com.ssafy.backend.domain.administration.dto;

import lombok.Builder;

@Builder
public record ClosedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double curClosedRateChange
) {
}
