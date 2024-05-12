package com.ssafy.backend.domain.commercial.dto.request;

import com.ssafy.backend.domain.district.entity.enums.ServiceType;

public record CommercialAnalysisSaveRequest(
        String districtCode,
        String districtCodeName,
        String administrationCode,
        String administrationCodeName,
        String commercialCode,
        String commercialCodeName,
        ServiceType serviceType,
        String serviceCode,
        String serviceCodeName
) {
}
