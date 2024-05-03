package com.ssafy.backend.domain.commercial.dto.info;


/**
 * 연령대별 및 성별별 유동 인구 비율 정보를 나타내는 record입니다.
 * 각 연령대별로 남성과 여성의 유동 인구 비율을 포함합니다.
 */
public record CommercialAgeGenderFootTrafficInfo(
        Double maleTeenPercent,   // 10대 남성의 유동 인구 비율
        Double femaleTeenPercent, // 10대 여성의 유동 인구 비율
        Double maleTwentyPercent, // 20대 남성의 유동 인구 비율
        Double femaleTwentyPercent, // 20대 여성의 유동 인구 비율
        Double maleThirtyPercent, // 30대 남성의 유동 인구 비율
        Double femaleThirtyPercent, // 30대 여성의 유동 인구 비율
        Double maleFortyPercent,  // 40대 남성의 유동 인구 비율
        Double femaleFortyPercent, // 40대 여성의 유동 인구 비율
        Double maleFiftyPercent,  // 50대 남성의 유동 인구 비율
        Double femaleFiftyPercent, // 50대 여성의 유동 인구 비율
        Double maleSixtyPercent, // 60대 이상 남성의 유동 인구 비율
        Double femaleSixtyPercent // 60대 이상 여성의 유동 인구 비율
) {
}
