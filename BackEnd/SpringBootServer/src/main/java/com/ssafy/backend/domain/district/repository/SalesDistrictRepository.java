package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.SalesDistrict;
import com.ssafy.backend.domain.simulation.dto.info.QuarterSalesInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SalesDistrictRepository extends JpaRepository<SalesDistrict, Long>, SalesDistrictCustomRepository {

    @Query("select s from SalesDistrict s " +
            "where s.periodCode = :periodCode " +
            "and s.districtCodeName = :districtCodeName " +
            "and s.serviceCode = :serviceCode")
    Optional<SalesDistrict> findSalesDistrictByOption(String periodCode, String districtCodeName, String serviceCode);


    @Query("select  new com.ssafy.backend.domain.simulation.dto.info.QuarterSalesInfo(s.periodCode, s.monthSales) " +
            "from SalesDistrict s " +
            "where s.periodCode like CONCAT(:period, '_') " +
            "and s.districtCodeName = :districtCodeName " +
            "and s.serviceCode = :serviceCode " +
            "order by s.monthSales asc")
    List<QuarterSalesInfo> findMonthSalesByOption(String period, String districtCodeName, String serviceCode);

}
