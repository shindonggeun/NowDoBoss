package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface StoreDistrictCustomRepository {
    List<OpenedStoreDistrictTopTenResponse> getTopTenOpenedStoreDistrictByPeriodCode();
    List<ClosedStoreDistrictTopTenResponse> getTopTenClosedStoreDistrictByPeriodCode();
    List<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(String periodCode, String districtCode);
}
