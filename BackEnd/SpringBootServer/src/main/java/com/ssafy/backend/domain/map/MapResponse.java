package com.ssafy.backend.domain.map;

import java.util.List;
import java.util.Map;

public record MapResponse(
        Map<String, List<Double>> names,
        Map<String, List<List<Double>>> coords
) {
}
