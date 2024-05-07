package com.ssafy.backend.domain.chat.dto.request;

public record MyChatRoomListRequest(
        String keyword,
        Long lastId
) {
}
