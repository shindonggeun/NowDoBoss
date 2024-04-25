package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.entity.Franchisee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FranchiseeRepository extends JpaRepository<Franchisee, Long>, FranchiseeCustomRepository {
    Optional<Franchisee> findByBrandName(String brandName);
}
