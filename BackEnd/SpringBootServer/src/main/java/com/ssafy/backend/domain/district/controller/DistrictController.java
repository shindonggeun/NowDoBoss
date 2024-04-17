package com.ssafy.backend.domain.district.controller;

import com.ssafy.backend.domain.district.dto.DistrictTopFiveResponse;
import com.ssafy.backend.domain.district.service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/district")
public class DistrictController {

    private final DistrictService districtService;

    @GetMapping("/")
    public ResponseEntity<DistrictTopFiveResponse> getTopFiveDistricts() {
        return ResponseEntity.status(200).body(districtService.getTopFiveDistricts());
    }
}
