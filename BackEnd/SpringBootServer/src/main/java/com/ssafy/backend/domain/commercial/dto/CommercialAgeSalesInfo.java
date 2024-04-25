package com.ssafy.backend.domain.commercial.dto;

public record CommercialAgeSalesInfo(
        Long teenSales,   // 10대 매출액
        Long twentySales, // 20대 매출액
        Long thirtySales, // 30대 매출액
        Long fortySales,  // 40대 매출액
        Long fiftySales,  // 50대 매출액
        Long sixtySales   // 60대 이상 매출액
) {
}
