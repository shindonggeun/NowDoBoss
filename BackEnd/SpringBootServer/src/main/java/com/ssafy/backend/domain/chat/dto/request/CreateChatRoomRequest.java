package com.ssafy.backend.domain.chat.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateChatRoomRequest(
        @Pattern(regexp = "ETC|INTERIOR|COMMERCIAL_AREA|PARTNERSHIP|START_UP", message = "카테고리가 올바르지 않습니다.")
        String category,

        @Size(min = 1, max = 20, message = "채팅방 이름은 1글자 이상 20글자 이하로 입력해주세요.")
        String name,

        @Size(min = 1, max = 40, message = "채팅방 소개는 1글자 이상 40글자 이하로 입력해주세요.")
        String introduction,

        @Min(value = 2, message = "제한 인원은 최소 2명 이상이어야 합니다.")
        @Max(value = 600, message = "제한 인원은 최대 600명 이하여야 합니다.")
        int limit

) {
}
