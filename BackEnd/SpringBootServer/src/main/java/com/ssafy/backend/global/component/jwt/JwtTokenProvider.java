package com.ssafy.backend.global.component.jwt;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtTokenPropsInfo tokenPropsInfo;

    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_NAME = "name";
    private static final String CLAIM_NICKNAME = "nickname";
    private static final String CLAIM_PROFILE_IMAGE = "profileImage";
    private static final String CLAIM_ROLE = "role";

    public String issueAccessToken(Member member) {
        // 사용자 정보를 기반으로 Claims 생성
        Claims claims = Jwts.claims()
                .id(String.valueOf(member.getId()))
                .add(CLAIM_EMAIL, member.getEmail())
                .add(CLAIM_NAME, member.getName())
                .add(CLAIM_NICKNAME, member.getNickname())
                .add(CLAIM_PROFILE_IMAGE, member.getProfileImage())
                .add(CLAIM_ROLE, member.getRole())
                .build();

        // 생성된 Claims와 함께 액세스 토큰 발급
        return issueToken(claims, tokenPropsInfo.accessExpiration(), tokenPropsInfo.accessKey());
    }

    private String issueToken(Claims claims, Duration expiration, String secretKey) {
        Date now = new Date();
        // 토큰 발급 시 현재 시간과 만료 시간을 설정하여 JWT를 생성합니다.
        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration.toMillis()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }
}
