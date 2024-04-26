package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.*;

import java.util.List;

public interface CommercialService {
    List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode);

    List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode);

    CommercialFootTrafficResponse getFootTrafficByPeriodAndCommercialCode(String periodCode, String commercialCode);

    List<CommercialServiceResponse> getServiceByCommercialCode(String commercialCode);

    CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

    CommercialPopulationResponse getPopulationByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialFacilityResponse getFacilityByPeriodAndCommercialCode(String periodCode, String commercialCode);
}
