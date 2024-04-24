package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.SalesDistrictTopTenInfo;

import java.util.List;


public interface StoreDistrictCustomRepository {
    List<OpenedStoreDistrictTopTenInfo> getTopTenOpenedStoreDistrictByPeriodCode();
    List<ClosedStoreDistrictTopTenInfo> getTopTenClosedStoreDistrictByPeriodCode();
}
