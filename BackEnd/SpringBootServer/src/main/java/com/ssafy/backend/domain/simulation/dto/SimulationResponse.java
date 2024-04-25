package com.ssafy.backend.domain.simulation.dto;

import lombok.Builder;

@Builder
public record SimulationResponse(
        // 전체 비용
        Long totalPrice,

        // 권리금 발생 비율, 권리금 수준 평균, 권리금 m² 평균

        // 상세 내용
        DetailInfo detail,

        // 월 최소 목표 매출
        // 보증금
        // 임대료

        // 고객 남녀, 연령대별 분석
        // 1, 2, 3 순위 30대 남성
        GenderAndAgeAnalysisInfo genderAndAgeAnalysisInfo,

        // 성수기, 비성수기
        MonthAnalysisInfo monthAnalysisInfo
) {
}
