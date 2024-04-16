package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.MemberSignupRequest;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "회원", description = "회원 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(
            summary = "회원가입",
            description = "회원정보에 필요한 정보를 입력하여 회원가입을 하는 기능입니다."
    )
    @PostMapping("/signup")
    public ResponseEntity<Message<Void>> signupMember(@Valid @RequestBody MemberSignupRequest signupRequest) {
        memberService.signupMember(signupRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
