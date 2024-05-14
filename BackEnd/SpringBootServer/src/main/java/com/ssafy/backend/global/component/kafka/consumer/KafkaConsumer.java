package com.ssafy.backend.global.component.kafka.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.commercial.dto.response.CommercialKafkaInfo;
import com.ssafy.backend.global.common.document.DataDocument;
import com.ssafy.backend.global.common.repository.DataRepository;
import com.ssafy.backend.global.component.kafka.KafkaConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ObjectMapper objectMapper;
    private final DataRepository dataRepository;

    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC)
    public void handleChatMessage(String message) throws IOException {
        log.info("채팅 메시지 이벤트 수신 : {}", message);
        ChatMessageResponse chatMessage = objectMapper.readValue(message, ChatMessageResponse.class);
        log.info("변환 후 채팅 메시지 이벤트 수신 : {}", chatMessage);
        simpMessagingTemplate.convertAndSend("/topic/public/rooms/" + chatMessage.getChatRoomId(), chatMessage);
    }

    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC_ANALYSIS)
    public void handleCommercialAnalysis(String message) {
        log.info("상업 분석 메시지 수신 : {}", message);
        // TODO: 추가적인 로직 구현

    }

    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC_RECOMMENDATION)
    public void handleRecommendationInfo(String message) throws IOException {
        log.info("추천 보관함 저장 메시지 이벤트 수신 : {}", message);
        CommercialKafkaInfo commercialKafkaInfo = objectMapper.readValue(message, CommercialKafkaInfo.class);
        DataDocument dataDocument = new DataDocument(commercialKafkaInfo.userId(), Long.parseLong(commercialKafkaInfo.commercialCode()), "save");
        dataRepository.save(dataDocument);
//        // FastAPI 서버 URL 설정 - 로컬버전
//        String fastApiUrl = "http://localhost:8000/data";
//
//        WebClient webClient = WebClient.create();
//
//        webClient.post()
//                .uri(fastApiUrl) // 변수 참조를 정확하게 하여 FastAPI 엔드포인트 설정
//                .contentType(MediaType.APPLICATION_JSON) // 콘텐츠 타입을 JSON으로 설정
//                .body(Mono.just(message), String.class) // 문자열 데이터를 Mono로 감싸 전송
//                .retrieve() // 응답 결과를 받아 처리
//                .bodyToMono(String.class) // 응답을 문자열로 변환
//                .subscribe(response -> System.out.println("Response from FastAPI: " + response)); // 응답 출력

    }
}