package com.ssafy.backend.domain.commercial.repository;

import com.ssafy.backend.domain.commercial.entity.FootTrafficCommercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FootTrafficCommercialRepository extends JpaRepository<FootTrafficCommercial, Long> {
}
