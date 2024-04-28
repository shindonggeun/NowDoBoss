package com.ssafy.backend.domain.map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{

    @Override
    public Map<String, List<List<Double>>> getCommercialAreaCoords(double ax, double ay, double bx, double by) throws IOException, ParseException {
        System.out.println("서비스임플안!");
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/area/commercial.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (int i = 0; i < dataArray.size(); i++) {
            JSONObject commercial = (JSONObject) dataArray.get(i);
            JSONArray areaCoords = (JSONArray) commercial.get("area_coords");
            List<List<Double>> coords = new ArrayList<>();

            // 좌표를 List에 추가
            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();
                coords.add(Arrays.asList(x, y));
            }

            // 경도 기준으로 정렬
            Collections.sort(coords, Comparator.comparingDouble(a -> a.get(0)));
            // 이진 탐색으로 경도 범위 내 좌표 필터링
            int lowIndex = Collections.binarySearch(coords, Arrays.asList(ax, Double.MIN_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            int highIndex = Collections.binarySearch(coords, Arrays.asList(bx, Double.MAX_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            lowIndex = lowIndex < 0 ? -lowIndex - 1 : lowIndex;
            highIndex = highIndex < 0 ? -highIndex - 1 : highIndex;

            List<List<Double>> filteredCoords = new ArrayList<>();
            // 위도 기준으로 다시 정렬
            List<List<Double>> longitudeFiltered = coords.subList(lowIndex, highIndex);
            Collections.sort(longitudeFiltered, Comparator.comparingDouble(a -> a.get(1)));

            // 이진 탐색으로 위도 범위 내 좌표 필터링
            int lowYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MIN_VALUE, ay), Comparator.comparingDouble(a -> a.get(1)));
            int highYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MAX_VALUE, by), Comparator.comparingDouble(a -> a.get(1)));
            lowYIndex = lowYIndex < 0 ? -lowYIndex - 1 : lowYIndex;
            highYIndex = highYIndex < 0 ? -highYIndex - 1 : highYIndex;

            filteredCoords.addAll(longitudeFiltered.subList(lowYIndex, highYIndex));

            if (!filteredCoords.isEmpty()) {
                String commercialCode = (String) commercial.get("commercial_code");
                res.put(commercialCode, filteredCoords);
            }
        }
        return res;
    }

    @Override
    public Map<String, List<List<Double>>> getAdministrationAreaCoords(double ax, double ay, double bx, double by) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/area/administration.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (int i = 0; i < dataArray.size(); i++) {
            JSONObject administration = (JSONObject) dataArray.get(i);
            JSONArray areaCoords = (JSONArray) administration.get("area_coords");
            List<List<Double>> coords = new ArrayList<>();

            // 좌표를 List에 추가
            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();
                coords.add(Arrays.asList(x, y));
            }

            // 경도 기준으로 정렬
            Collections.sort(coords, Comparator.comparingDouble(a -> a.get(0)));
            // 이진 탐색으로 경도 범위 내 좌표 필터링
            int lowIndex = Collections.binarySearch(coords, Arrays.asList(ax, Double.MIN_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            int highIndex = Collections.binarySearch(coords, Arrays.asList(bx, Double.MAX_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            lowIndex = lowIndex < 0 ? -lowIndex - 1 : lowIndex;
            highIndex = highIndex < 0 ? -highIndex - 1 : highIndex;

            List<List<Double>> filteredCoords = new ArrayList<>();
            // 위도 기준으로 다시 정렬
            List<List<Double>> longitudeFiltered = coords.subList(lowIndex, highIndex);
            Collections.sort(longitudeFiltered, Comparator.comparingDouble(a -> a.get(1)));

            // 이진 탐색으로 위도 범위 내 좌표 필터링
            int lowYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MIN_VALUE, ay), Comparator.comparingDouble(a -> a.get(1)));
            int highYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MAX_VALUE, by), Comparator.comparingDouble(a -> a.get(1)));
            lowYIndex = lowYIndex < 0 ? -lowYIndex - 1 : lowYIndex;
            highYIndex = highYIndex < 0 ? -highYIndex - 1 : highYIndex;

            filteredCoords.addAll(longitudeFiltered.subList(lowYIndex, highYIndex));

            if (!filteredCoords.isEmpty()) {
                String administrationCode = (String) administration.get("administration_code");
                res.put(administrationCode, filteredCoords);
            }
        }
        return res;
    }

    @Override
    public Map<String, List<List<Double>>> getDistrictAreaCoords(double ax, double ay, double bx, double by) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/area/district.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (int i = 0; i < dataArray.size(); i++) {
            JSONObject district = (JSONObject) dataArray.get(i);
            JSONArray areaCoords = (JSONArray) district.get("area_coords");
            List<List<Double>> coords = new ArrayList<>();

            // 좌표를 List에 추가
            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();
                coords.add(Arrays.asList(x, y));
            }

            // 경도 기준으로 정렬
            Collections.sort(coords, Comparator.comparingDouble(a -> a.get(0)));
            // 이진 탐색으로 경도 범위 내 좌표 필터링
            int lowIndex = Collections.binarySearch(coords, Arrays.asList(ax, Double.MIN_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            int highIndex = Collections.binarySearch(coords, Arrays.asList(bx, Double.MAX_VALUE), Comparator.comparingDouble(a -> a.get(0)));
            lowIndex = lowIndex < 0 ? -lowIndex - 1 : lowIndex;
            highIndex = highIndex < 0 ? -highIndex - 1 : highIndex;

            List<List<Double>> filteredCoords = new ArrayList<>();
            // 위도 기준으로 다시 정렬
            List<List<Double>> longitudeFiltered = coords.subList(lowIndex, highIndex);
            Collections.sort(longitudeFiltered, Comparator.comparingDouble(a -> a.get(1)));

            // 이진 탐색으로 위도 범위 내 좌표 필터링
            int lowYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MIN_VALUE, ay), Comparator.comparingDouble(a -> a.get(1)));
            int highYIndex = Collections.binarySearch(longitudeFiltered, Arrays.asList(Double.MAX_VALUE, by), Comparator.comparingDouble(a -> a.get(1)));
            lowYIndex = lowYIndex < 0 ? -lowYIndex - 1 : lowYIndex;
            highYIndex = highYIndex < 0 ? -highYIndex - 1 : highYIndex;

            filteredCoords.addAll(longitudeFiltered.subList(lowYIndex, highYIndex));

            if (!filteredCoords.isEmpty()) {
                String districtCode = (String) district.get("district_code");
                res.put(districtCode, filteredCoords);
            }
        }
        return res;
    }
}
