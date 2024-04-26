package com.ssafy.backend.domain.simulation.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rent {
    @Id
    @Comment("임대료 아이디")
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("자치구 코드")
    @Column(columnDefinition = "VARCHAR(5)", nullable = false)
    private String districtCode;

    @Comment("자치구 코드 명")
    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String districtCodeName;

    @Comment("전체 층 임대료(단위: 3.3㎡당 월환산임대료, 원)")
    @Column(nullable = false)
    private int total;

    @Comment("1층 임대료(단위: 3.3㎡당 월환산임대료, 원)")
    @Column(nullable = false)
    private int firstFloor;

    @Comment("1층 외 임대료(단위: 3.3㎡당 월환산임대료, 원)")
    @Column(nullable = false)
    private int otherFloor;

    public int calculateRent(int area, String floor) {
        if ("1층".equals(floor)) {
            return (int) (area / 3.3 * firstFloor);
        }
        return (int) (area / 3.3 * otherFloor);
    }

    public int calculateDeposit(int rentPrice) {
        return rentPrice * 10;
    }
}
