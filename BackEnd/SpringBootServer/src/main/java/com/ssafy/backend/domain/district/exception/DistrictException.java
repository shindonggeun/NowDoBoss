package com.ssafy.backend.domain.district.exception;

import lombok.Getter;

@Getter
public class DistrictException extends RuntimeException {
    private final DistrictErrorCode errorCode;

    public DistrictException(DistrictErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
