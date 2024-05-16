package com.ssafy.backend.domain.district.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.district.dto.response.FootTrafficDistrictTopTenResponse;
import com.ssafy.backend.domain.district.entity.QFootTrafficDistrict;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FootTrafficDistrictCustomRepositoryImpl implements FootTrafficDistrictCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<FootTrafficDistrictTopTenResponse> getTopTenFootTrafficDistrictByPeriodCode() {
        QFootTrafficDistrict f = QFootTrafficDistrict.footTrafficDistrict;
        QFootTrafficDistrict f2 = new QFootTrafficDistrict("f2");

        List<Tuple> datas = queryFactory
                .select(f.districtCode,
                        f.districtCodeName,
                        f2.totalFootTraffic.as("total"),
                        (f2.totalFootTraffic.doubleValue().subtract(f.totalFootTraffic.doubleValue()))
                                .divide(f.totalFootTraffic).multiply(100).as("totalRate")
                        )
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
                .orderBy(f2.totalFootTraffic.desc())
                .fetch();

        List<FootTrafficDistrictTopTenResponse> responses = new ArrayList<>();
        int level = 0;
        for (int i = 0; i < datas.size(); i++) {
            if (i % 5 == 0) {
                level++; // 10개 단위로 level 증가
            }
            FootTrafficDistrictTopTenResponse responseDto = new FootTrafficDistrictTopTenResponse(
                    datas.get(i).get(f.districtCode),
                    datas.get(i).get(f.districtCodeName),
                    datas.get(i).get(Expressions.numberPath(Long.class, "total")),
                    datas.get(i).get(Expressions.numberPath(Double.class, "totalRate")),
                    level
            );
            responses.add(responseDto);
        }
        return responses;
    }
}
