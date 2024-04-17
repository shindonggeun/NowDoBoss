package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberInfo;
import com.ssafy.backend.domain.member.dto.MemberLoginRequest;
import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.dto.MemberSignupRequest;

public interface MemberService {

    void signupMember(MemberSignupRequest signupRequest);

    MemberLoginResponse loginMember(MemberLoginRequest loginRequest);

    void logoutMember(String email);

    MemberInfo getMember(Long memberId);

    void deleteMember(Long memberId);
}
