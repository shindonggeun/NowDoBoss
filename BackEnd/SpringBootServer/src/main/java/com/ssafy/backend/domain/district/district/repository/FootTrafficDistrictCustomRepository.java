package com.ssafy.backend.domain.district.repository;

import com.ssafy.backend.domain.district.dto.FootTrafficDistrictTopTenInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FootTrafficDistrictCustomRepository {
    List<FootTrafficDistrictTopTenInfo> getTopTenFootTrafficDistrictByPeriodCode();
}
