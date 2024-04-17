package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.entity.StoreDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreDistrictRepository extends JpaRepository<StoreDistrict, Long> {

    @Query("SELECT s.districtCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END) AS curTotalStore, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END) AS curOpenedStore, " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.totalStore ELSE 0 END) AS prevTotalStore, " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.openedStore ELSE 0 END) AS prevOpenedStore " +
            "FROM StoreDistrict s " +
            "WHERE s.districtCodeName IN :districtNames " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END)) DESC")
    List<OpenedStoreDistrictTopFiveInfo> getTopFiveOpenedStoreDistrictByPeriodCode(@Param("districtNames") List<String> districtNames);

    @Query("SELECT s.districtCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END) AS curTotalStore, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END) AS curClosedStore, " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.totalStore ELSE 0 END) AS prevTotalStore, " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.closedStore ELSE 0 END) AS prevClosedStore " +
            "FROM StoreDistrict s " +
            "WHERE s.districtCodeName IN :districtNames " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END)) DESC")
    List<ClosedStoreDistrictTopFiveInfo> getTopFiveClosedStoreDistrictByPeriodCode(@Param("districtNames") List<String> districtNames);

    @Query("SELECT s.districtCodeName " +
            "FROM StoreDistrict s " +
            "WHERE s.periodCode = '20233' " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(s.openedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopFiveOpenedStoreDistrictCodeNameByPeriodCode(Pageable pageable);


    @Query("SELECT s.districtCodeName " +
            "FROM StoreDistrict s " +
            "WHERE s.periodCode = '20233' " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(s.closedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopFiveClosedStoreDistrictCodeNameByPeriodCode(Pageable pageable);
}
