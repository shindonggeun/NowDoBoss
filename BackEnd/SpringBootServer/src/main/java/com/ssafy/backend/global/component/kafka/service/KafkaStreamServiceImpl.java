package com.ssafy.backend.global.component.kafka.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.state.KeyValueIterator;
import org.apache.kafka.streams.state.QueryableStoreTypes;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaStreamServiceImpl implements KafkaStreamService {
    private final StreamsBuilderFactoryBean factoryBean;

    @Override
    public Map<String, Long> getAllCounts() {
        KafkaStreams kafkaStreams = factoryBean.getKafkaStreams();
        ReadOnlyKeyValueStore<String, Long> counts = kafkaStreams.store(
                StoreQueryParameters.fromNameAndType("counts", QueryableStoreTypes.keyValueStore())
        );

        Map<String, Long> allCounts = new HashMap<>();
        KeyValueIterator<String, Long> iter = counts.all();
        while (iter.hasNext()) {
            KeyValue<String, Long> entry = iter.next();
            allCounts.put(entry.key, entry.value);
        }
        iter.close();
        return allCounts;
    }
}
