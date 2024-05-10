package com.ssafy.backend.domain.simulation.dto.response;

import com.ssafy.backend.domain.simulation.dto.info.SizeInfo;
import lombok.Builder;

@Builder
public record StoreResponse(
        SizeInfo small,
        SizeInfo medium,
        SizeInfo large
) {
}
