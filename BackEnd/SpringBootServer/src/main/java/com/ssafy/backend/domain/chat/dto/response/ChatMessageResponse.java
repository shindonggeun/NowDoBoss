package com.ssafy.backend.domain.chat.dto.response;

import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.enums.MessageType;
import com.ssafy.backend.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageResponse {
    private Long chatRoomId;
    private Long chatMessageId;
    private MessageType type;
    private String content;
    private LocalDateTime createdAt;
    private Long senderId;
    private String senderNickname;
    private String senderProfileImage;

    public static ChatMessageResponse of(ChatMessage message) {
        Member sender = message.getSender();
        ChatRoom chatRoom = message.getChatRoom();
        return ChatMessageResponse.builder()
                .chatMessageId(message.getId())
                .type(message.getType())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .senderId(sender.getId())
                .senderNickname(sender.getNickname())
                .senderProfileImage(sender.getProfileImage())
                .chatRoomId(chatRoom.getId())
                .build();
    }
}
