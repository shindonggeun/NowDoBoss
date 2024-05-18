package com.ssafy.backend.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import com.ssafy.backend.domain.district.service.DistrictService;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisKeyExpirationListener implements MessageListener {

    private final DistrictService districtService;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String expiredKey = message.toString();

        log.info("======================= Received expired key event for key: {}", expiredKey);
        // expiredKey를 기반으로 필요한 로직을 처리합니다.
        // 여기서는 예를 들어 "districts:top10" 키가 만료되었을 때 캐시를 다시 로드하는 경우를 가정합니다.
        if ("Contents::districts:top10".equals(expiredKey)) {
            log.info("======================= Reloading cache for key: {}", expiredKey);
            districtService.getTopTenDistricts(); // 캐시를 다시 로드합니다.
        }
    }
}
