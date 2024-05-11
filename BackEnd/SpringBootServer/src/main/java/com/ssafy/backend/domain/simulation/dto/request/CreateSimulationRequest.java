package com.ssafy.backend.domain.simulation.dto.request;

import com.ssafy.backend.domain.simulation.dto.info.*;

import java.util.List;

public record CreateSimulationRequest(
        Long totalPrice,
        Boolean isFranchisee,
        String brandName,
        String gugun,
        String serviceCode,
        String serviceCodeName,
        int storeSize,
        String floor
) {
}
