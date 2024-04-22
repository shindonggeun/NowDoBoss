package com.ssafy.backend.domain.district.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record DistrictTopTenResponse(
        List<FootTrafficDistrictTopTenResponse> footTrafficTopTenList,
        List<SalesDistrictTopTenResponse> salesTopTenList,
        List<OpenedStoreDistrictTopTenResponse> openedRateTopTenList,
        List<ClosedStoreDistrictTopTenResponse> closedRateTopTenList
) {
}
