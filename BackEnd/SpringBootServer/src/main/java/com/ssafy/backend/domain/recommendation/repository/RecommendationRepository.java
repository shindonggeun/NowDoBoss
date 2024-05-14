package com.ssafy.backend.domain.recommendation.repository;

import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecommendationRepository {
    private final MongoTemplate mongoTemplate;

    public void deleteByUserIdAndCommercialCodeAndType(Long userId, String commercialCode) {
        Query query = new Query(Criteria.where("userId").is(userId)
                .and("commercialCode").is(commercialCode));
        mongoTemplate.remove(query, RecommendationDocument.class);
    }

    public void save(RecommendationDocument recommendationDocument) {
        mongoTemplate.save(recommendationDocument);
    }

    public List<RecommendationDocument> findByUserId(Long userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        return mongoTemplate.find(query, RecommendationDocument.class);
    }

}