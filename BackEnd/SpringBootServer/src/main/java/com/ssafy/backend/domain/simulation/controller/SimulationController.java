package com.ssafy.backend.domain.simulation.controller;

import com.ssafy.backend.domain.simulation.dto.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.service.SimulationService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/simulation")
public class SimulationController {
    private final SimulationService simulationService;

    @GetMapping("/franchisee")
    public ResponseEntity searchFranchisee(SearchFranchiseeRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.searchFranchisee(request)));
    }

    @PostMapping
    public ResponseEntity simulation(@RequestBody CreateSimulationRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.simulate(request)));
    }
}
