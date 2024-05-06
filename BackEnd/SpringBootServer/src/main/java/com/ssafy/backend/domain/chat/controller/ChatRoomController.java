package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.backend.domain.chat.service.ChatRoomService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat-rooms")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @GetMapping
    public ResponseEntity selectChatRooms() {
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping
    public ResponseEntity<Message<Void>> createChatRoom(@RequestBody ChatRoomRequest request) {
        chatRoomService.createChatRoom(request);
        return ResponseEntity.ok().body(Message.success());
    }
}
