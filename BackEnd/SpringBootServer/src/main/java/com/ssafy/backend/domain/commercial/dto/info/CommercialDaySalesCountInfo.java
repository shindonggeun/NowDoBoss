package com.ssafy.backend.domain.commercial.dto.info;

public record CommercialDaySalesCountInfo(
    Long monSalesCount,
    Long tueSalesCount,
    Long wedSalesCount,
    Long thuSalesCount,
    Long friSalesCount,
    Long satSalesCount,
    Long sunSalesCount
) {
}
