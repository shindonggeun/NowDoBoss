package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialAreaResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialFootTrafficResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialSalesResponse;

import java.util.List;

public interface CommercialService {
    List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode);

    List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode);

    CommercialFootTrafficResponse getFootTrafficByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);
}
