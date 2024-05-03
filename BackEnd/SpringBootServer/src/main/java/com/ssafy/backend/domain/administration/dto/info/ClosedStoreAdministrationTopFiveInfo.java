package com.ssafy.backend.domain.administration.dto.info;

import lombok.Builder;

@Builder
public record ClosedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double curClosedRateChange
) {
}
