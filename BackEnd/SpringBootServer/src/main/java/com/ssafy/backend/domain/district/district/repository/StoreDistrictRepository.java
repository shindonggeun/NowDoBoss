package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;
import com.ssafy.backend.domain.district.entity.StoreDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface StoreDistrictRepository extends JpaRepository<StoreDistrict, Long>, StoreDistrictCustomRepository {
    @Query("SELECT new com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo(" +
            "s.serviceCode, s.serviceCodeName, s.totalStore) " +
            "FROM StoreDistrict s WHERE s.periodCode = '20233' AND s.districtCode = :districtCode AND s.serviceType IS NOT NULL ORDER BY s.totalStore DESC")
    Page<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(@Param("districtCode")String districtCode, Pageable pageable);
}
