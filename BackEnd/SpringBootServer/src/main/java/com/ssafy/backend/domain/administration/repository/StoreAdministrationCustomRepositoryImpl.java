package com.ssafy.backend.domain.administration.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.administration.dto.info.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.info.OpenedStoreAdministrationTopFiveInfo;
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
        // 서브쿼리를 이용해 폐업률 top 5 행정동 코드 목록 구하기
        List<String> topAdministrationCodes = queryFactory
                .select(sa.administrationCode)
                .from(sa)
                .where(sa.periodCode.eq(periodCode),
                        sa.administrationCode.in(allAdministrationCodes))
                .groupBy(sa.administrationCode)
                .orderBy(sa.openedStore.sum().desc())
                .limit(5)
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        OpenedStoreAdministrationTopFiveInfo.class,
                        sa.administrationCode,
                        sa.administrationCodeName,
                        new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.openedStore).otherwise(0L).sum()
                ))
                .from(sa)
                .where(sa.administrationCode.in(topAdministrationCodes))
                .groupBy(sa.administrationCode, sa.administrationCodeName )
                .orderBy(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.openedStore).otherwise(0L).sum().desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<ClosedStoreAdministrationTopFiveInfo> getTopFiveClosedRateAdministration(List<String> allAdministrationCodes, String periodCode) {
        QStoreAdministration sa = QStoreAdministration.storeAdministration;
        // 서브쿼리를 이용해 폐업률 top 5 행정동 코드 목록 구하기
        List<String> topAdministrationCodes = queryFactory
                .select(sa.administrationCode)
                .from(sa)
                .where(sa.periodCode.eq(periodCode),
                        sa.administrationCode.in(allAdministrationCodes))
                .groupBy(sa.administrationCode)
                .orderBy(sa.closedStore.sum().desc())
                .limit(5)
                .fetch();

        return queryFactory
                .select(Projections.constructor(
                        ClosedStoreAdministrationTopFiveInfo.class,
                        sa.administrationCode,
                        sa.administrationCodeName,
                        new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.closedStore).otherwise(0L).sum()
                ))
                .from(sa)
                .where(sa.administrationCode.in(topAdministrationCodes))
                .groupBy(sa.administrationCode, sa.administrationCodeName )
                .orderBy(new CaseBuilder().when(sa.periodCode.eq(periodCode)).then(sa.closedStore).otherwise(0L).sum()
                        .desc())
                .limit(5)
                .fetch();
    }
}
