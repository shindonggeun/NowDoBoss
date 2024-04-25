package com.ssafy.backend.domain.district.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;
import com.ssafy.backend.domain.district.entity.QSalesDistrict;
import com.ssafy.backend.domain.district.entity.QStoreDistrict;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StoreDistrictCustomRepositoryImpl implements StoreDistrictCustomRepository {
    private final JPAQueryFactory queryFactory;


    @Override
    public List<OpenedStoreDistrictTopTenInfo> getTopTenOpenedStoreDistrictByPeriodCode() {
        QStoreDistrict sd = QStoreDistrict.storeDistrict;

        // 서브쿼리를 이용하여 top district 목록을 가져옴
        List<String> topDistrictNames = queryFactory
                .select(sd.districtCodeName)
                .from(sd)
                .where(sd.periodCode.eq("20233"))
                .groupBy(sd.districtCodeName)
                .orderBy(sd.openedStore.sum().divide(sd.totalStore.sum()).desc())
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        OpenedStoreDistrictTopTenInfo.class,
                        sd.districtCode,
                        sd.districtCodeName,
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().as("curTotalStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.openedStore).otherwise(0L).sum().as("curOpenedStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().as("prevTotalStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.openedStore).otherwise(0L).sum().as("prevOpenedStore")
                ))
                .from(sd)
                .where(sd.districtCodeName.in(topDistrictNames))
                .groupBy(sd.districtCode, sd.districtCodeName)
                .orderBy(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.openedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();
        }

    @Override
    public List<ClosedStoreDistrictTopTenInfo> getTopTenClosedStoreDistrictByPeriodCode(){
        QStoreDistrict sd = QStoreDistrict.storeDistrict;

        // 서브쿼리를 이용하여 top district 목록을 가져옴
        List<String> topDistrictNames = queryFactory
                .select(sd.districtCodeName)
                .from(sd)
                .where(sd.periodCode.eq("20233"))
                .groupBy(sd.districtCodeName)
                .orderBy(sd.closedStore.sum().divide(sd.totalStore.sum()).desc())
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        ClosedStoreDistrictTopTenInfo.class,
                        sd.districtCode,
                        sd.districtCodeName,
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum().as("curTotalStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.closedStore).otherwise(0L).sum().as("curClosedStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.totalStore).otherwise(0L).sum().as("prevTotalStore"),
                        new CaseBuilder().when(sd.periodCode.eq("20232")).then(sd.closedStore).otherwise(0L).sum().as("prevClosedStore")
                ))
                .from(sd)
                .where(sd.districtCodeName.in(topDistrictNames))
                .groupBy(sd.districtCode, sd.districtCodeName)
                .orderBy(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.closedStore).otherwise(0L).sum()
                        .divide(new CaseBuilder().when(sd.periodCode.eq("20233")).then(sd.totalStore).otherwise(0L).sum())
                        .desc())
                .fetch();
    }
}

