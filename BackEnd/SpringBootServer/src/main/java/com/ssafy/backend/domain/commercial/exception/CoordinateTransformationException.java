package com.ssafy.backend.domain.commercial.exception;

public class CoordinateTransformationException extends RuntimeException {
    public CoordinateTransformationException(String message) {
        super(message);
    }

    public CoordinateTransformationException(String message, Throwable cause) {
        super(message, cause);
    }
}
