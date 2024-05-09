package com.ssafy.backend.domain.commercial.dto.info;

public record CommercialTypeIncomeInfo(
        Long monthAvgIncome,
        Integer incomeSectionCode,
        Long groceryPrice,
        Long clothesPrice,
        Long medicalPrice,
        Long lifePrice,
        Long trafficPrice,
        Long leisurePrice,
        Long culturePrice,
        Long educationPrice,
        Long luxuryPrice
) {
}
