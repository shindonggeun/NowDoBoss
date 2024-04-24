package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<ServiceType, Long> {
    Optional<ServiceType> findByServiceCode(String serviceCode);
}
