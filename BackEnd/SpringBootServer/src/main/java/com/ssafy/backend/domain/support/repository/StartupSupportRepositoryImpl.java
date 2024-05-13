package com.ssafy.backend.domain.support.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.support.dto.response.StartupSupportListResponse;
import com.ssafy.backend.domain.support.entity.QStartupSupport;
import com.ssafy.backend.domain.support.entity.StartupSupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.community.entity.QCommunity.community;
import static com.ssafy.backend.domain.support.entity.QStartupSupport.*;

@Repository
@RequiredArgsConstructor
public class StartupSupportRepositoryImpl implements StartupSupportRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<StartupSupportListResponse> selectSupport(Long lastId) {
        return queryFactory
                .select(Projections.constructor(StartupSupportListResponse.class,
                        startupSupport.id,
                        startupSupport.type,
                        startupSupport.applicationPeriod,
                        startupSupport.receivingInstitution,
                        startupSupport.detailPageLink
                ))
                .from(startupSupport)
                .where(isGreaterThan(lastId))
                .limit(10)
                .fetch();
    }

    private BooleanBuilder isGreaterThan(final Long startupSupportId) {
        BooleanBuilder builder = new BooleanBuilder();
        if (startupSupportId != null && startupSupportId > 0) {
            builder.and(startupSupport.id.gt(startupSupportId));
        }
        return builder;
    }
}
