package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.entity.StoreAdministration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreAdministrationRepository extends JpaRepository<StoreAdministration, Long> {

    @Query("SELECT new com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo(" +
            "s.administrationCode, s.administrationCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END)) " +
            "FROM StoreAdministration s " +
            "WHERE s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode, s.administrationCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END)) DESC")
    List<OpenedStoreAdministrationTopFiveInfo> getTopFiveOpenedRateAdministration(@Param("administrationCodes")List<String> administrationCodes);

    @Query("SELECT new com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo(" +
            "s.administrationCode, s.administrationCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END)) " +
            "FROM StoreAdministration s " +
            "WHERE s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode, s.administrationCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END)) DESC")
    List<ClosedStoreAdministrationTopFiveInfo> getTopFiveClosedRateAdministration(@Param("administrationCodes")List<String> administrationCodes);

    @Query("SELECT s.administrationCode " +
            "FROM StoreAdministration s " +
            "WHERE s.periodCode = '20233' " +
            "AND s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode " +
            "ORDER BY (SUM(s.openedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopFiveOpenedStoreAdministrationByAdministrationCode(@Param("administrationCodes")List<String> administrationCodes, Pageable pageable);

    @Query("SELECT s.administrationCode " +
            "FROM StoreAdministration s " +
            "WHERE s.periodCode = '20233' " +
            "AND s.administrationCode IN :administrationCodes " +
            "GROUP BY s.administrationCode " +
            "ORDER BY (SUM(s.closedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopFiveClosedStoreAdministrationByAdministrationCode(@Param("administrationCodes")List<String> administrationCodes, Pageable pageable);
}
