package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @Comment("회원 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("이메일")
    @Column(nullable = false)
    private String email;

    @Comment("비밀번호")
    private String password;

    @Comment("닉네임")
    @Column(nullable = false)
    private String nickname;

    @Comment("프로필 이미지 URL")
    private String profileImage;

    @Comment("권한")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberRole role;
}
