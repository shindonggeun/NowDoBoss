package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    // /pub/chat/enter/chatRoomId
//    @MessageMapping("/chat/enter/{chatRoomId}")
//    public void enter(@DestinationVariable String chatRoomId) {
//
//    }

    // /pub 로 시작하는 경우 @MessageMapping과 연결
    // /pub/chat/message/chatRoomId
    @MessageMapping("/chat/message/{chatRoomId}")
    public void sendMessage(ChatMessage chatMessage,  @DestinationVariable String chatRoomId) {

    }
}
