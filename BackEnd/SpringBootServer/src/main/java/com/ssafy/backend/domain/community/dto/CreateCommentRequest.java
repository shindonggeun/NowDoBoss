package com.ssafy.backend.domain.community.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCommentRequest(
        @NotBlank(message = "내용을 입력해주세요")
        String content) {
}
