package com.ssafy.backend.global.component.kafka.controller;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.kafka.service.KafkaStreamService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.state.QueryableStoreTypes;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/kafka")
public class KafkaStreamController {
    private final StreamsBuilderFactoryBean factoryBean;
    private final KafkaStreamService kafkaStreamService;

    @GetMapping("/count/{word}")
    public ResponseEntity<Message<Long>> getWordCount(@PathVariable String word) {
//        Long count = kafkaStreamService.getWordCount(word);
//        return ResponseEntity.ok().body(Message.success(count));
        KafkaStreams kafkaStreams =  factoryBean.getKafkaStreams();
        ReadOnlyKeyValueStore<String, Long> counts = kafkaStreams
                .store(StoreQueryParameters.fromNameAndType("counts", QueryableStoreTypes.keyValueStore()));
        return ResponseEntity.ok().body(Message.success(counts.get(word)));
    }
}
