package com.ssafy.backend.domain.commercial.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommercialErrorCode {
    NOT_SALES(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권&업종의 매출 분석 데이터가 존재하지 않습니다."),
    NOT_FOOT_TRAFFIC(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권의 유동인구 데이터가 존재하지 않습니다."),
    NOT_POPULATION(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권의 상주 인구 데이터가 존재하지 않습니다."),
    NOT_FACILITY(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권의 집객 시설 데이터가 존재하지 않습니다."),
    NOT_STORE(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권&업종의 점포 분석 데이터가 존재하지 않습니다."),
    NOT_INCOME(HttpStatus.NOT_FOUND, "선택한 분기에 해당하는 상권의 지출 분석 데이터가 존재하지 않습니다."),
    EXIST_ANALYSIS(HttpStatus.CONFLICT, "이미 저장되어 있는 상권&업종의 상권분석 데이터입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
