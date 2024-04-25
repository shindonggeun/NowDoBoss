package com.ssafy.backend.domain.simulation.dto;

import com.ssafy.backend.domain.simulation.dto.enums.Quarter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MonthAnalysisInfo {
    private List<Integer> peakSeasons;
    private List<Integer> offPeakSeasons;

    @Builder
    public MonthAnalysisInfo(int peak, int offPeak) {
        this.peakSeasons = Quarter.fromQuarterNumber(peak);
        this.offPeakSeasons = Quarter.fromQuarterNumber(offPeak);
    }
}
