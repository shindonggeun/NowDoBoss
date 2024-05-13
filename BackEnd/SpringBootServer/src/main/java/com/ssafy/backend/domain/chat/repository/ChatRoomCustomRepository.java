package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;

import java.util.List;

public interface ChatRoomCustomRepository {
    List<ChatRoomListResponse> selectChatRooms(Long lastId);
    List<MyChatRoomListResponse> selectMyChatRooms(Long memberId, MyChatRoomListRequest request);
    ChatRoomResponse selectChatRoomDetail(Long chatRoomId);
}
