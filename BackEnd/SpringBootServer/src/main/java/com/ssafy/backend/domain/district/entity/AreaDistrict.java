package com.ssafy.backend.domain.district.entity;

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
public class AreaDistrict {
    @Id
    @Comment("영역 자치구 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("자치구 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String districtCode;

    @Comment("자치구 코드 명")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String districtCodeName;

    @Comment("x 좌표 값")
    @Column(columnDefinition = "Float", nullable = false)
    private Float x;

    @Comment("y 좌표 값")
    @Column(columnDefinition = "Float", nullable = false)
    private Float y;
}
