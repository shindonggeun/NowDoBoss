package com.ssafy.backend.domain.recommendation.repository;

import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import com.ssafy.backend.global.common.dto.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends MongoRepository<RecommendationDocument, Long> {

    void deleteByUserIdAndCommercialCode(Long userId, String commercialCode);

    Page<RecommendationDocument> findByUserId(Pageable pageable, Long userId);

    boolean existsByUserIdAndCommercialCode(Long userId, String commercialCode);

    void deleteByUserId(Long userId);

}