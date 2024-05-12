package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.backend.domain.chat.service.ChatMessageService;
import com.ssafy.backend.global.component.kafka.KafkaConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/message/{roomId}")
    public void sendMessage(@DestinationVariable Long roomId, @Payload ChatMessageRequest request) {
        chatMessageService.send(KafkaConstants.KAFKA_TOPIC, request);
    }
}
