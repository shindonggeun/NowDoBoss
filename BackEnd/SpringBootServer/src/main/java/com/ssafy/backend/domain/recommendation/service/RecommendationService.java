package com.ssafy.backend.domain.recommendation.service;


import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationResponse;
import java.util.List;

public interface RecommendationService {
    List<CommercialAdministrationResponse> getTopThreeRecommendations(String districtCode, String administrationCode, Long id);
}
