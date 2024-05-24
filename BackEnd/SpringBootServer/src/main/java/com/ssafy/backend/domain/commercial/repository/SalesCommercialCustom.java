package com.ssafy.backend.domain.commercial.repository;

import java.util.List;

public interface SalesCommercialCustom {
    public Long getOtherSalesByPeriodCodeAndCommercialCode(String periodCode);
    public Long getAdministrationSalesByPeriodCodeAndCommercialCode(List<String> commercialCodes, String periodCode);
    public List<String> findTopSalesCommercialInCommercialCodes(List<String> commercialCodes, String periodCode);
    public Long findTopSalesByCommercialCode(String commercialCode);
}
