package com.ssafy.backend.domain.community.dto;

import com.ssafy.backend.domain.community.entity.Community;
import com.ssafy.backend.domain.community.entity.enums.Category;

import java.util.List;

public record CreateCommunityRequest(

        Category category,
        String title,
        String content,
        List<String> images
) {
    public Community toEntity() {
        return Community.builder()
                .category(category)
                .title(title)
                .content(content)
                .build();
    }

}
