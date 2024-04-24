package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.simulation.dto.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.dto.SimulationResponse;
import com.ssafy.backend.domain.simulation.repository.FranchiseeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService {
    private final FranchiseeRepository franchiseeRepository;

    @Override
    public List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request) {
        return franchiseeRepository.searchFranchisee(request);
    }

    @Override
    public SimulationResponse simulate(CreateSimulationRequest request) {
        return null;
    }
}
