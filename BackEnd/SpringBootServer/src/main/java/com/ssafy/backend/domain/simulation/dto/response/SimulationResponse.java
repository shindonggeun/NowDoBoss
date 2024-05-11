package com.ssafy.backend.domain.simulation.dto.response;

import com.ssafy.backend.domain.simulation.dto.info.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SimulationResponse {
    // 전체 비용, 단위: 원
    private Long totalPrice;

    // 권리금 관련 데이터
    private KeyMoneyInfo keyMoneyInfo;

    // 상세 내용
    private DetailInfo detail;

    // 유사 가격 5개 프랜차이즈 비교
    private List<FranchiseeInfo> franchisees;

    // 고객 남녀, 연령대별 분석
    private GenderAndAgeAnalysisInfo genderAndAgeAnalysisInfo;

    // 성수기, 비성수기
    private MonthAnalysisInfo monthAnalysisInfo;
}