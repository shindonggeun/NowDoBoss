package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;


public interface FootTrafficDistrictRepository extends JpaRepository<FootTrafficDistrict, Long>, FootTrafficDistrictCustomRepository {

    @Query("SELECT f FROM FootTrafficDistrict f WHERE f.periodCode IN ('20224', '20231', '20232', '20233') AND f.districtCode = :districtCode ORDER BY f.periodCode")
    List<FootTrafficDistrict> getFootTrafficDistrictDetail(@Param("districtCode")String districtCode);
}
