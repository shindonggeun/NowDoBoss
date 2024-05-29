package com.ssafy.backend.domain.recommendation.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.commercial.dto.info.BlueOceanInfo;
import com.ssafy.backend.domain.commercial.dto.response.CommercialAdministrationAreaResponse;
import com.ssafy.backend.domain.commercial.entity.AreaCommercial;
import com.ssafy.backend.domain.commercial.repository.*;
import com.ssafy.backend.domain.recommendation.dto.info.*;
import com.ssafy.backend.domain.recommendation.exception.RecommendationErrorCode;
import com.ssafy.backend.domain.recommendation.exception.RecommendationException;
import com.ssafy.backend.global.common.document.DataDocument;
import com.ssafy.backend.global.common.dto.PageResponse;
import com.ssafy.backend.global.common.repository.DataRepository;
import com.ssafy.backend.global.component.kafka.dto.info.DataInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;

import com.ssafy.backend.domain.commercial.dto.response.CommercialAreaResponse;
import com.ssafy.backend.domain.commercial.service.CommercialService;
import com.ssafy.backend.domain.recommendation.document.RecommendationDocument;
import com.ssafy.backend.domain.recommendation.dto.request.UserRequest;
import com.ssafy.backend.domain.recommendation.dto.response.RecommendationResponse;
import com.ssafy.backend.domain.recommendation.dto.response.UserResponse;
import com.ssafy.backend.domain.recommendation.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService{

    private final WebClient webClient;
    private final CommercialService commercialService;
    private final SalesCommercialRepository salesCommercialRepository;
    private final FootTrafficCommercialRepository footTrafficCommercialRepository;
    private final StoreCommercialRepository storeCommercialRepository;
    private final AreaCommercialRepository areaCommercialRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final RecommendationRepository recommendationRepository;
    private final IncomeCommercialRepository incomeCommercialRepository;
    private final DataRepository dataRepository;

    @Override
    public Mono<List<RecommendationResponse>> getTopThreeRecommendations(String districtCode, String administrationCode, Long id) {
        String periodCode = "20233";

        Mono<List<RecommendationResponse>> recommendationResponse = fetchCommercialData(id, districtCode, administrationCode)
                .flatMapMany(Flux::fromIterable)
                .filter(dto -> administrationCode != null && !administrationCode.isEmpty() && !administrationCode.equals("0") ?
                        getCode(dto).equals(administrationCode) :
                        getCode(dto).substring(0, 5).equals(districtCode))
                .take(3)
                .map(dto -> createRecommendationResponse(dto, periodCode))
                .collectList()
                .doOnNext(responses -> {
                    if (!responses.isEmpty()) {
                        saveRecommendationsToRedis(id, districtCode, administrationCode, responses);
                    }
                });

        if (recommendationResponse.block().isEmpty()){
            System.out.println("No data available, returning default response.");
            List<UserResponse> userResponses = makeBasicUserResponse(id, districtCode, administrationCode);
            List<RecommendationResponse> res = new ArrayList<>();
            for (UserResponse userResponse: userResponses){
                res.add(createRecommendationResponse(userResponse, periodCode));
            }
            return Mono.just(res);
        }
        return recommendationResponse;
    }

    @Override
    public void saveCommercialRecommendation(String commercialCode, Long id) {
        String jsonResponses = redisTemplate.opsForValue().get("recommendation:" + id);
        if (jsonResponses != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // JSON 데이터를 List<RecommendationResponse> 객체로 역직렬화하여 반환
                RecommendationCommercialInfo info = objectMapper.readValue(jsonResponses, new TypeReference<>() {
                });

                for (RecommendationResponse dto: info.recommendationResponse()){
                    if (dto.commercialCode().equals(commercialCode)){
                        DataInfo dataInfo = new DataInfo(id, commercialCode, "save");
                        // 추천 정보 저장 중복 체크
                        boolean existAnalysis = recommendationRepository.existsByUserIdAndCommercialCode(dataInfo.userId(), dataInfo.commercialCode());

                        if (existAnalysis) {
                            throw new RecommendationException(RecommendationErrorCode.EXIST_ANALYSIS);
                        }

                        if (!dataInfo.commercialCode().equals("0")) {
                            DataDocument dataDocument = DataDocument.builder()
                                    .userId(dataInfo.userId())
                                    .commercialCode(Long.parseLong(dataInfo.commercialCode()))
                                    .action(dataInfo.action())
                                    .build();
                            dataRepository.save(dataDocument);
                        }

                        RecommendationDocument document = RecommendationDocument.builder()
                                .userId(id)
                                .commercialCode(commercialCode)
                                .commercialCodeName(dto.commercialCodeName())
                                .districtCode(info.districtCode())
                                .districtCodeName(info.districtCodeName())
                                .administrationCode(info.administrationCode())
                                .administrationCodeName(info.administrationCodeName())
                                .createdAt(LocalDateTime.now())
                                .build();
                        recommendationRepository.save(document);
                        break;
                    }
                }
            } catch (JsonProcessingException e) {
                throw new RecommendationException(RecommendationErrorCode.JSON_PROCESSING);
            }
        }
    }

    @Override
    public void deleteCommercialRecommendation(String commercialCode, Long id) {
        recommendationRepository.deleteByUserIdAndCommercialCode(id, commercialCode);
    }

    @Override
    public PageResponse<RecommendationDocument> getSavedCommercialRecommendationList(Long id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<RecommendationDocument> response = recommendationRepository.findByUserId(pageable, id);
        return PageResponse.of(response);
    }

    private Mono<List<UserResponse>> fetchCommercialData(Long id, String districtCode, String administrationCode) {
        //FastAPI 서버로부터 데이터를 비동기로 받아옵니다.
        return sendToFastAPIServer(id, districtCode, administrationCode);
    }

    private String getCode(UserResponse dto) {
        return areaCommercialRepository.findByCommercialCode(dto.commercialCode()).administrationCode();
    }

    private RecommendationResponse createRecommendationResponse(UserResponse dto, String periodCode) {
        log.info("관련 추천 상권 정보 구하기" );
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
        List<BlueOceanInfo> sortedMyRate = getBlueOceanAnalysis(dto, commercialCodes, periodCode);

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

    private List<BlueOceanInfo> getBlueOceanAnalysis(UserResponse dto, List<String> commercialCodes, String periodCode) {
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
        myRate = sortAndLimitBlueOceanResults(myRate);

        List<BlueOceanInfo> blueOceanInfos = new ArrayList<>();
        for (String str: myRate.keySet()){
            if (myMap.get(str) == null){
                blueOceanInfos.add(new BlueOceanInfo(str, 1L, totalMap.get(str)+1, myRate.get(str)));
                continue;
            }
            blueOceanInfos.add(new BlueOceanInfo(str, myMap.get(str), totalMap.get(str), myRate.get(str)));
        }
        return blueOceanInfos;
    }

    private Map<String, Double> sortAndLimitBlueOceanResults(Map<String, Double> myRate) {
        List<Map.Entry<String, Double>> list = new ArrayList<>(myRate.entrySet());
        Collections.sort(list, new Comparator<>() {
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
            if (c == 5) {
                break;
            }
        }
        return sortedMyRate;
    }

    public Mono<List<UserResponse>> sendToFastAPIServer(Long id, String districtCode, String administrationCode) {
        String fastApiUrl = "/recommend";

        // 요청에 필요한 데이터 구성
        UserRequest userRequest = new UserRequest(id);

        return webClient.post()
                .uri(fastApiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(userRequest))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<UserResponse>>() {})
                .doOnNext(result -> {
                    if (result != null && !result.isEmpty()) {
                        System.out.println("Received response with " + result.size() + " items");
                        result.forEach(userResponse -> System.out.println("UserResponse: " + userResponse));
                    } else {
                        System.out.println("No data received or empty response.");
                    }
                })
                .doOnError(error -> {
                    System.out.println("Error retrieving data: " + error.getMessage());
                })
                .onErrorResume(e -> {
                    System.out.println("Handling error: " + e.getMessage());
                    List<UserResponse> list = makeBasicUserResponse(id, districtCode, administrationCode);
                    return Mono.just(list); // 에러 발생 시 빈 리스트 반환
                });
    }

    private List<UserResponse> makeBasicUserResponse(Long userId, String districtCode, String administrationCode){
        if (administrationCode.equals("0")){ // 자치구 코드만으로
            List<String> administrationCodes = new ArrayList<>();
            List<String> commercialCodes = new ArrayList<>();
            List<CommercialAdministrationAreaResponse> list = getAdministrativeAreasByDistrict(districtCode);
            for (CommercialAdministrationAreaResponse dto: list){
                administrationCodes.add(dto.administrationCode());
            }
            for (String code: administrationCodes){
                List<AreaCommercial> areaCommercialList = areaCommercialRepository.findByAdministrationCode(code);
                for (AreaCommercial ac: areaCommercialList){
                    commercialCodes.add(ac.getCommercialCode());
                }
            }
            return getUserResponse(userId, commercialCodes);
        } else { // 행정동 코드만으로
            List<String> commercialCodes = new ArrayList<>();
            List<AreaCommercial> areaCommercialList = areaCommercialRepository.findByAdministrationCode(administrationCode);
            for (AreaCommercial ac: areaCommercialList){
                commercialCodes.add(ac.getCommercialCode());
            }
            return getUserResponse(userId, commercialCodes);
        }
    }

    @Override
    public List<RecommendationResponse> getSavedCommercialDetail(Long userId, String commercialCode){
        List<RecommendationResponse> rrs = new ArrayList<>();
        for (UserResponse us: getUserResponse(userId, Arrays.asList(commercialCode))){
            rrs.add(createRecommendationResponse(us, "20233"));
        }
        return rrs;
    }

    private List<UserResponse> getUserResponse(Long userId, List<String> commercialCodes){
        List<UserResponse> uss = new ArrayList<>();
        if (commercialCodes.size() == 1){
            String commercialCode = commercialCodes.get(0);
            Long sales = salesCommercialRepository.findTopSalesByCommercialCode(commercialCode);
            Long footTraffic = footTrafficCommercialRepository.getCommercialFootTrafficByCommercialCode(commercialCode, "20233");
            Double openedRate = storeCommercialRepository.getCommercialRateByCommercialCode(commercialCode, "20233").get("openedRate");
            Double closedRate = storeCommercialRepository.getCommercialRateByCommercialCode(commercialCode, "20233").get("closedRate");;
            Long consumption = incomeCommercialRepository.getTotalPriceByCommercialCode(commercialCode, "20233");

            return Arrays.asList(new UserResponse(userId, commercialCode, footTraffic, sales, openedRate, closedRate, consumption, 0.0));

        } else {
            List<String> commercialCodeList = salesCommercialRepository.findTopSalesCommercialInCommercialCodes(commercialCodes, "20233");
            for (String commercialCode: commercialCodeList) {
                Long sales = salesCommercialRepository.findTopSalesByCommercialCode(commercialCode);
                Long footTraffic = footTrafficCommercialRepository.getCommercialFootTrafficByCommercialCode(commercialCode, "20233");
                Double openedRate = storeCommercialRepository.getCommercialRateByCommercialCode(commercialCode, "20233").get("openedRate");
                Double closedRate = storeCommercialRepository.getCommercialRateByCommercialCode(commercialCode, "20233").get("closedRate");
                Long consumption = incomeCommercialRepository.getTotalPriceByCommercialCode(commercialCode, "20233");

                uss.add(new UserResponse(userId, commercialCode, footTraffic, sales, openedRate, closedRate, consumption, 0.0));
            }
            return uss;
        }
    }

    public void saveRecommendationsToRedis(long userId, String districtCode, String administrationCode, List<RecommendationResponse> responses) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String administrationCodeName = "";
            if (administrationCode.equals("0")){
                administrationCodeName = "전체";
            } else {
                administrationCodeName = areaCommercialRepository.findAdministrationCodeNameByAdministrationCode(administrationCode);
            }
            String districtCodeName = areaCommercialRepository.findDistrictCodeNameByDistrictCode(districtCode);

            // responses를 JSON 형식으로 직렬화
            RecommendationCommercialInfo recommendationCommercialInfo = new RecommendationCommercialInfo(userId, districtCode, districtCodeName, administrationCode, administrationCodeName, responses);
            String jsonResponses = objectMapper.writeValueAsString(recommendationCommercialInfo);
            // 레디스에 저장
            redisTemplate.opsForValue().set("recommendation:" + userId, jsonResponses, 10, TimeUnit.MINUTES);
        } catch (JsonProcessingException e) {
            // JSON 직렬화 실패 시 예외 처리
            throw new RecommendationException(RecommendationErrorCode.JSON_PROCESSING);
        }
    }

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
