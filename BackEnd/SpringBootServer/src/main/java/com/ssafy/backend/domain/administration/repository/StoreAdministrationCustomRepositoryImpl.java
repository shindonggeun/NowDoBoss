package com.ssafy.backend.domain.administration.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.entity.QStoreAdministration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StoreAdministrationCustomRepositoryImpl implements StoreAdministrationCustomRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<OpenedStoreAdministrationTopFiveInfo> getTopFiveOpenedRateAdministration(List<String> allAdministrationCodes, String periodCode) {
        QStoreAdministration sa = QStoreAdministration.storeAdministration;
        QStoreAdministration s = new QStoreAdministration("s");

        SubQueryExpression<Double> periodCode20232Query = JPAExpressions
                .select(new CaseBuilder()
                        .when(s.periodCode.eq("20232"))
                        .then(s.openedStore)
                        .otherwise(0L).sum().doubleValue()
                        .divide(new CaseBuilder()
                                .when(s.periodCode.eq("20232"))
                                .then(s.totalStore)
                                .otherwise(0L).sum())
                        .multiply(100))
                .from(s)
                .where(s.periodCode.eq("20232")
                        .and(s.administrationCode.eq(sa.administrationCode)))
                .groupBy(sa.administrationCode);


        // 서브쿼리를 이용해 폐업률 top 5 행정동 코드 목록 구하기
        List<String> topAdministrationCodes = queryFactory
                .select(sa.administrationCode)
                .from(sa)
                .where(sa.periodCode.eq(periodCode),
                        sa.administrationCode.in(allAdministrationCodes))
                .groupBy(sa.administrationCode)
                .orderBy(sa.openedStore.sum().divide(sa.totalStore.sum()).desc())
                .limit(5)
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        OpenedStoreAdministrationTopFiveInfo.class,
                        sa.administrationCode,
                        sa.administrationCodeName,
                        new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.openedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.totalStore).otherwise(0L).sum())
                                .multiply(100).subtract(periodCode20232Query).divide(periodCode20232Query).multiply(100)
                ))
                .from(sa)
                .where(sa.administrationCode.in(topAdministrationCodes))
                .groupBy(sa.administrationCode, sa.administrationCodeName )
                .orderBy(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.openedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();
    }

    @Override
    public List<ClosedStoreAdministrationTopFiveInfo> getTopFiveClosedRateAdministration(List<String> allAdministrationCodes, String periodCode) {
        QStoreAdministration sa = QStoreAdministration.storeAdministration;
        QStoreAdministration s = new QStoreAdministration("s");

        SubQueryExpression<Double> periodCode20232Query = JPAExpressions
                .select(new CaseBuilder()
                        .when(s.periodCode.eq("20232"))
                        .then(s.closedStore)
                        .otherwise(0L).sum().doubleValue()
                        .divide(new CaseBuilder()
                                .when(s.periodCode.eq("20232"))
                                .then(s.totalStore)
                                .otherwise(0L).sum())
                        .multiply(100))
                .from(s)
                .where(s.periodCode.eq("20232")
                        .and(s.administrationCode.eq(sa.administrationCode)))
                .groupBy(sa.administrationCode);

        // 서브쿼리를 이용해 폐업률 top 5 행정동 코드 목록 구하기
        List<String> topAdministrationCodes = queryFactory
                .select(sa.administrationCode)
                .from(sa)
                .where(sa.periodCode.eq(periodCode),
                        sa.administrationCode.in(allAdministrationCodes))
                .groupBy(sa.administrationCode)
                .orderBy(sa.closedStore.sum().divide(sa.totalStore.sum()).desc())
                .limit(5)
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        ClosedStoreAdministrationTopFiveInfo.class,
                        sa.administrationCode,
                        sa.administrationCodeName,
                        new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.closedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.totalStore).otherwise(0L).sum())
                                .multiply(100).subtract(periodCode20232Query).divide(periodCode20232Query).multiply(100)
                ))
                .from(sa)
                .where(sa.administrationCode.in(topAdministrationCodes))
                .groupBy(sa.administrationCode, sa.administrationCodeName )
                .orderBy(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.closedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();
    }
}
