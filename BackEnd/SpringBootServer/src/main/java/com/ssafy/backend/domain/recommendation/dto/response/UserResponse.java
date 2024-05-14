package com.ssafy.backend.domain.recommendation.dto.response;

public record UserResponse(
        Long userId,
        String commercialCode,
        Long totalTrafficFoot,
        Long totalSales,
        Double openedRate,
        Double closedRate,
        Long totalConsumption,
        Double finalRating
) {
}
