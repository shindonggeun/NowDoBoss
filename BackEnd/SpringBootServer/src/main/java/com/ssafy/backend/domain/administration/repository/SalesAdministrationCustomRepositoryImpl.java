package com.ssafy.backend.domain.administration.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.administration.dto.info.SalesAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.entity.QSalesAdministration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SalesAdministrationCustomRepositoryImpl implements SalesAdministrationCustomRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<SalesAdministrationTopFiveInfo> getTopFiveSalesAdministrationByAdministrationCode(List<String> allAdministrationCodes, String periodCode) {
        QSalesAdministration sa = QSalesAdministration.salesAdministration;
        QSalesAdministration s = new QSalesAdministration("s");

        SubQueryExpression<Double> periodCode20232Query = JPAExpressions
                .select(new CaseBuilder().when(s.periodCode.eq("20232")).then(s.monthSales).otherwise(0L).sum().doubleValue())
                .from(s)
                .where(s.administrationCode.eq(sa.administrationCode))
                .groupBy(s.administrationCode);

        // 서브쿼리를 이용해 개업률 top 5 행정동 코드 목록 구하기
        List<String> topAdministrationCodes = queryFactory
                .select(sa.administrationCode)
                .from(sa)
                .where(sa.periodCode.eq(periodCode),
                        sa.administrationCode.in(allAdministrationCodes))
                .groupBy(sa.administrationCode)
                .orderBy(sa.monthSales.sum().desc())
                .limit(5)
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        SalesAdministrationTopFiveInfo.class,
                        sa.administrationCode,
                        sa.administrationCodeName,
                        new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.monthSales).otherwise(0L).sum().doubleValue()
                                .subtract(periodCode20232Query).divide(periodCode20232Query).multiply(100)
                ))
                .from(sa)
                .where(sa.administrationCode.in(topAdministrationCodes))
                .groupBy(sa.administrationCode, sa.administrationCodeName )
                .orderBy(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.monthSales).otherwise(0L).sum().desc())
                .fetch();
    }
}
