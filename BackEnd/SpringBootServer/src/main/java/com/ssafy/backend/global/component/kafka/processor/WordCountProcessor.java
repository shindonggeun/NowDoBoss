package com.ssafy.backend.global.component.kafka.processor;

import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisKafkaRequest;
import com.ssafy.backend.global.component.kafka.serde.JsonSerde;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
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

        // Set the window to start from the beginning of today and last for 24 hours
        TimeWindows dailyWindow = TimeWindows.ofSizeWithNoGrace(Duration.ofDays(1));

        // Apply windowed operation
        KTable<Windowed<String>, Long> wordCounts = messageStream
                .flatMapValues(this::extractAndCategorizeValues)
                .groupBy((key, word) -> word, Grouped.with(STRING_SERDE, STRING_SERDE))
                .windowedBy(dailyWindow)
                .count(Materialized.as("daily-ranking"));

        // 추출한 windowSize를 기반으로 Serde 생성
        long windowSize = Duration.ofDays(1).toMillis(); // 하루 단위의 밀리세컨드

        wordCounts.toStream()
                .to("daily-analysis-output", Produced.with(WindowedSerdes.timeWindowedSerdeFrom(String.class, windowSize), Serdes.Long()));
    }

    private List<String> extractAndCategorizeValues(CommercialAnalysisKafkaRequest value) {
        List<String> categorizedWords = new ArrayList<>();
        categorizedWords.add("District:" + value.districtCodeName());
        categorizedWords.add("Administration:" + value.administrationCodeName());
        categorizedWords.add("Commercial:" + value.commercialCodeName());
        categorizedWords.add("Service:" + value.serviceCodeName());
        return categorizedWords;
    }

}
