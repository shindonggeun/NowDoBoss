package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record OpenedStoreDistrictTopTenInfo(
    String districtCode,

    String districtCodeName,

    Long curTotalStore,

    Long curOpenedStore,

    Long prevTotalStore,

    Long prevOpenedStore
){
    public OpenedStoreDistrictTopTenInfo(String districtCode, String districtCodeName, Long curTotalStore, Long curOpenedStore, Long prevTotalStore, Long prevOpenedStore) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curTotalStore = curTotalStore;
        this.curOpenedStore = curOpenedStore;
        this.prevTotalStore = prevTotalStore;
        this.prevOpenedStore = prevOpenedStore;
    }
}
