package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record DistrictTopFiveResponse(
        List<FootTrafficDistrictTopFiveResponse> footTrafficTopFiveList,
        List<SalesDistrictTopFiveResponse> salesTopFiveList,
        List<OpenedStoreDistrictTopFiveResponse> openedRateTopFiveList,
        List<ClosedStoreDistrictTopFiveResponse> closedRateTopFiveList
) {
}
