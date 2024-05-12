package com.ssafy.backend.global.component.kafka.producer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    /**
     * 메시지를 주어진 카프카 토픽으로 발송합니다.
     * @param topic 발송할 메시지의 토픽
     * @param message 발송할 메시지 내용
     */
    public void publish(String topic, String message) {
        log.info("카프카 이벤트 생성 및 발송: 토픽 = {}, 메시지 = {}", topic, message);
        kafkaTemplate.send(topic, message);
    }

}
