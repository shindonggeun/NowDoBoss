package com.ssafy.backend;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class ResourceReaderService {

    public String readResourceFile(String fileName) throws Exception {
//        Resource resource = new ClassPathResource(fileName);
//        if (!resource.exists()) {
//            throw new IllegalStateException("Resource file not found!");
//        }
//
//        try (InputStream is = resource.getInputStream();
//             BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
//            StringBuilder result = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                result.append(line).append("\n");
//            }
//            return result.toString();
//        }

//        JSONParser parser = new JSONParser();
//        // JSON 파일 읽기
//        Reader reader = new FileReader(fileName);
//        JSONArray dateArray = (JSONArray) parser.parse(reader);
//        System.out.println(dateArray);
        return null;
    }
}


