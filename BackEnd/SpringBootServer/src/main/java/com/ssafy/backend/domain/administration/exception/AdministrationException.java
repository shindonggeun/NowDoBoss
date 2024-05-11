package com.ssafy.backend.domain.administration.exception;

import lombok.Getter;

@Getter
public class AdministrationException extends RuntimeException {
    private final AdministrationErrorCode errorCode;

    public AdministrationException(AdministrationErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
