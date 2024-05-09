package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.response.ChatRoomResponse;

import java.util.List;

public interface CustomChatRoomMemberRepository {
    List<ChatRoomResponse> selectPopularChatRoom(String category);
}
