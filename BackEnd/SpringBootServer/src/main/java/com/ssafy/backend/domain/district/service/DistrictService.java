package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.administration.dto.info.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.info.OpenedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.info.SalesAdministrationTopFiveInfo;
import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.district.dto.info.SalesDistrictMonthSalesTopFiveInfo;
import com.ssafy.backend.domain.district.dto.info.StoreDistrictTotalTopEightInfo;
import com.ssafy.backend.domain.district.dto.response.*;


import java.util.List;

public interface DistrictService {

    List<DistrictAreaResponse> getAllDistricts();

    DistrictTopTenResponse getTopTenDistricts();
    
    DistrictDetailResponse getDistrictDetail(String districtCode);

    List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode);

    ChangeIndicatorDistrictResponse getDistrictChangeIndicatorDetail(String districtCode);

    FootTrafficDistrictDetailResponse getDistrictFootTrafficDetail(String districtCode);

    List<StoreDistrictTotalTopEightInfo> getDistrictTotalStoreDetail(String districtCode);

    List<ClosedStoreAdministrationTopFiveInfo> getDistrictClosedStoreDetail(String districtCode);

    List<OpenedStoreAdministrationTopFiveInfo> getDistrictOpenedStoreDetail(String districtCode);

    List<SalesDistrictMonthSalesTopFiveInfo> getDistrictSalesDetailByServiceCode(String districtCode);

    List<SalesAdministrationTopFiveInfo> getDistrictSalesDetailByAdministrationCode(String districtCode);
}
