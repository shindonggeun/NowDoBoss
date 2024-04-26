package com.ssafy.backend.domain.simulation.exception;

import lombok.Getter;

@Getter
public class SimulationException extends RuntimeException {
    private final SimulationErrorCode errorCode;

    public SimulationException(SimulationErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
