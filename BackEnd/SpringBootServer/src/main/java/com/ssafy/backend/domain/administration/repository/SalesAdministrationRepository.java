package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.entity.SalesAdministration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesAdministrationRepository extends JpaRepository<SalesAdministration, Long>, SalesAdministrationCustomRepository {
}
