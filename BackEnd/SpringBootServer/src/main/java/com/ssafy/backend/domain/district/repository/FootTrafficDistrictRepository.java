package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FootTrafficDistrictRepository extends JpaRepository<FootTrafficDistrict, Long> {

    @Query("SELECT f.districtCodeName FROM FootTrafficDistrict f WHERE f.periodCode = :periodCode ORDER BY f.totalFootTraffic DESC")
    Page<String> getTopFiveFootTrafficDistrictByPeriodCode(@Param("periodCode") String periodCode, Pageable pageable);
}
