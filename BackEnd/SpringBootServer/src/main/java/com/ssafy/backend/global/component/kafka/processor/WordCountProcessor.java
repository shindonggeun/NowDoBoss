package com.ssafy.backend.global.component.kafka.processor;

import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisKafkaRequest;
import com.ssafy.backend.domain.commercial.dto.response.CommercialAnalysisResponse;
import com.ssafy.backend.global.component.kafka.serde.JsonSerde;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class WordCountProcessor {
    private static final Serde<String> STRING_SERDE = Serdes.String();
    private static final Serde<CommercialAnalysisKafkaRequest> COMMERCIAL_ANALYSIS_RESPONSE_SERDE = JsonSerde.forType(CommercialAnalysisKafkaRequest.class);

    @Autowired
    void buildPipeline(StreamsBuilder streamsBuilder) {
        KStream<String, CommercialAnalysisKafkaRequest> messageStream = streamsBuilder
                .stream("commercial-analysis", Consumed.with(STRING_SERDE, COMMERCIAL_ANALYSIS_RESPONSE_SERDE));

        // Log or inspect each message
        messageStream.peek((key, value) -> log.info("Received message with key: {}, value: {}", key, value));

        LocalDate today = LocalDate.now(); // 오늘 날짜를 LocalDate 객체로 저장

        KTable<String, Long> wordCounts = messageStream
                .filter((key, value) -> value.createdAt().toLocalDate().isEqual(today))
                .flatMapValues(this::extractAndCategorizeValues)
                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
                .count(Materialized.as("analysis-ranking"));

        wordCounts.toStream().to("commercial-analysis-output", Produced.with(STRING_SERDE, Serdes.Long()));
    }

    private List<String> extractAndCategorizeValues(CommercialAnalysisKafkaRequest value) {
        List<String> categorizedWords = new ArrayList<>();
        categorizedWords.add("District:" + value.districtCodeName());
        categorizedWords.add("Administration:" + value.administrationCodeName());
        categorizedWords.add("Commercial:" + value.commercialCodeName());
        categorizedWords.add("Service:" + value.serviceCodeName());
        categorizedWords.add("CreateAt:" + value.createdAt());
        return categorizedWords;
    }

}
