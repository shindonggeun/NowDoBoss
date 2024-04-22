package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.dto.CommunityListResponse;

import java.util.List;

public interface CommunityCustomRepository {
    List<CommunityListResponse> selectCommunityList(String category, Long lastId);
}
