package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.dto.CommunityListResponse;
import com.ssafy.backend.domain.community.dto.CommunityDetailResponse;

import java.util.List;

public interface CommunityCustomRepository {
    List<CommunityListResponse> selectCommunityList(String category, Long lastId);

    CommunityDetailResponse selectCommunity(Long communityId);
}
