package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatMessage;

import java.util.List;

public interface ChatMessageService {
    List<ChatMessageResponse> selectChatMessages(Long chatRoomId, Long lastId);
    void enter(String topic, ChatMessageRequest request);
    void send(String topic, ChatMessageRequest request);
    void processMessage(ChatMessage chatMessage);
}
