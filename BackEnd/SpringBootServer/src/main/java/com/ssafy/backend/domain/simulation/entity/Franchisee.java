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

    @Comment("서비스 아이디")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceType serviceType;

    @Comment("브랜드 이름")
    @Column(nullable = false)
    private String brandName;

    @Comment("가입비, 천원")
    private int subscription;

    @Comment("교육비, 천원")
    private int education;

    @Comment("가맹 보증금, 천원")
    private int deposit;

    @Comment("기타비용, 천원")
    private int etc;

    @Comment("부담금 합계, 천원")
    private int totalLevy;

    @Comment("단위면적(3.3㎡)당 인테리어 비용, 천원")
    private int unitArea;

    @Comment("기준점포면적(㎡)")
    private int area;

    @Comment("인테리어 비용, 천원")
    private int interior;

    public Long getLevy() {
        return this.totalLevy * 1000L;
    }

    public Long getTotalInterior() {
        return this.interior * 1000L;
    }
}
