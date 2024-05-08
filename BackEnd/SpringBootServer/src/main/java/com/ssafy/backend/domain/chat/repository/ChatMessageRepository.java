package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.ChatMessage;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>, ChatMessageCustomRepository {
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM ChatMessage c WHERE c.chatRoom = :chatRoom")
    void deleteByChatRoom(ChatRoom chatRoom);
}
