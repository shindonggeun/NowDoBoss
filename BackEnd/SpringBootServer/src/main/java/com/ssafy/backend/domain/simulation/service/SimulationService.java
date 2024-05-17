package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.simulation.document.SimulationDocument;
import com.ssafy.backend.domain.simulation.dto.request.SimulationRequest;
import com.ssafy.backend.domain.simulation.dto.request.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.request.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.response.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationDocumentResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationResponse;
import com.ssafy.backend.domain.simulation.dto.response.StoreResponse;
import com.ssafy.backend.global.common.dto.PageResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SimulationService {
    List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request);
    StoreResponse selectStoreSize(String serviceCode);
    SimulationResponse simulate(SimulationRequest request);
    void createSimulation(Long memberId, CreateSimulationRequest request);
    PageResponse<SimulationDocumentResponse> selectSimulation(Long memberId, int page, int size);
}
