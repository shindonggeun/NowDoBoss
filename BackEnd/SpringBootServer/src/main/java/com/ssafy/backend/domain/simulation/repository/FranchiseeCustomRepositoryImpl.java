package com.ssafy.backend.domain.simulation.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.simulation.dto.FranchiseeInfo;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.simulation.entity.QFranchisee.*;
import static com.ssafy.backend.domain.simulation.entity.QServiceType.*;

@Repository
@RequiredArgsConstructor
public class FranchiseeCustomRepositoryImpl implements FranchiseeCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request) {
        return queryFactory
                .select(Projections.constructor(SearchFranchiseeResponse.class,
                        franchisee.id,
                        franchisee.brandName,
                        serviceType.serviceCode,
                        serviceType.serviceCodeName
                ))
                .from(franchisee)
                .join(franchisee.serviceType, serviceType)
                .where(isGreatherThen(request.lastId()), serviceCodeNameLikeKeyword(request.keyword()))
                .orderBy(franchisee.id.asc())
                .limit(10)
                .fetch();
    }

    private BooleanBuilder isGreatherThen(final Long franchiseeId) {
        BooleanBuilder builder = new BooleanBuilder();
        if (franchiseeId != null && franchiseeId > 0) {
            builder.and(franchisee.id.gt(franchiseeId));
        }
        return builder;
    }

    private BooleanBuilder serviceCodeNameLikeKeyword(final String keyword) {
        return NullSafeBuilder.build(() -> franchisee.brandName.like("%" + keyword + "%"));
    }

    @Override
    public Double findAvgByService(String serviceCode) {
        return queryFactory
                .select(franchisee.unitArea.avg())
                .from(franchisee)
                .join(franchisee.serviceType, serviceType)
                .where(equalsServiceCode(serviceCode))
                .fetchOne();
    }

    private BooleanBuilder equalsServiceCode(final String serviceCode) {
        return NullSafeBuilder.build(() -> serviceType.serviceCode.eq(serviceCode));
    }

    @Override
    public List<FranchiseeInfo> findByServiceCode(long franchiseePrice, long totalPrice, String serviceCode) {
        // 합계를 계산하는 표현식
        NumberExpression<Integer> totalCost = franchisee.subscription.multiply(1000)
                .add(franchisee.education.multiply(1000))
                .add(franchisee.deposit.multiply(1000))
                .add(franchisee.etc.multiply(1000))
                .add(franchisee.interior.multiply(1000))
                .add(ConstantImpl.create(franchiseePrice));

        // 합계와 주어진 totalPrice의 차이의 절대값을 계산하는 표현식
        NumberExpression<Integer> difference = totalCost.subtract(totalPrice).abs();

        return queryFactory
                .select(Projections.constructor(FranchiseeInfo.class,
                        totalCost,
                        franchisee.brandName,
                        franchisee.subscription.multiply(1000),
                        franchisee.education.multiply(1000),
                        franchisee.deposit.multiply(1000),
                        franchisee.etc.multiply(1000),
                        franchisee.interior.multiply(1000)))
                .from(franchisee)
                .orderBy(difference.asc())
                .limit(5)
                .fetch();
    }


}
