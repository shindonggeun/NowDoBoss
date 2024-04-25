package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record ClosedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double curClosedRateChange
) {
    public ClosedStoreAdministrationTopFiveInfo(String administrationCode, String administrationCodeName, Double curClosedRateChange) {
        this.administrationCode = administrationCode;
        this.administrationCodeName = administrationCodeName;
        this.curClosedRateChange = curClosedRateChange;
    }
}
