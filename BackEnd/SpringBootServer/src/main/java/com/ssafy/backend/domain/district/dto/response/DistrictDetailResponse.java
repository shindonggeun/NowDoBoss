package com.ssafy.backend.domain.district.dto.response;

public record DistrictDetailResponse(
        ChangeIndicatorDistrictResponse ChangeIndicatorDistrictDetail,
        FootTrafficDistrictDetailResponse footTrafficDistrictDetail
) {
}
