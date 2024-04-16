package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.global.component.jwt.dto.JwtTokenInfo;

public record MemberLoginResponse(JwtTokenInfo tokenInfo, MemberInfo memberInfo) {
}
