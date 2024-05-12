package com.ssafy.backend.domain.commercial.dto.response;

import com.ssafy.backend.domain.district.entity.enums.ServiceType;

import java.time.LocalDateTime;

public record CommercialAnalysisResponse(
        String districtCode,
        String districtCodeName,
        String administrationCode,
        String administrationCodeName,
        String commercialCode,
        String commercialCodeName,
        ServiceType serviceType,
        String serviceCode,
        String serviceCodeName,
        LocalDateTime createdAt
) {
}
