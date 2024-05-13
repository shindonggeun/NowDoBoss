package com.ssafy.backend.domain.simulation.dto.request;

import jakarta.validation.constraints.NotBlank;

public record SearchFranchiseeRequest(
        String keyword,
        @NotBlank
        String serviceCode,
        Long lastId
) {
}
