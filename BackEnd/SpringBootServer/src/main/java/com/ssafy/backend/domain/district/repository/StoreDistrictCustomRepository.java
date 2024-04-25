package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.ClosedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.OpenedStoreDistrictTopTenInfo;
import com.ssafy.backend.domain.district.dto.StoreDistrictTotalTopEightInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface StoreDistrictCustomRepository {
    List<OpenedStoreDistrictTopTenInfo> getTopTenOpenedStoreDistrictByPeriodCode();
    List<ClosedStoreDistrictTopTenInfo> getTopTenClosedStoreDistrictByPeriodCode();
    List<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(String periodCode, String districtCode);
}
