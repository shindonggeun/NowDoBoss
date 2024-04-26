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
        @Index(name = "idx_period_code", columnList = "periodCode"),
        @Index(name = "idx_commercial_code", columnList = "commercialCode")
})
public class FacilityCommercial {
    @Id
    @Comment("집객시설 상권 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("기준 년분기 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String periodCode;

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
    
    @Comment("집객 시설 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long facilityCnt;

    @Comment("초등학교 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private String elementarySchoolCnt;

    @Comment("중학교 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long middleSchoolCnt;

    @Comment("고등학교 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long highSchoolCnt;

    @Comment("대학교 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long universityCnt;

    @Comment("지하철 역 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long subwayStationCnt;

    @Comment("버스 정거장 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long busStopCnt;
}
