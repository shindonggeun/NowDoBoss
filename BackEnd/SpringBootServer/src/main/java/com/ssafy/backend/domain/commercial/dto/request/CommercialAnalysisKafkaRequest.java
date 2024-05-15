package com.ssafy.backend.domain.commercial.dto.request;

public record CommercialAnalysisKafkaRequest(
        String districtCodeName,
        String administrationCodeName,
        String commercialCodeName,
        String serviceCodeName
) {
}
