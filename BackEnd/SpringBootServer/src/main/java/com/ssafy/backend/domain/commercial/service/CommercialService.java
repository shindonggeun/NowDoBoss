package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.request.CommercialAnalysisSaveRequest;
import com.ssafy.backend.domain.commercial.dto.request.ConversionCodeNameRequest;
import com.ssafy.backend.domain.commercial.dto.response.*;
import com.ssafy.backend.global.common.dto.PageResponse;

import java.util.List;

public interface CommercialService {

    ConversionCodeResponse conversionCodeNameToCode(ConversionCodeNameRequest request);
    List<CommercialAdministrationResponse> getAdministrativeAreasByDistrict(String districtCode);

    List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode);

    CommercialFootTrafficResponse getFootTrafficByPeriodAndCommercialCode(String periodCode, String commercialCode);

    List<CommercialServiceResponse> getServiceByCommercialCode(String commercialCode);

    CommercialSalesResponse getSalesByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

    AllSalesResponse getAllSalesByPeriodAndDistrictCodeAndAdministrationCodeAndCommercialCodeAndServiceCode(
            Long memberId, String periodCode, String districtCode, String administrationCode, String commercialCode, String serviceCode);

    CommercialPopulationResponse getPopulationByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialFacilityResponse getFacilityByPeriodAndCommercialCode(String periodCode, String commercialCode);

    CommercialAdministrationAreaResponse getAdministrationInfoByCommercialCode(Long memberId, String commercialCode);

    CommercialStoreResponse getStoreByPeriodAndCommercialCodeAndServiceCode(String periodCode, String commercialCode, String serviceCode);

    CommercialIncomeResponse getIncomeByPeriodCodeAndCommercialCode(String periodCode, String commercialCode);

    AllIncomeResponse getAllIncomeByPeriodCodeAndDistrictCodeAndAdministrationCodeAndCommercialCode(
            String periodCode, String districtCode, String administrationCode, String commercialCode);

    void saveAnalysis(Long memberId, CommercialAnalysisSaveRequest analysisSaveRequest);

    PageResponse<CommercialAnalysisResponse> getMyAnalysisListByMemberId(Long memberId, int page, int size);
}
