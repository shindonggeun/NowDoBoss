package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record StoreDistrictTotalTopEightInfo(
        String serviceCode,
        String serviceCodeName,
        Long totalStore
) {
    public StoreDistrictTotalTopEightInfo(String serviceCode, String serviceCodeName, Long totalStore) {
        this.serviceCode = serviceCode;
        this.serviceCodeName = serviceCodeName;
        this.totalStore = totalStore;
    }
}
