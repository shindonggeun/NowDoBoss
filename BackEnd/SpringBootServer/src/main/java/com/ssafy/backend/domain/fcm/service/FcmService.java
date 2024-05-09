package com.ssafy.backend.domain.fcm.service;

import com.ssafy.backend.domain.fcm.dto.request.FcmAllRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmSubscribeRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTokenRequest;
import com.ssafy.backend.domain.fcm.dto.request.FcmTopicRequest;

public interface FcmService {
    void sendMessageByTopic(FcmTopicRequest request);
    void sendMessageByToken(FcmTokenRequest request);
    void createDeviceToken(Long memberId, String deviceToken);
    void subscribeByTopic(FcmSubscribeRequest request);
    void deleteDeviceToken(String deviceToken);
}
