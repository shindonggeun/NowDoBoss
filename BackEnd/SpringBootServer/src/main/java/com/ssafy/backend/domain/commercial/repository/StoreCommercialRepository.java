package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.StoreCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreCommercialRepository extends JpaRepository<StoreCommercial, Long>, StoreCommercialCustom {
    @Query(value = "SELECT SUM(total_store) FROM store_commercial WHERE commercial_code = :commercialCode AND period_code = :periodCode", nativeQuery = true)
    Long findByCommercialCode(String commercialCode, String periodCode);

    Optional<StoreCommercial> findByPeriodCodeAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);
}
