package com.ssafy.backend.domain.simulation.dto;

import lombok.Builder;

@Builder
public record StoreResponse(
        SizeInfo small,
        SizeInfo medium,
        SizeInfo large
) {
}
