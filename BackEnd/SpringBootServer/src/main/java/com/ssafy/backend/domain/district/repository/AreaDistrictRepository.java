package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.entity.AreaDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaDistrictRepository extends JpaRepository<AreaDistrict, Long> {
}
