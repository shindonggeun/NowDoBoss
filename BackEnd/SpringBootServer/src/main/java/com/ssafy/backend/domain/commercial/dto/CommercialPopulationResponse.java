package com.ssafy.backend.domain.commercial.dto;

/**
 * 최종 사용자에게 반환될 상주 인구 응답 DTO입니다.
 */
public record CommercialPopulationResponse(
        CommercialPopulationInfo populationInfo,
        Double malePercentage, // 남성 상주인구 퍼센트
        Double femalePercentage // 여성 상주인구 퍼센트
) {
}
