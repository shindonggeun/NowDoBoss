package com.ssafy.backend.global.component.cache;

import com.ssafy.backend.domain.district.service.DistrictService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class CacheWarmer implements ApplicationRunner {
    private final DistrictService districtService;

    public CacheWarmer(DistrictService districtService) {
        this.districtService = districtService;
    }

    @Override
    public void run(ApplicationArguments args) {
        districtService.getTopTenDistricts(); // 데이터를 미리 로드하여 캐시합니다.
    }
}
