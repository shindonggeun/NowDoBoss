package com.ssafy.backend.global.component.kafka.controller;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.kafka.service.KafkaStreamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/kafka")
public class KafkaStreamController {
    private final KafkaStreamService kafkaStreamService;

    @GetMapping("/count")
    public ResponseEntity<Message<Map<String, Long>>> getWordCount() {
        Map<String, Long> counts = kafkaStreamService.getAllCounts();
        return ResponseEntity.ok().body(Message.success(counts));
    }
}
