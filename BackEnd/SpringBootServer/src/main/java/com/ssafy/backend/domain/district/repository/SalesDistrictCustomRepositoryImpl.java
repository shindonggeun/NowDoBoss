package com.ssafy.backend.domain.district.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;
import com.ssafy.backend.domain.district.entity.QSalesDistrict;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SalesDistrictCustomRepositoryImpl implements SalesDistrictCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<SalesDistrictTopTenInfo> getTopTenSalesDistrictByPeriodCode() {
        QSalesDistrict sd = QSalesDistrict.salesDistrict;

        // 서브쿼리를 이용하여 top district 목록을 가져옴
        List<String> topDistrictNames = queryFactory
                .select(sd.districtCodeName)
                .from(sd)
                .where(sd.periodCode.eq("20233"))
                .groupBy(sd.districtCodeName)
                .orderBy(sd.monthSales.sum().desc())
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        SalesDistrictTopTenInfo.class,
                        sd.districtCode,
                        sd.districtCodeName,
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.monthSales).otherwise(0L).sum().as("curQuarterTotalSales"),
                        new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.monthSales).otherwise(0L).sum().as("prevQuarterTotalSales")
                ))
                .from(sd)
                .where(sd.districtCodeName.in(topDistrictNames))
                .groupBy(sd.districtCode, sd.districtCodeName)
                .orderBy(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.monthSales).otherwise(0L).sum().desc())
                .fetch();
    }

}
