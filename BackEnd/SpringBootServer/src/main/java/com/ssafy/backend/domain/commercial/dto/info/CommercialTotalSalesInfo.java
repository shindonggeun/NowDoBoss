package com.ssafy.backend.domain.commercial.dto.info;

public record CommercialTotalSalesInfo(
        String commercialCode,
        String commercialCodeName,
        Long totalSales
) {
}
