package com.ssafy.backend.global.common.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "data")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class DataDocument {
    @Id
    private Long userId;
    private Long commercialCode;
    private String action;

}