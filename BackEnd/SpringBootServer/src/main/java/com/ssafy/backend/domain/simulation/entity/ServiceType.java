package com.ssafy.backend.domain.simulation.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ServiceType {
    @Id
    @Comment("서비스 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("업종 코드")
    @Column(nullable = false)
    private String serviceCode;

    @Comment("업종 이름")
    @Column(nullable = false)
    private String serviceCodeName;

    @Comment("소형 크기(m²)")
    private int smallSize;

    @Comment("중형 크기(m²)")
    private int mediumSize;

    @Comment("대형 크기(m²)")
    private int largeSize;

}
