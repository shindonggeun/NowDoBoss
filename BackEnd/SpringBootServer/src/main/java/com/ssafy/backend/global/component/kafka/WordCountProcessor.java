package com.ssafy.backend.global.component.kafka;

import com.ssafy.backend.domain.commercial.dto.response.CommercialAnalysisResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Slf4j
@Component
public class WordCountProcessor {
    private static final Serde<String> STRING_SERDE = Serdes.String();
    private static final Serde<CommercialAnalysisResponse> COMMERCIAL_ANALYSIS_RESPONSE_SERDE = JsonSerdes.forType(CommercialAnalysisResponse.class);

    @Autowired
    void buildPipeline(StreamsBuilder streamsBuilder) {
//        KStream<String, String> messageStream = streamsBuilder
//                .stream("commercial-analysis", Consumed.with(STRING_SERDE, STRING_SERDE));
//
//        KTable<String, Long> wordCounts = messageStream
//                .mapValues(value -> value.toLowerCase())
//                .flatMapValues(value -> Arrays.asList(value.split("\\W+")))
//                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
//                .count(Materialized.as("counts")); // Materialized를 통해 명시적으로 state store 생성
//
//        wordCounts.toStream().to("commercial-word-count-output");

        KStream<String, CommercialAnalysisResponse> messageStream = streamsBuilder
                .stream("commercial-analysis", Consumed.with(STRING_SERDE, COMMERCIAL_ANALYSIS_RESPONSE_SERDE));

        KTable<String, Long> wordCounts = messageStream
                .flatMapValues(value -> Arrays.asList(
                        value.districtCode(),
                        value.districtCodeName(),
                        value.administrationCode(),
                        value.administrationCodeName(),
                        value.commercialCode(),
                        value.commercialCodeName()
                ))
                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
                .count(Materialized.as("counts"));

        wordCounts.toStream().to("commercial-word-count-output", Produced.with(STRING_SERDE, Serdes.Long()));
    }
}
