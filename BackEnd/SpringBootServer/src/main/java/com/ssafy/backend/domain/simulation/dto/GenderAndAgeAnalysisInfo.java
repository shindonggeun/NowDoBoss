package com.ssafy.backend.domain.simulation.dto;

import com.ssafy.backend.domain.district.entity.SalesDistrict;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@NoArgsConstructor
public class GenderAndAgeAnalysisInfo {
    private static final int TEN_THOUSAND_MULTIPLIER = 10000;

    // 남성 매출 금액 비율
    private Float maleSalesPercent;
    // 여성 매출 금액 비율
    private Float femaleSalesPercent;
    // 1위 연령대
//    private String first;
    private Age first;

    // 2위 연령대
//    private String second;
    private Age second;

    // 3위 연령대
//    private String third;
    private Age third;

    @Builder
    private GenderAndAgeAnalysisInfo(Float maleSalesPercent, Float femaleSalesPercent, Age first, Age second, Age third) {
        this.maleSalesPercent = maleSalesPercent;
        this.femaleSalesPercent = femaleSalesPercent;
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public static GenderAndAgeAnalysisInfo create(SalesDistrict salesDistrict) {
        long totalSexSales = salesDistrict.getMaleSales() + salesDistrict.getFemaleSales();
        List<Age> ages = init(salesDistrict);
        Collections.sort(ages);

        return GenderAndAgeAnalysisInfo.builder()
                .maleSalesPercent((float) salesDistrict.getMaleSales() / totalSexSales * 100)
                .femaleSalesPercent((float) salesDistrict.getFemaleSales() / totalSexSales * 100)
                .first(ages.get(0))
                .second(ages.get(1))
                .third(ages.get(2))
                .build();
    }

    private static List<Age> init(SalesDistrict salesDistrict) {
        List<Age> ages = new ArrayList<>();
        ages.add(new Age(salesDistrict.getTeenSales(), "10대"));
        ages.add(new Age(salesDistrict.getTwentySales(), "20대"));
        ages.add(new Age(salesDistrict.getThirtySales(), "30대"));
        ages.add(new Age(salesDistrict.getFortySales(), "40대"));
        ages.add(new Age(salesDistrict.getFiftySales(), "50대"));
        ages.add(new Age(salesDistrict.getSixtySales(), "60대"));
        return ages;
    }

    @Getter
    @NoArgsConstructor
    private static class Age implements Comparable<Age> {
        private Long sales; // 단위: 만원
        private String name;

        public Age(Long sales, String name) {
            this.sales = sales / TEN_THOUSAND_MULTIPLIER;
            this.name = name;
        }

        @Override
        public int compareTo(Age o) {
            return Long.compare(o.sales, this.sales);
        }
    }
}

