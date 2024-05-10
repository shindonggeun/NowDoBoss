package com.ssafy.backend.domain.simulation.dto.response;

public record SearchFranchiseeResponse(
        Long franchiseeId,
        String brandName,
        String serviceCode,
        String serviceCodeName
) {
}
