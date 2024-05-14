package com.ssafy.backend.global.component.kafka.service;

import com.ssafy.backend.global.component.kafka.dto.response.RankingResponse;


public interface KafkaStreamService {
    RankingResponse getRankings();

}
