package com.ssafy.backend.domain.simulation.dto;

public record CreateSimulationRequest(
        // 프랜차이즈 여부
        // if 프랜차이즈 여부 true : 프랜차이즈 브랜드 명
        // if 프랜차이즈 여부 false : 프랜차이즈 브랜드 명 null
        boolean isFranchisee,
        String brandName,

        // 위치 (시 구 동)
        LocationInfo location,

        // 업종 코드
        String serviceCode,

        // 업종
        String serviceCodeName,

        // 매장 크기
        int storeSize,

        // 층수 (1층, 1층 이외)
        String floor
) {
}
