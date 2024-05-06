package com.ssafy.backend.domain.chat.dto.request;

import com.ssafy.backend.domain.community.entity.enums.Category;

public record ChatRoomRequest(
        String category,
        String name,
        String introduction

) {
}
