package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.entity.Franchisee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FranchiseeRepository extends JpaRepository<Franchisee, Long>, FranchiseeCustomRepository {

}
