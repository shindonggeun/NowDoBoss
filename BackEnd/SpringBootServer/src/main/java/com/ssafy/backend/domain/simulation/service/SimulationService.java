package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.simulation.dto.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.dto.SimulationResponse;

import java.util.List;

public interface SimulationService {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);
    SimulationResponse simulate(CreateSimulationRequest request);
}
