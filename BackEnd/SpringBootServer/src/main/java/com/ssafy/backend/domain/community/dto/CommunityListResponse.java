package com.ssafy.backend.domain.community.dto;

import com.ssafy.backend.domain.community.entity.enums.Category;

public record CommunityListResponse (
        Long communityId,
        Category category,
        String title,
        String content,
        String writerNickname,
        int readCount,
        int commentCount
) {

    public CommunityListResponse(Long communityId, Category category, String title, String content, String writerNickname, int readCount, int commentCount) {
        this.communityId = communityId;
        this.category = category;
        this.title = title;

        if (!content.isBlank()) {
            content = content.substring(0, Math.min(content.length(), 50));
        }

        this.content = content;
        this.writerNickname = writerNickname;
        this.readCount = readCount;
        this.commentCount = commentCount;
    }
}
