package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comments, Long> {
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Comments c WHERE c.community.id = :communityId")
    void deleteByCommunityId(Long communityId);
}
