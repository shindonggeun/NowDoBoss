package com.ssafy.backend.domain.simulation.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.simulation.dto.info.FranchiseeInfo;
import com.ssafy.backend.domain.simulation.dto.request.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.response.SearchFranchiseeResponse;
import com.ssafy.backend.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.simulation.entity.QFranchisee.*;
import static com.ssafy.backend.domain.simulation.entity.QServiceType.*;

@Repository
@RequiredArgsConstructor
public class FranchiseeCustomRepositoryImpl implements FranchiseeCustomRepository {
    private static final int TEN_THOUSAND_MULTIPLIER = 10000;
    private static final int THOUSAND_MULTIPLIER = 1000;
    private static final int TEN = 10;

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
                .where(isGreatherThen(request.lastId()), brandNameLikeKeyword(request.keyword()))
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

    private BooleanBuilder brandNameLikeKeyword(final String keyword) {
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
        NumberExpression<Integer> totalCost = franchisee.subscription.multiply(THOUSAND_MULTIPLIER)
                .add(franchisee.education.multiply(THOUSAND_MULTIPLIER))
                .add(franchisee.deposit.multiply(THOUSAND_MULTIPLIER))
                .add(franchisee.etc.multiply(THOUSAND_MULTIPLIER))
                .add(franchisee.interior.multiply(THOUSAND_MULTIPLIER))
                .add(ConstantImpl.create(franchiseePrice));

        // 합계와 주어진 totalPrice의 차이의 절대값을 계산하는 표현식
        NumberExpression<Integer> difference = totalCost.subtract(totalPrice).abs();

        return queryFactory
                .select(Projections.constructor(FranchiseeInfo.class,
                        totalCost.divide(TEN_THOUSAND_MULTIPLIER),
                        franchisee.brandName,
                        franchisee.subscription.divide(TEN),
                        franchisee.education.divide(TEN),
                        franchisee.deposit.divide(TEN),
                        franchisee.etc.divide(TEN),
                        franchisee.interior.divide(TEN)))
                .from(franchisee)
                .orderBy(difference.asc())
                .limit(5)
                .fetch();
    }


}
