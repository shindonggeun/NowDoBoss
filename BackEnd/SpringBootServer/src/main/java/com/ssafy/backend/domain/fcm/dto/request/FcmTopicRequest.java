package com.ssafy.backend.domain.fcm.dto.request;

import lombok.Builder;

@Builder
public record FcmTopicRequest(
        String title,
        String body,
        String topicName
) { }
