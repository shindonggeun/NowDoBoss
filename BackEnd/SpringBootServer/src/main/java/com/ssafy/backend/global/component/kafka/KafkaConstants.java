package com.ssafy.backend.global.component.kafka;

import lombok.Getter;

@Getter
public class KafkaConstants {
    public static final String KAFKA_TOPIC = "chat.room.message.sending";
    public static final String KAFKA_TOPIC_ANALYSIS = "commercial-analysis";
    public static final String KAFKA_TOPIC_RECOMMENDATION = "recommendation";
}
