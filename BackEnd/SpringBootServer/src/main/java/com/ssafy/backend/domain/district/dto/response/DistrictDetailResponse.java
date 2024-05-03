package com.ssafy.backend.domain.district.dto.response;

import lombok.Builder;

@Builder
public record DistrictDetailResponse(
        ChangeIndicatorDistrictResponse changeIndicatorDistrictDetail,
        FootTrafficDistrictDetailResponse footTrafficDistrictDetail,
        StoreDistrictDetailResponse storeDistrictDetail,
        SalesDistrictDetailResponse salesDistrictDetail
) {
}
