package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.entity.IncomeAdministration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomeAdministrationRepository extends JpaRepository<IncomeAdministration, Long> {
    Optional<IncomeAdministration> findByPeriodCodeAndAdministrationCode(String periodCode, String administrationCode);
}
