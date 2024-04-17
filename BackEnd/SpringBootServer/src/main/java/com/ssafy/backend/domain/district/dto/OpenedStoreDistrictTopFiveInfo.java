package com.ssafy.backend.domain.district.dto;

import lombok.Data;

@Data
public class OpenedStoreDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalStore;

    private Long curOpenedStore;

    private Long prevTotalStore;

    private Long prevOpenedStore;
}
