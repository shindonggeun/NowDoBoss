package com.ssafy.backend.domain.simulation.controller;

import com.ssafy.backend.domain.simulation.dto.*;
import com.ssafy.backend.domain.simulation.service.SimulationService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/simulation")
public class SimulationController {
    private final SimulationService simulationService;

    @GetMapping("/franchisee")
    public ResponseEntity<Message<List<SearchFranchiseeResponse>>> searchFranchisee(SearchFranchiseeRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.searchFranchisee(request)));
    }

    @GetMapping("/store")
    public ResponseEntity<Message<StoreResponse>> selectStoreSize(String serviceCode) {
        return ResponseEntity.ok().body(Message.success(simulationService.selectStoreSize(serviceCode)));
    }

    @PostMapping
    public ResponseEntity<Message<SimulationResponse>> simulation(@RequestBody CreateSimulationRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.simulate(request)));
    }
}
