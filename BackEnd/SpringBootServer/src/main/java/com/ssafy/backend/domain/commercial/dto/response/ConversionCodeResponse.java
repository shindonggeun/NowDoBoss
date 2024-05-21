package com.ssafy.backend.domain.commercial.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversionCodeResponse {
    private String districtCode;
    private String districtCodeName;

    private String administrationCode;
    private String administrationCodeName;

    private String commercialCod;
    private String commercialCodName;
}