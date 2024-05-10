package com.ssafy.backend.domain.simulation.controller;

import com.ssafy.backend.domain.simulation.dto.request.SimulationRequest;
import com.ssafy.backend.domain.simulation.dto.request.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.request.CreateSimulationRequest;
import com.ssafy.backend.domain.simulation.dto.response.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationDocumentResponse;
import com.ssafy.backend.domain.simulation.dto.response.SimulationResponse;
import com.ssafy.backend.domain.simulation.dto.response.StoreResponse;
import com.ssafy.backend.domain.simulation.service.SimulationService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "창업 시뮬레이션", description = "창업 시뮬레이션 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/simulation")
public class SimulationController {
    private final SimulationService simulationService;

    @Operation(
            summary = "프랜차이즈 검색",
            description = "프랜차이즈 검색 기능입니다."
    )
    @GetMapping("/franchisee")
    public ResponseEntity<Message<List<SearchFranchiseeResponse>>> searchFranchisee(SearchFranchiseeRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.searchFranchisee(request)));
    }

    @Operation(
            summary = "업종별 가게 크기 조회",
            description = "업종별 가게 크기를 조회하는 기능입니다."
    )
    @GetMapping("/store")
    public ResponseEntity<Message<StoreResponse>> selectStoreSize(String serviceCode) {
        return ResponseEntity.ok().body(Message.success(simulationService.selectStoreSize(serviceCode)));
    }

    @Operation(
            summary = "창업 시뮬레이션 결과 조회",
            description = "창업 시뮬레이션 결과를 조회하는 기능입니다."
    )
    @PostMapping
    public ResponseEntity<Message<SimulationResponse>> simulation(@RequestBody SimulationRequest request) {
        return ResponseEntity.ok().body(Message.success(simulationService.simulate(request)));
    }

    @Operation(
            summary = "창업 시뮬레이션 결과 저장",
            description = "창업 시뮬레이션 결과를 저장하는 기능입니다."
    )
    @PostMapping("/save")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createSimulation(@AuthenticationPrincipal MemberLoginActive loginActive,
                                           @RequestBody CreateSimulationRequest request) {

        simulationService.createSimulation(loginActive.id(), request);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "내 창업 시뮬레이션 결과 목록 조회",
            description = "내 창업 시뮬레이션 결과 목록을 조회하는 기능입니다."
    )
    @GetMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<SimulationDocumentResponse>>> selectSimulation(@AuthenticationPrincipal MemberLoginActive loginActive) {

        List<SimulationDocumentResponse> response = simulationService.selectSimulation(loginActive.id());
        return ResponseEntity.ok().body(Message.success(response));
    }
}
