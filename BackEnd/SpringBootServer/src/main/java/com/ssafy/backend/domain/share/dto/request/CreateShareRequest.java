package com.ssafy.backend.domain.share.dto.request;

import com.ssafy.backend.domain.share.entity.Share;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class CreateShareRequest {
    @NotBlank(message = "url 내용을 입력해주세요")
    private String url;
    private Map<String, Object> input;

    public Share toEntity() {
        return Share.createShare(url, input);
    }
}
