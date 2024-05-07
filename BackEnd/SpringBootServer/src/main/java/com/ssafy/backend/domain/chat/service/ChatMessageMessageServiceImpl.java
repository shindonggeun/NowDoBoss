package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.chat.entity.enums.MessageType;
import com.ssafy.backend.domain.chat.exception.ChatErrorCode;
import com.ssafy.backend.domain.chat.exception.ChatException;
import com.ssafy.backend.domain.chat.repository.ChatMessageRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomMemberRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageMessageServiceImpl implements ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;

    @Override
    public void send(String topic, ChatMessageRequest request) {
        Member member = memberRepository.findById(request.getSenderId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId())
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));

        // 처음 입장한 사람인지 확인
        Optional<ChatRoomMember> optionalChatRoomMember = chatRoomMemberRepository.findByMemberAndChatRoom(member, chatRoom);

        // 처음 입장한 사람
        if (optionalChatRoomMember.isEmpty()) {
            processFirstEnter(request);
        }

        // repo에 메시지 저장
        ChatMessage chatMessage = ChatMessage.builder()
                .sender(member)
                .chatRoom(chatRoom)
                .type(request.getMessageType())
                .content(request.getContent())
                .build();

        chatMessageRepository.save(chatMessage);

        ChatMessageResponse chatMessageResponse = ChatMessageResponse.of(chatMessage, member, chatRoom.getId());

        try {
            String response = objectMapper.writeValueAsString(chatMessageResponse);

            // 카프카 이벤트 발생
            kafkaProducer.publishMessage(topic, response);

        } catch (Exception ex) {
            throw new ChatException(ChatErrorCode.SAVE_FAILED);
        }

    }

    private void processFirstEnter(ChatMessageRequest request) {
        if (request.getMessageType() != MessageType.ENTER) {
            throw new ChatException(ChatErrorCode.INVALID_MESSAGE_TYPE);
        }

        Member member = memberRepository.findById(request.getSenderId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId())
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));

        request.enter(member.getNickname());
        chatRoomMemberRepository.save(ChatRoomMember
                .builder()
                .member(member)
                .chatRoom(chatRoom)
                .build());
    }
}
