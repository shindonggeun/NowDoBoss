package com.ssafy.backend.domain.recommendation.document;

import com.ssafy.backend.domain.recommendation.dto.info.ClosedRateCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.FootTrafficCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.SalesCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.StoreCommercialInfo;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "saves")
@Data
public class RecommendationDocument {
    @Id
    private Long userId;
    private String commercialCode;
    private String type;

    public RecommendationDocument(Long id, String commercialCode, String type) {
        this.userId = id;
        this.commercialCode = commercialCode;
        this.type = type;
    }
}