package com.ssafy.backend.domain.community.entity;

import com.ssafy.backend.domain.community.entity.enums.Category;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Community extends BaseEntity {
    @Id
    @Comment("커뮤니티 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("작성자 아이디")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @Comment("카테고리")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Comment("제목")
    @Column(columnDefinition = "VARCHAR(65)", nullable = false)
    private String title;

    @Comment("커뮤니티 글 내용")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Comment("조회수")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private int readCount;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();

    public void read() {
        this.readCount++;
    }

    public void addImage(Image image) {
        images.add(image);
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
