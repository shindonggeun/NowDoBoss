package com.ssafy.backend.domain.chat.entity;

import com.ssafy.backend.domain.community.entity.enums.Category;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom extends BaseEntity {
    @Id
    @Comment("채팅방 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("카테고리")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Comment("채팅방 이름")
    @Column(name = "chat_room_name", columnDefinition = "VARCHAR(20)")
    private String name;

    @Comment("채팅방 소개")
    @Column(name = "chat_room_introduction", columnDefinition = "VARCHAR(40)")
    private String introduction;

    @Comment("채팅방 제한 인원수")
    @Column(name = "chat_room_limit", columnDefinition = "INT UNSIGNED")
    private int limit;
}

