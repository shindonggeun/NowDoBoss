package com.ssafy.backend.domain.member.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode {

    EXIST_MEMBER_EMAIL(HttpStatus.CONFLICT, "이미 가입되어 있는 이메일입니다."),
    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
