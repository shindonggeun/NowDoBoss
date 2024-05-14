package com.ssafy.backend.domain.share.exception;

import lombok.Getter;

@Getter
public class ShareException extends RuntimeException {
    private final ShareErrorCode errorCode;

    public ShareException(ShareErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
