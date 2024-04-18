package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.member.dto.MemberUpdateRequest;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.common.entity.BaseEntity;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

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
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private MemberRole role;

    @Column(name = "provider")
    @Enumerated(EnumType.STRING)
    @Comment("소셜 로그인 제공업체")
    private OAuthDomain oAuthDomain;

    public void updateProfileImageAndNickname(MemberUpdateRequest updateRequest) {
        this.nickname = updateRequest.nickname();
        this.profileImage = updateRequest.profileImage();
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
