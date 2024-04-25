package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.administration.dto.*;
import com.ssafy.backend.domain.administration.repository.SalesAdministrationRepository;
import com.ssafy.backend.domain.administration.repository.StoreAdministrationRepository;
import com.ssafy.backend.domain.commercial.dto.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.entity.AreaCommercial;
import com.ssafy.backend.domain.commercial.repository.AreaCommercialRepository;
import com.ssafy.backend.domain.district.dto.*;
import com.ssafy.backend.domain.district.repository.*;
import com.ssafy.backend.domain.district.entity.ChangeDistrict;
import com.ssafy.backend.domain.district.entity.FootTrafficDistrict;
import com.ssafy.backend.domain.district.repository.ChangeDistrictRepository;
import com.ssafy.backend.domain.district.repository.FootTrafficDistrictRepository;
import com.ssafy.backend.domain.district.repository.SalesDistrictRepository;
import com.ssafy.backend.domain.district.repository.StoreDistrictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DistrictServiceImpl implements DistrictService {
    private final FootTrafficDistrictRepository footTrafficDistrictRepository;
    private final SalesDistrictRepository salesDistrictRepository;
    private final StoreDistrictRepository storeDistrictRepository;
    private final ChangeDistrictRepository changeDistrictRepository;
    private final AreaDistrictRepository areaDistrictRepository;
    private final StoreAdministrationRepository storeAdministrationRepository;
    private final SalesAdministrationRepository salesAdministrationRepository;
    private final AreaCommercialRepository areaCommercialRepository;

    @Override
    public DistrictTopTenResponse getTopTenDistricts() {

        List<SalesDistrictTopTenResponse> salesResponseList = new ArrayList<>();
        List<OpenedStoreDistrictTopTenResponse> openedStoreResponseList = new ArrayList<>();
        List<ClosedStoreDistrictTopTenResponse> closedStoreResponseList = new ArrayList<>();

        // 유동 인구
        List<FootTrafficDistrictTopTenResponse> footTrafficInfoList = footTrafficDistrictRepository.getTopTenFootTrafficDistrictByPeriodCode();
        List<SalesDistrictTopTenInfo> salesInfoList = salesDistrictRepository.getTopTenSalesDistrictByPeriodCode();
        List<OpenedStoreDistrictTopTenInfo> openedStoreInfoList = storeDistrictRepository.getTopTenOpenedStoreDistrictByPeriodCode();
        List<ClosedStoreDistrictTopTenInfo> closedStoreInfoList = storeDistrictRepository.getTopTenClosedStoreDistrictByPeriodCode();


        for (int i = 0; i < 25; i++) {
            // 매출
            SalesDistrictTopTenInfo salesDistrictTopTenInfo = salesInfoList.get(i);
            Long prevTotalSales = salesDistrictTopTenInfo.prevTotalSales();
            Long curTotalSales = salesDistrictTopTenInfo.curTotalSales();
            String districtCodeName = salesDistrictTopTenInfo.districtCodeName();
            String districtCode = salesDistrictTopTenInfo.districtCode();

            salesResponseList.add(new SalesDistrictTopTenResponse(districtCode, districtCodeName, curTotalSales, ((curTotalSales-prevTotalSales)/(float)prevTotalSales*100), i/5+1));

            // 개업률
            OpenedStoreDistrictTopTenInfo openedStoreDistrictTopTenInfo = openedStoreInfoList.get(i);
            Long prevTotalStore = openedStoreDistrictTopTenInfo.prevTotalStore();
            Long prevOpenedStore = openedStoreDistrictTopTenInfo.prevOpenedStore();
            Float prevOpenedRate = ((float) prevOpenedStore / prevTotalStore * 100);

            Long curTotalStore = openedStoreDistrictTopTenInfo.curTotalStore();
            Long curOpenedStore = openedStoreDistrictTopTenInfo.curOpenedStore();
            Float curOpenedRate = ((float) curOpenedStore / curTotalStore * 100);

            districtCodeName = openedStoreDistrictTopTenInfo.districtCodeName();
            districtCode = openedStoreDistrictTopTenInfo.districtCode();

            openedStoreResponseList.add(new OpenedStoreDistrictTopTenResponse(districtCode, districtCodeName, curOpenedRate, (curOpenedRate-prevOpenedRate)/prevOpenedRate*100, i/5+1));

            // 폐업률
            ClosedStoreDistrictTopTenInfo closedStoreDistrictTopTenInfo = closedStoreInfoList.get(i);
            prevTotalStore = closedStoreDistrictTopTenInfo.prevTotalStore();
            Long prevClosedStore = closedStoreDistrictTopTenInfo.prevClosedStore();
            Float prevClosedRate = ((float) prevClosedStore / prevTotalStore * 100);

            curTotalStore = closedStoreDistrictTopTenInfo.curTotalStore();
            Long curClosedStore = closedStoreDistrictTopTenInfo.curClosedStore();
            Float curClosedRate = ((float) curClosedStore / curTotalStore * 100);

            districtCodeName = closedStoreDistrictTopTenInfo.districtCodeName();
            districtCode = closedStoreDistrictTopTenInfo.districtCode();

            closedStoreResponseList.add(new ClosedStoreDistrictTopTenResponse(districtCode, districtCodeName, curClosedRate, (curClosedRate-prevClosedRate)/prevClosedRate*100, i/5+1));
        }
        return new DistrictTopTenResponse(footTrafficInfoList, salesResponseList, openedStoreResponseList, closedStoreResponseList);
    }

    public DistrictDetailResponse getDistrictDetail(String districtCode) {
        String periodCode = "20233";
        // 상권 변화 지표 관련
        ChangeDistrict changeDistrict = changeDistrictRepository.findByPeriodCodeAndDistrictCode(periodCode, districtCode);
        ChangeIndicatorDistrictResponse changeIndicatorDistrictResponse = new ChangeIndicatorDistrictResponse(changeDistrict.getChangeIndicator(), changeDistrict.getChangeIndicatorName(), changeDistrict.getOpenedMonths(), changeDistrict.getClosedMonths());

        // 유동인구 관련
        List<String> periodCodes = Arrays.asList("20224", "20231", "20232", "20233");

        List<FootTrafficDistrict> footTrafficDetailList = footTrafficDistrictRepository.findByPeriodCodeInAndDistrictCodeOrderByPeriodCode(periodCodes, districtCode);

        Map<String, Long> periodData = new LinkedHashMap<>();

        FootTrafficDistrictListByTimeInfo time = null;
        FootTrafficDistrictListByGenderInfo gender = null;
        FootTrafficDistrictListByAgeInfo age = null;
        FootTrafficDistrictListByDayInfo day = null;

        for (FootTrafficDistrict footTrafficDistrict: footTrafficDetailList){
            // 총 유동인구
            periodData.put(footTrafficDistrict.getPeriodCode(), footTrafficDistrict.getTotalFootTraffic());

            if (footTrafficDistrict.getPeriodCode().equals(periodCode)){

                // 시간대별
                Map<String, Long> timeData = new LinkedHashMap<>();
                timeData.put("time0to6", footTrafficDistrict.getFootTraffic00());
                timeData.put("time6to11", footTrafficDistrict.getFootTraffic06());
                timeData.put("time11to14", footTrafficDistrict.getFootTraffic11());
                timeData.put("tim14to17", footTrafficDistrict.getFootTraffic14());
                timeData.put("time17to21", footTrafficDistrict.getFootTraffic17());
                timeData.put("time21to24", footTrafficDistrict.getFootTraffic21());

                String maxKey = null;
                Long maxValue = Long.MIN_VALUE;

                for (Map.Entry<String, Long> entry : timeData.entrySet()) {
                    if (entry.getValue() > maxValue) {
                        maxKey = entry.getKey();
                        maxValue = entry.getValue();
                    }
                }

                time = new FootTrafficDistrictListByTimeInfo(maxKey, timeData);

                // 남녀
                Map<String, Long> genderData = new LinkedHashMap<>();
                genderData.put("male", footTrafficDistrict.getMaleFootTraffic());
                genderData.put("female", footTrafficDistrict.getFemaleFootTraffic());
                maxKey = null;
                if (genderData.get("male") > genderData.get("female")){
                    maxKey = "male";
                } else {
                    maxKey = "female";
                }
                gender = new FootTrafficDistrictListByGenderInfo(maxKey, genderData);

                // 연령대별
                Map<String, Long> ageData = new LinkedHashMap<>();
                ageData.put("age10", footTrafficDistrict.getTeenFootTraffic());
                ageData.put("age20", footTrafficDistrict.getTwentyFootTraffic());
                ageData.put("age30", footTrafficDistrict.getThirtyFootTraffic());
                ageData.put("age40", footTrafficDistrict.getFortyFootTraffic());
                ageData.put("age50", footTrafficDistrict.getFiftyFootTraffic());
                ageData.put("age60", footTrafficDistrict.getSixtyFootTraffic());

                maxKey = null;
                maxValue = Long.MIN_VALUE;

                for (Map.Entry<String, Long> entry : ageData.entrySet()) {
                    if (entry.getValue() > maxValue) {
                        maxKey = entry.getKey();
                        maxValue = entry.getValue();
                    }
                }
                age = new FootTrafficDistrictListByAgeInfo(maxKey, ageData);

                // 요일별
                Map<String, Long> dayData = new LinkedHashMap<>();
                dayData.put("monday", footTrafficDistrict.getMonFootTraffic());
                dayData.put("tuesday", footTrafficDistrict.getTueFootTraffic());
                dayData.put("wednesday", footTrafficDistrict.getWedFootTraffic());
                dayData.put("thursday", footTrafficDistrict.getThuFootTraffic());
                dayData.put("friday", footTrafficDistrict.getFriFootTraffic());
                dayData.put("saturday", footTrafficDistrict.getSatFootTraffic());
                dayData.put("sunday", footTrafficDistrict.getSunFootTraffic());

                maxKey = null;
                maxValue = Long.MIN_VALUE;

                for (Map.Entry<String, Long> entry : dayData.entrySet()) {
                    if (entry.getValue() > maxValue) {
                        maxKey = entry.getKey();
                        maxValue = entry.getValue();
                    }
                }
                day = new FootTrafficDistrictListByDayInfo(maxKey, dayData);
            }
        }

        String maxKey = null;
        if (periodData.get("20232") > periodData.get("20233")){
            maxKey = "감소";
        } else if (periodData.get("20232") < periodData.get("20233")){
            maxKey = "증가";
        } else {
            maxKey = "정체";
        }
        FootTrafficDistrictListByPeriodInfo period = new FootTrafficDistrictListByPeriodInfo(maxKey, periodData);

        FootTrafficDistrictDetailResponse footTrafficDistrictDetailResponse = new FootTrafficDistrictDetailResponse(period, time, gender, age, day);

        // 점포 관련
        // 점포 수 Top 8 서비스 업종, 업종 코드명, 점포 개수
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList = storeDistrictRepository.getTopEightTotalStoreByServiceCode(periodCode, districtCode);

        // 지역구 코드로 해당 지역구에 속하는 행정동 코드 리스트 가져오기
        List<String> allAdministrationCodes = new ArrayList<>();
        List<CommercialAdministrationAreaResponse> adminResponses = getAdministrativeAreasByDistrict(districtCode);
        for (CommercialAdministrationAreaResponse dto: adminResponses){
            allAdministrationCodes.add(dto.administrationCode());
        }

        // 개업률 top 5 행정동
        List<OpenedStoreAdministrationTopFiveInfo> openedStoreAdministrationTopFiveList = storeAdministrationRepository.getTopFiveOpenedRateAdministration(allAdministrationCodes, periodCode);
        // 폐업률 top 5 행정동
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList = storeAdministrationRepository.getTopFiveClosedRateAdministration(allAdministrationCodes, periodCode);

        StoreDistrictDetailResponse storeDistrictDetailResponse = new StoreDistrictDetailResponse(storeDistrictTotalTopEightList, openedStoreAdministrationTopFiveList, closedStoreAdministrationTopFiveList);

        // 매출 관련 상세 분석
        // 서비스 업종별 매출 Top 5
        List<SalesDistrictMonthSalesTopFiveInfo> salesDistrictMonthSalesTopFiveInfoList = salesDistrictRepository.getTopFiveMonthSalesByServiceCode(districtCode, periodCode);
        // 해당 자치구 행정동 매출 Top 5
        List<SalesAdministrationTopFiveInfo> salesAdministrationTopFiveList = salesAdministrationRepository.getTopFiveSalesAdministrationByAdministrationCode(allAdministrationCodes, periodCode);
        SalesDistrictDetailResponse salesDistrictDetailResponse = new SalesDistrictDetailResponse(salesDistrictMonthSalesTopFiveInfoList, salesAdministrationTopFiveList);

        return new DistrictDetailResponse(changeIndicatorDistrictResponse, footTrafficDistrictDetailResponse, storeDistrictDetailResponse, salesDistrictDetailResponse);
    }

    @Override
    public List<DistrictAreaResponse> getAllDistricts() {
        return areaDistrictRepository.findAll().stream()
                .map(ad -> new DistrictAreaResponse(ad.getDistrictCode(), ad.getDistrictCodeName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CommercialAdministrationAreaResponse> getAdministrativeAreasByDistrict(String districtCode) {
        List<AreaCommercial> areaCommercialList = areaCommercialRepository.findAllByDistrictCode(districtCode);
        return areaCommercialList.stream()
                .map(ac -> new CommercialAdministrationAreaResponse(
                        ac.getAdministrationCodeName(),
                        ac.getAdministrationCode())
                )
                .distinct() // 중복 제거
                .collect(Collectors.toList());
    }
}
