package com.ssafy.backend.domain.commercial.dto.response;

import com.ssafy.backend.domain.commercial.dto.info.CommercialAgeGenderPercentSalesInfo;
import com.ssafy.backend.domain.commercial.dto.info.CommercialAgeSalesInfo;
import com.ssafy.backend.domain.commercial.dto.info.CommercialDaySalesInfo;
import com.ssafy.backend.domain.commercial.dto.info.CommercialTimeSalesInfo;

public record CommercialSalesResponse(
        CommercialTimeSalesInfo timeSalesInfo,
        CommercialDaySalesInfo daySalesInfo,
        CommercialAgeSalesInfo ageSalesInfo,
        CommercialAgeGenderPercentSalesInfo ageGenderSales
) {
}
