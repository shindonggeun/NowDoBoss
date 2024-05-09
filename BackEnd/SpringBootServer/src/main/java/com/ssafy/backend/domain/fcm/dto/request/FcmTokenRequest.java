package com.ssafy.backend.domain.fcm.dto.request;

import lombok.Builder;

@Builder
public record FcmTokenRequest(
        String title,
        String body,
        Long memberId
) { }
