package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.CreateChatRoomRequest;
import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;

import java.util.List;

public interface ChatRoomService {
    List<MyChatRoomListResponse> selectChatRooms(Long memberId, MyChatRoomListRequest request);
    Long createChatRoom(Long memberId, CreateChatRoomRequest request);
}
