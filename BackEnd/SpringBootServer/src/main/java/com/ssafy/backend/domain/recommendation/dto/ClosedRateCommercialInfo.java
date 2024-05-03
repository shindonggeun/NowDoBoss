package com.ssafy.backend.domain.recommendation.dto;

public record ClosedRateCommercialInfo(
        Long myCloseRate,
        Long administrationCloseRate,
        Long otherClosedRate
){
}
