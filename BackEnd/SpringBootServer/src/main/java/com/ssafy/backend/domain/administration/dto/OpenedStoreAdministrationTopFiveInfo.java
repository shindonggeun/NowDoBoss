package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record OpenedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double curOpenedRateChange
) {
    public OpenedStoreAdministrationTopFiveInfo(String administrationCode, String administrationCodeName, Double curOpenedRateChange) {
        this.administrationCode = administrationCode;
        this.administrationCodeName = administrationCodeName;
        this.curOpenedRateChange = curOpenedRateChange;
    }
}
