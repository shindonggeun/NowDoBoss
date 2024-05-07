package com.ssafy.backend.domain.chat.dto.request;

public record CreateChatRoomRequest(
        String category,
        String name,
        String introduction

) {
}
