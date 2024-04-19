package com.ssafy.backend.domain.community.controller;

import com.ssafy.backend.domain.community.dto.CreateCommunityRequest;
import com.ssafy.backend.domain.community.service.CommunityService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community")
public class CommunityController {
    private final CommunityService communityService;

    @Operation(
            summary = "게시글 작성",
            description = "커뮤니티 게시글을 작성하는 기능입니다."
    )
    @PostMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createCommunity(@AuthenticationPrincipal MemberLoginActive loginActive,
                                          @RequestBody CreateCommunityRequest request) {

        communityService.createCommunity(loginActive.id(), request);
        return ResponseEntity.ok().body(Message.success());
    }
}
