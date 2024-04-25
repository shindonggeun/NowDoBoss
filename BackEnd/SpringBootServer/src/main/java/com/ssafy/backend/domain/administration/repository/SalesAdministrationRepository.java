package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.SalesAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.entity.SalesAdministration;
import com.ssafy.backend.domain.administration.entity.StoreAdministration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesAdministrationRepository extends JpaRepository<SalesAdministration, Long>, SalesAdministrationCustomRepository {
}
