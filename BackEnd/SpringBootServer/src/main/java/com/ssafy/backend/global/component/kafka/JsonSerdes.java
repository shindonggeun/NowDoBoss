package com.ssafy.backend.global.component.kafka;

import org.apache.kafka.common.serialization.Serde;
import org.springframework.kafka.support.serializer.JsonSerde;

public class JsonSerdes {
    // Generic method to create a JsonSerde for any type
    public static <T> Serde<T> forType(Class<T> targetType) {
        return new CustomJsonSerde<>(targetType);
    }
}
