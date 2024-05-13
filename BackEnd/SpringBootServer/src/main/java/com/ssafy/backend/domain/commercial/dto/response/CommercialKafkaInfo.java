package com.ssafy.backend.domain.commercial.dto.response;

public record CommercialKafkaInfo(
        Long userId,
        String action,
        Long itemId,
        String commercialCode,
        Long timestamp
) {
}
