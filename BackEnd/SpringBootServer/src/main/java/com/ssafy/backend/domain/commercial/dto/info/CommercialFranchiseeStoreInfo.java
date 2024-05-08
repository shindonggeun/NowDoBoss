package com.ssafy.backend.domain.commercial.dto.info;

public record CommercialFranchiseeStoreInfo(
        Long normalStore,
        Long franchiseeStore,
        Double normalStorePercentage,
        Double franchiseePercentage
) {
}
