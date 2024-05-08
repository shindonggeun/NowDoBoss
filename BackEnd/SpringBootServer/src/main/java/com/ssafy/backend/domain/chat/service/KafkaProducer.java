package com.ssafy.backend.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    public void publishMessage(String topic, String message) {
        log.info("채팅 메시지 이벤트 생성 : {}", message);
        kafkaTemplate.send(topic, message);
    }

}
