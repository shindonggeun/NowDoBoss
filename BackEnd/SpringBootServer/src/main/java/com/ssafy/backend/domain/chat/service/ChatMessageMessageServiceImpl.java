package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.chat.exception.ChatErrorCode;
import com.ssafy.backend.domain.chat.exception.ChatException;
import com.ssafy.backend.domain.chat.repository.ChatMessageRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomMemberRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
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
public class ChatMessageMessageServiceImpl implements ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;

    @Override
    public List<ChatMessageResponse> selectChatMessages(Long chatRoomId, Long lastId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));
        return chatMessageRepository.selectChatMessages(chatRoom, lastId);
    }

    @Override
    public void enter(String topic, ChatMessageRequest request) {
        Member member = memberRepository.findById(request.getSenderId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId())
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));
        int memberCount = chatRoomMemberRepository.countByChatRoom(chatRoom);

        // 처음 입장한 경우 환영메시지 생성 후 DB 저장, 메시지 전송
        if (chatRoom.isFull(memberCount)) {
            throw new ChatException(ChatErrorCode.FULL_CHAT_ROOM);
        }

        if (!chatRoomMemberRepository.existsByMemberAndChatRoom(member, chatRoom)) {
            chatRoomMemberRepository.save(ChatRoomMember
                    .builder()
                    .member(member)
                    .chatRoom(chatRoom)
                    .build());
            ChatMessage enterMessage = ChatMessage.createEnterMessage(member, chatRoom);
            processMessage(enterMessage);
        }
    }

    // 단순히 메시지 전송 >> 단, chatRoomMember인지 확인
    @Override
    public void send(String topic, ChatMessageRequest request) {
        Member member = memberRepository.findById(request.getSenderId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId())
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));

        // repo에 메시지 저장
        ChatMessage talkMessage = ChatMessage.createTalkMessage(member, chatRoom, request.getContent());

        processMessage(talkMessage);

        /*chatMessageRepository.save(chatMessage);

        ChatMessageResponse chatMessageResponse = ChatMessageResponse.of(chatMessage, member, chatRoom.getId());

        try {
            String response = objectMapper.writeValueAsString(chatMessageResponse);

            // 카프카 이벤트 발생
            kafkaProducer.publishMessage(topic, response);

        } catch (Exception ex) {
            throw new ChatException(ChatErrorCode.SAVE_FAILED);
        }*/
    }

    public void processMessage(ChatMessage chatMessage) {
        /*if (request.getMessageType() != MessageType.ENTER) {
            throw new ChatException(ChatErrorCode.INVALID_MESSAGE_TYPE);
        }*/

        chatMessageRepository.save(chatMessage);

        ChatMessageResponse chatMessageResponse = ChatMessageResponse.of(chatMessage);

        try {
            String response = objectMapper.writeValueAsString(chatMessageResponse);

            // 카프카 이벤트 발생
            kafkaProducer.publishMessage(KafkaChatConstants.KAFKA_TOPIC, response);

        } catch (Exception ex) {
            throw new ChatException(ChatErrorCode.SAVE_FAILED);
        }
    }
}
