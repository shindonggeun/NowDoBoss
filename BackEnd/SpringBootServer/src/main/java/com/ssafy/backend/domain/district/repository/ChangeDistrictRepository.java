package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.ChangeDistrict;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChangeDistrictRepository extends JpaRepository<ChangeDistrict, Long> {
    @Query("SELECT cd FROM ChangeDistrict cd WHERE cd.periodCode = '20233' AND cd.districtCode = :districtCode")
    ChangeDistrict getChangeIndicatorDistrictByDistrictCodeAndPeriodCode(@Param("districtCode") String districtCode);

}
