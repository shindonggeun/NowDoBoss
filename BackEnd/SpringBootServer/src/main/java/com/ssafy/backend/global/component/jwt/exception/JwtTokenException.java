package com.ssafy.backend.global.component.jwt.exception;

import lombok.Getter;

@Getter
public class JwtTokenException extends RuntimeException {

    private final JwtTokenErrorCode errorCode;

    public JwtTokenException(JwtTokenErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
