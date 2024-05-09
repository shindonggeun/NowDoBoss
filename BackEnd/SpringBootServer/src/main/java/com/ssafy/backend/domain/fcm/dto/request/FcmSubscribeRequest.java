package com.ssafy.backend.domain.fcm.dto.request;

import lombok.Builder;

@Builder
public record FcmSubscribeRequest(
        String token,
        String topic
) { }
