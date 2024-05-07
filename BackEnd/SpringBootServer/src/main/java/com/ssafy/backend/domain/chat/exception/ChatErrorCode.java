package com.ssafy.backend.domain.chat.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ChatErrorCode {
    NOT_EXIST_CHAT_ROOM(HttpStatus.NOT_FOUND, "해당 채팅방을 찾을 수 없습니다."),
    INVALID_MESSAGE_TYPE(HttpStatus.NOT_FOUND, "메시지 타입이 잘못되었습니다."),
    SAVE_FAILED(HttpStatus.NOT_ACCEPTABLE, "메시지 저장 실패");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
