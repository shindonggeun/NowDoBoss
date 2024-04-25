package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record SalesAdministrationTopFiveInfo(
        String administrationCode,
        String administrationCodeName,
        Long monthSales
) {
    public SalesAdministrationTopFiveInfo(String administrationCode, String administrationCodeName, Long monthSales) {
        this.administrationCode = administrationCode;
        this.administrationCodeName = administrationCodeName;
        this.monthSales = monthSales;
    }
}
