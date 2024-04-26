package com.ssafy.backend.domain.simulation.dto;

import lombok.Builder;

@Builder
public record DetailInfo(
        // 첫 월 임대료 >> 상세내용, 내 매장 월 최소 목표 매출 사용
        int rentPrice,

        // 보증금
        int deposit, // >> 상세내용, 내 매장 월 최소 목표 매출 사용

        // 인테리어 비용
        Long interior,
        
        // 가맹 사업자 부담금
        Long levy

) {
}
