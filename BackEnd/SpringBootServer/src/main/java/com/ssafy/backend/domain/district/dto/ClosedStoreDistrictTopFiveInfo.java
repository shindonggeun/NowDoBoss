package com.ssafy.backend.domain.district.dto;

import lombok.Data;

@Data
public class ClosedStoreDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalStore;

    private Long curClosedStore;

    private Long prevTotalStore;

    private Long prevClosedStore;
}
