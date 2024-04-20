package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.SalesAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.entity.SalesAdministration;
import com.ssafy.backend.domain.administration.entity.StoreAdministration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesAdministrationRepository extends JpaRepository<SalesAdministration, Long> {

    @Query("SELECT new com.ssafy.backend.domain.administration.dto.SalesAdministrationTopFiveInfo(" +
            "s.administrationCode, s.administrationCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.monthSales ELSE 0 END)) " +
            "FROM SalesAdministration s " +
            "WHERE s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode, s.administrationCodeName " +
            "ORDER BY SUM(CASE WHEN s.periodCode = '20233' THEN s.monthSales ELSE 0 END) DESC")
    List<SalesAdministrationTopFiveInfo> getTopFiveSalesAdministrationByAdministrationCode(@Param("administrationCodes")List<String> administrationCodes);

    @Query("SELECT s.administrationCode " +
            "FROM SalesAdministration s " +
            "WHERE s.periodCode = '20233' " +
            "AND s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode " +
            "ORDER BY SUM(s.monthSales) DESC")
    Page<String> getTopFiveSalesAdministrations(@Param("administrationCodes")List<String> administrationCodes, Pageable pageable);


}
