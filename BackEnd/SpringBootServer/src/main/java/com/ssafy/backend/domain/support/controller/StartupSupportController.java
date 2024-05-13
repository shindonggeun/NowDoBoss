package com.ssafy.backend.domain.support.controller;

import com.ssafy.backend.domain.support.service.StartupSupportService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/startup-support")
public class StartupSupportController {
    private final StartupSupportService startupSupportService;

    @GetMapping
    public ResponseEntity selectGovenment() {
        return ResponseEntity.ok().body(Message.success());
    }
}
