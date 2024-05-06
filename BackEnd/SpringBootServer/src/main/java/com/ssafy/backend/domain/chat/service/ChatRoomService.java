package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.ChatRoomRequest;

public interface ChatRoomService {
    Long createChatRoom(ChatRoomRequest request);
}
