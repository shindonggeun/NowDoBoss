package com.ssafy.backend.domain.simulation.dto;

public record FranchiseeInfo(
        // 단위: 원
        int totalPrice,
        String brandName,

        // 단위: 원
        int subscription,

        // 단위: 원
        int education,

        // 단위: 원
        int deposit,

        // 단위: 원
        int etc,

        // 단위: 원
        int interior
) {
}