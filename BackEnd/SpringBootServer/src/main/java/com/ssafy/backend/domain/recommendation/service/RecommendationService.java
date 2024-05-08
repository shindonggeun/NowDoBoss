package com.ssafy.backend.domain.recommendation.service;


import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationResponse;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;

import java.util.List;

public interface RecommendationService {
    List<RecommendationResponse> getTopThreeRecommendations(String districtCode, String administrationCode, Long id);

    void saveCommercialRecommendation(String commercialCode, Long id);

    void deleteCommercialRecommendation(String commercialCode, Long id);
}
