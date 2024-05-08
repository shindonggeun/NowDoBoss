package com.ssafy.backend.domain.recommendation.controller;

import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationResponse;
import com.ssafy.backend.domain.recommendation.RecommendationDocument;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;
import com.ssafy.backend.domain.recommendation.service.RecommendationService;
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
    public ResponseEntity<Message<List<RecommendationResponse>>> getCommercialRecommendation(
            @AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable String districtCode, @PathVariable String administrationCode) {
        List<RecommendationResponse> administrationAreaResponseList = recommendationService.getTopThreeRecommendations(districtCode, administrationCode, loginActive.id());
        return ResponseEntity.ok().body(Message.success(administrationAreaResponseList));
    }

    @Operation(
            summary = "상권 추천 정보 보관함 저장",
            description = "해당 추천 정보를 보관함에 저장"
    )
    @PostMapping("/{districtCode}/{administrationCode}/{commercialCode}/save")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<String>> saveCommercialRecommendation(
            @AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable String districtCode, @PathVariable String commercialCode, @PathVariable String administrationCode) {
        recommendationService.saveCommercialRecommendation(commercialCode, loginActive.id());
        return ResponseEntity.ok().body(Message.success("보관함 저장 성공!"));
    }

    @Operation(
            summary = "상권 추천 정보 보관함 저장 취소",
            description = "해당 추천 정보를 보관함에서 삭제"
    )
    @DeleteMapping("/{districtCode}/{administrationCode}/{commercialCode}/cancel")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<String>> deleteCommercialRecommendation(
            @AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable String districtCode, @PathVariable String commercialCode, @PathVariable String administrationCode) {
        recommendationService.deleteCommercialRecommendation(commercialCode, loginActive.id());
        return ResponseEntity.ok().body(Message.success("보관함 삭제 성공!"));
    }

    @Operation(
            summary = "보관함에 저장된 상권 추천 리스트 조회",
            description = "해당 유저가 저장한 추천 상권 리스트 목록 조회"
    )
    @GetMapping("/save/list")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<RecommendationDocument>>> getSavedCommercialRecommendationList(
            @AuthenticationPrincipal MemberLoginActive loginActive) {
        return ResponseEntity.ok().body(Message.success(recommendationService.getSavedCommercialRecommendationList(loginActive.id())));
    }
}
