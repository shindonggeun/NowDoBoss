package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.chat.repository.ChatRoomMemberRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.community.entity.enums.Category;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<ChatRoomListResponse> selectChatRooms(Long memberId, Long lastId) {
        return chatRoomRepository.selectChatRooms(memberId, lastId);
    }

    @Override
    public Long createChatRoom(Long memberId, ChatRoomRequest request) {
        ChatRoom chatRoom = ChatRoom.builder()
                .category(Category.valueOf(request.category()))
                .name(request.name())
                .introduction(request.introduction())
                .build();
        chatRoomRepository.save(chatRoom);

        Member sender = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        chatRoomMemberRepository.save(ChatRoomMember.builder()
                .member(sender)
                .chatRoom(chatRoom)
                .build());

        return chatRoom.getId();
    }
}
