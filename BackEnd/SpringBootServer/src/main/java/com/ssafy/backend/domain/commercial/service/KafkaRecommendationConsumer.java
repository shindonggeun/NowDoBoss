package com.ssafy.backend.domain.commercial.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.commercial.dto.response.CommercialKafkaInfo;
import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
class KafkaRecommendationConsumer {

    private final ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaChatConstants.KAFKA_TOPIC)
    public void sendMessage(String message) throws IOException {
        CommercialKafkaInfo dto = objectMapper.readValue(message, CommercialKafkaInfo.class);
        log.info("카프카 consumer: {}, {}, {} ", dto.userId(), dto.commercialCode(), dto.action());
    }
}
