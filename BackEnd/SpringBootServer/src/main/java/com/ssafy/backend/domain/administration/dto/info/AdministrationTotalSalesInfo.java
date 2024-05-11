package com.ssafy.backend.domain.administration.dto.info;

public record AdministrationTotalSalesInfo(
        String administrationCode,
        String administrationCodeName,
        Long totalSales
) {
}
