package com.ssafy.backend.domain.district.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.district.dto.info.StoreDistrictTotalTopEightInfo;
import com.ssafy.backend.domain.district.dto.response.ClosedStoreDistrictTopTenResponse;
import com.ssafy.backend.domain.district.dto.response.OpenedStoreDistrictTopTenResponse;
import com.ssafy.backend.domain.district.entity.QStoreDistrict;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StoreDistrictCustomRepositoryImpl implements StoreDistrictCustomRepository {
    private final JPAQueryFactory queryFactory;


    @Override
    public List<OpenedStoreDistrictTopTenResponse> getTopTenOpenedStoreDistrictByPeriodCode() {
        QStoreDistrict sd = QStoreDistrict.storeDistrict;

//        // 서브쿼리를 이용하여 top district 목록을 가져옴
//        List<String> topDistrictNames = queryFactory
//                .select(sd.districtCodeName)
//                .from(sd)
//                .where(sd.periodCode.eq("20233"))
//                .groupBy(sd.districtCodeName)
//                .orderBy(sd.openedStore.sum().divide(sd.totalStore.sum()).desc())
//                .fetch();

        List<Tuple> districtData = queryFactory
                .select(sd.districtCode,
                        sd.districtCodeName,
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.openedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                .multiply(100).as("total"),
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.openedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                .multiply(100)
                                .subtract(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.openedStore).otherwise(0L).sum().doubleValue()
                                    .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                    .multiply(100))
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.openedStore).otherwise(0L).sum().doubleValue()
                                        .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                        .multiply(100)).multiply(100).as("totalRate")
                )
                .from(sd)
//                .where(sd.districtCodeName.in(topDistrictNames))
                .groupBy(sd.districtCode, sd.districtCodeName)
                .orderBy(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.openedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();

        List<OpenedStoreDistrictTopTenResponse> responses = new ArrayList<>();
        int level = 0;
        for (int i = 0; i < districtData.size(); i++) {
            if (i % 5 == 0) {
                level++; // 10개 단위로 level 증가
            }
            OpenedStoreDistrictTopTenResponse response = new OpenedStoreDistrictTopTenResponse(
                    districtData.get(i).get(sd.districtCode),
                    districtData.get(i).get(sd.districtCodeName),
                    districtData.get(i).get(Expressions.numberPath(Double.class, "total")),
                    districtData.get(i).get(Expressions.numberPath(Double.class, "totalRate")),
                    level
            );
            responses.add(response);
        }
        return responses;
    }

    @Override
    public List<ClosedStoreDistrictTopTenResponse> getTopTenClosedStoreDistrictByPeriodCode(){
        QStoreDistrict sd = QStoreDistrict.storeDistrict;

//        // 서브쿼리를 이용하여 top district 목록을 가져옴
//        List<String> topDistrictNames = queryFactory
//                .select(sd.districtCodeName)
//                .from(sd)
//                .where(sd.periodCode.eq("20233"))
//                .groupBy(sd.districtCodeName)
//                .orderBy(sd.closedStore.sum().divide(sd.totalStore.sum()).desc())
//                .fetch();

        List<Tuple> districtData = queryFactory
                .select(sd.districtCode,
                        sd.districtCodeName,
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.closedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                .multiply(100).as("total"),
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.closedStore).otherwise(0L).sum().doubleValue()
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                .multiply(100)
                                .subtract(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.closedStore).otherwise(0L).sum().doubleValue()
                                        .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                        .multiply(100))
                                .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.closedStore).otherwise(0L).sum().doubleValue()
                                        .divide(new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().doubleValue())
                                        .multiply(100)).multiply(100).as("totalRate")
                )
                .from(sd)
//                .where(sd.districtCodeName.in(topDistrictNames))
                .groupBy(sd.districtCode, sd.districtCodeName)
                .orderBy(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.closedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();

        List<ClosedStoreDistrictTopTenResponse> responses = new ArrayList<>();
        int level = 0;
        for (int i = 0; i < districtData.size(); i++) {
            if (i % 5 == 0) {
                level++; // 10개 단위로 level 증가
            }
            ClosedStoreDistrictTopTenResponse response = new ClosedStoreDistrictTopTenResponse(
                    districtData.get(i).get(sd.districtCode),
                    districtData.get(i).get(sd.districtCodeName),
                    districtData.get(i).get(Expressions.numberPath(Double.class, "total")),
                    districtData.get(i).get(Expressions.numberPath(Double.class, "totalRate")),
                    level
            );
            responses.add(response);
        }
        return responses;
     }

    @Override
    public List<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(String periodCode, String districtCode) {
        QStoreDistrict storeDistrict = QStoreDistrict.storeDistrict;
        //QStoreDistrict s = new QStoreDistrict("s");

//        SubQueryExpression<Long> periodCode20232Query = JPAExpressions
//                .select(s.totalStore)
//                .from(s)
//                .where(s.periodCode.eq("20224")
//                        .and(s.districtCode.eq(districtCode))
//                        .and(s.serviceType.isNotNull())
//                        .and(s.serviceCode.eq(storeDistrict.serviceCode))); // 서비스 코드 일치 조건 추가

        return queryFactory
                .select(Projections.constructor(
                        StoreDistrictTotalTopEightInfo.class,
                        storeDistrict.serviceCode,
                        storeDistrict.serviceCodeName,
//                        new CaseBuilder()
//                                .when(storeDistrict.periodCode.eq("20233"))
//                                .then(storeDistrict.totalStore)
//                                .otherwise(0L)
//                                .doubleValue()
//                                .subtract(periodCode20232Query)
//                                .divide(periodCode20232Query)
                        storeDistrict.totalStore.sum()
                ))
                .from(storeDistrict)
                .groupBy(storeDistrict.serviceCode, storeDistrict.serviceCodeName)
                .where(storeDistrict.periodCode.eq(periodCode)
                        .and(storeDistrict.districtCode.eq(districtCode))
                        .and(storeDistrict.serviceType.isNotNull()))
                //.orderBy(new CaseBuilder().when(storeDistrict.periodCode.eq("20233")).then(storeDistrict.totalStore).otherwise(0L).desc())
                .orderBy(storeDistrict.totalStore.sum().desc())
                .limit(8)
                .fetch();
    }





}

