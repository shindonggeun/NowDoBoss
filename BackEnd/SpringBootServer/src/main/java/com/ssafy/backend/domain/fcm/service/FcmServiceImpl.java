package com.ssafy.backend.domain.fcm.service;

import com.google.firebase.messaging.*;
import com.ssafy.backend.domain.fcm.dto.request.FcmAllRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmSubscribeRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTokenRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTopicRequest;
import com.ssafy.backend.domain.fcm.entity.DeviceToken;
import com.ssafy.backend.domain.fcm.exception.FcmErrorCode;
import com.ssafy.backend.domain.fcm.exception.FcmException;
import com.ssafy.backend.domain.fcm.repository.DeviceTokenRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FcmServiceImpl implements FcmService {

    private final DeviceTokenRepository deviceTokenRepository;
    private final MemberRepository memberRepository;

    @Override
    public void subscribeByTopic(FcmSubscribeRequest fcmSubscribeRequest) {
        try {
            FirebaseMessaging.getInstance().subscribeToTopic(Collections.singletonList(fcmSubscribeRequest.token()), fcmSubscribeRequest.topic());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.SUBSCRIBE_FAIL);
        }
    }

    // 지정된 topic에 fcm를 보냄
    @Override
    public void sendMessageByTopic(FcmTopicRequest fcmTopicRequest) {
        try {
            FirebaseMessaging.getInstance().send(Message.builder()
                    .setNotification(Notification.builder()
                            .setTitle(fcmTopicRequest.title())
                            .setBody(fcmTopicRequest.body())
                            .build())
                    .setTopic(fcmTopicRequest.topicName())
                    .build());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.CAN_NOT_SEND_NOTIFICATION);
        }
    }


    // 받은 token을 이용하여 fcm를 보냄
    @Transactional(readOnly = true)
    @Override
    public void sendMessageByToken(FcmTokenRequest fcmTokenRequest) {
        Member member = memberRepository.findById(fcmTokenRequest.memberId()).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_USER));
        List<String> tokenList = deviceTokenRepository.findTokenAllByMember(member).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_TOKEN));
        try {
            FirebaseMessaging.getInstance().sendMulticast(MulticastMessage.builder()
                    .setNotification(Notification.builder()
                            .setTitle(fcmTokenRequest.title())
                            .setBody(fcmTokenRequest.body())
                            .build())
                    .addAllTokens(tokenList)
                    .build());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.CAN_NOT_SEND_NOTIFICATION);
        }
    }

    @Transactional
    @Override
    public void createDeviceToken(Long memberId, String deviceToken) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_USER));
        deviceTokenRepository.save(DeviceToken.builder().token(deviceToken).member(member).build());
    }

    @Override
    public void deleteDeviceToken(String deviceToken) {
        deviceTokenRepository.deleteById(deviceToken);
    }
}
