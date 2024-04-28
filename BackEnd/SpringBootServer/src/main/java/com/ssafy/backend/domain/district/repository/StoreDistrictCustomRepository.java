package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.*;
import java.util.List;


public interface StoreDistrictCustomRepository {
    List<OpenedStoreDistrictTopTenResponse> getTopTenOpenedStoreDistrictByPeriodCode();
    List<ClosedStoreDistrictTopTenResponse> getTopTenClosedStoreDistrictByPeriodCode();
    List<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(String periodCode, String districtCode);
}
