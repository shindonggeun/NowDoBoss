package com.ssafy.backend.domain.simulation.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.entity.QServiceType;
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
}
