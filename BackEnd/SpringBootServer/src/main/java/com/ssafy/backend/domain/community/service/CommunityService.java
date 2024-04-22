package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.CreateCommunityRequest;

public interface CommunityService {
    Long createCommunity(Long memberId, CreateCommunityRequest request);
}
