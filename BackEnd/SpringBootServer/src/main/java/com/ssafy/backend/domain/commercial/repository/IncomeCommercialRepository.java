package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.IncomeCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeCommercialRepository extends JpaRepository<IncomeCommercial, Long> {
    Optional<IncomeCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);

    List<IncomeCommercial> findByCommercialCodeAndPeriodCodeInOrderByPeriodCode(String commercialCode, List<String> periodCodes);
}
