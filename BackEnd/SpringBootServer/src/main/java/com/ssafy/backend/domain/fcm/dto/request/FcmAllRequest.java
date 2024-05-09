package com.ssafy.backend.domain.fcm.dto.request;

import lombok.Builder;

@Builder
public record FcmAllRequest(
        String title,
        String body
) { }
