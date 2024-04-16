package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginRequest;
import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.dto.MemberSignupRequest;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호를 입력하여 로그인을 하는 기능입니다."
    )
    @PostMapping("/login")
    public ResponseEntity<Message<MemberLoginResponse>> loginMember(@RequestBody MemberLoginRequest loginRequest,
                                                                    HttpServletResponse response) {
        MemberLoginResponse loginResponse = memberService.loginMember(loginRequest);
        // JWT 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", loginResponse.tokenInfo().accessToken());
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(25200); // 4200분(25200초)으로 설정 (25200)
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success(loginResponse));
    }
}
