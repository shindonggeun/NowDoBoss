package com.ssafy.backend.global.component.kafka;

import com.ssafy.backend.domain.commercial.dto.response.CommercialAnalysisResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class WordCountProcessor {
    private static final Serde<String> STRING_SERDE = Serdes.String();
    private static final Serde<CommercialAnalysisResponse> COMMERCIAL_ANALYSIS_RESPONSE_SERDE = JsonSerde.forType(CommercialAnalysisResponse.class);

    @Autowired
    void buildPipeline(StreamsBuilder streamsBuilder) {
        KStream<String, CommercialAnalysisResponse> messageStream = streamsBuilder
                .stream("commercial-analysis", Consumed.with(STRING_SERDE, COMMERCIAL_ANALYSIS_RESPONSE_SERDE));

        // Log or inspect each message
        messageStream.peek((key, value) -> log.info("Received message with key: {}, value: {}", key, value));

        KTable<String, Long> wordCounts = messageStream
                .flatMapValues(this::normalizeAndSplitFields)
                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
                .count(Materialized.as("counts"));

        wordCounts.toStream().to("commercial-word-count-output", Produced.with(STRING_SERDE, Serdes.Long()));
    }

    private List<String> normalizeAndSplitFields(CommercialAnalysisResponse value) {
        List<String> words = new ArrayList<>();
        words.add(value.districtCode());
        words.add(value.districtCodeName());
        words.add(value.administrationCode());
        words.add(value.administrationCodeName());
        words.add(value.commercialCode());
        words.add(value.commercialCodeName());
        words.add(value.serviceType().toString());
        words.add(value.serviceCode());
        words.add(value.serviceCodeName());
        return words;
    }

    private List<String> normalizeAndSplit(String text) {
        return Arrays.asList(text.toLowerCase().split("\\s+|,|\\.|;|:|\\(|\\)|\\[|\\]|!|\"|'"));
    }
}
