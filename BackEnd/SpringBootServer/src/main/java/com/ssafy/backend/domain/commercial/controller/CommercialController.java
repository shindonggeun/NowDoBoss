package com.ssafy.backend.domain.commercial.controller;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialAreaResponse;
import com.ssafy.backend.domain.commercial.service.CommercialService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "상권", description = "상권 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/commercial")
public class CommercialController {
    private final CommercialService commercialService;

    @Operation(
            summary = "해당 자치구에 포함된 행정동 목록 조회",
            description = "해당 자치구에 포함된 행정동 목록을 조회하는 기능입니다."
    )
    @GetMapping("/administration/district/{districtCode}/areas")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<CommercialAdministrationAreaResponse>>> getAdministrativeAreasByDistrict(
            @PathVariable String districtCode) {
        List<CommercialAdministrationAreaResponse> administrationAreaResponseList = commercialService.getAdministrativeAreasByDistrict(districtCode);
        return ResponseEntity.ok().body(Message.success(administrationAreaResponseList));
    }

    @Operation(
            summary = "해당 행정동에 포함된 상권 목록 조회",
            description = "해당 행정동에 포함된 상권 목록을 조회하는 기능입니다."
    )
    @GetMapping("/administration/{administrationCode}/areas")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<CommercialAreaResponse>>> getCommercialAreasByAdministrationCode(
            @PathVariable String administrationCode) {
        List<CommercialAreaResponse> areaResponseList = commercialService.getCommercialAreasByAdministrationCode(administrationCode);
        return ResponseEntity.ok().body(Message.success(areaResponseList));
    }
}
