package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;

import java.util.List;

public interface ChatRoomCustomRepository {
    List<MyChatRoomListResponse> selectMyChatRooms(Long memberId, MyChatRoomListRequest request);

}
