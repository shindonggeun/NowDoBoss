package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FootTrafficDistrictRepository extends JpaRepository<FootTrafficDistrict, Long> {

    @Query("SELECT f.districtCodeName, " +
            "f2.totalFootTraffic AS curTotalFootTraffic, " +
            "(f2.totalFootTraffic - f.totalFootTraffic) / f.totalFootTraffic * 100 AS totalFootTrafficChangeRate " +
            "FROM FootTrafficDistrict f " +
            "JOIN FootTrafficDistrict f2 ON f.districtCodeName = f2.districtCodeName " +
            "WHERE f.periodCode = '20232' " +
            "AND f2.periodCode = '20233' " +
            "AND f.districtCodeName IN ( " +
            "    SELECT districtCodeName " +
            "    FROM FootTrafficDistrict " +
            "    WHERE periodCode = '20233' " +
            "    ORDER BY totalFootTraffic DESC " +
            ")")
    List<FootTrafficDistrictTopFiveInfo> getTopFiveFootTrafficDistrictByPeriodCode(Pageable pageable);

}
