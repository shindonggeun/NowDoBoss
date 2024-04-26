package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.*;

import java.util.List;

public interface CommunityService {
    Long createCommunity(Long memberId, CreateCommunityRequest request);

    List<CommunityListResponse> selectCommunityList(CommunityListRequest request);

    CommunityDetailResponse selectCommunity(Long communityId);

    void updateCommunity(Long communityId, UpdateCommunityRequest request);

    void deleteCommunity(Long communityId);
}
