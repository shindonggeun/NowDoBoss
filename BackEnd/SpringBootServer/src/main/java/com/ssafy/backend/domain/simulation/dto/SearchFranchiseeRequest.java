package com.ssafy.backend.domain.simulation.dto;

public record SearchFranchiseeRequest(
        String keyword,
        Long lastId
) {
}
