package com.ssafy.backend.global.component.firebase.controller;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.firebase.dto.request.FcmSubscribeRequest;
import com.ssafy.backend.global.component.firebase.dto.request.FcmTokenRequest;
import com.ssafy.backend.global.component.firebase.dto.request.FcmTopicRequest;
import com.ssafy.backend.global.component.firebase.service.FirebaseService;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "파이어베이스", description = "파이어베이스 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/firebase")
public class FirebaseController {
    private final FirebaseService firebaseService;

    @Operation(
            summary = "이미지 파일 업로드",
            description = "이미지 파일을 파이어베이스 스토리지에 업로드 합니다."
    )
    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("fileName") String fileName) {
        String url = firebaseService.uploadFiles(file, fileName);
        return ResponseEntity.ok().body(Message.success(url));
    }

    @Operation(
            summary = "FCM 디바이스 토큰 저장",
            description = "FCM 디바이스 토큰을 저장하는 기능입니다."
    )
    @PostMapping("/{deviceToken}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createDeviceToken(@AuthenticationPrincipal MemberLoginActive loginActive,
                                               @PathVariable String deviceToken) {

        firebaseService.createDeviceToken(loginActive.id(), deviceToken);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "FCM 디바이스 토큰 삭제",
            description = "FCM 디바이스 토큰을 삭제하는 기능입니다."
    )
    @DeleteMapping("/message/{deviceToken}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> deleteDeviceToken(@PathVariable String deviceToken) {
        firebaseService.deleteDeviceToken(deviceToken);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "topic으로 알림 보내기",
            description = "topic으로 알림을 보내는 기능입니다."
    )
    @PostMapping("/message/topic")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> sendMessageTopic(@RequestBody FcmTopicRequest fcmTopicRequest) {
        firebaseService.sendMessageByTopic(fcmTopicRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "token으로 알림 보내기",
            description = "token으로 알림을 보내는 기능입니다."
    )
    @PostMapping("/message/token")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> sendMessageToken(@RequestBody FcmTokenRequest fcmTokenRequest) {
        firebaseService.sendMessageByToken(fcmTokenRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "특정 topic 구독하기",
            description = "특정 topic을 구독하는 기능입니다."
    )
    @PostMapping("/message/subscribe")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> subscribeByTopic(@RequestBody FcmSubscribeRequest fcmSubscribeRequest) {
        firebaseService.subscribeByTopic(fcmSubscribeRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}

