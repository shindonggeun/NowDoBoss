package com.ssafy.backend.domain.administration.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesAdministrationTopFiveInfo {

    private String administrationCode;

    private String administrationCodeName;

    private Long monthSales;

}
