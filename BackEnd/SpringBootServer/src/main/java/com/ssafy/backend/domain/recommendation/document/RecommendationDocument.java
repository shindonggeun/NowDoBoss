package com.ssafy.backend.domain.recommendation.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;


@Document(collection = "recommendation")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendationDocument {
    @Id
    private Long userId;
    private String commercialCode;
    private String commercialCodeName;
    private String districtCode;
    private String districtCodeName;
    private String administrationCode;
    private String administrationCodeName;
    @CreatedDate
    private LocalDateTime createdAt;

}