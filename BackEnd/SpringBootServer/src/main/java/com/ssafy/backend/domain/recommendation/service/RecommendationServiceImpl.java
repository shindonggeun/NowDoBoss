package com.ssafy.backend.domain.recommendation.service;


import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationResponse;
import com.ssafy.backend.domain.commercial.repository.FootTrafficCommercialRepository;
import com.ssafy.backend.domain.commercial.repository.SalesCommercialRepository;
import com.ssafy.backend.domain.commercial.service.CommercialService;
import com.ssafy.backend.domain.recommendation.dto.request.UserRequest;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;
import com.ssafy.backend.domain.recommendation.dto.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService{

    private CommercialService commercialService;
    private SalesCommercialRepository salesCommercialRepository;
    private FootTrafficCommercialRepository footTrafficCommercialRepository;
    //private StoreCommercialRepository storeCommercialRepository;
    @Override
    public List<RecommendationResponse> getTopThreeRecommendations(String districtCode, String administrationCode, Long id) {
        // FastAPI 서버로부터 데이터를 비동기로 받아옵니다.
        Mono<List<UserResponse>> commercialDataMono = sendToFastAPIServer(id);

        // 비동기로 받아온 데이터를 동기적으로 처리하기 위해 blockOptional() 메서드를 사용합니다.
        List<UserResponse> commercialData = commercialDataMono.blockOptional().orElse(Collections.emptyList());
        List<UserResponse> responses = new ArrayList<>();
        int cnt = 0;

        if (administrationCode != null && !administrationCode.isEmpty()){
            for (UserResponse dto: commercialData) {
                String code = commercialService.getAdministrationInfoByCommercialCode(dto.commercialCode()).administrationCode();
                if (code.equals(administrationCode)){
                    responses.add(dto);
                    cnt++;
                }
                if (cnt == 3){
                    break;
                }
            }
        } else {
            for (UserResponse dto: commercialData) {
                String code = commercialService.getAdministrationInfoByCommercialCode(dto.commercialCode()).administrationCode();
                if (code.substring(0, 5).equals(districtCode)){
                    responses.add(dto);
                    cnt++;

                    // 해당 상권 추천 정보 조회
                    // 매출
                    // 해당 상권의 마지막 분기 총 매출
                    Long mySales = dto.totalSales();
                    // 서울시 상권의 마지막 분기 총 매출 평균
                    //Long otherSales = salesCommercialRepository.findByPeriodCodeAndCommercialCodeAndCommercialCode();
                    // 해당 상권이 속한 행정동 상권들의 마지막 분기 총 매출 평균
                    //Long administrationSales = salesCommercialRepository.
                    // 유동인구
                    Long myTrafficFoot = dto.totalTrafficFoot();

                    // 점포 수
                    //Long myStores = storeSalesRepository.findByCommercialCode


                    // 폐업률
                    Double myClosedRate = dto.closedRate();


                    // 블루 오션
                    // 1. 해당 행정동의 상권들 리스트를 가지고 period_code가 20233이고 commercialCode가 저 리스트 안에 있는 serviceCode와 점포 개수 리스트 가져오기
                    // 2. 저 리스트 안에 있는 모든 serviceCode들에 대해 해당 commercialCode를 갖는 상권의 점포 수를 찾기. 만약 없으면 0으로
                    // 3. 각 서비스 업종에 대해 해당 상권이 차지하는 점포 수 비율을 구하고 비율이 낮은 top 5 가져오기
                    Map<String, Long> totalMap = new LinkedHashMap<>();
                    Map<String, Long> myMap = new LinkedHashMap<>();
                    Map<String, Double> myRate = new LinkedHashMap<>();
                    for (String str: totalMap.keySet()){
                        if (myMap.containsKey(str)){
                            myRate.put(str, myMap.get(str).doubleValue() / totalMap.get(str) * 100);
                        } else {
                            myRate.put(str, 0.0);
                        }
                    }
                    // LinkedHashMap의 entrySet을 ArrayList로 변환
                    List<Map.Entry<String, Double>> list = new ArrayList<>(myRate.entrySet());

                    // ArrayList를 값(value)을 기준으로 정렬
                    Collections.sort(list, new Comparator<Map.Entry<String, Double>>() {
                        public int compare(Map.Entry<String, Double> o1, Map.Entry<String, Double> o2) {
                            // 값(value)이 같은 경우 key를 기준으로 정렬
                            int valueComparison = o1.getValue().compareTo(o2.getValue());
                            if (valueComparison == 0) {
                                return o1.getKey().compareTo(o2.getKey());
                            }
                            return valueComparison;
                        }
                    });

                    // 정렬된 ArrayList를 LinkedHashMap으로 다시 변환
                    Map<String, Double> sortedMyRate = new LinkedHashMap<>();
                    for (Map.Entry<String, Double> entry : list) {
                        sortedMyRate.put(entry.getKey(), entry.getValue());
                    }


                }
                if (cnt == 3){
                    break;
                }
            }
        }

        if (responses.isEmpty()){
            return null;
        }
        for (UserResponse ur: responses){
            String commercialCode = ur.commercialCode();

        }


        return null;
    }

    public Mono<List<UserResponse>> sendToFastAPIServer(Long id) {
        // FastAPI 서버 URL 설정 - 로컬버전
        String fastApiUrl = "http://localhost:8000/recommend";

        // 요청에 필요한 데이터 구성
        UserRequest userRequest = new UserRequest(id);

        // WebClient 생성
        WebClient webClient = WebClient.create();

        // HTTP 요청 보내기
        Mono<List<UserResponse>> responseMono = webClient.post()
                .uri(fastApiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(userRequest))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<UserResponse>>() {
                });

        // 요청 결과 반환
        return responseMono.doOnError(throwable -> {
            // 에러 처리
            throw new RuntimeException("Failed to retrieve recommendations from FastAPI server", throwable);
        });
    }
}
