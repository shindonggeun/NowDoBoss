package com.ssafy.backend.domain.chat.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.chat.dto.request.MyChatRoomListRequest;
import com.ssafy.backend.domain.chat.dto.response.MyChatRoomListResponse;
import com.ssafy.backend.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.chat.entity.QChatRoom.*;
import static com.ssafy.backend.domain.chat.entity.QChatRoomMember.*;

@Repository
@RequiredArgsConstructor
public class ChatRoomCustomRepositoryImpl implements ChatRoomCustomRepository {
    private final JPAQueryFactory queryFactory;

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
}
