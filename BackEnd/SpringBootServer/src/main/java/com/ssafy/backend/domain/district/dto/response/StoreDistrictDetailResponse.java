package com.ssafy.backend.domain.district.dto.response;

import com.ssafy.backend.domain.administration.dto.info.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.info.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.district.dto.info.StoreDistrictTotalTopEightInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record StoreDistrictDetailResponse(
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList,
        List<OpenedStoreAdministrationTopFiveInfo> openedStoreAdministrationTopFiveList,
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList

) {
}
