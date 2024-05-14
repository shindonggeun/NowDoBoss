package com.ssafy.backend.domain.share.controller;

import com.ssafy.backend.domain.share.dto.request.CreateShareRequest;
import com.ssafy.backend.domain.share.dto.response.LinkTokenResponse;
import com.ssafy.backend.domain.share.service.ShareService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/share")
public class ShareController {
    private final ShareService shareService;

    // 데이터 저장 후 UUID? 같은 유일한 값인 token 반환
    @PostMapping
    public ResponseEntity<Message<LinkTokenResponse>> share(@RequestBody CreateShareRequest request) {
        Map<String, Object> inputs = request.getInput();
        for (Map.Entry<String, Object> entry : inputs.entrySet()) {
            log.info("key : {}, value : {}", entry.getKey(), entry.getValue());
        }

        LinkTokenResponse response = shareService.createShare(request);

        return ResponseEntity.ok().body(Message.success(response));
    }
}
