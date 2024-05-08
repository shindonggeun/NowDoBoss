package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.StoreCommercial;
import com.ssafy.backend.domain.district.entity.enums.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreCommercialRepository extends JpaRepository<StoreCommercial, Long>, StoreCommercialCustom {
    @Query(value = "SELECT SUM(total_store) FROM store_commercial WHERE commercial_code = :commercialCode AND period_code = :periodCode", nativeQuery = true)
    Long findByCommercialCode(String commercialCode, String periodCode);

    @Query(value = "SELECT sc.service_type " +
            "FROM store_commercial sc " +
            "WHERE sc.period_code = :periodCode " +
            "AND sc.commercial_code = :commercialCode " +
            "AND sc.service_code = :serviceCode", nativeQuery = true)
    ServiceType findServiceTypeByPeriodCodeAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

    @Query(value = "SELECT * " +
            "FROM store_commercial sc " +
            "WHERE sc.period_code = :periodCode " +
            "AND sc.commercial_code = :commercialCode " +
            "AND sc.service_type = :#{#serviceType.name()}", nativeQuery = true)
    List<StoreCommercial> findOtherServicesInSameCategory(String periodCode, String commercialCode, ServiceType serviceType);
}
