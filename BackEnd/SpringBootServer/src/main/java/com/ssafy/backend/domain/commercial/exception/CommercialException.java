package com.ssafy.backend.domain.commercial.exception;

import lombok.Getter;

@Getter
public class CommercialException extends RuntimeException {
    private final CommercialErrorCode errorCode;

    public CommercialException(CommercialErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
