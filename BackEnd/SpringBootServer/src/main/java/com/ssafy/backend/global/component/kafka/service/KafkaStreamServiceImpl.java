package com.ssafy.backend.global.component.kafka.service;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.state.QueryableStoreTypes;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaStreamServiceImpl implements KafkaStreamService {
    private final StreamsBuilderFactoryBean kafkaStreamsFactory;

    @Override
    public Long getWordCount(String word) {
        KafkaStreams streams = kafkaStreamsFactory.getKafkaStreams();
        StoreQueryParameters<ReadOnlyKeyValueStore<String, Long>> storeParams =
                StoreQueryParameters.fromNameAndType(
                        "CountsStore",
                        QueryableStoreTypes.keyValueStore());

        ReadOnlyKeyValueStore<String, Long> keyValueStore = streams.store(storeParams);
        return keyValueStore.get(word);
    }
}
