package com.ssafy.backend.domain.chat.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.QChatMessage;
import com.ssafy.backend.domain.chat.entity.QChatRoom;
import com.ssafy.backend.domain.member.entity.QMember;
import com.ssafy.backend.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.backend.domain.chat.entity.QChatMessage.*;
import static com.ssafy.backend.domain.chat.entity.QChatRoom.chatRoom;
import static com.ssafy.backend.domain.chat.entity.QChatRoomMember.chatRoomMember;
import static com.ssafy.backend.domain.member.entity.QMember.*;

@Repository
@RequiredArgsConstructor
public class ChatMessageCustomRepositoryImpl implements ChatMessageCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChatMessageResponse> selectChatMessages(ChatRoom chatRoom, Long lastId) {
        return queryFactory
                .select(Projections.constructor(ChatMessageResponse.class,
                        chatMessage.chatRoom.id,
                        chatMessage.id,
                        chatMessage.type,
                        chatMessage.content,
                        chatMessage.createdAt,
                        member.id,
                        member.nickname,
                        member.profileImage
                        ))
                .from(chatMessage)
//                .join(chatMessage.chatRoom, chatRoom)
                .join(chatMessage.sender, member)
                .where(isLowerThan(lastId), equalsChatRoom(chatRoom))
                .orderBy(chatMessage.id.desc())
                .limit(10)
                .fetch();
    }

    private BooleanBuilder equalsChatRoom(final ChatRoom chatRoom) {
        return NullSafeBuilder.build(() -> chatMessage.chatRoom.eq(chatRoom));
    }

    private BooleanBuilder isLowerThan(final Long chatMessageId) {
        BooleanBuilder builder = new BooleanBuilder();
        if (chatMessageId != null && chatMessageId > 0) {
            builder.and(chatMessage.id.lt(chatMessageId));
        }
        return builder;
    }
}
