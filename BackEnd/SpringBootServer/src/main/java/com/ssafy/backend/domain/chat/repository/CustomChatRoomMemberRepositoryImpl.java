package com.ssafy.backend.domain.chat.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.backend.domain.community.entity.enums.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.chat.entity.QChatRoomMember.chatRoomMember;

@Repository
@RequiredArgsConstructor
public class CustomChatRoomMemberRepositoryImpl implements CustomChatRoomMemberRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChatRoomResponse> selectPopularChatRoom(String category) {
        return queryFactory
                .select(Projections.constructor(ChatRoomResponse.class,
                        chatRoomMember.chatRoom.id,
                        chatRoomMember.chatRoom.category,
                        chatRoomMember.chatRoom.name,
                        chatRoomMember.chatRoom.introduction,
                        chatRoomMember.count().intValue(),
                        chatRoomMember.chatRoom.limit
                ))
                .from(chatRoomMember)
                .where(categoryEquals(category))
                .groupBy(chatRoomMember.chatRoom)
                .orderBy(chatRoomMember.count().desc())
                .limit(2)
                .fetch();
    }

    private BooleanBuilder categoryEquals(final String category) {
        BooleanBuilder builder = new BooleanBuilder();
        if (!category.isBlank()) {
            builder.and(chatRoomMember.chatRoom.category.eq(Category.valueOf(category)));
        }
        return builder;
    }
}
