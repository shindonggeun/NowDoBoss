package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.simulation.dto.*;

import java.util.List;

public interface SimulationService {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);
    StoreResponse selectStoreSize(String serviceCode);
    SimulationResponse simulate(CreateSimulationRequest request);
}
