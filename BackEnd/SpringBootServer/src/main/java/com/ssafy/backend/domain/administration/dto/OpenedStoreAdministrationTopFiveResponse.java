package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record OpenedStoreAdministrationTopFiveResponse(
        String administrationCode,
        String administrationCodeName,
        Long curTotalStore,
        Long curOpenedStore,
        Float curOpenedRate
) {
}
