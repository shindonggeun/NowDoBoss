package com.ssafy.backend.domain.chat.dto;

import com.ssafy.backend.domain.chat.entity.enums.MessageType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageRequest {
    private Long chatRoomId;
    private String type;
    private String content;
    private Long senderId;

    public MessageType getMessageType() {
        return MessageType.valueOf(type);
    }

    public void enter(String nickname) {
        this.content = nickname + "님이 입장하셨습니다.";
    }
}
