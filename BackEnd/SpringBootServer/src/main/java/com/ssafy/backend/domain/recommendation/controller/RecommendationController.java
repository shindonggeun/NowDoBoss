package com.ssafy.backend.domain.recommendation.controller;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationResponse;
import com.ssafy.backend.domain.recommendation.service.RecommendationService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "추천", description = "추천 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/recommendation")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Operation(
            summary = "해당 유저에게 맞는 상권 추천",
            description = "해당 유저가 원하는 영역의 상권들을 추천"
    )
    @GetMapping("/{districtCode}/{administrationCode}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<?>> getCommercialRecommendation(
            @AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable String districtCode, @PathVariable String administrationCode) {
        List<CommercialAdministrationResponse> administrationAreaResponseList = recommendationService.getTopThreeRecommendations(districtCode, administrationCode, loginActive.id());
        return ResponseEntity.ok().body(Message.success(administrationAreaResponseList));
    }
}
