package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.CreateCommunityRequest;
import com.ssafy.backend.domain.community.entity.Community;
import com.ssafy.backend.domain.community.entity.Image;
import com.ssafy.backend.domain.community.repository.CommunityRepository;
import com.ssafy.backend.domain.community.repository.ImageRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {
    private final MemberRepository memberRepository;
    private final CommunityRepository communityRepository;
    private final ImageRepository imageRepository;

    @Override
    public Long createCommunity(Long memberId, CreateCommunityRequest request) {
        Member writer = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        Community community = request.toEntity();
        community = community.toBuilder().writer(writer).build();
        communityRepository.save(community);

        List<String> imageUrls = request.images();
        List<Image> images = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            images.add(Image.builder()
                    .community(community)
                    .url(imageUrl)
                    .build());
        }

        imageRepository.saveAll(images);
        return community.getId();
    }
}
