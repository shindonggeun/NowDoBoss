package com.ssafy.backend.domain.recommendation.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "recommendation")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendationDocument {
    @Id
    private Long userId;
    private String commercialCode;

}