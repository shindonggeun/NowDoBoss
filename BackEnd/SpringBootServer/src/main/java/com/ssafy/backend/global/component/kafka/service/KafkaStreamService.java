package com.ssafy.backend.global.component.kafka.service;

import java.util.Map;

public interface KafkaStreamService {
    Map<String, Long> getAllCounts();
}
