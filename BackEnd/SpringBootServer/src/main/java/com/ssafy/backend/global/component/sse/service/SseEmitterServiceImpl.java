package com.ssafy.backend.global.component.sse.service;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.kafka.dto.response.RankingResponse;
import com.ssafy.backend.global.component.kafka.service.KafkaStreamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseEmitterServiceImpl implements SseEmitterService {
    private final KafkaStreamService kafkaStreamService;
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    @Override
    public SseEmitter createEmitter() {
        String id = Long.toString(System.currentTimeMillis());
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(id, emitter);

        emitter.onCompletion(() -> emitters.remove(id));
        emitter.onTimeout(() -> emitters.remove(id));
        emitter.onError((e) -> emitters.remove(id));

        // Send initial data
        sendInitialData(emitter);

        return emitter;
    }

    @Override
    public void broadcastUpdates() {
        RankingResponse rankings = kafkaStreamService.getRankings();
        Message<RankingResponse> message = Message.success(rankings);
        emitters.forEach((id, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .data(message, MediaType.APPLICATION_JSON)
                        .id(Long.toString(System.currentTimeMillis()))
                        .name("ranking-update")
                        .reconnectTime(10000));
            } catch (IOException e) {
                log.error("Error broadcasting updates", e);
                emitter.completeWithError(e);
            }
        });
    }

    private void sendInitialData(SseEmitter emitter) {
        try {
            RankingResponse rankings = kafkaStreamService.getRankings();
            Message<RankingResponse> message = Message.success(rankings);
            emitter.send(message, MediaType.APPLICATION_JSON);
        } catch (IOException e) {
            log.error("Error sending initial data", e);
        }
    }


}
