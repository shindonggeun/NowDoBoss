package com.ssafy.backend.domain.district.entity.enums;

public enum ServiceType {
    RESTAURANT, ACADEMY, LEISURE, SERVICE, RETAIL, HOUSEHOLDS;

    public static ServiceType fromName(String roleName) {
        return ServiceType.valueOf(roleName.toUpperCase());
    }
}
