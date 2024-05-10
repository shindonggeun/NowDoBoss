package com.ssafy.backend.domain.community.dto.request;

import com.ssafy.backend.domain.community.entity.Community;
import com.ssafy.backend.domain.community.entity.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateCommunityRequest(

        @Pattern(regexp = "ETC|INTERIOR|COMMERCIAL_AREA|PARTNERSHIP|START_UP", message = "카테고리가 올바르지 않습니다.")
        String category,
        @Size(min = 1, max = 20, message = "제목은 1글자 이상 20글자 이하로 입력해주세요.")
        String title,

        @NotBlank(message = "내용을 입력해주세요")
        String content,
        List<String> images
) {
    public Community toEntity() {
        return Community.builder()
                .category(Category.valueOf(category))
                .title(title)
                .content(content)
                .build();
    }

}
