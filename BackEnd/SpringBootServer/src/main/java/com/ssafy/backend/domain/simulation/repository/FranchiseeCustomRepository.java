package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.dto.FranchiseeInfo;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;

import java.util.List;

public interface FranchiseeCustomRepository {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);

    Double findAvgByService(String serviceCode);

    /**
     *
     * @param franchiseePrice 프랜차이즈 창업 비용, 현재는 보증금 + 임대료, 프랜차이즈의 비용들을 여기에 더할 예정(원)
     * @param totalPrice 창업 비용(원)
     * @param serviceCode 업종 코드
     * @return
     */
    List<FranchiseeInfo> findByServiceCode(long franchiseePrice, long totalPrice, String serviceCode);
}
