package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.ChangeDistrict;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChangeDistrictRepository extends JpaRepository<ChangeDistrict, Long> {
    ChangeDistrict findByPeriodCodeAndDistrictCode(String periodCode, String districtCode);
}
