package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;

import java.util.List;

public interface FranchiseeCustomRepository {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);
}
