package com.ssafy.backend.domain.commercial.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommercialErrorCode {

    NOT_SALES(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권&업종의 매출분석 데이터가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
