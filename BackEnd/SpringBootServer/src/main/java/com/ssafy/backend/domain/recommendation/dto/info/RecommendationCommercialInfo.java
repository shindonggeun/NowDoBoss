package com.ssafy.backend.domain.recommendation.dto.info;

import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;

import java.util.List;

public record RecommendationCommercialInfo(
        Long userId,
        String districtCode,
        String districtCodeName,
        String administrationCode,
        String administrationCodeName,
        List<RecommendationResponse> recommendationResponse
) {
}
