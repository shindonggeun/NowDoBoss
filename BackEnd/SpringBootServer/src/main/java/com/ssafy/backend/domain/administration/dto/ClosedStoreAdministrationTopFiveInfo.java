package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record ClosedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Long curTotalStore,
        Long curClosedStore
) {
    public ClosedStoreAdministrationTopFiveInfo(String administrationCode, String administrationCodeName, Long curTotalStore, Long curClosedStore) {
        this.administrationCode = administrationCode;
        this.administrationCodeName = administrationCodeName;
        this.curTotalStore = curTotalStore;
        this.curClosedStore = curClosedStore;
    }
}
