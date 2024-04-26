package com.ssafy.backend.domain.simulation.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeRequest;
import com.ssafy.backend.domain.simulation.dto.SearchFranchiseeResponse;
import com.ssafy.backend.domain.simulation.entity.QFranchisee;
import com.ssafy.backend.domain.simulation.entity.QServiceType;
import com.ssafy.backend.domain.simulation.entity.ServiceType;
import com.ssafy.backend.global.util.NullSafeBuilder;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.simulation.entity.QFranchisee.*;
import static com.ssafy.backend.domain.simulation.entity.QServiceType.*;

@Repository
@RequiredArgsConstructor
public class FranchiseeCustomRepositoryImpl implements FranchiseeCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

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
        /*
        @PersistenceContext
    private EntityManager entityManager;

    public Double calculateMedian() {
        // 네이티브 쿼리 실행
        Query query = entityManager.createNativeQuery(
            "SET @rowindex := -1; " +
            "SELECT AVG(d.unit_area) AS median " +
            "FROM " +
            "  (SELECT @rowindex:=@rowindex + 1 AS rowindex, " +
            "          franchisee.unit_area AS unit_area " +
            "   FROM franchisee " +
            "   ORDER BY franchisee.unit_area) AS d " +
            "WHERE " +
            "  d.rowindex IN (FLOOR(@rowindex / 2), CEIL(@rowindex / 2))"
        );

        // 결과 가져오기
        Object result = query.getSingleResult();

        // 결과를 Double로 변환하여 반환
        if (result instanceof Double) {
            return (Double) result;
        } else {
            return null; // 혹은 적절한 처리를 수행하십시오.
        }
    }
         */


//        중앙값 구하기
//        List<Integer> values  = queryFactory.select(franchisee.unitArea)
//                .from(franchisee)
//                .fetch();
//
//        // 중간값을 계산하기 위해 리스트를 정렬합니다.
//        values.sort(Integer::compareTo);
//
//        int size = values.size();
//        if (size % 2 == 0) {
//            // 리스트의 크기가 짝수인 경우
//            int midIndex1 = size / 2 - 1;
//            int midIndex2 = size / 2;
//            return (values.get(midIndex1) + values.get(midIndex2)) / 2.0;
//        } else {
//            // 리스트의 크기가 홀수인 경우
//            int midIndex = size / 2;
//            return values.get(midIndex).doubleValue();
//        }


//        평균 구하기
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
}
