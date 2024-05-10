package com.ssafy.backend.domain.community.dto.request;

import com.ssafy.backend.domain.community.dto.info.ImageInfo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpdateCommunityRequest(
        @Size(min = 1, max = 20, message = "제목은 1글자 이상 20글자 이하로 입력해주세요.")
        String title,
        @NotBlank(message = "내용을 입력해주세요")
        String content,
        List<ImageInfo> images
) {
}
