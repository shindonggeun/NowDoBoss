package com.ssafy.backend.domain.district.dto.response;

import com.ssafy.backend.domain.district.entity.StoreDistrict;
import lombok.Builder;

@Builder
public record DistrictDetailResponse(
        ChangeIndicatorDistrictResponse ChangeIndicatorDistrictDetail,
        FootTrafficDistrictDetailResponse footTrafficDistrictDetail,
        StoreDistrictDetailResponse storeDistrictDetail,
        SalesDistrictDetailResponse salesDistrictDetail
) {
}
