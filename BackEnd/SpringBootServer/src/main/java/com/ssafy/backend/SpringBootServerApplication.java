package com.ssafy.backend;

import com.ssafy.backend.domain.map.MapService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class SpringBootServerApplication {

	public static void main(String[] args) throws Exception {

		SpringApplication.run(SpringBootServerApplication.class, args);



//		ResourceReaderService service = new ResourceReaderService();
//		try {
//			String fileContents = service.readResourceFile("area/commercial.json");
//			System.out.println(fileContents);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		JSONParser parser = new JSONParser();
		try {
			Reader reader = new FileReader("src/main/resources/area/commercial.json");
			JSONArray dataArray = (JSONArray) parser.parse(reader);
			double ax = 126.9655355286;
			double ay = 37.5830490416;
			double bx = 127.0113262656;
			double by = 37.5997819905;

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

			for (Map.Entry<String, List<List<Double>>> entry : res.entrySet()) {
				System.out.println("Commercial Code: " + entry.getKey());
				System.out.println("Coordinates:");
				for (List<Double> coords : entry.getValue()) {
					System.out.println("  - [" + coords.get(0) + ", " + coords.get(1) + "]");
				}
				System.out.println();
			}

	} catch (
	FileNotFoundException e) {
		System.err.println("Error: File not found. " + e.getMessage());
	} catch (
	IOException e) {
		System.err.println("Error: IO Exception. " + e.getMessage());
	} catch (Exception e) {
		System.err.println("An unexpected error occurred: " + e.getMessage());
	}
	}

}
