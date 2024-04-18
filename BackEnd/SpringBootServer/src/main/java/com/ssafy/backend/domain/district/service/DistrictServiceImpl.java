package com.ssafy.backend.domain.district.service;

import com.ssafy.backend.domain.district.dto.*;
import com.ssafy.backend.domain.district.dto.response.*;
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

@Service
@Slf4j
@RequiredArgsConstructor
public class DistrictServiceImpl implements DistrictService {
    private final FootTrafficDistrictRepository footTrafficDistrictRepository;
    private final SalesDistrictRepository salesDistrictRepository;
    private final StoreDistrictRepository storeDistrictRepository;
    private final ChangeDistrictRepository changeDistrictRepository;

    @Override
    public DistrictTopFiveResponse getTopFiveDistricts() {
        List<FootTrafficDistrictTopFiveResponse> footTrafficResponseList = new ArrayList<>();
        List<FootTrafficDistrictTopFiveInfo> footTrafficInfoList = getTopFiveFootTrafficDistrictByPeriodCode();

        // 유동 인구 Top 5
        for (FootTrafficDistrictTopFiveInfo footTrafficDistrictTopFiveInfo : footTrafficInfoList) {
            Long prevTotalFootTraffic = footTrafficDistrictTopFiveInfo.getPrevTotalFootTraffic();
            Long curTotalFootTraffic = footTrafficDistrictTopFiveInfo.getCurTotalFootTraffic();
            String districtCodeName = footTrafficDistrictTopFiveInfo.getDistrictCodeName();

            footTrafficResponseList.add(new FootTrafficDistrictTopFiveResponse(districtCodeName, curTotalFootTraffic, (float) ((curTotalFootTraffic-prevTotalFootTraffic)/(float)prevTotalFootTraffic*100)));
        }

        // 매출 Top 5
        List<SalesDistrictTopFiveResponse> salesResponseList = new ArrayList<>();
        List<String> districtNames = getTopFiveSalesDistrictCodeNameByPeriodCode();
        List<SalesDistrictTopFiveInfo> salesInfoList = salesDistrictRepository.getTopFiveSalesDistrictByPeriodCode(districtNames);
        for (SalesDistrictTopFiveInfo salesDistrictTopFiveInfo : salesInfoList) {
            Long prevTotalSales = salesDistrictTopFiveInfo.getPrevTotalSales();
            Long curTotalSales = salesDistrictTopFiveInfo.getCurTotalSales();
            String districtCodeName = salesDistrictTopFiveInfo.getDistrictCodeName();

            salesResponseList.add(new SalesDistrictTopFiveResponse(districtCodeName, curTotalSales, ((curTotalSales-prevTotalSales)/(float)prevTotalSales*100)));
        }

        // 개업률 Top 5
        List<OpenedStoreDistrictTopFiveResponse> openedStoreResponseList = new ArrayList<>();
        List<String> openedStores = getTopFiveOpenedStoreDistrictCodeNameByPeriodCode();
        List<OpenedStoreDistrictTopFiveInfo> openedStoreInfoList = storeDistrictRepository.getTopFiveOpenedStoreDistrictByPeriodCode(openedStores);
        for (OpenedStoreDistrictTopFiveInfo openedStoreDistrictTopFiveInfo : openedStoreInfoList) {
            Long prevTotalStore = openedStoreDistrictTopFiveInfo.getPrevTotalStore();
            Long prevOpenedStore = openedStoreDistrictTopFiveInfo.getPrevOpenedStore();
            Float prevOpenedRate = ((float) prevOpenedStore / prevTotalStore * 100);

            Long curTotalStore = openedStoreDistrictTopFiveInfo.getCurTotalStore();
            Long curOpenedStore = openedStoreDistrictTopFiveInfo.getCurOpenedStore();
            Float curOpenedRate = ((float) curOpenedStore / curTotalStore * 100);

            String districtCodeName = openedStoreDistrictTopFiveInfo.getDistrictCodeName();
            //System.out.println("자치구명: " + districtCodeName + "이번총점포수: " + curTotalStore + "이번개업점포수: " + curOpenedStore + "이전총점포수: " + prevTotalStore + "이전개업점포수: " + prevOpenedStore);
            openedStoreResponseList.add(new OpenedStoreDistrictTopFiveResponse(districtCodeName, curOpenedRate, (curOpenedRate-prevOpenedRate)/prevOpenedRate*100));
        }

        // 폐업률 Top 5
        List<ClosedStoreDistrictTopFiveResponse> closedStoreResponseList = new ArrayList<>();
        List<String> closedStores = getTopFiveClosedStoreDistrictCodeNameByPeriodCode();
        List<ClosedStoreDistrictTopFiveInfo> closedStoreInfoList = storeDistrictRepository.getTopFiveClosedStoreDistrictByPeriodCode(closedStores);
        for (ClosedStoreDistrictTopFiveInfo closedStoreDistrictTopFiveInfo : closedStoreInfoList) {
            Long prevTotalStore = closedStoreDistrictTopFiveInfo.getPrevTotalStore();
            Long prevClosedStore = closedStoreDistrictTopFiveInfo.getPrevClosedStore();
            Float prevClosedRate = ((float) prevClosedStore / prevTotalStore * 100);

            Long curTotalStore = closedStoreDistrictTopFiveInfo.getCurTotalStore();
            Long curClosedStore = closedStoreDistrictTopFiveInfo.getCurClosedStore();
            Float curClosedRate = ((float) curClosedStore / curTotalStore * 100);

            String districtCodeName = closedStoreDistrictTopFiveInfo.getDistrictCodeName();
            //System.out.println("자치구명: " + districtCodeName + "이번총점포수: " + curTotalStore + "이번폐업점포수: " + curClosedStore + "이전총점포수: " + prevTotalStore + "이전폐업점포수: " + prevClosedStore);
            closedStoreResponseList.add(new ClosedStoreDistrictTopFiveResponse(districtCodeName, curClosedRate, (curClosedRate-prevClosedRate)/prevClosedRate*100));
        }

        return new DistrictTopFiveResponse(footTrafficResponseList, salesResponseList, openedStoreResponseList, closedStoreResponseList);
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

        return new DistrictDetailResponse(changeIndicatorDistrictResponse, footTrafficDistrictDetailResponse);
    }



    public List<FootTrafficDistrictTopFiveInfo> getTopFiveFootTrafficDistrictByPeriodCode() {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<FootTrafficDistrictTopFiveInfo> page =  footTrafficDistrictRepository.getTopFiveFootTrafficDistrictByPeriodCode(pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveSalesDistrictCodeNameByPeriodCode() {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = salesDistrictRepository.getTopFiveSalesDistrictCodeNameByPeriodCode(pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveOpenedStoreDistrictCodeNameByPeriodCode() {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = storeDistrictRepository.getTopFiveOpenedStoreDistrictCodeNameByPeriodCode(pageable);
        return new ArrayList<>(page.getContent());
    }

    public List<String> getTopFiveClosedStoreDistrictCodeNameByPeriodCode() {
        Pageable pageable = PageRequest.of(0, 5); // 첫 번째 페이지에서 5개의 결과만 가져옴
        Page<String> page = storeDistrictRepository.getTopFiveClosedStoreDistrictCodeNameByPeriodCode(pageable);
        return new ArrayList<>(page.getContent());
    }
}
