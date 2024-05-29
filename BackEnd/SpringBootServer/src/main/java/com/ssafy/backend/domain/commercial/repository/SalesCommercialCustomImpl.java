package com.ssafy.backend.domain.commercial.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.commercial.entity.QSalesCommercial;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SalesCommercialCustomImpl implements SalesCommercialCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Long getOtherSalesByPeriodCodeAndCommercialCode(String periodCode){
        QSalesCommercial salesCommercial = QSalesCommercial.salesCommercial;

        // 서브쿼리에서 사용할 서브 쿼리용 서브패스 생성
        com.querydsl.core.types.dsl.NumberPath<Long> totalMonthSales = Expressions.numberPath(Long.class, "totalMonthSales");
        com.querydsl.core.types.dsl.NumberPath<Long> numCommercial = Expressions.numberPath(Long.class, "numCommercial");

        // 서브쿼리 작성
        List<Tuple> subQueryResults = queryFactory
                .select(salesCommercial.commercialCode,
                        salesCommercial.monthSales.sum().as(totalMonthSales),
                        salesCommercial.commercialCode.countDistinct().as(numCommercial))
                .from(salesCommercial)
                .where(salesCommercial.periodCode.eq(periodCode))
                .groupBy(salesCommercial.commercialCode)
                .fetch();

        // 서브쿼리 결과를 이용하여 메인 쿼리 작성
        Long sumTotalMonthSales = 0L;
        Long sumNumCommercial = 0L;
        for (Tuple tuple : subQueryResults) {
            sumTotalMonthSales += tuple.get(totalMonthSales);
            sumNumCommercial += tuple.get(numCommercial);
        }

        // 메인 쿼리 결과 계산
        if (sumNumCommercial == 0){
            return 0L;
        }
        return sumTotalMonthSales / sumNumCommercial;
    }

    @Override
    public Long getAdministrationSalesByPeriodCodeAndCommercialCode(List<String> commercialCodes, String periodCode) {
        QSalesCommercial salesCommercial = QSalesCommercial.salesCommercial;

        // 서브쿼리에서 사용할 서브 쿼리용 서브패스 생성
        com.querydsl.core.types.dsl.NumberPath<Long> totalMonthSales = Expressions.numberPath(Long.class, "totalMonthSales");
        com.querydsl.core.types.dsl.NumberPath<Long> numCommercial = Expressions.numberPath(Long.class, "numCommercial");

        // 서브쿼리 작성
        List<Tuple> subQueryResults = queryFactory
                .select(salesCommercial.commercialCode,
                        salesCommercial.monthSales.sum().as(totalMonthSales),
                        salesCommercial.commercialCode.countDistinct().as(numCommercial))
                .from(salesCommercial)
                .where(salesCommercial.periodCode.eq(periodCode)
                        .and(salesCommercial.commercialCode.in(commercialCodes)))
                .groupBy(salesCommercial.commercialCode)
                .fetch();

        // 서브쿼리 결과를 이용하여 메인 쿼리 작성
        Long sumTotalMonthSales = 0L;
        Long sumNumCommercial = 0L;
        for (Tuple tuple : subQueryResults) {
            sumTotalMonthSales += tuple.get(totalMonthSales);
            sumNumCommercial += tuple.get(numCommercial);
        }

        if (sumNumCommercial == 0){
            return 0L;
        }
        // 메인 쿼리 결과 계산
        return sumTotalMonthSales / sumNumCommercial;
    }

    @Override
    public List<String> findTopSalesCommercialInCommercialCodes(List<String> commercialCodes, String periodCode) {
        QSalesCommercial salesCommercial = QSalesCommercial.salesCommercial;

        // 쿼리 작성
        List<String> res = queryFactory
                .select(salesCommercial.commercialCode)
                .from(salesCommercial)
                .where(salesCommercial.periodCode.eq(periodCode)
                        .and(salesCommercial.commercialCode.in(commercialCodes)))
                .groupBy(salesCommercial.commercialCode)
                .orderBy(salesCommercial.monthSales.sum().desc())
                .limit(3) // 가장 큰 값을 가진 한 개의 결과만 가져옴
                .fetch(); // 첫 번째 결과만 가져옴 (fetchOne()과 동일한 경우도 있음)

        return res;
    }

    @Override
    public Long findTopSalesByCommercialCode(String commercialCode) {
        QSalesCommercial salesCommercial = QSalesCommercial.salesCommercial;

        com.querydsl.core.types.dsl.NumberPath<Long> totalSales = Expressions.numberPath(Long.class, "totalSales");

        // 쿼리 작성
        Tuple tuple = queryFactory
                .select(salesCommercial.commercialCode,
                        salesCommercial.monthSales.sum().as("totalSales"))
                .from(salesCommercial)
                .where(salesCommercial.commercialCode.eq(commercialCode)
                        .and(salesCommercial.periodCode.eq("20233")))
                .groupBy(salesCommercial.commercialCode)
                .orderBy(salesCommercial.monthSales.sum().desc())
                .fetchFirst(); // 첫 번째 결과만 가져옴 (fetchOne()과 동일한 경우도 있음)

        return tuple.get(totalSales);
    }
}
