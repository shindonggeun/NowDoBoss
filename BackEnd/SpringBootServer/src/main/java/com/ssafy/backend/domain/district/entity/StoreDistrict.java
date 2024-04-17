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
public class StoreDistrict {
    @Id
    @Comment("점포_자치구_아이디")
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

    @Comment("점포 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long totalStore;

    @Comment("유사 업종 점포 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long similarStore;

    @Comment("개업 점포 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long openedStore;

    @Comment("폐업 점포 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long closedStore;

    @Comment("프랜차이즈 점포 수")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long franchiseStore;

    @Comment("개업률")
    @Column(columnDefinition = "Float")
    private Float openedRate;

    @Comment("폐업률")
    @Column(columnDefinition = "Float")
    private Float closedRate;
}
