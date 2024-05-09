package com.ssafy.backend.domain.fcm.controller;

import com.ssafy.backend.domain.fcm.dto.request.FcmSubscribeRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTokenRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTopicRequest;
import com.ssafy.backend.domain.fcm.service.FcmService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "FCM", description = "FCM 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/fcm")
public class FcmController {
    private final FcmService fcmService;

    @Operation(
            summary = "FCM 디바이스 토큰 삭제",
            description = "FCM 디바이스 토큰을 삭제하는 기능입니다."
    )
    @DeleteMapping("/{deviceToken}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?>  deleteDeviceToken(@PathVariable String deviceToken) {
        fcmService.deleteDeviceToken(deviceToken);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "topic으로 알림 보내기",
            description = "topic으로 알림을 보내는 기능입니다."
    )
    @PostMapping("/topic")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> sendMessageTopic(@RequestBody FcmTopicRequest fcmTopicRequest) {
        fcmService.sendMessageByTopic(fcmTopicRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "token으로 알림 보내기",
            description = "token으로 알림을 보내는 기능입니다."
    )
    @PostMapping("/token")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> sendMessageToken(@RequestBody FcmTokenRequest fcmTokenRequest) {
        fcmService.sendMessageByToken(fcmTokenRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "특정 topic 구독하기",
            description = "특정 topic을 구독하는 기능입니다."
    )
    @PostMapping("/subscribe")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> subscribeByTopic(@RequestBody FcmSubscribeRequest fcmSubscribeRequest) {
        fcmService.subscribeByTopic(fcmSubscribeRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
