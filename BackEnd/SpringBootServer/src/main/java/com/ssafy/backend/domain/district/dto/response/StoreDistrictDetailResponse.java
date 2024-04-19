package com.ssafy.backend.domain.district.dto.response;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;

import java.util.List;

public record StoreDistrictDetailResponse(
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList,
        List<OpenedStoreAdministrationTopFiveInfo> openedStoreAdministrationTopFiveList,
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList

) {
}
