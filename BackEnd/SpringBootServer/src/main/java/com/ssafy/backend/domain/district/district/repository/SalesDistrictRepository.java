package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;
import com.ssafy.backend.domain.district.entity.SalesDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface SalesDistrictRepository extends JpaRepository<SalesDistrict, Long>, SalesDistrictCustomRepository {
    @Query("SELECT new com.ssafy.backend.domain.district.dto.SalesDistrictMonthSalesTopFiveInfo(" +
            "s.serviceCode, s.serviceCodeName, s.monthSales) " +
            "FROM SalesDistrict s WHERE s.periodCode = '20233' AND s.districtCode = :districtCode AND s.serviceType IS NOT NULL ORDER BY s.monthSales DESC")
    Page<SalesDistrictMonthSalesTopFiveInfo> getTopFiveMonthSalesByServiceCode(@Param("districtCode")String districtCode, Pageable pageable);

}
