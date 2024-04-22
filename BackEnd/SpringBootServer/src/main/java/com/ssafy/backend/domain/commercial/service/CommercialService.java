package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.dto.CommercialAreaResponse;

import java.util.List;

public interface CommercialService {
    List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode);

    List<CommercialAreaResponse> getCommercialAreasByAdministrationCode(String administrationCode);
}
