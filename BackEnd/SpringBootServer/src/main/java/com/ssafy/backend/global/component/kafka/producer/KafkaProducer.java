package com.ssafy.backend.global.component.kafka.producer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    /**
     * 제네릭 DTO 타입을 주어진 카프카 토픽으로 발송합니다.
     * @param topic 발송할 메시지의 토픽
     * @param data 발송할 DTO 객체
     * @param <T> DTO의 타입
     */
    public <T> void publish(String topic, T data) {
        log.info("카프카 이벤트 생성 및 발송: 토픽 = {}, 데이터 타입 = {}", topic, data.getClass().getSimpleName());
        kafkaTemplate.send(topic, data);
    }
}
