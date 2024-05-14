package com.ssafy.backend.global.common.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "data")
@Data
public class DataDocument {
    @Id
    private Long userId;
    private Long commercialCode;
    private String action;

    public DataDocument(Long userId, Long commercialCode, String action) {
        this.userId = userId;
        this.commercialCode = commercialCode;
        this.action = action;
    }
}