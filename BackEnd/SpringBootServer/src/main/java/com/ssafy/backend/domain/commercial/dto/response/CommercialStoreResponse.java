package com.ssafy.backend.domain.commercial.dto.response;

import com.ssafy.backend.domain.commercial.dto.info.CommercialFranchiseeStoreInfo;
import com.ssafy.backend.domain.commercial.dto.info.CommercialOpenAndCloseStoreInfo;
import com.ssafy.backend.domain.commercial.dto.info.CommercialSameStoreInfo;

import java.util.List;

public record CommercialStoreResponse(
        List<CommercialSameStoreInfo> sameStoreInfos,

        Long sameTotalStore,
        CommercialFranchiseeStoreInfo franchiseeStoreInfo,
        CommercialOpenAndCloseStoreInfo openAndCloseStoreInfo
) {
}
