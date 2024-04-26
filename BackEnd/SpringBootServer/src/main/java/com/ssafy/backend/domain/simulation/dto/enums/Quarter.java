package com.ssafy.backend.domain.simulation.dto.enums;

import com.ssafy.backend.domain.simulation.exception.SimulationErrorCode;
import com.ssafy.backend.domain.simulation.exception.SimulationException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum Quarter {
    FIRST_QUARTER(1, List.of(3, 4, 5)),
    SECOND_QUARTER(2, List.of(6, 7, 8)),
    THIRD_QUARTER(3, List.of(9, 10, 11)),
    FOURTH_QUARTER(4, List.of(12, 1, 2));

    private final int quarterNumber;
    private final List<Integer> months;

    public static List<Integer> fromQuarterNumber(int quarterNumber) {
        Quarter quarter = Arrays.stream(Quarter.values())
                .filter(s -> s.quarterNumber == quarterNumber)
                .findAny().orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_BRAND));
        return quarter.months;
    }
}
