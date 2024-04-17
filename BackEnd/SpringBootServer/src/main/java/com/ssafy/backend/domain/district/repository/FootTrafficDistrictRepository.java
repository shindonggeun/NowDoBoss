package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopFiveInfo;
import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface FootTrafficDistrictRepository extends JpaRepository<FootTrafficDistrict, Long> {

    @Query("SELECT f.districtCodeName, " +
            "f2.totalFootTraffic AS curTotalFootTraffic, " +
            "f.totalFootTraffic AS prevTotalFootTraffic " +
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
    Page<FootTrafficDistrictTopFiveInfo> getTopFiveFootTrafficDistrictByPeriodCode(Pageable pageable);

}
