package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.SalesCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreCommercialRepository extends JpaRepository<SalesCommercial, Long>, StoreCommercialCustomRepository {
    @Query(value = "SELECT SUM(total_store) FROM store_commercial WHERE commercial_code = :commercialCode AND period_code = :periodCode", nativeQuery = true)
    Long findByCommercialCode(String commercialCode, String periodCode);
}
