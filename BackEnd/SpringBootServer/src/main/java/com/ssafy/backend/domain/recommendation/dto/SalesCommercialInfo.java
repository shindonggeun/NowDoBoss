package com.ssafy.backend.domain.recommendation.dto;

public record SalesCommercialInfo(
        Long mySales,
        Long administrationSales,
        Long otherSales
) {
}
