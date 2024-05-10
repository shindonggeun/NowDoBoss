package com.ssafy.backend.domain.community.dto.response;

import java.time.LocalDateTime;

public record CommentListResponse(
        Long commentId,
        String content,
        Long writerId,
        String writerNickname,
        String writerProfileImage,
        LocalDateTime createdAt
) {
}
