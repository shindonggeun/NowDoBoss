package com.ssafy.backend.domain.simulation.dto.request;

public record SimulationRequest(
        // 프랜차이즈 여부
        // if 프랜차이즈 여부 true : 프랜차이즈 브랜드 명 존재
        // if 프랜차이즈 여부 false : 프랜차이즈 브랜드 명 null
        Boolean isFranchisee,
        String brandName,
        String gugun,

        // 업종 코드
        String serviceCode,

        // 업종
        String serviceCodeName,

        // 매장 크기
        int storeSize,

        // 층수 (FIRST_FLOOR, ETC)
        String floor
) {
}
