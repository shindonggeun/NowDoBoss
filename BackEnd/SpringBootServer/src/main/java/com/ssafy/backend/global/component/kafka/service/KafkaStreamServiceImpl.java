package com.ssafy.backend.global.component.kafka.service;

import com.ssafy.backend.global.component.kafka.dto.info.RankingDataInfo;
import com.ssafy.backend.global.component.kafka.dto.response.RankingResponse;
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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaStreamServiceImpl implements KafkaStreamService {
    private final StreamsBuilderFactoryBean factoryBean;

    @Override
    public RankingResponse getRankings() {
        KafkaStreams kafkaStreams = factoryBean.getKafkaStreams();
        ReadOnlyKeyValueStore<String, Long> countsStore = kafkaStreams.store(
                StoreQueryParameters.fromNameAndType("analysis-ranking", QueryableStoreTypes.keyValueStore())
        );

        LocalDate today = LocalDate.now();
        String todayStr = today.format(DateTimeFormatter.ofPattern("yyyyMMdd")); // 날짜를 문자열로 변환

        Map<String, List<RankingDataInfo>> rankingsMap = new HashMap<>();
        rankingsMap.put("District", new ArrayList<>());
        rankingsMap.put("Administration", new ArrayList<>());
        rankingsMap.put("Commercial", new ArrayList<>());
        rankingsMap.put("Service", new ArrayList<>());

        KeyValueIterator<String, Long> iter = countsStore.all();
        while (iter.hasNext()) {
            KeyValue<String, Long> entry = iter.next();
            log.info(entry.toString());
            if (entry.key.endsWith(todayStr)) { // 키 끝부분에 오늘 날짜가 있는지 확인
                String[] parts = entry.key.split(":", 3); // 키를 ":"로 분리
                if (parts.length == 3) {
                    rankingsMap.get(parts[0]).add(new RankingDataInfo(parts[1], entry.value));
                }
            }
//            String[] parts = entry.key.split(":", 2);
//            if (parts.length == 2) {
//                rankingsMap.get(parts[0]).add(new RankingDataInfo(parts[1], entry.value));
//            }
        }
        iter.close();

        // Sorting in descending order and returning the rankings
        return new RankingResponse(
                sortDescending(rankingsMap.get("District")),
                sortDescending(rankingsMap.get("Administration")),
                sortDescending(rankingsMap.get("Commercial")),
                sortDescending(rankingsMap.get("Service"))
        );
    }

    private List<RankingDataInfo> sortDescending(List<RankingDataInfo> data) {
        data.sort((o1, o2) -> Long.compare(o2.count(), o1.count()));
        return data;
    }
}
