package com.ssafy.backend.domain.commercial.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ConversionCodeNameRequest(
        @NotBlank(message = "코드를 입력해주세요")
        String codeName,
        @NotBlank(message = "타입을 입력해주세요")
        String type
) {
}
