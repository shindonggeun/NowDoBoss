package com.ssafy.backend.domain.support.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Comment;

@Entity
public class StartupSupport {
    @Id
    @Comment("창업지원 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("지원유형")
    private String type;

    @Comment("신청기간")
    private String application_period;

    @Comment("접수기관")
    private String receiving_institution;

    @Comment("상세페이지 링크")
    @Column(columnDefinition = "TEXT")
    private String detail_page_link;
}
