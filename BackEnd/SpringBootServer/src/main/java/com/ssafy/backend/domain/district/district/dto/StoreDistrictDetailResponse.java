package com.ssafy.backend.domain.district.dto;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveResponse;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveResponse;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record StoreDistrictDetailResponse(
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList,
        List<OpenedStoreAdministrationTopFiveResponse> openedStoreAdministrationTopFiveList,
        List<ClosedStoreAdministrationTopFiveResponse> closedStoreAdministrationTopFiveList

) {
}
