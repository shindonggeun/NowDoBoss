package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.SalesCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SalesCommercialRepository extends JpaRepository<SalesCommercial, Long> {
    Optional<SalesCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);

    Optional<SalesCommercial> findByPeriodCodeAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);
}
