package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface FootTrafficDistrictRepository extends JpaRepository<FootTrafficDistrict, Long>, FootTrafficDistrictCustomRepository {
    List<FootTrafficDistrict> findByPeriodCodeInAndDistrictCodeOrderByPeriodCode(List<String> periodCodes, String districtCode);
}
