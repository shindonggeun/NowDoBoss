package com.ssafy.backend.domain.recommendation.dto.info;

public record ClosedRateCommercialInfo(
        Long myCloseRate,
        Long administrationCloseRate,
        Long otherClosedRate
){
}
