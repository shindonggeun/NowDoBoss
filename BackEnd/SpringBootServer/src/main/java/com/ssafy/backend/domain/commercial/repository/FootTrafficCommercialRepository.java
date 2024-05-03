package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.FootTrafficCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FootTrafficCommercialRepository extends JpaRepository<FootTrafficCommercial, Long> {
    Optional<FootTrafficCommercial> findByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);

    @Query(value = "SELECT SUM(total_foot_traffic) / count(*) FROM foot_traffic_commercial WHERE period_code = :periodCode", nativeQuery = true)
    Long getOtherFootTrafficByPeriodCodeAndCommercialCode(String periodCode);

    @Query(value = "SELECT SUM(total_foot_traffic) / count(*) FROM foot_traffic_commercial WHERE commercial_code IN :commercialCodes " +
            " and period_code = :periodCode", nativeQuery = true)
    Long getAdministrationFootTrafficByPeriodCodeAndCommercialCode(List<String> commercialCodes, String periodCode);
}
