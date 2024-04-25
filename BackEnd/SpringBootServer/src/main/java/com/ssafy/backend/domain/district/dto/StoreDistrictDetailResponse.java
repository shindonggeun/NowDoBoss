package com.ssafy.backend.domain.district.dto;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record StoreDistrictDetailResponse(
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList,
        List<OpenedStoreAdministrationTopFiveInfo> openedStoreAdministrationTopFiveList,
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList

) {
}
