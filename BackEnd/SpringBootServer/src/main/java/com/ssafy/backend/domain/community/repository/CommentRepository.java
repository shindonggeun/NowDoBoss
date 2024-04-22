package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comments, Long> {
}
