package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;
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

    @Query("SELECT new com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo(" +
            "s.districtCode, " +
            "s.districtCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.openedStore ELSE 0 END)) " +
            "FROM StoreDistrict s " +
            "WHERE s.districtCodeName IN :districtNames " +
            "GROUP BY s.districtCode, s.districtCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.openedStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END)) DESC")
    List<OpenedStoreDistrictTopTenInfo> getTopTenOpenedStoreDistrictByPeriodCode(List<String> districtNames);

    @Query("SELECT new com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo(" +
            "s.districtCode, " +
            "s.districtCodeName, " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.totalStore ELSE 0 END), " +
            "SUM(CASE WHEN s.periodCode = '20232' THEN s.closedStore ELSE 0 END)) " +
            "FROM StoreDistrict s " +
            "WHERE s.districtCodeName IN :districtNames " +
            "GROUP BY s.districtCode, s.districtCodeName " +
            "ORDER BY (SUM(CASE WHEN s.periodCode = '20233' THEN s.closedStore ELSE 0 END) / SUM(CASE WHEN s.periodCode = '20233' THEN s.totalStore ELSE 0 END)) DESC")
    List<ClosedStoreDistrictTopTenInfo> getTopTenClosedStoreDistrictByPeriodCode(List<String> districtNames);

    @Query("SELECT new com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo(" +
            "s.serviceCode, s.serviceCodeName, s.totalStore) " +
            "FROM StoreDistrict s WHERE s.periodCode = '20233' AND s.districtCode = :districtCode AND s.serviceType IS NOT NULL ORDER BY s.totalStore DESC")
    Page<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(@Param("districtCode")String districtCode, Pageable pageable);

    @Query("SELECT s.districtCodeName " +
            "FROM StoreDistrict s " +
            "WHERE s.periodCode = '20233' " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(s.openedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopTenOpenedStoreDistrictCodeNameByPeriodCode(Pageable pageable);


    @Query("SELECT s.districtCodeName " +
            "FROM StoreDistrict s " +
            "WHERE s.periodCode = '20233' " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY (SUM(s.closedStore) / SUM(s.totalStore)) DESC")
    Page<String> getTopTenClosedStoreDistrictCodeNameByPeriodCode(Pageable pageable);
}
