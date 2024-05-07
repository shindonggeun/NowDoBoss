package com.ssafy.backend.domain.chat.dto.response;

import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.enums.MessageType;
import com.ssafy.backend.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatMessageResponse {
    private Long chatRoomId;
    private Long chatMessageId;
    private MessageType type;
    private String content;
    private LocalDateTime createdAt;
    private Long senderId;
    private String senderNickname;
    private String senderProfileImage;

    @Builder
    private ChatMessageResponse(Long chatMessageId, MessageType type, String content, LocalDateTime createdAt, Long senderId, String senderNickname, String senderProfileImage, Long chatRoomId) {
        this.chatMessageId = chatMessageId;
        this.type = type;
        this.content = content;
        this.createdAt = createdAt;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderProfileImage = senderProfileImage;
        this.chatRoomId = chatRoomId;
    }

    public static ChatMessageResponse of(ChatMessage message, Member sender, Long chatRoomId) {
        return ChatMessageResponse.builder()
                .chatMessageId(message.getId())
                .type(message.getType())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .senderId(sender.getId())
                .senderNickname(sender.getNickname())
                .senderProfileImage(sender.getProfileImage())
                .chatRoomId(chatRoomId)
                .build();
    }
}
