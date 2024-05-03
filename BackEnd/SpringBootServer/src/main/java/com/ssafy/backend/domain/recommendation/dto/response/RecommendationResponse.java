package com.ssafy.backend.domain.recommendation.dto.response;

import com.ssafy.backend.domain.recommendation.dto.info.ClosedRateCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.FootTrafficCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.SalesCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.StoreCommercialInfo;

public record RecommendationResponse(
        String commercialCode,
        String commercialCodeName,
        SalesCommercialInfo salesCommercialInfo,
        FootTrafficCommercialInfo footTrafficCommercialInfo,
        StoreCommercialInfo storeCommercialInfo,
        ClosedRateCommercialInfo closedRateCommercialInfo
) {
}
