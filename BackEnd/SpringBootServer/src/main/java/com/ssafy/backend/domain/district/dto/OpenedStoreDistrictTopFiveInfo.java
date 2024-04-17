package com.ssafy.backend.domain.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenedStoreDistrictTopFiveInfo {
    private String districtCodeName;

    private Long curTotalStore;

    private Long curOpenedStore;

    private Long prevTotalStore;

    private Long prevOpenedStore;
}
