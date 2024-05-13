package com.ssafy.backend.domain.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.exception.ChatErrorCode;
import com.ssafy.backend.domain.chat.exception.ChatException;
import com.ssafy.backend.domain.chat.repository.ChatMessageRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.global.component.firebase.dto.request.FcmTopicRequest;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.firebase.service.FirebaseService;
import com.ssafy.backend.global.component.kafka.KafkaConstants;
import com.ssafy.backend.global.component.kafka.producer.KafkaProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;
    private final FirebaseService firebaseService;

    @Override
    public List<ChatMessageResponse> selectChatMessages(Long chatRoomId, Long lastId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_EXIST_CHAT_ROOM));
        return chatMessageRepository.selectChatMessages(chatRoom, lastId);
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
    }

    public void processMessage(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
        ChatMessageResponse chatMessageResponse = ChatMessageResponse.of(chatMessage);

        try {
            String response = objectMapper.writeValueAsString(chatMessageResponse);

            // 카프카 이벤트 발생
            kafkaProducer.publish(KafkaConstants.KAFKA_TOPIC, response);

        } catch (Exception ex) {
            throw new ChatException(ChatErrorCode.SAVE_FAILED);
        }

        // topic : chat.room.{roomId}
        firebaseService.sendMessageByTopic(
                FcmTopicRequest.builder()
                        .title(chatMessage.getChatRoom().getName())
                        .body(chatMessage.getContent())
                        .topicName("chat.room." + chatMessage.getChatRoom().getId())
                        .build());
    }
}
