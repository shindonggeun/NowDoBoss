package com.ssafy.backend.domain.community.dto;

public record CommunityListRequest(
        String category,
        Long lastId
) {
}
