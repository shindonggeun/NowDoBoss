package com.ssafy.backend.domain.map;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.service.CommercialService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Tag(name = "지도", description = "지도 테두리 좌표 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/map")
public class MapController {
    private final MapService mapservice;

    @Operation(
            summary = "상권 영역 좌표",
            description = "주어진 지도 영역 내에 포함된 상권의 테두리 좌표를 조회하는 기능입니다."
    )
    @GetMapping("/commercial/{ax}/{ay}/{bx}/{by}")
    public ResponseEntity<Message<Map<String, List<List<Double>>>>> getCommercialAreaCoords (
            @PathVariable Double ax, @PathVariable Double ay, @PathVariable Double bx, @PathVariable Double by) throws Exception {
        return ResponseEntity.ok().body(Message.success(mapservice.getCommercialAreaCoords(ax, ay, bx, by)));
    }

    @Operation(
            summary = "행정동 영역 좌표",
            description = "주어진 지도 영역 내에 포함된 행정동의 테두리 좌표를 조회하는 기능입니다."
    )
    @GetMapping("/administration/{ax}/{ay}/{bx}/{by}")
    public ResponseEntity<Message<?>> getAdministrationAreaCoords (
            @PathVariable Double ax, @PathVariable Double ay, @PathVariable Double bx, @PathVariable Double by) throws Exception {
        return ResponseEntity.ok().body(Message.success(mapservice.getAdministrationAreaCoords(ax, ay, bx, by)));
    }

    @Operation(
            summary = "자치구 영역 좌표",
            description = "주어진 지도 영역 내에 포함된 자치구의 테두리 좌표를 조회하는 기능입니다."
    )
    @GetMapping("/district/{ax}/{ay}/{bx}/{by}")
    public ResponseEntity<Message<?>> getDistrictAreaCoords (
            @PathVariable Double ax, @PathVariable Double ay, @PathVariable Double bx, @PathVariable Double by) throws Exception {
        return ResponseEntity.ok().body(Message.success(mapservice.getDistrictAreaCoords(ax, ay, bx, by)));
    }
}
