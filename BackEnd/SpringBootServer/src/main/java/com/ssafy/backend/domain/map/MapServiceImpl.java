package com.ssafy.backend.domain.map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import java.io.Reader;
import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public MapResponse getCommercialAreaCoords(double ax, double ay, double bx, double by) throws Exception {
        //redisTemplate.delete("commercial");
        System.out.println("서비스임플안!");
        List<String> commercialCodes = new ArrayList<>();
        Map<String, List<List<Double>>> coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("commercial");
        if (coordsMap == null) {
            //throw new IllegalStateException("Coordinates not found in Redis, please load data first.");
            log.info("첫 상권 영역 요청!");
            loadAndCacheCoords("commercial");
            coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("commercial");
        }
        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (Map.Entry<String, List<List<Double>>> entry : coordsMap.entrySet()) {
            String commercialCodeName = entry.getKey();
            List<List<Double>> coords = entry.getValue();

            List<List<Double>> filteredCoords = filterCoordsByRange(coords, ax, bx, ay, by);

            if (filteredCoords == null){
                return null;
            }
            if (!filteredCoords.isEmpty()) {
                res.put(commercialCodeName, filteredCoords);
                commercialCodes.add(commercialCodeName);
            }
        }
        return new MapResponse(commercialCodes, res);
    }

    @Override
    public MapResponse getAdministrationAreaCoords(double ax, double ay, double bx, double by) throws Exception {
        redisTemplate.delete("administration");
        System.out.println("서비스임플안!");
        List<String> administrationCodes = new ArrayList<>();
        Map<String, List<List<Double>>> coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("administration");
        if (coordsMap == null) {
            //throw new IllegalStateException("Coordinates not found in Redis, please load data first.");
            log.info("첫 행정구 영역 요청!");
            loadAndCacheCoords("administration");
            coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("administration");
        }
        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (Map.Entry<String, List<List<Double>>> entry : coordsMap.entrySet()) {
            String administrationCodeName = entry.getKey();
            List<List<Double>> coords = entry.getValue();

            List<List<Double>> filteredCoords = filterCoordsByRange(coords, ax, bx, ay, by);

            if (filteredCoords == null){
                return null;
            }
            if (!filteredCoords.isEmpty()) {
                res.put(administrationCodeName, filteredCoords);
                administrationCodes.add(administrationCodeName);
            }
        }
        return new MapResponse(administrationCodes, res);
    }

    @Override
    public MapResponse getDistrictAreaCoords(double ax, double ay, double bx, double by) throws Exception {
        redisTemplate.delete("district");
        System.out.println("서비스임플안!");
        List<String> districtCodes= new ArrayList<>();
        Map<String, List<List<Double>>> coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("district");
        if (coordsMap == null) {
            //throw new IllegalStateException("Coordinates not found in Redis, please load data first.");
            log.info("첫 자치구 영역 요청!");
            loadAndCacheCoords("district");
            coordsMap = (Map<String, List<List<Double>>>) redisTemplate.opsForValue().get("district");
        }
        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (Map.Entry<String, List<List<Double>>> entry : coordsMap.entrySet()) {
            String districtCodeName = entry.getKey();
            List<List<Double>> coords = entry.getValue();

            List<List<Double>> filteredCoords = filterCoordsByRange(coords, ax, bx, ay, by);

            if (filteredCoords == null){
                return null;
            }
            if (!filteredCoords.isEmpty()) {
                res.put(districtCodeName, filteredCoords);
                districtCodes.add(districtCodeName);
            }
        }
        return new MapResponse(districtCodes, res);
    }

    public void loadAndCacheCoords(String type) throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/area/" + type + ".json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);
        Map<String, List<List<Double>>> allCoords = new LinkedHashMap<>();

        for (Object element : dataArray) {
            JSONObject dto = (JSONObject) element;
            String dtoCodeName = (String) dto.get(type + "_code_name");
            JSONArray areaCoords = (JSONArray) dto.get("area_coords");
            List<List<Double>> coords = new ArrayList<>();

            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();
                coords.add(Arrays.asList(x, y));
            }

            // 경도 기준으로 정렬
            coords.sort(Comparator.comparingDouble(a -> a.get(0)));
            allCoords.put(dtoCodeName, coords);
        }

        // Redis에 상권 코드별로 정렬된 좌표 저장
        redisTemplate.opsForValue().set(type, allCoords);
    }

    private List<List<Double>> filterCoordsByRange(List<List<Double>> coords, double minLng, double maxLng, double minLat, double maxLat) {
        if ((minLng > maxLng) || (minLat > maxLat)){
            return null;
        }
        // 경도 기준으로 필터링 (이미 정렬되어 있음)
        int lowIndex = Collections.binarySearch(coords, Arrays.asList(minLng, Double.MIN_VALUE), Comparator.comparingDouble(a -> a.get(0)));
        int highIndex = Collections.binarySearch(coords, Arrays.asList(maxLng, Double.MAX_VALUE), Comparator.comparingDouble(a -> a.get(0)));
        lowIndex = lowIndex < 0 ? -lowIndex - 1 : lowIndex;
        highIndex = highIndex < 0 ? -highIndex - 1 : highIndex;

        List<List<Double>> longitudeFiltered = coords.subList(lowIndex, highIndex);

        // 위도 기준으로 정렬
        longitudeFiltered.sort(Comparator.comparingDouble(a -> a.get(1)));

        // 위도 범위로 필터링
        int lowYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MIN_VALUE, minLat), Comparator.comparingDouble(a -> a.get(1)));
        int highYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MAX_VALUE, maxLat), Comparator.comparingDouble(a -> a.get(1)));
        lowYIndex = lowYIndex < 0 ? -lowYIndex - 1 : lowYIndex;
        highYIndex = highYIndex < 0 ? -highYIndex - 1 : highYIndex;

        return longitudeFiltered.subList(lowYIndex, highYIndex);
    }
}
