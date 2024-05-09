package com.ssafy.backend.domain.commercial.dto.response;

public record CommercialRentResponse(
        Integer total,
        Integer firstFloor,
        Integer otherFloor
) {
}
