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
                .flatMapValues(this::extractAndCategorizeValues)
                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
                .count(Materialized.as("ranking"));

        wordCounts.toStream().to("commercial-analysis-output", Produced.with(STRING_SERDE, Serdes.Long()));
    }

    private List<String> extractAndCategorizeValues(CommercialAnalysisResponse value) {
        List<String> categorizedWords = new ArrayList<>();
        categorizedWords.add("District:" + value.districtCodeName());
        categorizedWords.add("Administration:" + value.administrationCodeName());
        categorizedWords.add("Commercial:" + value.commercialCodeName());
        categorizedWords.add("Service:" + value.serviceCodeName());
        return categorizedWords;
    }

}
