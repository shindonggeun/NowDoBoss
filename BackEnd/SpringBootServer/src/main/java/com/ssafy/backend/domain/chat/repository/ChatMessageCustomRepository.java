package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatRoom;

import java.util.List;

public interface ChatMessageCustomRepository {
    List<ChatMessageResponse> selectChatMessages(ChatRoom chatRoom, Long lastId);
}
