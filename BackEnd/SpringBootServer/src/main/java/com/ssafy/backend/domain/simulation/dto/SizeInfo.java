package com.ssafy.backend.domain.simulation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SizeInfo {
    private int squareMeter;
    private int pyeong;

    @Builder
    public SizeInfo(int squareMeter) {
        this.squareMeter = squareMeter;
        this.pyeong = (int) (0.3025 * squareMeter);
    }
}
