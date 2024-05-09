package com.ssafy.backend.domain.simulation.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SimulationErrorCode {
    NOT_EXIST_SERVICE(HttpStatus.NOT_FOUND, "해당 서비스를 찾을 수 없습니다."),
    NOT_EXIST_DISTRICT(HttpStatus.NOT_FOUND, "해당 자치구에 해당하는 임대료 데이터가 존재하지 않습니다."),
    NOT_EXIST_BRAND(HttpStatus.NOT_FOUND, "해당 브랜드를 찾을 수 없습니다."),
    NOT_EXIST_SALES(HttpStatus.NOT_FOUND, "해당 지역구, 업종에 해당하는 정보를 찾을 수 없습니다."),
    NOT_EXIST_QUARTER(HttpStatus.NOT_FOUND, "존재하지 않는 분기입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
