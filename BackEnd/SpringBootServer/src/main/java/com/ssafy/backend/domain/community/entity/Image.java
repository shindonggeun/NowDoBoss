package com.ssafy.backend.domain.community.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {
    @Id
    @Comment("커뮤니티 이미지 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("커뮤니티 아이디")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    @Comment("이미지 url")
    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String url;

    public void update(String url) {
        this.url = url;
    }
}
