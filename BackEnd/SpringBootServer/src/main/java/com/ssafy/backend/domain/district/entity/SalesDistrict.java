package com.ssafy.backend.domain.district.entity;

import com.ssafy.backend.domain.district.entity.enums.ServiceType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SalesDistrict {
    @Id
    @Comment("추정매출_자치구_아이디")
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

    @Comment("서비스 업종 코드")
    @Column(columnDefinition = "VARCHAR(8)", nullable = false)
    private String serviceCode;

    @Comment("서비스 업종 코드 명")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String serviceCodeName;

    @Enumerated(EnumType.STRING)
    @Comment("서비스 업종 타입")
    private ServiceType serviceType;

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
}
