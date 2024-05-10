package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.response.CommentListResponse;
import com.ssafy.backend.domain.community.dto.request.UpdateCommentRequest;

import java.util.List;

public interface CommentService {
    Long createComment(Long memberId, Long communityId, String content);

    List<CommentListResponse> selectCommentList(Long communityId, Long lastId);

    void deleteComment(Long commentId);

    void updateComment(Long commentId, UpdateCommentRequest request);
}
