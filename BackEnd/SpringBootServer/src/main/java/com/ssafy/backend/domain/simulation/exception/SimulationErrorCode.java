package com.ssafy.backend.domain.simulation.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SimulationErrorCode {
    NOT_EXIST_SERVICE(HttpStatus.NOT_FOUND, "해당 서비스를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
