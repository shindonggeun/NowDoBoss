package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.dto.FranchiseeInfo;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.entity.Franchisee;

import java.util.List;

public interface FranchiseeCustomRepository {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);

    Double findAvgByService(String serviceCode);

    List<FranchiseeInfo> findByServiceCode(int franchiseePrice, long totalPrice, String serviceCode);
}
