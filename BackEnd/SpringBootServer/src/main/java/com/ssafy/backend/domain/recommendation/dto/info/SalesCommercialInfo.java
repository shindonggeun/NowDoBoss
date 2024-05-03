package com.ssafy.backend.domain.recommendation.dto.info;

public record SalesCommercialInfo(
        Long mySales,
        Long administrationSales,
        Long otherSales
) {
}
