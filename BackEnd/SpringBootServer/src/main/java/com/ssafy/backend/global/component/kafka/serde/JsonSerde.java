package com.ssafy.backend.global.component.kafka.serde;

import org.apache.kafka.common.serialization.Serde;

public class JsonSerde {
    public static <T> Serde<T> forType(Class<T> targetType) {
        return new CustomJsonSerde<>(targetType);
    }
}
