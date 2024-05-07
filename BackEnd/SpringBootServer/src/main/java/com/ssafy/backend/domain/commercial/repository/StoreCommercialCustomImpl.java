package com.ssafy.backend.domain.commercial.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.commercial.entity.QStoreCommercial;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class StoreCommercialCustomImpl implements StoreCommercialCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Map<String, Object> getOtherStoreByPeriodCodeAndCommercialCode(String periodCode){
        QStoreCommercial storeCommercial = QStoreCommercial.storeCommercial;

        // 서브쿼리에서 사용할 서브 쿼리용 서브패스 생성
        com.querydsl.core.types.dsl.NumberPath<Long> allStore = Expressions.numberPath(Long.class, "allStore");
        com.querydsl.core.types.dsl.NumberPath<Long> closedStore = Expressions.numberPath(Long.class, "closedStore");
        com.querydsl.core.types.dsl.NumberPath<Long> numCommercial = Expressions.numberPath(Long.class, "numCommercial");

        // 서브쿼리
        List<Tuple> subQueryResult = queryFactory
                .select(
                        storeCommercial.commercialCode,
                        storeCommercial.totalStore.sum().as("allStore"),
                        storeCommercial.totalStore.multiply(storeCommercial.closedRate.divide(Expressions.constant(100))).sum().as("closedStore"),
                        storeCommercial.commercialCode.countDistinct().as("numCommercial")
                )
                .from(storeCommercial)
                .where(storeCommercial.periodCode.eq(periodCode))
                .groupBy(storeCommercial.commercialCode)
                .fetch();

        // 결과 매핑
        Long totalStoreSum = 0L;
        Double closedStoreSum = 0.0;
        Long numCommercialSum = 0L;
        for (Tuple tuple : subQueryResult) {
            totalStoreSum += tuple.get(allStore);
            closedStoreSum += tuple.get(closedStore);
            numCommercialSum += tuple.get(numCommercial);
        }


        // 결과를 Map으로 반환
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("otherStores", totalStoreSum / numCommercialSum);
        resultMap.put("otherClosedRate", (closedStoreSum / totalStoreSum) * 100);

        return resultMap;
    }

    @Override
    public Map<String, Object> getAdministrationStoreByPeriodCodeAndCommercialCode(List<String> commercialCodes, String periodCode) {
        QStoreCommercial storeCommercial = QStoreCommercial.storeCommercial;

        // 서브쿼리에서 사용할 서브 쿼리용 서브패스 생성
        com.querydsl.core.types.dsl.NumberPath<Long> allStore = Expressions.numberPath(Long.class, "allStore");
        com.querydsl.core.types.dsl.NumberPath<Long> closedStore = Expressions.numberPath(Long.class, "closedStore");
        com.querydsl.core.types.dsl.NumberPath<Long> numCommercial = Expressions.numberPath(Long.class, "numCommercial");

        // 서브쿼리
        List<Tuple> subQueryResult = queryFactory
                .select(
                        storeCommercial.commercialCode,
                        storeCommercial.totalStore.sum().as("allStore"),
                        storeCommercial.totalStore.multiply(storeCommercial.closedRate.divide(Expressions.constant(100))).sum().as("closedStore"),
                        storeCommercial.commercialCode.countDistinct().as("numCommercial")
                )
                .from(storeCommercial)
                .where(storeCommercial.periodCode.eq(periodCode)
                        .and(storeCommercial.commercialCode.in(commercialCodes)))
                .groupBy(storeCommercial.commercialCode)
                .fetch();

        // 결과 매핑
        Long totalStoreSum = 0L;
        Double closedStoreSum = 0.0;
        Long numCommercialSum = 0L;
        for (Tuple tuple : subQueryResult) {
            totalStoreSum += tuple.get(allStore);
            closedStoreSum += tuple.get(closedStore);
            numCommercialSum += tuple.get(numCommercial);
        }


        // 결과를 Map으로 반환
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("administrationStores", totalStoreSum / numCommercialSum);
        resultMap.put("administrationClosedRate", (closedStoreSum / totalStoreSum) * 100);

        return resultMap;
    }

    @Override
    public Map<String, Long> getAdministrationStoreByServiceCode(List<String> commercialCodes, String periodCode) {
        // QStoreCommercial의 인스턴스 생성
        QStoreCommercial storeCommercial = QStoreCommercial.storeCommercial;

        // 쿼리 실행
        List<Tuple> results = queryFactory
                .select(storeCommercial.serviceCodeName, storeCommercial.totalStore.sum())
                .from(storeCommercial)
                .where(storeCommercial.periodCode.eq(periodCode)
                        .and(storeCommercial.commercialCode.in(commercialCodes)))
                .groupBy(storeCommercial.serviceCodeName)
                .fetch();

        // 결과를 Map으로 변환
        Map<String, Long> resultMap = new HashMap<>();
        for (Tuple result : results) {
            resultMap.put(result.get(storeCommercial.serviceCodeName), result.get(storeCommercial.totalStore.sum()).longValue());
        }
        return resultMap;
    }

    @Override
    public Map<String, Long> getMyStoreByServiceCode(String commercialCode, String periodCode) {
        // QStoreCommercial의 인스턴스 생성
        QStoreCommercial storeCommercial = QStoreCommercial.storeCommercial;

        // 쿼리 실행
        List<Tuple> results = queryFactory
                .select(storeCommercial.serviceCodeName, storeCommercial.totalStore.sum())
                .from(storeCommercial)
                .where(storeCommercial.periodCode.eq(periodCode)
                        .and(storeCommercial.commercialCode.eq(commercialCode)))
                .groupBy(storeCommercial.serviceCodeName)
                .fetch();

        // 결과를 Map으로 변환
        Map<String, Long> resultMap = new HashMap<>();
        for (Tuple result : results) {
            resultMap.put(result.get(storeCommercial.serviceCodeName), result.get(storeCommercial.totalStore.sum()).longValue());
        }
        return resultMap;
    }
}
