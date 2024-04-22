package com.ssafy.backend.domain.district.controller;

import com.ssafy.backend.domain.district.dto.DistrictInfo;
import com.ssafy.backend.domain.district.dto.response.DistrictTopFiveResponse;
import com.ssafy.backend.domain.district.service.DistrictService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/district")
public class DistrictController {

    private final DistrictService districtService;

    @Operation(
            summary = "자치구 Top 5 리스트",
            description = "유동인구, 매출, 개업률, 폐업률 Top 5 리스트를 제공하는 기능입니다."
    )
    @GetMapping("")
    public ResponseEntity<Message<DistrictTopFiveResponse>> getTopFiveDistricts() {
        System.out.println("top5 가져오기!");
        return ResponseEntity.ok().body(Message.success(districtService.getTopFiveDistricts()));
    }

    @Operation(
            summary = "전체 자치구 목록 조회",
            description = "모든 자치구의 코드와 이름을 반환하는 기능입니다."
    )
    @GetMapping("/all-districts")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<DistrictInfo>>> getAllDistricts() {
        List<DistrictInfo> districtInfoList = districtService.getAllDistricts();
        return ResponseEntity.ok().body(Message.success(districtInfoList));
    }
}
