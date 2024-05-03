package com.ssafy.backend.domain.recommendation.dto;

public record RecommendationResponse(
        String commercialCode,
        String commercialCodeName,
        SalesCommercialInfo salesCommercialInfo,
        FootTrafficCommercialInfo footTrafficCommercialInfo,
        StoresCommercialInfo storesCommercialInfo,
        ClosedRateCommercialInfo closedRateCommercialInfo
) {
}
