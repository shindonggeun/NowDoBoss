package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.PopulationCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PopulationCommercialRepository extends JpaRepository<PopulationCommercial, Long> {
    Optional<PopulationCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);
}
