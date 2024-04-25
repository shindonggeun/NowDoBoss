package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record StoreDistrictTotalTopEightInfo(
        String serviceCode,
        String serviceCodeName,
        Double totalStoreChangeRate
) {
    public StoreDistrictTotalTopEightInfo(String serviceCode, String serviceCodeName, Double totalStoreChangeRate) {
        this.serviceCode = serviceCode;
        this.serviceCodeName = serviceCodeName;
        this.totalStoreChangeRate = totalStoreChangeRate;
    }
}
