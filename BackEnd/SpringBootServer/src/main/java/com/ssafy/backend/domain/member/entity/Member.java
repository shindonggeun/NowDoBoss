package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.community.entity.Comments;
import com.ssafy.backend.domain.community.entity.Community;
import com.ssafy.backend.domain.member.dto.MemberUpdateRequest;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.common.entity.BaseEntity;
import com.ssafy.backend.global.component.firebase.entity.DeviceToken;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {
        @Index(name = "idx_email", columnList = "email")
})
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
    @Column(columnDefinition = "VARCHAR(80)")
    private String password;

    @Comment("이름")
    @Column(columnDefinition = "VARCHAR(40)")
    private String name;

    @Comment("닉네임")
    @Column(columnDefinition = "VARCHAR(60)", nullable = false)
    private String nickname;

    @Comment("프로필 이미지 URL")
    private String profileImage;

    @Comment("권한")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole role;

    @Column(name = "provider")
    @Enumerated(EnumType.STRING)
    @Comment("소셜 로그인 제공업체")
    private OAuthDomain oAuthDomain;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatRoomMember> chatRoomMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeviceToken> deviceTokens = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Community> communities = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();

    public void updateProfileImageAndNickname(MemberUpdateRequest updateRequest) {
        this.nickname = updateRequest.nickname();
        this.profileImage = updateRequest.profileImage();
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
