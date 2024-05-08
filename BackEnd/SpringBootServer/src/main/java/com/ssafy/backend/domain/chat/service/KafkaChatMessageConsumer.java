package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
class KafkaChatMessageConsumer {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaChatConstants.KAFKA_TOPIC)
    public void sendMessage(String message) throws IOException {
        log.info("채팅 메시지 이벤트 수신 : {}", message);

        ChatMessageResponse chatMessage = objectMapper.readValue(message, ChatMessageResponse.class);

        log.info("변환 후 채팅 메시지 이벤트 수신 : {}", chatMessage);

        simpMessagingTemplate.convertAndSend("/topic/public/rooms/"+chatMessage.getChatRoomId(), chatMessage);
    }
}
