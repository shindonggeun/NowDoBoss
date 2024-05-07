package com.ssafy.backend.domain.chat.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomListResponse;
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
    public List<ChatRoomListResponse> selectChatRooms(Long memberId, Long lastId) {
        return queryFactory
                .select(Projections.constructor(ChatRoomListResponse.class,
                        chatRoom.id,
                        chatRoom.name
                )).distinct()
                .from(chatRoom)
                .join(chatRoomMember).on(chatRoomMember.chatRoom.eq(chatRoom))
                .where(equalsMemberId(memberId), isLowerThan(lastId))
                .orderBy(chatRoom.id.desc())
                .limit(10)
                .fetch();
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
