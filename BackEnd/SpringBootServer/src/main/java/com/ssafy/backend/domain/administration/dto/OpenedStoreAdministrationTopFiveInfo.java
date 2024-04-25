package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record OpenedStoreAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Long curTotalStore,
        Long curOpenedStore
) {
    public OpenedStoreAdministrationTopFiveInfo(String administrationCode, String administrationCodeName, Long curTotalStore, Long curOpenedStore) {
        this.administrationCode = administrationCode;
        this.administrationCodeName = administrationCodeName;
        this.curTotalStore = curTotalStore;
        this.curOpenedStore = curOpenedStore;
    }
}
