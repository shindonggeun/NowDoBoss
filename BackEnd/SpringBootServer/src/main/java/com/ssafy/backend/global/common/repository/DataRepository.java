package com.ssafy.backend.global.common.repository;

import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import com.ssafy.backend.global.common.document.DataDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DataRepository {
    private final MongoTemplate mongoTemplate;

    public void save(DataDocument dataDocument) {
        mongoTemplate.save(dataDocument);
    }

}
