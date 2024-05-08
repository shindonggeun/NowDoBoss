package com.ssafy.backend.domain.commercial.dto.response;

public record CommercialStoreResponse(
        Long similarStore,
        Long franchiseStore,
        Long openedStore,
        Long closedStore

) {
}
