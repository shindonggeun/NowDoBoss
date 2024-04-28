package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.entity.StoreAdministration;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StoreAdministrationRepository extends JpaRepository<StoreAdministration, Long>, StoreAdministrationCustomRepository {

}
