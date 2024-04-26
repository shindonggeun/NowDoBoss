package com.ssafy.backend.domain.commercial.dto;

/**
 * 상권별 상주 인구 정보를 담는 DTO입니다.
 */
public record CommercialPopulationInfo(
        Long totalPopulation,
        Long teenPopulation,
        Long twentyPopulation,
        Long thirtyPopulation,
        Long fortyPopulation,
        Long fiftyPopulation,
        Long sixtyPopulation
) {
}
