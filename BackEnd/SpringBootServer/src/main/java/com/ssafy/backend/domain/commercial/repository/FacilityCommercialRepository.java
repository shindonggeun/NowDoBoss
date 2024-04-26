package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.FacilityCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacilityCommercialRepository extends JpaRepository<FacilityCommercial, Long> {
    Optional<FacilityCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);
}
