package com.ssafy.backend.global.component.kafka.service;

import com.ssafy.backend.global.component.kafka.dto.info.RankingDataInfo;
import com.ssafy.backend.global.component.kafka.dto.response.RankingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.kstream.Windowed;
import org.apache.kafka.streams.state.KeyValueIterator;
import org.apache.kafka.streams.state.QueryableStoreTypes;
import org.apache.kafka.streams.state.ReadOnlyWindowStore;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaStreamServiceImpl implements KafkaStreamService {
    private final StreamsBuilderFactoryBean factoryBean;

    @Override
    public RankingResponse getRankings() {
        KafkaStreams kafkaStreams = factoryBean.getKafkaStreams();

        // 시스템에 저장된 시간대로 설정
        ZoneId zoneId = ZoneId.systemDefault();

        // 어제 자정부터 오늘 자정까지 설정 -> 오늘 날짜 00시부터 23:59 윈도우 사이즈 지정
        LocalDateTime yesterdayMidnight = LocalDate.now(zoneId).minusDays(1).atStartOfDay();
        Instant startOfYesterday = yesterdayMidnight.atZone(zoneId).toInstant();

        LocalDateTime todayMidnight = LocalDate.now(zoneId).atStartOfDay();
        Instant endOfToday = todayMidnight.atZone(zoneId).toInstant();

        log.info("Fetching data from window store from {} to {}", startOfYesterday, endOfToday);


        ReadOnlyWindowStore<String, Long> windowStore = kafkaStreams.store(
                StoreQueryParameters.fromNameAndType("daily-ranking-stream", QueryableStoreTypes.windowStore())
        );

        Map<String, List<RankingDataInfo>> rankingsMap = new HashMap<>();
        rankingsMap.put("District", new ArrayList<>());
        rankingsMap.put("Administration", new ArrayList<>());
        rankingsMap.put("Commercial", new ArrayList<>());
        rankingsMap.put("Service", new ArrayList<>());

        KeyValueIterator<Windowed<String>, Long> iter = windowStore.fetchAll(startOfYesterday, endOfToday);

        while (iter.hasNext()) {
            KeyValue<Windowed<String>, Long> entry = iter.next();
            String key = entry.key.key();
            Long count = entry.value;

            log.info(entry.toString());

            String[] parts = key.split(":");
            if (parts.length == 2) {
                String category = parts[0];
                String name = parts[1];
                rankingsMap.get(category).add(new RankingDataInfo(name, count));
            }
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
