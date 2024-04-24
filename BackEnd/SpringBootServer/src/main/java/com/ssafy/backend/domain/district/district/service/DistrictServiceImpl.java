package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.administration.dto.*;
import com.ssafy.backend.domain.administration.repository.SalesAdministrationRepository;
import com.ssafy.backend.domain.administration.repository.StoreAdministrationRepository;
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

import java.util.ArrayList;
import java.util.List;
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
        // 상권 변화 지표 관련
        ChangeDistrict changeDistrict = changeDistrictRepository.getChangeIndicatorDistrictByDistrictCodeAndPeriodCode(districtCode);
        ChangeIndicatorDistrictResponse changeIndicatorDistrictResponse = new ChangeIndicatorDistrictResponse(changeDistrict.getChangeIndicator(), changeDistrict.getChangeIndicatorName(), changeDistrict.getOpenedMonths(), changeDistrict.getClosedMonths());

        // 유동인구 관련
        List<FootTrafficDistrict> footTrafficDetailList = footTrafficDistrictRepository.getFootTrafficDistrictDetail(districtCode);
        List<Long> footTrafficDistrictListByPeriod = new ArrayList<>();
        List<Long> footTrafficDistrictListByTime = new ArrayList<>();
        List<Long> footTrafficDistrictListByGender = new ArrayList<>();
        List<Long> footTrafficDistrictListByAge = new ArrayList<>();
        List<Long> footTrafficDistrictListByDay = new ArrayList<>();

        for (FootTrafficDistrict footTrafficDistrict: footTrafficDetailList){
            // 총 유동인구
            footTrafficDistrictListByPeriod.add(footTrafficDistrict.getTotalFootTraffic());

            if (footTrafficDistrict.getPeriodCode().equals("20233")){
                // 시간대별
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic00());
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic06());
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic11());
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic14());
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic17());
                footTrafficDistrictListByTime.add(footTrafficDistrict.getFootTraffic21());

                // 남녀
                footTrafficDistrictListByGender.add(footTrafficDistrict.getMaleFootTraffic());
                footTrafficDistrictListByGender.add(footTrafficDistrict.getFemaleFootTraffic());

                // 연령대별
                footTrafficDistrictListByAge.add(footTrafficDistrict.getTeenFootTraffic());
                footTrafficDistrictListByAge.add(footTrafficDistrict.getTwentyFootTraffic());
                footTrafficDistrictListByAge.add(footTrafficDistrict.getThirtyFootTraffic());
                footTrafficDistrictListByAge.add(footTrafficDistrict.getFortyFootTraffic());
                footTrafficDistrictListByAge.add(footTrafficDistrict.getFiftyFootTraffic());
                footTrafficDistrictListByAge.add(footTrafficDistrict.getSixtyFootTraffic());

                // 요일별
                footTrafficDistrictListByDay.add(footTrafficDistrict.getMonFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getTueFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getWedFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getThuFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getFriFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getSatFootTraffic());
                footTrafficDistrictListByDay.add(footTrafficDistrict.getSunFootTraffic());
            }
        }
        FootTrafficDistrictDetailResponse footTrafficDistrictDetailResponse = new FootTrafficDistrictDetailResponse(footTrafficDistrictListByPeriod, footTrafficDistrictListByTime, footTrafficDistrictListByGender, footTrafficDistrictListByAge, footTrafficDistrictListByDay);

        // 점포 관련
        // 매출 Top 8 서비스 업종, 업종 코드명, 점포 개수
        List<StoreDistrictTotalTopEightInfo> storeDistrictTotalTopEightList = getTopEightTotalStoreByServiceCode(districtCode);

        // 지역구 코드로 해당 지역구에 속하는 행정동 코드 리스트 가져오기 - 지금은 우선 강서구 행정동들 직접 입력함
        List<String> allAdministrationCodes = new ArrayList<>();
        allAdministrationCodes.add("11500591");
        allAdministrationCodes.add("11500550");
        allAdministrationCodes.add("11500535");
        allAdministrationCodes.add("11500605");
        allAdministrationCodes.add("11500540");
        allAdministrationCodes.add("11500560");
        allAdministrationCodes.add("11500570");

        List<String> topFiveOpenedAdministrations = getTopFiveOpenedStoreAdministrationCodeByDistrictCode(allAdministrationCodes);
        List<String> topFiveClosedAdministrations = getTopFiveClosedStoreAdministrationCodeByDistrictCode(allAdministrationCodes);

        // 개업률 top 5 행정동
        List<OpenedStoreAdministrationTopFiveInfo> openedStoreAdministrationTopFiveList = storeAdministrationRepository.getTopFiveOpenedRateAdministration(topFiveOpenedAdministrations);
        List<OpenedStoreAdministrationTopFiveResponse> openedStoreAdministrationTopFive = new ArrayList<>();
        for (OpenedStoreAdministrationTopFiveInfo openedStoreAdministrationTopFiveInfo: openedStoreAdministrationTopFiveList){
            OpenedStoreAdministrationTopFiveResponse openedStoreAdministrationTopFiveResponse = new OpenedStoreAdministrationTopFiveResponse(
                    openedStoreAdministrationTopFiveInfo.getAdministrationCode(),
                    openedStoreAdministrationTopFiveInfo.getAdministrationCodeName(),
                    openedStoreAdministrationTopFiveInfo.getCurTotalStore(),
                    openedStoreAdministrationTopFiveInfo.getCurOpenedStore(),
                    openedStoreAdministrationTopFiveInfo.getCurOpenedStore() / (float) openedStoreAdministrationTopFiveInfo.getCurTotalStore()*100
            );
            openedStoreAdministrationTopFive.add(openedStoreAdministrationTopFiveResponse);
        }

        // 폐업률 top 5 행정동
        List<ClosedStoreAdministrationTopFiveInfo> closedStoreAdministrationTopFiveList = storeAdministrationRepository.getTopFiveClosedRateAdministration(topFiveClosedAdministrations);
        List<ClosedStoreAdministrationTopFiveResponse> closedStoreAdministrationTopFive = new ArrayList<>();
        for (ClosedStoreAdministrationTopFiveInfo closedStoreAdministrationTopFiveInfo: closedStoreAdministrationTopFiveList){
            ClosedStoreAdministrationTopFiveResponse closedStoreAdministrationTopFiveResponse = new ClosedStoreAdministrationTopFiveResponse(
                    closedStoreAdministrationTopFiveInfo.getAdministrationCode(),
                    closedStoreAdministrationTopFiveInfo.getAdministrationCodeName(),
                    closedStoreAdministrationTopFiveInfo.getCurTotalStore(),
                    closedStoreAdministrationTopFiveInfo.getCurClosedStore(),
                    closedStoreAdministrationTopFiveInfo.getCurClosedStore() / (float) closedStoreAdministrationTopFiveInfo.getCurTotalStore()*100
            );
            closedStoreAdministrationTopFive.add(closedStoreAdministrationTopFiveResponse);
        }

        StoreDistrictDetailResponse storeDistrictDetailResponse = new StoreDistrictDetailResponse(storeDistrictTotalTopEightList, openedStoreAdministrationTopFive, closedStoreAdministrationTopFive);

        // 매출 관련 상세 분석
        // 서비스 업종별 매출 Top 5
        List<SalesDistrictMonthSalesTopFiveInfo> salesDistrictMonthSalesTopFiveInfoList = getTopFiveMonthSalesByServiceCode(districtCode);
        // 해당 자치구 행정동 매출 Top 5
        List<String> topFiveSalesAdministrations = getTopFiveSalesAdministrationByAdministrationCode(allAdministrationCodes);
        List<SalesAdministrationTopFiveInfo> salesAdministrationTopFiveList = salesAdministrationRepository.getTopFiveSalesAdministrationByAdministrationCode(topFiveSalesAdministrations);

        SalesDistrictDetailResponse salesDistrictDetailResponse = new SalesDistrictDetailResponse(salesDistrictMonthSalesTopFiveInfoList, salesAdministrationTopFiveList);


        return new DistrictDetailResponse(changeIndicatorDistrictResponse, footTrafficDistrictDetailResponse, storeDistrictDetailResponse, salesDistrictDetailResponse);
    }

    public List<StoreDistrictTotalTopEightInfo> getTopEightTotalStoreByServiceCode(String districtCode) {
        Pageable pageable = PageRequest.of(0, 8); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<StoreDistrictTotalTopEightInfo> page = storeDistrictRepository.getTopEightTotalStoreByServiceCode(districtCode, pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveOpenedStoreAdministrationCodeByDistrictCode(List<String> allAdministrationCodes) {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = storeAdministrationRepository.getTopFiveOpenedStoreAdministrationByAdministrationCode(allAdministrationCodes, pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveClosedStoreAdministrationCodeByDistrictCode(List<String> allAdministrationCodes) {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = storeAdministrationRepository.getTopFiveClosedStoreAdministrationByAdministrationCode(allAdministrationCodes, pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<SalesDistrictMonthSalesTopFiveInfo> getTopFiveMonthSalesByServiceCode(String districtCode) {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<SalesDistrictMonthSalesTopFiveInfo> page = salesDistrictRepository.getTopFiveMonthSalesByServiceCode(districtCode, pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveSalesAdministrationByAdministrationCode(List<String> allAdministrationCodes) {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = salesAdministrationRepository.getTopFiveSalesAdministrations(allAdministrationCodes, pageable);
        return new ArrayList<>(page.getContent());
    }

    @Override
    public List<DistrictAreaResponse> getAllDistricts() {
        return areaDistrictRepository.findAll().stream()
                .map(ad -> new DistrictAreaResponse(ad.getDistrictCode(), ad.getDistrictCodeName()))
                .collect(Collectors.toList());
    }
}
