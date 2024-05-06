package com.ssafy.backend.domain.recommendation.dto.info;

public record ClosedRateCommercialInfo(
        Double myClosedRate,
        Double administrationClosedRate,
        Double otherClosedRate
){
}
