package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.district.entity.enums.ServiceType;

public interface ServiceCodeProjection {
    String getServiceCode();
    String getServiceCodeName();
    ServiceType getServiceType();
}
