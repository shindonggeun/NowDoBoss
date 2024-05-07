package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;

import java.util.List;

public interface ChatRoomCustomRepository {
    List<ChatRoomListResponse> selectChatRooms(Long memberId, Long lastId);
}
