package com.ssafy.backend.domain.recommendation.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class RecommendationExceptionHandler {
    @ExceptionHandler(RecommendationException.class)
    public ResponseEntity<Message<Void>> commercialException(RecommendationException e) {
        log.error("상권 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getMessage()));
    }
}
