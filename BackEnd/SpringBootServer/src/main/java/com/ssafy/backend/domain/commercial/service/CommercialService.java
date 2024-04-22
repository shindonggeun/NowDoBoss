package com.ssafy.backend.domain.commercial.service;

import com.ssafy.backend.domain.commercial.dto.AdministrativeAreaCommercialResponse;

import java.util.List;

public interface CommercialService {
    List<AdministrativeAreaCommercialResponse> getAdministrativeAreasByDistrict(String districtCode);
}
