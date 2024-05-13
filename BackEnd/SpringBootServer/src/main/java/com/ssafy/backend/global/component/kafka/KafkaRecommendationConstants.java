package com.ssafy.backend.global.component.kafka;

import lombok.Getter;

import java.util.UUID;

@Getter
public class KafkaRecommendationConstants {

    private static String name = UUID.randomUUID().toString(); // group id을 식별하기 위함
    public static final String GROUP_ID = name;
    public static final String KAFKA_TOPIC = "recommendation";
}
