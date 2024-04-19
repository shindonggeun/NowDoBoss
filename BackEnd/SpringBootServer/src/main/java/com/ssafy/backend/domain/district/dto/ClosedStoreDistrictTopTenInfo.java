package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClosedStoreDistrictTopTenInfo {
    private String districtCode;

    private String districtCodeName;

    private Long curTotalStore;

    private Long curClosedStore;

    private Long prevTotalStore;

    private Long prevClosedStore;
}
