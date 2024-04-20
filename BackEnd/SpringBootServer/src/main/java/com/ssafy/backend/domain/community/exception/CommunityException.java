package com.ssafy.backend.domain.community.exception;

import lombok.Getter;

@Getter
public class CommunityException extends RuntimeException {
    private final CommunityErrorCode errorCode;

    public CommunityException(CommunityErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
