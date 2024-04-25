package com.ssafy.backend.domain.administration.repository;

import com.ssafy.backend.domain.administration.dto.ClosedStoreAdministrationTopFiveInfo;
import com.ssafy.backend.domain.administration.dto.OpenedStoreAdministrationTopFiveInfo;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreAdministrationCustomRepository {
    List<OpenedStoreAdministrationTopFiveInfo> getTopFiveOpenedRateAdministration(List<String> allAdministrationCodes, String periodCode);
    List<ClosedStoreAdministrationTopFiveInfo> getTopFiveClosedRateAdministration(List<String> allAdministrationCodes, String periodCode);
}
