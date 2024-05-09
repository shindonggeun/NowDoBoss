package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RentRepository extends JpaRepository<Rent, Long> {
    Optional<Rent> findByDistrictCodeName(String districtCodeName);

    Optional<Rent> findByDistrictCode(String districtCode);
}
