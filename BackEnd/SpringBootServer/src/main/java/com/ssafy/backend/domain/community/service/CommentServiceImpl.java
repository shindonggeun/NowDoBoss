package com.ssafy.backend.domain.community.service;

import com.ssafy.backend.domain.community.dto.CommentListResponse;
import com.ssafy.backend.domain.community.dto.UpdateCommentRequest;
import com.ssafy.backend.domain.community.entity.Comments;
import com.ssafy.backend.domain.community.entity.Community;
import com.ssafy.backend.domain.community.exception.CommunityErrorCode;
import com.ssafy.backend.domain.community.exception.CommunityException;
import com.ssafy.backend.domain.community.repository.CommentRepository;
import com.ssafy.backend.domain.community.repository.CommunityRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    @Override
    public Long createComment(Long memberId, Long communityId, String content) {
        Member writer = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));

        Comments comment = Comments.builder()
                .writer(writer)
                .community(community)
                .content(content)
                .build();

        commentRepository.save(comment);

        return comment.getId();
    }

    @Override
    public List<CommentListResponse> selectCommentList(Long communityId, Long lastId) {
        return commentRepository.selectCommentList(communityId, lastId);
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public void updateComment(Long commentId, UpdateCommentRequest request) {
        Comments comments = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMENT));

        comments.update(request.content());
    }
}
