package com.ssafy.backend.domain.district.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChangeDistrict {
    @Id
    @Comment("상권 변화 지표 자치구 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("기준 년분기 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String periodCode;

    @Comment("자치구 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String districtCode;

    @Comment("자치구 코드 명")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String districtCodeName;

    @Comment("상권 변화 지표")
    @Column(columnDefinition = "VARCHAR(5)")
    private String changeIndicator;

    @Comment("상권 변화 지표 명")
    @Column(columnDefinition = "VARCHAR(15)")
    private String changeIndicatorName;

    @Comment("운영 영업 개월 평균")
    private int openedMonths;

    @Comment("폐업 영업 개월 평균")
    private int closedMonths;
}
