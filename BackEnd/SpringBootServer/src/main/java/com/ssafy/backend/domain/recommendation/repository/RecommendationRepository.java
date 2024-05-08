package com.ssafy.backend.domain.recommendation.repository;

import com.ssafy.backend.domain.recommendation.RecommendationDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RecommendationRepository {
    private final MongoTemplate mongoTemplate;

    public void deleteByUserIdAndCommercialCodeAndType(Long userId, String commercialCode, String type) {
        Query query = new Query(Criteria.where("userId").is(userId)
                .and("commercialCode").is(commercialCode)
                .and("type").is(type));
        mongoTemplate.remove(query, RecommendationDocument.class);
    }

    public void save(RecommendationDocument recommendationDocument) {
        mongoTemplate.save(recommendationDocument);
    }
}