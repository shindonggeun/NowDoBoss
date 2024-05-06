package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;

public interface ChatMessageService {
    void send(String topic, ChatMessageRequest request);
}
