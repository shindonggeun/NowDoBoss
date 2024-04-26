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
        @Index(name = "idx_commercial_code", columnList = "commercialCode"),
        @Index(name = "idx_service_code", columnList = "serviceCode")
})
public class SalesCommercial {
    @Id
    @Comment("추정매출_상권 아이디")
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

    @Comment("서비스 업종 코드")
    @Column(columnDefinition = "VARCHAR(8)", nullable = false)
    private String serviceCode;

    @Comment("서비스 업종 코드명")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String serviceCodeName;

    @Comment("당월 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long monthSales;

    @Comment("월요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long monSales;

    @Comment("화요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long tueSales;

    @Comment("수요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long wedSales;

    @Comment("목요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long thuSales;

    @Comment("금요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long friSales;

    @Comment("토요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long satSales;

    @Comment("일요일 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long sunSales;

    @Comment("시간대 00 ~ 06 매출 금액")
    @Column(name = "sales_00", columnDefinition = "BIGINT UNSIGNED")
    private Long sales00;

    @Comment("시간대 06 ~ 11 매출 금액")
    @Column(name = "sales_06", columnDefinition = "BIGINT UNSIGNED")
    private Long sales06;

    @Comment("시간대 11 ~ 14 매출 금액")
    @Column(name = "sales_11", columnDefinition = "BIGINT UNSIGNED")
    private Long sales11;

    @Comment("시간대 14 ~ 17 매출 금액")
    @Column(name = "sales_14", columnDefinition = "BIGINT UNSIGNED")
    private Long sales14;

    @Comment("시간대 17 ~ 21 매출 금액")
    @Column(name = "sales_17", columnDefinition = "BIGINT UNSIGNED")
    private Long sales17;

    @Comment("시간대 21 ~ 24 매출 금액")
    @Column(name = "sales_21", columnDefinition = "BIGINT UNSIGNED")
    private Long sales21;

    @Comment("연령대 10 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long teenSales;

    @Comment("연령대 20 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long twentySales;

    @Comment("연령대 30 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long thirtySales;

    @Comment("연령대 40 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long fortySales;

    @Comment("연령대 50 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long fiftySales;

    @Comment("연령대 60 이상 매출 금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long sixtySales;
}
