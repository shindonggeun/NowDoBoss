package com.ssafy.backend.domain.map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import java.io.Reader;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{
    public void readJson() throws Exception {
        JSONParser parser = new JSONParser();
        // JSON 파일 읽기
        Reader reader = new FileReader("파일 경로");
        JSONArray dateArray = (JSONArray) parser.parse(reader);
    }
}
