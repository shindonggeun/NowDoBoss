package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.dto.response.CommentListResponse;

import java.util.List;

public interface CommentCustomRepository {
    List<CommentListResponse> selectCommentList(Long communityId, Long lastId);
}
