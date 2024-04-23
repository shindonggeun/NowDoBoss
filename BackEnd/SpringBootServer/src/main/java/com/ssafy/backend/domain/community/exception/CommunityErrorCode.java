package com.ssafy.backend.domain.community.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommunityErrorCode {
    NOT_EXIST_COMMUNITY(HttpStatus.NOT_FOUND, "해당 커뮤니티 글을 찾을 수 없습니다."),
    NOT_EXIST_COMMENT(HttpStatus.NOT_FOUND, "해당 댓글을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
