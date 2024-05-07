package com.ssafy.backend.domain.commercial.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class CommercialExceptionHandler {

    @ExceptionHandler(CoordinateTransformationException.class)
    public ResponseEntity<Message<String>> handleCoordinateTransformationException(CoordinateTransformationException ex) {
        log.error("좌표 변환 오류: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Message.fail("coordinateTransformationError", "좌표 변환 중 오류가 발생했습니다."));
    }
}
