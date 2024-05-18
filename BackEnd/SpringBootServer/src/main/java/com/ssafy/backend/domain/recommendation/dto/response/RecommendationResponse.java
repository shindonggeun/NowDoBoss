package com.ssafy.backend.domain.recommendation.dto.response;

import com.ssafy.backend.domain.commercial.dto.info.BlueOceanInfo;
import com.ssafy.backend.domain.recommendation.dto.info.ClosedRateCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.FootTrafficCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.SalesCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.StoreCommercialInfo;

import java.util.List;
import java.util.Map;

public record RecommendationResponse(
        String commercialCode,
        String commercialCodeName,
        SalesCommercialInfo salesCommercialInfo,
        FootTrafficCommercialInfo footTrafficCommercialInfo,
        StoreCommercialInfo storeCommercialInfo,
        ClosedRateCommercialInfo closedRateCommercialInfo,

        List<BlueOceanInfo> blueOceanInfo
) {
}
