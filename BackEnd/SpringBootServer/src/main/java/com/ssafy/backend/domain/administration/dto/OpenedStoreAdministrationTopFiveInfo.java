package com.ssafy.backend.domain.administration.dto;

import lombok.Builder;

@Builder
public record OpenedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double curOpenedRateChange
) {
}
