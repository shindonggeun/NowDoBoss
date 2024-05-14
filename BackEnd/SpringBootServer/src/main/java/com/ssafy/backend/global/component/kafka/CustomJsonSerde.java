package com.ssafy.backend.global.component.kafka;

import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

public class CustomJsonSerde<T> implements Serde<T> {
    private final JsonSerializer<T> serializer;
    private final JsonDeserializer<T> deserializer;

    public CustomJsonSerde(Class<T> targetType) {
        this.serializer = new JsonSerializer<>();
        this.deserializer = new JsonDeserializer<>(targetType);
        this.deserializer.setUseTypeMapperForKey(true);

        // Optional: Set custom configurations if needed
        serializer.setAddTypeInfo(false);
        deserializer.setRemoveTypeHeaders(false);
        deserializer.addTrustedPackages("*");
        deserializer.setUseTypeHeaders(false);
    }

    @Override
    public Serializer<T> serializer() {
        return serializer;
    }

    @Override
    public Deserializer<T> deserializer() {
        return deserializer;
    }
}
