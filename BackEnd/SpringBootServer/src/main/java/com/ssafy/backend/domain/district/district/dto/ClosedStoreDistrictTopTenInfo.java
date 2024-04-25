package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record ClosedStoreDistrictTopTenInfo(
    String districtCode,
    String districtCodeName,
    Long curTotalStore,
    Long curClosedStore,
    Long prevTotalStore,
    Long prevClosedStore
){
    public ClosedStoreDistrictTopTenInfo(String districtCode, String districtCodeName, Long curTotalStore, Long curClosedStore, Long prevTotalStore, Long prevClosedStore) {
        this.districtCode = districtCode;
        this.districtCodeName = districtCodeName;
        this.curTotalStore = curTotalStore;
        this.curClosedStore = curClosedStore;
        this.prevTotalStore = prevTotalStore;
        this.prevClosedStore = prevClosedStore;
    }
}
