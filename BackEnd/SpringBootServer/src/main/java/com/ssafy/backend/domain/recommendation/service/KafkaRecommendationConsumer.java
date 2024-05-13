package com.ssafy.backend.domain.recommendation.service;

import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
import com.ssafy.backend.global.component.kafka.KafkaRecommendationConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
class KafkaRecommendationConsumer {

    private final WebClient webClient;

    @KafkaListener(topics = KafkaRecommendationConstants.KAFKA_TOPIC)
    public void sendMessage(String message) throws IOException {
        sendToFastAPI(message);
    }

    private void sendToFastAPI(String message) {
        // FastAPI 서버 URL 설정 - 로컬버전
        String fastApiUrl = "http://localhost:8000/data";

        webClient.post()
                .uri("fastApiUrl") // FastAPI의 특정 엔드포인트
                .body(Mono.just(message), String.class)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(response -> System.out.println("Response from FastAPI: " + response));
    }
}
