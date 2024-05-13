package com.ssafy.backend.domain.support.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class StartupSupport {
    @Id
    @Comment("창업지원 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("지원유형")
    private String type;

    @Comment("신청기간")
    private String applicationPeriod;

    @Comment("접수기관")
    private String receivingInstitution;

    @Comment("상세페이지 링크")
    @Column(columnDefinition = "TEXT")
    private String detailPageLink;
}
