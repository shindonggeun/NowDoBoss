package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.service.ChatService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping
    public ResponseEntity selectChat() {
        return ResponseEntity.ok().body(Message.success());
    }
}
