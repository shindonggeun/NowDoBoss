package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.district.dto.response.DistrictAreaResponse;
import com.ssafy.backend.domain.district.dto.response.DistrictDetailResponse;
import com.ssafy.backend.domain.district.dto.response.DistrictTopTenResponse;

import java.util.List;

public interface DistrictService {

    List<DistrictAreaResponse> getAllDistricts();

    DistrictTopTenResponse getTopTenDistricts();
    
    DistrictDetailResponse getDistrictDetail(String districtCode);

    List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode);
}
