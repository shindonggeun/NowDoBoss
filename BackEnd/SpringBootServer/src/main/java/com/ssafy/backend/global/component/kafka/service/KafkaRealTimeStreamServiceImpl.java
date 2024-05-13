//package com.ssafy.backend.global.component.kafka.service;
//
//import lombok.RequiredArgsConstructor;
//import org.apache.kafka.streams.KafkaStreams;
//import org.apache.kafka.streams.StoreQueryParameters;
//import org.apache.kafka.streams.state.QueryableStoreTypes;
//import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
//import org.springframework.kafka.config.StreamsBuilderFactoryBean;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class KafkaRealTimeStreamServiceImpl {
//    private final StreamsBuilderFactoryBean streamsBuilderFactoryBean;
//
//    public Long getRealTimeCount(String key) {
//        KafkaStreams kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();
//        if (kafkaStreams.state() == KafkaStreams.State.RUNNING) {
//            ReadOnlyKeyValueStore<String, Long> keyValueStore = kafkaStreams.store(
//                    StoreQueryParameters.fromNameAndType("aggStore", QueryableStoreTypes.keyValueStore())
//            );
//            return keyValueStore.get(key);
//        } else {
//            throw new IllegalStateException("Kafka Streams is not running. Current state: " + kafkaStreams.state());
//        }
//    }
//}
