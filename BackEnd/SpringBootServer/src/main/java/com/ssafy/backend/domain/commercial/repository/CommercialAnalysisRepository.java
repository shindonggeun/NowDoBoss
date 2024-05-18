package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.document.CommercialAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommercialAnalysisRepository extends MongoRepository<CommercialAnalysis, Long> {
    boolean existsByDistrictCodeAndAdministrationCodeAndCommercialCodeAndServiceCode(
            String districtCode, String administrationCode, String commercialCode, String serviceCode);

    List<CommercialAnalysis> findByMemberIdOrderByCreatedAt(Long memberId);

    void deleteByMemberId(Long memberId);
}
