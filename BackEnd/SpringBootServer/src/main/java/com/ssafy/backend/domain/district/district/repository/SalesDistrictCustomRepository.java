package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;
import com.ssafy.backend.domain.district.entity.SalesDistrict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface SalesDistrictCustomRepository {
    List<SalesDistrictTopTenInfo> getTopTenSalesDistrictByPeriodCode();
}
