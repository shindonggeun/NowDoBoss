package com.ssafy.backend.domain.district.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.district.dto.response.FootTrafficDistrictTopTenResponse;
import com.ssafy.backend.domain.district.entity.QFootTrafficDistrict;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FootTrafficDistrictCustomRepositoryImpl implements FootTrafficDistrictCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<FootTrafficDistrictTopTenResponse> getTopTenFootTrafficDistrictByPeriodCode() {
        QFootTrafficDistrict f = QFootTrafficDistrict.footTrafficDistrict;
        QFootTrafficDistrict f2 = new QFootTrafficDistrict("f2");

        JPQLQuery<FootTrafficDistrictTopTenResponse> query = queryFactory
                .select(Projections.constructor(
                        FootTrafficDistrictTopTenResponse.class,
                        f.districtCode,
                        f.districtCodeName,
                        f2.totalFootTraffic,
                        (f2.totalFootTraffic.doubleValue().subtract(f.totalFootTraffic.doubleValue()))
                                .divide(f.totalFootTraffic).multiply(100).as("totalRate"),
                        Expressions.numberTemplate(Integer.class, "(ROW_NUMBER() OVER(ORDER BY f2.totalFootTraffic DESC) - 1) / 5 + 1").as("level")
                        ))
                .from(f)
                .join(f2)
                .on(f.districtCodeName.eq(f2.districtCodeName))
                .where(f.periodCode.eq("20232"),
                        f2.periodCode.eq("20233"),
                        f.districtCodeName.in(
                                JPAExpressions
                                        .select(f2.districtCodeName)
                                        .from(f2)
                                        .where(f2.periodCode.eq("20233"))
                                        .orderBy(f2.totalFootTraffic.desc())
                        ))
                .orderBy(f2.totalFootTraffic.desc());

        return query.fetch();
    }
}
