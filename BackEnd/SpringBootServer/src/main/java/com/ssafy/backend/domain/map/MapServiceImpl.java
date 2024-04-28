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
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


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
            List<List<Double>> list = new ArrayList<>();

            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();

                if ((x >= ax && x <= bx) && (y >= ay && y <= by)) {
                    List<Double> coordList = new ArrayList<>();
                    coordList.add(x);
                    coordList.add(y);
                    list.add(coordList);
                }
            }

            if (!list.isEmpty()) {
                String commercialCode = (String) commercial.get("commercial_code");
                res.put(commercialCode, list);
            }
        }

//        for (Map.Entry<String, List<List<Double>>> entry : res.entrySet()) {
//            System.out.println("Commercial Code: " + entry.getKey());
//            System.out.println("Coordinates:");
//            for (List<Double> coords : entry.getValue()) {
//                System.out.println("  - [" + coords.get(0) + ", " + coords.get(1) + "]");
//            }
//            System.out.println();
//        }
        return res;
    }

    @Override
    public Map<String, List<List<Double>>> getAdministrationAreaCoords(double ax, double ay, double bx, double by) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/area/administration.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        Map<String, List<List<Double>>> res = new LinkedHashMap<>();
        for (int i = 0; i < dataArray.size(); i++) {
            JSONObject commercial = (JSONObject) dataArray.get(i);
            JSONArray areaCoords = (JSONArray) commercial.get("area_coords");
            List<List<Double>> list = new ArrayList<>();

            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();

                if ((x >= ax && x <= bx) && (y >= ay && y <= by)) {
                    List<Double> coordList = new ArrayList<>();
                    coordList.add(x);
                    coordList.add(y);
                    list.add(coordList);
                }
            }

            if (!list.isEmpty()) {
                String commercialCode = (String) commercial.get("administration_code");
                res.put(commercialCode, list);
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
            JSONObject commercial = (JSONObject) dataArray.get(i);
            JSONArray areaCoords = (JSONArray) commercial.get("area_coords");
            List<List<Double>> list = new ArrayList<>();

            for (Object coordObject : areaCoords) {
                JSONArray coordArray = (JSONArray) coordObject;
                double x = ((Number) coordArray.get(0)).doubleValue();
                double y = ((Number) coordArray.get(1)).doubleValue();

                if ((x >= ax && x <= bx) && (y >= ay && y <= by)) {
                    List<Double> coordList = new ArrayList<>();
                    coordList.add(x);
                    coordList.add(y);
                    list.add(coordList);
                }
            }

            if (!list.isEmpty()) {
                String commercialCode = (String) commercial.get("district_code");
                res.put(commercialCode, list);
            }
        }

        return res;
    }
}
