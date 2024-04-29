package com.ssafy.backend.domain.map;

import java.util.List;
import java.util.Map;

public record MapResponse(
        List<String> codes,
        Map<String, List<List<Double>>> coords
) {
}
