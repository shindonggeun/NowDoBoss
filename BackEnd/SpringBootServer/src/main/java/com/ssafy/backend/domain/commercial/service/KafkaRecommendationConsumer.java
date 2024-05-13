package com.ssafy.backend.domain.commercial.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.commercial.dto.response.CommercialKafkaInfo;
import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
class KafkaRecommendationConsumer {

    //private final ObjectMapper objectMapper;
    private final WebClient webClient;

    @KafkaListener(topics = KafkaChatConstants.KAFKA_TOPIC)
    public void sendMessage(String message) throws IOException {
        //CommercialKafkaInfo dto = objectMapper.readValue(message, CommercialKafkaInfo.class);
        //log.info("카프카 consumer: {}, {}, {} ", dto.userId(), dto.commercialCode(), dto.action());
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
