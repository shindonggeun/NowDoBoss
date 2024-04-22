package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record ClosedStoreAdministrationTopFiveResponse(
        String administrationCode,
        String administrationCodeName,
        Long curTotalStore,
        Long curClosedStore,
        Float curClosedRate
) {
}
