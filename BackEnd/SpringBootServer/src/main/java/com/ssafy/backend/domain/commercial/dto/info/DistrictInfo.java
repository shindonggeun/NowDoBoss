package com.ssafy.backend.domain.commercial.dto.info;

import com.ssafy.backend.domain.commercial.dto.response.ConversionCodeResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DistrictInfo implements ConversionCodeResponse {
    private String districtCode;
    private String districtCodeName;
}

