package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;
import com.ssafy.backend.domain.district.entity.SalesDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesDistrictRepository extends JpaRepository<SalesDistrict, Long> {
    @Query("SELECT new com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo(" +
            "sd.districtCode, " +
            "sd.districtCodeName, " +
            "SUM(CASE WHEN sd.periodCode = '20233' THEN sd.monthSales ELSE 0 END), " +
            "SUM(CASE WHEN sd.periodCode = '20232' THEN sd.monthSales ELSE 0 END)) " +
            "FROM SalesDistrict sd " +
            "WHERE sd.districtCodeName IN :districtNames " +
            "GROUP BY sd.districtCode, sd.districtCodeName " +
            "ORDER BY SUM(CASE WHEN sd.periodCode = '20232' THEN sd.monthSales ELSE 0 END) DESC")
    List<SalesDistrictTopTenInfo> getTopTenSalesDistrictByPeriodCode(@Param("districtNames") List<String> districtNames);

    @Query("SELECT s.districtCodeName " +
            "FROM SalesDistrict s " +
            "WHERE s.periodCode = '20233' " +
            "GROUP BY s.districtCodeName " +
            "ORDER BY SUM(s.monthSales) DESC")
    Page<String> getTopTenSalesDistrictCodeNameByPeriodCode(Pageable pageable);
}
