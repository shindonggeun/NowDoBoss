package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.*;

public interface MemberService {

    void signupMember(MemberSignupRequest signupRequest);

    MemberLoginResponse loginMember(MemberLoginRequest loginRequest);

    void logoutMember(String email);

    MemberInfo getMember(Long memberId);

    void deleteMember(Long memberId);

    void updateProfileImageAndNickNameMember(Long memberId, MemberUpdateRequest updateRequest);
}
