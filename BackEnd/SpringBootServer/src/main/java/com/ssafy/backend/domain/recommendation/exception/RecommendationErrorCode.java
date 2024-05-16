package com.ssafy.backend.domain.recommendation.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RecommendationErrorCode {
    EXIST_ANALYSIS(HttpStatus.CONFLICT, "이미 보관함에 저장되어 있는 추천 상권 데이터입니다."),
    JSON_PROCESSING(HttpStatus.CONFLICT, "JSON 역직렬화 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
