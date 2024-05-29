package com.ssafy.backend.domain.recommendation.service;


import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;
import com.ssafy.backend.global.common.dto.PageResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public interface RecommendationService {
    Mono<List<RecommendationResponse>> getTopThreeRecommendations(String districtCode, String administrationCode, Long id);

    void saveCommercialRecommendation(String commercialCode, Long id);

    void deleteCommercialRecommendation(String commercialCode, Long id);

    PageResponse<RecommendationDocument> getSavedCommercialRecommendationList(Long id, int page, int size);
    List<RecommendationResponse> getSavedCommercialDetail(Long userId, String commercialCode);

}
