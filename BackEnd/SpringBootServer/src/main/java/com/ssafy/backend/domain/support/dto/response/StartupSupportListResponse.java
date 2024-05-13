package com.ssafy.backend.domain.support.dto.response;


import com.ssafy.backend.domain.support.entity.StartupSupport;

public record StartupSupportListResponse(
        Long id,
        String type,
        String applicationPeriod,
        String receivingInstitution,
        String detailPageLink
) {
}
