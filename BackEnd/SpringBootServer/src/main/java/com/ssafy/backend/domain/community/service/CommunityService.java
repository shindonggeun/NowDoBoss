package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.request.CommunityListRequest;
import com.ssafy.backend.domain.community.dto.request.CreateCommunityRequest;
import com.ssafy.backend.domain.community.dto.request.UpdateCommunityRequest;
import com.ssafy.backend.domain.community.dto.response.CommunityDetailResponse;
import com.ssafy.backend.domain.community.dto.response.CommunityListResponse;
import com.ssafy.backend.domain.community.dto.response.PopularCommunityListResponse;

import java.util.List;

public interface CommunityService {
    Long createCommunity(Long memberId, CreateCommunityRequest request);

    List<CommunityListResponse> selectCommunityList(CommunityListRequest request);
    List<PopularCommunityListResponse> selectPopularCommunityList();
    CommunityDetailResponse selectCommunity(Long communityId);

    void updateCommunity(Long communityId, UpdateCommunityRequest request);

    void deleteCommunity(Long communityId);
}
