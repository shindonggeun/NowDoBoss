package com.ssafy.backend.domain.administration.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AdministrationExceptionHandler {

    @ExceptionHandler(AdministrationException.class)
    public ResponseEntity<Message<Void>> administrationException(AdministrationException e) {
        log.error("행정동 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getMessage()));
    }
}
