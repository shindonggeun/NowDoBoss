package com.ssafy.backend.domain.community.service;

public interface CommentService {
    Long createComment(Long memberId, Long communityId, String content);
}
