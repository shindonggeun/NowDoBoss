package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.dto.request.CreateChatRoomRequest;
import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.PopularChatRoomResponse;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;
import com.ssafy.backend.domain.chat.dto.response.CreateChatRoomResponse;
import com.ssafy.backend.domain.chat.service.ChatRoomService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "채팅방", description = "채팅방 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat-rooms")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @Operation(
            summary = "채팅방 목록 조회",
            description = "채팅방 목록 조회에 필요한 정보를 입력하여 채팅방 목록을 조회하는 기능입니다."
    )
    @GetMapping("/my-rooms")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<MyChatRoomListResponse>>> selectMyChatRooms(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                                   MyChatRoomListRequest request) {
        List<MyChatRoomListResponse> response = chatRoomService.selectMyChatRooms(loginActive.id(), request);
        return ResponseEntity.ok().body(Message.success(response));
    }

    @Operation(
            summary = "채팅방 생성",
            description = "채팅방에 필요한 정보를 입력하여 채팅방을 생성하는 기능입니다."
    )
    @PostMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<CreateChatRoomResponse>> createChatRoom(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                        @RequestBody CreateChatRoomRequest request) {

        Long chatRoomId = chatRoomService.createChatRoom(loginActive.id(), request);
        CreateChatRoomResponse response = new CreateChatRoomResponse(chatRoomId);
        return ResponseEntity.ok().body(Message.success(response));
    }

    @Operation(
            summary = "채팅방 생성",
            description = "채팅방에 필요한 정보를 입력하여 채팅방을 생성하는 기능입니다."
    )
    @GetMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<PopularChatRoomResponse>>> selectPopularChatRoom(String category) {
        List<PopularChatRoomResponse> response = chatRoomService.selectPopularChatRoom(category);
        return ResponseEntity.ok().body(Message.success(response));
    }
}
