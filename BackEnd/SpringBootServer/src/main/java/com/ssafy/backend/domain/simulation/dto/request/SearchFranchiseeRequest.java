package com.ssafy.backend.domain.simulation.dto.request;

public record SearchFranchiseeRequest(
        String keyword,
        Long lastId
) {
}
