package com.ssafy.backend.domain.chat.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;
import com.ssafy.backend.domain.chat.entity.QChatRoom;
import com.ssafy.backend.domain.chat.entity.QChatRoomMember;
import com.ssafy.backend.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.chat.entity.QChatRoom.*;
import static com.ssafy.backend.domain.chat.entity.QChatRoomMember.*;
import static com.ssafy.backend.domain.community.entity.QComments.comments;
import static com.ssafy.backend.domain.community.entity.QCommunity.community;

@Repository
@RequiredArgsConstructor
public class ChatRoomCustomRepositoryImpl implements ChatRoomCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChatRoomListResponse> selectChatRooms(Long lastId) {
        return queryFactory
                .select(Projections.constructor(ChatRoomListResponse.class,
                        chatRoom.id,
                        chatRoom.category,
                        chatRoom.name,
                        ExpressionUtils.as(JPAExpressions.select(chatRoomMember.count().intValue())
                                .from(chatRoomMember)
                                .where(chatRoomMember.chatRoom.id.eq(chatRoom.id)), "memberCount"),
                        chatRoom.limit
                        ))
                .from(chatRoom)
                .where(isLowerThan(lastId))
                .orderBy(chatRoom.id.desc())
                .limit(10)
                .fetch();
    }

    @Override
    public List<MyChatRoomListResponse> selectMyChatRooms(Long memberId, MyChatRoomListRequest request) {
        return queryFactory
                .select(Projections.constructor(MyChatRoomListResponse.class,
                        chatRoom.id,
                        chatRoom.name
                )).distinct()
                .from(chatRoom)
                .join(chatRoomMember).on(chatRoomMember.chatRoom.eq(chatRoom))
                .where(equalsMemberId(memberId), isLowerThan(request.lastId()), nameLikeKeyword(request.keyword()))
                .orderBy(chatRoom.id.desc())
                .limit(10)
                .fetch();
    }

    private BooleanBuilder nameLikeKeyword(final String keyword) {
        BooleanBuilder builder = new BooleanBuilder();
        if (keyword != null) {
            builder.and(chatRoom.name.like("%" + keyword + "%"));
        }
        return builder;
    }

    private BooleanBuilder equalsMemberId(final Long memberId) {
        return NullSafeBuilder.build(() -> chatRoomMember.member.id.eq(memberId));
    }

    private BooleanBuilder isLowerThan(final Long chatRoomId) {
        BooleanBuilder builder = new BooleanBuilder();
        if (chatRoomId != null && chatRoomId > 0) {
            builder.and(chatRoom.id.lt(chatRoomId));
        }
        return builder;
    }

    @Override
    public ChatRoomResponse selectChatRoomDetail(Long chatRoomId) {
        return queryFactory
                .select(Projections.constructor(ChatRoomResponse.class,
                        chatRoom.id,
                        chatRoom.category,
                        chatRoom.name,
                        chatRoom.introduction,
                        ExpressionUtils.as(JPAExpressions.select(chatRoomMember.count().intValue())
                                .from(chatRoomMember)
                                .where(chatRoomMember.chatRoom.id.eq(chatRoomId)), "memberCount"),
                        chatRoom.limit
                ))
                .from(chatRoom)
                .where(equalsChatRoomId(chatRoomId))
                .fetchOne();
    }

    private BooleanBuilder equalsChatRoomId(final Long chatRoomId) {
        return NullSafeBuilder.build(() -> chatRoom.id.eq(chatRoomId));
    }
}
