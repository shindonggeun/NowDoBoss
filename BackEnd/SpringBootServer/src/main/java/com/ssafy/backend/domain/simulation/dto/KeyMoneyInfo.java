package com.ssafy.backend.domain.simulation.dto;

import lombok.Builder;

@Builder
public record KeyMoneyInfo(
        // 권리금 유 비율, 단위: %
        double keyMoneyRatio,

        // 권리금 수준 평균, 단위: 만원
        int keyMoney,

        // 권리금 수준 ㎡당 평균, 단위: 만원/㎡
        double keyMoneyLevel
) {
}
