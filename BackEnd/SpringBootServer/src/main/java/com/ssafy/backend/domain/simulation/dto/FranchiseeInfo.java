package com.ssafy.backend.domain.simulation.dto;

public record FranchiseeInfo(
        int totalPrice,
        String brandName,
        int subscription,
        int education,
        int deposit,
        int etc,
        int interior
) {
}