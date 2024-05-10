package com.ssafy.backend.domain.simulation.dto.info;

import lombok.Builder;

@Builder
public record DetailInfo(
        // 첫 월 임대료, 단위: 만원 >> 상세내용, 내 매장 월 최소 목표 매출 사용
        long rentPrice,

        // 보증금, 단위: 만원
        long deposit, // >> 상세내용, 내 매장 월 최소 목표 매출 사용

        // 인테리어 비용, 단위: 만원
        Long interior,
        
        // 가맹 사업자 부담금, 단위: 만원
        Long levy

) {
}
