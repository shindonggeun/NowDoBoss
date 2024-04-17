package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberLoginRequest;
import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.dto.MemberSignupRequest;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.jwt.repository.RefreshTokenRepository;
import com.ssafy.backend.global.component.jwt.service.JwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void signupMember(MemberSignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL);
        }

        signupRequest.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        memberRepository.save(signupRequest.toEntity());
    }

    @Override
    public MemberLoginResponse loginMember(MemberLoginRequest loginRequest) {
        Member member = memberRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        String realPassword = member.getPassword();

        if (!passwordEncoder.matches(loginRequest.password(), realPassword)) {
            throw new MemberException(MemberErrorCode.NOT_MATCH_PASSWORD);
        }

        return jwtTokenService.issueAndSaveJwtToken(member);
    }

    @Override
    public void logoutMember(String email) {
        Optional<String> token = refreshTokenRepository.find(email);

        if (token.isEmpty()) {
            throw new MemberException(MemberErrorCode.ALREADY_MEMBER_LOGOUT);
        }

        // 리프레쉬 토큰 삭제
        refreshTokenRepository.delete(email);
    }
}
