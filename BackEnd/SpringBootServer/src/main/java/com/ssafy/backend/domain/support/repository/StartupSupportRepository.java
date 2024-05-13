package com.ssafy.backend.domain.support.repository;

import com.ssafy.backend.domain.support.dto.response.StartupSupportListResponse;
import com.ssafy.backend.domain.support.entity.StartupSupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StartupSupportRepository {
//    @Query("SELECT s from StartupSupport s where s.id < :lastId limit(10)")
//    List<StartupSupport> find(Long lastId);

//    List<StartupSupport> findTop10ByIdLessThanLastIdOrderByIdDesc(Long lastId);

    List<StartupSupportListResponse> selectSupport(Long lastId);
}
