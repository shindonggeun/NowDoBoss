package com.ssafy.backend.domain.share.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.share.entity.Share;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class ShareResponse {
    private String url;
    private Map<String, Object> input;

    private ShareResponse(String url, Map<String, Object> input) {
        this.url = url;
        this.input = input;
    }

    public static ShareResponse of(Share share) {
        return new ShareResponse(share.getUrl(), convertToObject(share.getInput()));
    }

    private static Map convertToObject(String input) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(input, Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting map to OBJECT", e);
        }
    }
}
