package com.ssafy.backend.domain.recommendation.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.commercial.dto.response.CommercialAreaResponse;
import com.ssafy.backend.domain.commercial.repository.AreaCommercialRepository;
import com.ssafy.backend.domain.commercial.repository.FootTrafficCommercialRepository;
import com.ssafy.backend.domain.commercial.repository.SalesCommercialRepository;
import com.ssafy.backend.domain.commercial.repository.StoreCommercialRepository;
import com.ssafy.backend.domain.commercial.service.CommercialService;
import com.ssafy.backend.domain.recommendation.RecommendationDocument;
import com.ssafy.backend.domain.recommendation.dto.info.ClosedRateCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.FootTrafficCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.SalesCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.info.StoreCommercialInfo;
import com.ssafy.backend.domain.recommendation.dto.request.UserRequest;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;
import com.ssafy.backend.domain.recommendation.dto.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService{

    private final CommercialService commercialService;
    private final SalesCommercialRepository salesCommercialRepository;
    private final FootTrafficCommercialRepository footTrafficCommercialRepository;
    private final StoreCommercialRepository storeCommercialRepository;
    private final AreaCommercialRepository areaCommercialRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<RecommendationResponse> getTopThreeRecommendations(String districtCode, String administrationCode, Long id) {
        String periodCode = "20233";
        List<UserResponse> commercialData = fetchCommercialData(id);

        List<RecommendationResponse> responses = new ArrayList<>();
        int cnt = 0;

        if (administrationCode != null && !administrationCode.isEmpty() && !administrationCode.equals("0")) {
            for (UserResponse dto : commercialData) {
                String code = getCode(dto);

                if (code.equals(administrationCode)) {
                    cnt++;
                    RecommendationResponse recommendationResponse = createRecommendationResponse(dto, periodCode);
                    responses.add(recommendationResponse);

                    if (cnt == 3) {
                        break;
                    }
                }
            }
        } else {
            for (UserResponse dto : commercialData) {
                String code = getCode(dto);

                if (code.substring(0, 5).equals(districtCode)) {
                    cnt++;
                    RecommendationResponse recommendationResponse = createRecommendationResponse(dto, periodCode);
                    responses.add(recommendationResponse);

                    if (cnt == 3) {
                        break;
                    }
                }
            }
        }
        if (!responses.isEmpty()) {
            saveRecommendationsToRedis(id, responses);
        }
        return responses.isEmpty() ? null : responses;
    }

    @Override
    public void saveCommercialRecommendation(String commercialCode, Long id) {
        String jsonResponses = redisTemplate.opsForValue().get("recommendation:" + id);
        log.info("레디스에서 가져오기 {}", jsonResponses);
        if (jsonResponses != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // JSON 데이터를 List<RecommendationResponse> 객체로 역직렬화하여 반환
                List<RecommendationResponse> list = objectMapper.readValue(jsonResponses, new TypeReference<List<RecommendationResponse>>() {});
                for (RecommendationResponse dto: list){
                    if (dto.commercialCode().equals(commercialCode)){
                        RecommendationDocument recommendationDocument = new RecommendationDocument(id, commercialCode, "recommendation");
                        mongoTemplate.save(recommendationDocument);
                        break;
                    }
                }
            } catch (JsonProcessingException e) {
                // JSON 역직렬화 실패 시 예외 처리
                e.printStackTrace();
            }
        }
    }

    private List<UserResponse> fetchCommercialData(Long id) {
//        //FastAPI 서버로부터 데이터를 비동기로 받아옵니다.
//        Mono<List<UserResponse>> commercialDataMono = sendToFastAPIServer(id);
//        // 비동기로 받아온 데이터를 동기적으로 처리하기 위해 blockOptional() 메서드를 사용합니다.
//        List<UserResponse> commercialData = commercialDataMono.blockOptional().orElse(Collections.emptyList());
        List<UserResponse> commercialData = new ArrayList<>();
        commercialData.add(new UserResponse("3130323", 2131046L, 87417420000L, 2.205006, 3.039333, 3597924000L, 6.829445));
        commercialData.add(new UserResponse("3111005",  6822274L, 874742000L, 6.205006, 1.039333, 3597924000L, 6.5123));
        commercialData.add(new UserResponse("3111004", 3189182L, 874172000L, 1.205006, 2.039333, 3597924000L, 5.829445));
        commercialData.add(new UserResponse("3111003", 8353018L, 874742000L, 9.205006, 4.039333, 3597924000L, 4.29445));
        commercialData.add(new UserResponse("3111006", 296958L, 8741742000L, 12.205006, 5.039333, 3597924000L, 4.829445));
        commercialData.add(new UserResponse("3130325", 296879L, 8741742000L, 2.205006, 6.039333, 3597924000L, 3.829445));
        commercialData.add(new UserResponse("3130324", 551179L, 87412000L, 2.205006, 7.039333, 3597924000L, 3.29445));
        commercialData.add(new UserResponse("3130327", 55947L, 27417420000L, 3.205006, 3.039333, 3597924000L, 2.829445));
        commercialData.add(new UserResponse("3130326", 122285L, 4741742000L, 4.205006, 3.039333, 3597924000L, 1.829445));
        commercialData.add(new UserResponse("3111002", 4005509L, 87410000L, 2.55205006, 3.039333, 3597924000L, 0.829445));
        return commercialData;
    }

    private String getCode(UserResponse dto) {
        return commercialService.getAdministrationInfoByCommercialCode(dto.commercialCode()).administrationCode();
    }

    private RecommendationResponse createRecommendationResponse(UserResponse dto, String periodCode) {
        Long mySales = dto.totalSales();
        Long otherSales = salesCommercialRepository.getOtherSalesByPeriodCodeAndCommercialCode("20193");
        List<String> commercialCodes = getCommercialCodes(dto);

        Long administrationSales = salesCommercialRepository.getAdministrationSalesByPeriodCodeAndCommercialCode(commercialCodes, "20193");
        SalesCommercialInfo salesCommercialInfo = new SalesCommercialInfo(mySales, administrationSales, otherSales);

        Long myTrafficFoot = dto.totalTrafficFoot();
        Long administrationTrafficFoot = footTrafficCommercialRepository.getAdministrationFootTrafficByPeriodCodeAndCommercialCode(commercialCodes, periodCode);
        Long otherTrafficFoot = footTrafficCommercialRepository.getOtherFootTrafficByPeriodCodeAndCommercialCode(periodCode);
        FootTrafficCommercialInfo footTrafficCommercialInfo = new FootTrafficCommercialInfo(myTrafficFoot, administrationTrafficFoot, otherTrafficFoot);

        StoreCommercialInfo storeCommercialInfo = getStoreCommercialInfo(dto, periodCode);
        ClosedRateCommercialInfo closedRateCommercialInfo = getClosedRateCommercialInfo(dto, periodCode);
        Map<String, Double> sortedMyRate = getBlueOceanAnalysis(dto, commercialCodes, periodCode);

        return new RecommendationResponse(dto.commercialCode(),
                areaCommercialRepository.findCommercialCodeNameByCommercialCode(dto.commercialCode()),
                salesCommercialInfo, footTrafficCommercialInfo, storeCommercialInfo,
                closedRateCommercialInfo, sortedMyRate);
    }

    private List<String> getCommercialCodes(UserResponse dto) {
        String code = getCode(dto);
        List<CommercialAreaResponse> commercialAreaResponses = commercialService.getCommercialAreasByAdministrationCode(code);
        List<String> commercialCodes = new ArrayList<>();
        for (CommercialAreaResponse car : commercialAreaResponses) {
            if (!car.commercialCode().equals(dto.commercialCode())) {
                commercialCodes.add(car.commercialCode());
            }
        }
        return commercialCodes;
    }

    private StoreCommercialInfo getStoreCommercialInfo(UserResponse dto, String periodCode) {
        Long myStores = storeCommercialRepository.findByCommercialCode(dto.commercialCode(), periodCode);
        Map<String, Object> administrationStoresMap = storeCommercialRepository.getAdministrationStoreByPeriodCodeAndCommercialCode(getCommercialCodes(dto), periodCode);
        Map<String, Object> otherStoresMap = storeCommercialRepository.getOtherStoreByPeriodCodeAndCommercialCode(periodCode);
        return new StoreCommercialInfo(myStores, (long) administrationStoresMap.get("administrationStores"), (long) otherStoresMap.get("otherStores"));
    }

    private ClosedRateCommercialInfo getClosedRateCommercialInfo(UserResponse dto, String periodCode) {
        Double myClosedRate = dto.closedRate();
        Map<String, Object> administrationStoresMap = storeCommercialRepository.getAdministrationStoreByPeriodCodeAndCommercialCode(getCommercialCodes(dto), periodCode);
        Map<String, Object> otherStoresMap = storeCommercialRepository.getOtherStoreByPeriodCodeAndCommercialCode(periodCode);
        return new ClosedRateCommercialInfo(myClosedRate, (double) administrationStoresMap.get("administrationClosedRate"), (double) otherStoresMap.get("otherClosedRate"));
    }

    private Map<String, Double> getBlueOceanAnalysis(UserResponse dto, List<String> commercialCodes, String periodCode) {
        commercialCodes.add(dto.commercialCode());
        Map<String, Long> totalMap = storeCommercialRepository.getAdministrationStoreByServiceCode(commercialCodes, periodCode);
        Map<String, Long> myMap = storeCommercialRepository.getMyStoreByServiceCode(dto.commercialCode(), periodCode);
        Map<String, Double> myRate = new LinkedHashMap<>();
        for (String str : totalMap.keySet()) {
            if (myMap.containsKey(str)) {
                myRate.put(str, myMap.get(str).doubleValue() / totalMap.get(str) * 100);
            } else {
                myRate.put(str, 1.0 / (totalMap.get(str) + 1.0) * 100);
            }
        }
        return sortAndLimitBlueOceanResults(myRate);
    }

    private Map<String, Double> sortAndLimitBlueOceanResults(Map<String, Double> myRate) {
        List<Map.Entry<String, Double>> list = new ArrayList<>(myRate.entrySet());
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
        Map<String, Double> sortedMyRate = new LinkedHashMap<>();
        int c = 0;
        for (Map.Entry<String, Double> entry : list) {
            sortedMyRate.put(entry.getKey(), entry.getValue());
            c++;
            if (c == 10) {
                break;
            }
        }
        return sortedMyRate;
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

    public void saveRecommendationsToRedis(long userId, List<RecommendationResponse> responses) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // responses를 JSON 형식으로 직렬화
            String jsonResponses = objectMapper.writeValueAsString(responses);
            // 레디스에 저장
            redisTemplate.opsForValue().set("recommendation:" + userId, jsonResponses, 1, TimeUnit.HOURS);
        } catch (JsonProcessingException e) {
            // JSON 직렬화 실패 시 예외 처리
            e.printStackTrace();
        }
    }
}
