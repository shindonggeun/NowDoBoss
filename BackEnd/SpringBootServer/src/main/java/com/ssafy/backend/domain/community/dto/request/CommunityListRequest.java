package com.ssafy.backend.domain.community.dto.request;

public record CommunityListRequest(
        String category,
        Long lastId
) {
}
