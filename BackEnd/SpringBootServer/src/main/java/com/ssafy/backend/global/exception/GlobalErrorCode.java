package com.ssafy.backend.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GlobalErrorCode {
    REDIS_CONNECTION_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "Redis 연결에 실패했습니다."),
    REDIS_NOT_TOKEN(HttpStatus.UNAUTHORIZED, "세션 유지에 필요한 리프레쉬 토큰이 발견되지 않았습니다. 안전한 서비스 이용을 위해 다시 로그인해주세요."),
    INVALID_EMAIL_VERIFICATION_CODE(HttpStatus.BAD_REQUEST, "이메일 인증코드를 잘못 입력하였습니다."),
    INVALID_EMAIL_ADDRESS(HttpStatus.BAD_REQUEST, "유효하지 않은 이메일 주소입니다.");

    private final HttpStatus httpStatus; // 에러 상황에 해당하는 HTTP 상태 코드
    private final String errorMessage; // 에러 상황을 설명하는 메시지
}
