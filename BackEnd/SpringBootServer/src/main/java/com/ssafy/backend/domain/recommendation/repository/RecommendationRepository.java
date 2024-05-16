package com.ssafy.backend.domain.recommendation.repository;

import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends MongoRepository<RecommendationDocument, Long> {

    void deleteByUserIdAndCommercialCode(Long userId, String commercialCode);

    List<RecommendationDocument> findByUserId(Long userId);

    boolean existsByUserIdAndCommercialCode(Long userId, String commercialCode);

}