package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.response.PopularChatRoomResponse;

import java.util.List;

public interface CustomChatRoomMemberRepository {
    List<PopularChatRoomResponse> selectPopularChatRoom(String category);
}
