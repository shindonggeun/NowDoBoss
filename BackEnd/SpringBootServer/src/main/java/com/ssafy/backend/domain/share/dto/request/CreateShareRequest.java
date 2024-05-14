package com.ssafy.backend.domain.share.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class CreateShareRequest {
    private String url;
    private Map<String, Object> input;
    
    /*
    // 상권 추천
    @PathVariable String districtCode,
    @PathVariable String administrationCode

    // 창업 시뮬레이션
    Long totalPrice,
        Boolean isFranchisee,
        String brandName,
        String gugun,
        String serviceCode,
        String serviceCodeName,
        int storeSize,
        String floor


    // 상권 분석
    @RequestParam(defaultValue = "20233") String periodCode,
            @PathVariable String districtCode,
            @PathVariable String administrationCode,
            @PathVariable String commercialCode,
            @PathVariable String serviceCode
     */
}

