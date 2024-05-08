package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.request.CreateChatRoomRequest;
import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.dto.response.PopularChatRoomResponse;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;
import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.chat.exception.ChatErrorCode;
import com.ssafy.backend.domain.chat.exception.ChatException;
import com.ssafy.backend.domain.chat.repository.ChatMessageRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomMemberRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.community.entity.enums.Category;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.kafka.KafkaChatConstants;
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
    private final KafkaProducer kafkaProducer;
    private final ChatMessageRepository chatMessageRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<MyChatRoomListResponse> selectMyChatRooms(Long memberId, MyChatRoomListRequest request) {
        return chatRoomRepository.selectMyChatRooms(memberId, request);
    }

    @Override
    public Long createChatRoom(Long memberId, CreateChatRoomRequest request) {
        ChatRoom chatRoom = ChatRoom.builder()
                .category(Category.valueOf(request.category()))
                .name(request.name())
                .introduction(request.introduction())
                .limit(request.limit())
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

    @Override
    public List<PopularChatRoomResponse> selectPopularChatRoom(String category) {
        // 채팅방 인원 많은 순으로 조회
        return chatRoomMemberRepository.selectPopularChatRoom(category);
    }

    @Override
    public void exitChatRoom(Long memberId, Long chatRoomId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));

        // 채팅방 탈퇴 메시지 전송
        ChatMessage chatMessage = ChatMessage.createExitMessage(member, chatRoom);

        chatMessageRepository.save(chatMessage);
        ChatMessageResponse chatMessageResponse = ChatMessageResponse.of(chatMessage, member, chatRoom.getId());

        try {
            String response = objectMapper.writeValueAsString(chatMessageResponse);

            // 카프카 이벤트 발생
            kafkaProducer.publishMessage(KafkaChatConstants.KAFKA_TOPIC, response);

        } catch (Exception ex) {
            throw new ChatException(ChatErrorCode.SAVE_FAILED);
        }

        // 구성원 제거
        chatRoomMemberRepository.deleteByMemberAndChatRoom(member, chatRoom);

        if (!chatRoomMemberRepository.existsByChatRoom(chatRoom)) {
            // 채팅 메시지 삭제
            chatMessageRepository.deleteByChatRoom(chatRoom);

            // 채팅방 삭제
            chatRoomRepository.delete(chatRoom);
        }
    }
}
