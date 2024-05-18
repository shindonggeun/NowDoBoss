package com.ssafy.backend.global.component.kafka.consumer;

import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisKafkaRequest;
import com.ssafy.backend.domain.commercial.dto.response.CommercialKafkaInfo;
import com.ssafy.backend.global.common.document.DataDocument;
import com.ssafy.backend.global.common.repository.DataRepository;
import com.ssafy.backend.global.component.kafka.KafkaConstants;
import com.ssafy.backend.global.component.kafka.dto.info.DataInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final DataRepository dataRepository;

    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC)
    public void handleChatMessage(ChatMessageResponse chatMessage) {
        log.info("채팅 메시지 이벤트 수신 : {}", chatMessage);
        simpMessagingTemplate.convertAndSend("/topic/public/rooms/" + chatMessage.getChatRoomId(), chatMessage);
    }

    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC_ANALYSIS)
    public void handleCommercialAnalysis(CommercialAnalysisKafkaRequest message) {
        log.info("상업 분석 메시지 수신 : {}", message);
    }

//    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC_DATA)
//    public void handleUserData(DataInfo message) {
//        log.info("상업 분석 메시지 수신 : {}", message);
////        if (!message.commercialCode().equals("0")) {
////            DataDocument dataDocument = DataDocument.builder()
////                    .userId(message.userId())
////                    .commercialCode(Long.parseLong(message.commercialCode()))
////                    .action(message.action())
////                    .build();
////            dataRepository.save(dataDocument);
////        }
//    }

}