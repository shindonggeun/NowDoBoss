package com.ssafy.backend.domain.share.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ShareErrorCode {
    NOT_EXIST_SHARE(HttpStatus.NOT_FOUND, "해당 데이터를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
