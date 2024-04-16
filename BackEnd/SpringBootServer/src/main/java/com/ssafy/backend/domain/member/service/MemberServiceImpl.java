package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberSignupRequest;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public void signupMember(MemberSignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL);
        }

        memberRepository.save(signupRequest.toEntity());
    }
}
