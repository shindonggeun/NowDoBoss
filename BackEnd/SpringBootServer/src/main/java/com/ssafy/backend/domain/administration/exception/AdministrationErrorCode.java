package com.ssafy.backend.domain.administration.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AdministrationErrorCode {
    NOT_SALES(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 행정동&업종의 매출 분석 데이터가 존재하지 않습니다."),
    NOT_INCOME(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 행정동의 지출 분석 데이터가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
