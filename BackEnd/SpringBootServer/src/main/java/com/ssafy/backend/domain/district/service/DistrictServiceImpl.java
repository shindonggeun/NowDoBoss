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
        List<FootTrafficDistrictTopTenResponse> footTrafficResponseList = new ArrayList<>();
        List<FootTrafficDistrictTopTenInfo> footTrafficInfoList = footTrafficDistrictRepository.getTopTenFootTrafficDistrictByPeriodCode();

        // 유동 인구 Top 10
        for (int i = 0; i < 25; i++) {
            FootTrafficDistrictTopTenInfo footTrafficDistrictTopTenInfo = footTrafficInfoList.get(i);
            Long prevTotalFootTraffic = footTrafficDistrictTopTenInfo.prevTotalFootTraffic();
            Long curTotalFootTraffic = footTrafficDistrictTopTenInfo.curTotalFootTraffic();
            String districtCodeName = footTrafficDistrictTopTenInfo.districtCodeName();
            String districtCode = footTrafficDistrictTopTenInfo.districtCode();

            footTrafficResponseList.add(new FootTrafficDistrictTopTenResponse(districtCode,districtCodeName, curTotalFootTraffic, ((curTotalFootTraffic-prevTotalFootTraffic)/(float)prevTotalFootTraffic*100), i/5+1));
        }

        // 매출 Top 10
        List<SalesDistrictTopTenResponse> salesResponseList = new ArrayList<>();
        //List<String> districtNames = getTopTenSalesDistrictCodeNameByPeriodCode();
        List<SalesDistrictTopTenInfo> salesInfoList = salesDistrictRepository.getTopTenSalesDistrictByPeriodCode();
        for (int i = 0; i < 25; i++) {
            SalesDistrictTopTenInfo salesDistrictTopTenInfo = salesInfoList.get(i);
            Long prevTotalSales = salesDistrictTopTenInfo.prevTotalSales();
            Long curTotalSales = salesDistrictTopTenInfo.curTotalSales();
            String districtCodeName = salesDistrictTopTenInfo.districtCodeName();
            String districtCode = salesDistrictTopTenInfo.districtCode();

            salesResponseList.add(new SalesDistrictTopTenResponse(districtCode, districtCodeName, curTotalSales, ((curTotalSales-prevTotalSales)/(float)prevTotalSales*100), i/5+1));
        }

        // 개업률 Top 10
        List<OpenedStoreDistrictTopTenResponse> openedStoreResponseList = new ArrayList<>();
        List<OpenedStoreDistrictTopTenInfo> openedStoreInfoList = storeDistrictRepository.getTopTenOpenedStoreDistrictByPeriodCode();
        for (int i = 0; i < 25; i++) {
            OpenedStoreDistrictTopTenInfo openedStoreDistrictTopTenInfo = openedStoreInfoList.get(i);
            Long prevTotalStore = openedStoreDistrictTopTenInfo.prevTotalStore();
            Long prevOpenedStore = openedStoreDistrictTopTenInfo.prevOpenedStore();
            Float prevOpenedRate = ((float) prevOpenedStore / prevTotalStore * 100);

            Long curTotalStore = openedStoreDistrictTopTenInfo.curTotalStore();
            Long curOpenedStore = openedStoreDistrictTopTenInfo.curOpenedStore();
            Float curOpenedRate = ((float) curOpenedStore / curTotalStore * 100);

            String districtCodeName = openedStoreDistrictTopTenInfo.districtCodeName();
            String districtCode = openedStoreDistrictTopTenInfo.districtCode();
            //System.out.println("자치구명: " + districtCodeName + "이번총점포수: " + curTotalStore + "이번개업점포수: " + curOpenedStore + "이전총점포수: " + prevTotalStore + "이전개업점포수: " + prevOpenedStore);
            openedStoreResponseList.add(new OpenedStoreDistrictTopTenResponse(districtCode, districtCodeName, curOpenedRate, (curOpenedRate-prevOpenedRate)/prevOpenedRate*100, i/5+1));
        }

        // 폐업률 Top 5
        List<ClosedStoreDistrictTopTenResponse> closedStoreResponseList = new ArrayList<>();
        List<ClosedStoreDistrictTopTenInfo> closedStoreInfoList = storeDistrictRepository.getTopTenClosedStoreDistrictByPeriodCode();
        for (int i = 0; i < 25; i++) {
            ClosedStoreDistrictTopTenInfo closedStoreDistrictTopTenInfo = closedStoreInfoList.get(i);
            Long prevTotalStore = closedStoreDistrictTopTenInfo.prevTotalStore();
            Long prevClosedStore = closedStoreDistrictTopTenInfo.prevClosedStore();
            Float prevClosedRate = ((float) prevClosedStore / prevTotalStore * 100);

            Long curTotalStore = closedStoreDistrictTopTenInfo.curTotalStore();
            Long curClosedStore = closedStoreDistrictTopTenInfo.curClosedStore();
            Float curClosedRate = ((float) curClosedStore / curTotalStore * 100);

            String districtCodeName = closedStoreDistrictTopTenInfo.districtCodeName();
            String districtCode = closedStoreDistrictTopTenInfo.districtCode();
            //System.out.println("자치구명: " + districtCodeName + "이번총점포수: " + curTotalStore + "이번폐업점포수: " + curClosedStore + "이전총점포수: " + prevTotalStore + "이전폐업점포수: " + prevClosedStore);
            closedStoreResponseList.add(new ClosedStoreDistrictTopTenResponse(districtCode, districtCodeName, curClosedRate, (curClosedRate-prevClosedRate)/prevClosedRate*100, i/5+1));
        }

        return new DistrictTopTenResponse(footTrafficResponseList, salesResponseList, openedStoreResponseList, closedStoreResponseList);
    //    return null;
    }

    public DistrictDetailResponse getDistrictDetail(String districtCode) {
        String periodCode = "20233";
        // 상권 변화 지표 관련
        ChangeDistrict changeDistrict = changeDistrictRepository.findByPeriodCodeAndDistrictCode(periodCode, districtCode);
        ChangeIndicatorDistrictResponse changeIndicatorDistrictResponse = new ChangeIndicatorDistrictResponse(changeDistrict.getChangeIndicator(), changeDistrict.getChangeIndicatorName(), changeDistrict.getOpenedMonths(), changeDistrict.getClosedMonths());

        // 유동인구 관련
        List<String> periodCodes = Arrays.asList("20224", "20231", "20232", "20233");

        List<FootTrafficDistrict> footTrafficDetailList = footTrafficDistrictRepository.findByPeriodCodeInAndDistrictCodeOrderByPeriodCode(periodCodes, districtCode);
        List<Map<String, Long>> footTrafficDistrictListByPeriod = new ArrayList<>();
        List<Map<String, Long>> footTrafficDistrictListByTime = new ArrayList<>();
        List<Map<String, Long>> footTrafficDistrictListByGender = new ArrayList<>();
        List<Map<String, Long>> footTrafficDistrictListByAge = new ArrayList<>();
        List<Map<String, Long>> footTrafficDistrictListByDay = new ArrayList<>();

        for (FootTrafficDistrict footTrafficDistrict: footTrafficDetailList){
            // 총 유동인구
            footTrafficDistrictListByPeriod.add(Collections.singletonMap(footTrafficDistrict.getPeriodCode(), footTrafficDistrict.getTotalFootTraffic()));

            if (footTrafficDistrict.getPeriodCode().equals(periodCode)){
                // 시간대별
                footTrafficDistrictListByTime.add(Collections.singletonMap("time0to6", footTrafficDistrict.getFootTraffic00()));
                footTrafficDistrictListByTime.add(Collections.singletonMap("time6to11", footTrafficDistrict.getFootTraffic06()));
                footTrafficDistrictListByTime.add(Collections.singletonMap("time11to14", footTrafficDistrict.getFootTraffic11()));
                footTrafficDistrictListByTime.add(Collections.singletonMap("tim14to17", footTrafficDistrict.getFootTraffic14()));
                footTrafficDistrictListByTime.add(Collections.singletonMap("time17to21", footTrafficDistrict.getFootTraffic17()));
                footTrafficDistrictListByTime.add(Collections.singletonMap("time21to24", footTrafficDistrict.getFootTraffic21()));

                // 남녀
                footTrafficDistrictListByGender.add(Collections.singletonMap("male", footTrafficDistrict.getMaleFootTraffic()));
                footTrafficDistrictListByGender.add(Collections.singletonMap("female", footTrafficDistrict.getFemaleFootTraffic()));

                // 연령대별
                footTrafficDistrictListByAge.add(Collections.singletonMap("age10", footTrafficDistrict.getTeenFootTraffic()));
                footTrafficDistrictListByAge.add(Collections.singletonMap("age20", footTrafficDistrict.getTwentyFootTraffic()));
                footTrafficDistrictListByAge.add(Collections.singletonMap("age30", footTrafficDistrict.getThirtyFootTraffic()));
                footTrafficDistrictListByAge.add(Collections.singletonMap("age40", footTrafficDistrict.getFortyFootTraffic()));
                footTrafficDistrictListByAge.add(Collections.singletonMap("age50", footTrafficDistrict.getFiftyFootTraffic()));
                footTrafficDistrictListByAge.add(Collections.singletonMap("age60", footTrafficDistrict.getSixtyFootTraffic()));

                // 요일별
                footTrafficDistrictListByDay.add(Collections.singletonMap("monday", footTrafficDistrict.getMonFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("tuesday", footTrafficDistrict.getTueFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("wednesday", footTrafficDistrict.getWedFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("thursday", footTrafficDistrict.getThuFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("friday", footTrafficDistrict.getFriFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("saturday", footTrafficDistrict.getSatFootTraffic()));
                footTrafficDistrictListByDay.add(Collections.singletonMap("sunday", footTrafficDistrict.getSunFootTraffic()));
            }
        }
        FootTrafficDistrictDetailResponse footTrafficDistrictDetailResponse = new FootTrafficDistrictDetailResponse(footTrafficDistrictListByPeriod, footTrafficDistrictListByTime, footTrafficDistrictListByGender, footTrafficDistrictListByAge, footTrafficDistrictListByDay);

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
        List<OpenedStoreAdministrationTopFiveResponse> openedStoreAdministrationTopFive = new ArrayList<>();
        for (OpenedStoreAdministrationTopFiveInfo openedStoreAdministrationTopFiveInfo: openedStoreAdministrationTopFiveList){
            OpenedStoreAdministrationTopFiveResponse openedStoreAdministrationTopFiveResponse = new OpenedStoreAdministrationTopFiveResponse(
                    openedStoreAdministrationTopFiveInfo.administrationCode(),
                    openedStoreAdministrationTopFiveInfo.administrationCodeName(),
                    openedStoreAdministrationTopFiveInfo.curTotalStore(),
                    openedStoreAdministrationTopFiveInfo.curOpenedStore(),
                    openedStoreAdministrationTopFiveInfo.curOpenedStore() / (float) openedStoreAdministrationTopFiveInfo.curTotalStore()*100
            );
            openedStoreAdministrationTopFive.add(openedStoreAdministrationTopFiveResponse);
        }

        // 폐업률 top 5 행정동
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList = storeAdministrationRepository.getTopFiveClosedRateAdministration(allAdministrationCodes, periodCode);
        List<ClosedStoreAdministrationTopFiveResponse> closedStoreAdministrationTopFive = new ArrayList<>();
        for (ClosedStoreAdministrationTopFiveInfo closedStoreAdministrationTopFiveInfo: closedStoreAdministrationTopFiveList){
            ClosedStoreAdministrationTopFiveResponse closedStoreAdministrationTopFiveResponse = new ClosedStoreAdministrationTopFiveResponse(
                    closedStoreAdministrationTopFiveInfo.administrationCode(),
                    closedStoreAdministrationTopFiveInfo.administrationCodeName(),
                    closedStoreAdministrationTopFiveInfo.curTotalStore(),
                    closedStoreAdministrationTopFiveInfo.curClosedStore(),
                    closedStoreAdministrationTopFiveInfo.curClosedStore() / (float) closedStoreAdministrationTopFiveInfo.curTotalStore()*100
            );
            closedStoreAdministrationTopFive.add(closedStoreAdministrationTopFiveResponse);
        }

        StoreDistrictDetailResponse storeDistrictDetailResponse = new StoreDistrictDetailResponse(storeDistrictTotalTopEightList, openedStoreAdministrationTopFive, closedStoreAdministrationTopFive);

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
