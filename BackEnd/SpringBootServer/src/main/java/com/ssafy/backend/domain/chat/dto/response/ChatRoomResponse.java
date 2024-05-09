package com.ssafy.backend.domain.chat.dto.response;

import com.ssafy.backend.domain.community.entity.enums.Category;

public record ChatRoomResponse(
        Long chatRoomId,
        Category category,
        String name,
        String introduction,
        int memberCount,
        int limit
) {
}
