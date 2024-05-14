package com.ssafy.backend.domain.recommendation.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "recommendation")
@Data
@CompoundIndex(def = "{'userId': 1, 'commercialCode': 1}", unique = true)
public class RecommendationDocument {
    @Id
    private Long userId;
    private Long commercialCode;
    private String action;

    public RecommendationDocument(Long userId, Long commercialCode, String action) {
        this.userId = userId;
        this.commercialCode = commercialCode;
        this.action = action;
    }
}