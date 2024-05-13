//package com.ssafy.backend.global.config;
//
//import org.apache.kafka.common.serialization.Serdes;
//import org.apache.kafka.streams.StreamsBuilder;
//import org.apache.kafka.streams.kstream.KStream;
//import org.apache.kafka.streams.kstream.KTable;
//import org.apache.kafka.streams.kstream.Materialized;
//import org.apache.kafka.streams.state.Stores;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.annotation.EnableKafkaStreams;
//
//@Configuration
//@EnableKafkaStreams
//public class KafkaStreamsConfig {
//
//    @Bean
//    public KStream<String, String> kStream(StreamsBuilder builder) {
//        KStream<String, String> sourceStream = builder.stream("commercial-analysis");
//
//        KTable<String, Long> aggregatedStream = sourceStream
//                .groupBy((key, value) -> value)
//                .count(Materialized.<String, Long>as(Stores.inMemoryKeyValueStore("aggStore"))
//                        .withKeySerde(Serdes.String())
//                        .withValueSerde(Serdes.Long()));
//
//        aggregatedStream.toStream().to("aggregated-commercial-output");
//
//        return sourceStream;
//    }
//}
