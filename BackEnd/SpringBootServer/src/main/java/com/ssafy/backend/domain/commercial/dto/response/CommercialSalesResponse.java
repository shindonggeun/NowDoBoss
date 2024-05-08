package com.ssafy.backend.domain.commercial.dto.response;

import com.ssafy.backend.domain.commercial.dto.info.*;

import java.util.List;

public record CommercialSalesResponse(
        CommercialTimeSalesInfo timeSalesInfo,
        CommercialDaySalesInfo daySalesInfo,
        CommercialAgeSalesInfo ageSalesInfo,
        CommercialAgeGenderPercentSalesInfo ageGenderPercentSales,
        CommercialDaySalesCountInfo daySalesCountInfo,
        CommercialTimeSalesCountInfo timeSalesCountInfo,
        CommercialGenderSalesCountInfo genderSalesCountInfo,
        List<CommercialAnnualQuarterSalesInfo> annualQuarterSalesInfos
) {
}
