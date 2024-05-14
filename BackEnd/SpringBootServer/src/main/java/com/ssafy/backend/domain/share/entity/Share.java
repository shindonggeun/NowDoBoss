package com.ssafy.backend.domain.share.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Share {
    @Id
    private String token;

    private String url;
    private String input;

    private Share(String token, String url, String input) {
        this.token = token;
        this.url = url;
        this.input = input;
    }

    public static Share createShare(String url, Map<String, Object> input) {
        String uuid = UUID.randomUUID().toString();
        String convertedInput = convertMapToJson(input);
        return new Share(uuid, url, convertedInput);
    }

    // Helper method to convert Map to JSON string
    private static String convertMapToJson(Map<String, Object> input) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(input);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting map to JSON", e);
        }
    }
}
