package com.ssafy.backend.domain.commercial.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ConversionCodeRequest(
        @NotBlank(message = "지역구 코드를 입력해주세요")
        String districtCode,
        String administrationCode,
        String commercialCod
) {
}
