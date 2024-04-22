package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.CommunityListRequest;
import com.ssafy.backend.domain.community.dto.CommunityListResponse;
import com.ssafy.backend.domain.community.dto.CreateCommunityRequest;

import java.util.List;

public interface CommunityService {
    Long createCommunity(Long memberId, CreateCommunityRequest request);

    List<CommunityListResponse> selectCommunityList(CommunityListRequest request);
}
