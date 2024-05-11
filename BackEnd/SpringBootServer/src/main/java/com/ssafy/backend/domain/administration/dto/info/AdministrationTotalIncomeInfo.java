package com.ssafy.backend.domain.administration.dto.info;

public record AdministrationTotalIncomeInfo(
        String administrationCode,
        String administrationCodeName,
        Long totalPrice
) {
}
