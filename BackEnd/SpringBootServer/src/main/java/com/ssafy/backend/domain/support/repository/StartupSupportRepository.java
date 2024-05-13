package com.ssafy.backend.domain.support.repository;

import com.ssafy.backend.domain.support.entity.StartupSupport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StartupSupportRepository extends JpaRepository<StartupSupport, Long> {
}
