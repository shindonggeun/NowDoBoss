package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.IncomeCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeCommercialRepository extends JpaRepository<IncomeCommercial, Long> {
    Optional<IncomeCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);

    List<IncomeCommercial> findByCommercialCodeAndPeriodCodeInOrderByPeriodCode(String commercialCode, List<String> periodCodes);

    @Query(value = "SELECT ic.total_price " +
            "FROM income_commercial ic " +
            "WHERE ic.commercial_code = :commercialCode " +
            "AND ic.period_code = :periodCode", nativeQuery = true)
    Long getTotalPriceByCommercialCode(String commercialCode, String periodCode);
}
