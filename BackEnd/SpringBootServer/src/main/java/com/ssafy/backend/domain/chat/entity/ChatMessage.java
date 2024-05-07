package com.ssafy.backend.domain.chat.entity;

import com.ssafy.backend.domain.chat.entity.enums.MessageType;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage extends BaseEntity {
    @Id
    @Comment("채팅 내역 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("작성자 아이디")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member sender;

    @Comment("채팅방 아이디")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom;

    @Comment("채팅 내용 종류")
    @Enumerated(EnumType.STRING)
    private MessageType type;

    @Comment("채팅 내용")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    public static ChatMessage createExitMessage(Member member, ChatRoom chatRoom) {
        return ChatMessage.builder()
                .sender(member)
                .chatRoom(chatRoom)
                .type(MessageType.EXIT)
                .content(member.getNickname() + "님이 나가셨습니다.")
                .build();
    }
}
