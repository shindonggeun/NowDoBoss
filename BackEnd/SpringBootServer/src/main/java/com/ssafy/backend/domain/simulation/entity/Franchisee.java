package com.ssafy.backend.domain.simulation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Franchisee {
    @Id
    @Comment("프랜차이즈 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("브랜드 이름")
    @Column(nullable = false)
    private String brandName;

    @Comment("업종 코드")
    @Column(nullable = false)
    private String serviceCode;

    @Comment("업종 이름")
    @Column(nullable = false)
    private String serviceCodeName;

    @Comment("가입비")
    private int subscription;

    @Comment("교육비")
    private int education;

    @Comment("보증금")
    private int deposit;

    @Comment("기타비용")
    private int etc;

    @Comment("부담금 합계")
    private int totalLevy;

    @Comment("단위면적(3.3㎡)당 인테리어 비용")
    private int unitArea;

    @Comment("기준점포면적(㎡)")
    private int area;

    @Comment("인테리어 비용")
    private int interior;

    @Comment("소형 크기(m²)")
    private int smallSize;

    @Comment("중형 크기(m²)")
    private int mediumSize;

    @Comment("대형 크기(m²)")
    private int largeSize;
}
