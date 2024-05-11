package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.IncomeDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomeDistrictRepository extends JpaRepository<IncomeDistrict, Long> {
    Optional<IncomeDistrict> findByPeriodCodeAndDistrictCode(String periodCode, String districtCode);
}
