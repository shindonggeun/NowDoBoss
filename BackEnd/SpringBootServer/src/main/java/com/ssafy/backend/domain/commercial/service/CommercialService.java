package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.response.*;

import java.util.List;

public interface CommercialService {
    List<CommercialAdministrationResponse> getAdministrativeAreasByDistrict(String districtCode);

    List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode);

    CommercialFootTrafficResponse getFootTrafficByPeriodAndCommercialCode(String periodCode, String commercialCode);

    List<CommercialServiceResponse> getServiceByCommercialCode(String commercialCode);

    CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

    CommercialPopulationResponse getPopulationByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialFacilityResponse getFacilityByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialAdministrationAreaResponse getAdministrationInfoByCommercialCode(String commercialCode);

    CommercialStoreResponse getStoreByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

//    CommercialRentResponse getRentByDistrictCode()
}
