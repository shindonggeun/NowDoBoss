package com.ssafy.backend.global.component.jwt.service;

import com.ssafy.backend.domain.member.dto.MemberInfo;
import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.dto.JwtTokenInfo;
import com.ssafy.backend.global.component.jwt.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public MemberLoginResponse issueAndSaveJwtToken(Member member) {
        String accessToken = jwtTokenProvider.issueAccessToken(member);
        String refreshToken = jwtTokenProvider.issueRefreshToken();

        log.info("== {} 회원에 대한 토큰 발급: {}", member.getEmail(), accessToken);

        try {
            refreshTokenRepository.save(member.getEmail(), refreshToken);
        } catch (Exception e) {
            // TODO: 레디스 관련 커스텀 Exception (Global)
            throw new RuntimeException("레디스 연결에 실패하였습니다.");
        }

        JwtTokenInfo tokenInfo = new JwtTokenInfo(accessToken);

        MemberInfo memberInfo = new MemberInfo(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getNickname(),
                member.getProfileImage(),
                member.getRole()
        );

        return new MemberLoginResponse(tokenInfo, memberInfo);
    }

    @Override
    public String reissueAccessToken(String email) {
        return null;
    }
}
