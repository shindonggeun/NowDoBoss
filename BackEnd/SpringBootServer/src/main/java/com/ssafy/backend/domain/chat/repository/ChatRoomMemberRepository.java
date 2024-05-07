package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.ChatRoomMember;
import com.ssafy.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long>, CustomChatRoomMemberRepository {

    Optional<ChatRoomMember> findByMemberAndChatRoom(Member member, ChatRoom chatRoom);
}
