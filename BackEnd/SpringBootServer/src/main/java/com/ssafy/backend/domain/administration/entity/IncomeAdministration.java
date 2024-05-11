package com.ssafy.backend.domain.administration.entity;

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
        @Index(name = "idx_administration_code", columnList = "administrationCode")
})
public class IncomeAdministration {
    @Id
    @Comment("소득소비_행정동 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("기준 년분기 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String periodCode;

    @Comment("행정동 코드")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String administrationCode;

    @Comment("행정동 코드 명")
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String administrationCodeName;

    @Comment("지출 총금액")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long totalPrice;
}
