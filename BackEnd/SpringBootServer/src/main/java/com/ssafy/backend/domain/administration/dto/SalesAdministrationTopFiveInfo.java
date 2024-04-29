package com.ssafy.backend.domain.administration.dto;

import lombok.Builder;

@Builder
public record SalesAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Double monthSalesChangeRate
) {
}
