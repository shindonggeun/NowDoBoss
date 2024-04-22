package com.ssafy.backend.domain.commercial.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {
        @Index(name = "idx_district_code", columnList = "districtCode")
})
public class AreaCommercial {
    @Id
    @Comment("영역 상권 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("상권 구분 코드")
    @Column(columnDefinition = "VARCHAR(1)", nullable = false)
    private String commercialClassificationCode;

    @Comment("상권 구분 코드 명")
    @Column(columnDefinition = "VARCHAR(4)", nullable = false)
    private String commercialClassificationCodeName;

    @Comment("상권 코드")
    @Column(columnDefinition = "VARCHAR(8)", nullable = false)
    private String commercialCode;

    @Comment("상권 코드 명")
    @Column(columnDefinition = "VARCHAR(80)", nullable = false)
    private String commercialCodeName;

    @Comment("x 좌표 값")
    @Column(columnDefinition = "Float", nullable = false)
    private Float x;

    @Comment("y 좌표 값")
    @Column(columnDefinition = "Float", nullable = false)
    private Float y;

    @Comment("자치구 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String districtCode;

    @Comment("자치구 코드 명")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String districtCodeName;

    @Comment("행정동 코드")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String administrationCode;

    @Comment("행정동 코드 명")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String administrationCodeName;
}
