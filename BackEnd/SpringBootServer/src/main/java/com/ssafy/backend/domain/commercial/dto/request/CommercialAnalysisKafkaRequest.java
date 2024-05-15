package com.ssafy.backend.domain.commercial.dto.request;

import java.time.LocalDateTime;

public record CommercialAnalysisKafkaRequest(
        String districtCodeName,
        String administrationCodeName,
        String commercialCodeName,
        String serviceCodeName,
        LocalDateTime createdAt
) {
    public CommercialAnalysisKafkaRequest(String districtCodeName, String administrationCodeName, String commercialCodeName, String serviceCodeName) {
        this(districtCodeName, administrationCodeName, commercialCodeName, serviceCodeName, LocalDateTime.now());  // 기본 생성자에서 현재 시간을 자동으로 설정
    }
}
