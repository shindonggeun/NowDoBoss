package com.ssafy.backend.domain.comment.repository;

import com.ssafy.backend.domain.comment.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comments, Long> {
}
