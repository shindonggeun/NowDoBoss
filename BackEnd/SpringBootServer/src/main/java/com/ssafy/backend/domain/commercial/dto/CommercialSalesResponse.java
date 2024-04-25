package com.ssafy.backend.domain.commercial.dto;

public record CommercialSalesResponse(
        CommercialTimeSalesInfo timeSalesInfo,
        CommercialDaySalesInfo daySalesInfo,
        CommercialAgeSalesInfo ageSalesInfo
) {
}
