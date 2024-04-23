package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.CommentListResponse;
import com.ssafy.backend.domain.community.dto.UpdateCommentRequest;

import java.util.List;

public interface CommentService {
    Long createComment(Long memberId, Long communityId, String content);

    List<CommentListResponse> selectCommentList(Long communityId, Long lastId);

    void deleteComment(Long commentId);

    void updateComment(Long commentId, UpdateCommentRequest request);
}
