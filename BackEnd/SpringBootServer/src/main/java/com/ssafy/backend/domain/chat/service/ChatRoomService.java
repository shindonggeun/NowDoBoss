package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;

import java.util.List;

public interface ChatRoomService {
    List<ChatRoomListResponse> selectChatRooms(Long memberId, Long lastId);
    Long createChatRoom(Long memberId, ChatRoomRequest request);
}
