package com.ssafy.backend.domain.community.dto;

public record CommentListResponse(
        Long commentId,
        String content,
        Long writerId,
        String writerNickname,
        String writerProfileImage
) {
}
