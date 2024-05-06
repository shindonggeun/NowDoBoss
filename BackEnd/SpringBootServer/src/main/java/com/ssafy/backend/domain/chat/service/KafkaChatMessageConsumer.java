package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.io.IOException;

@RequiredArgsConstructor
class KafkaChatMessageConsumer {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaChatConstants.KAFKA_TOPIC)
    public void sendMessage(String message) throws IOException {
        ChatMessageResponse chatMessage = objectMapper.readValue(message, ChatMessageResponse.class);
        simpMessagingTemplate.convertAndSend("/topic/public/rooms/"+chatMessage.getChatRoomId(), chatMessage);
    }
}
