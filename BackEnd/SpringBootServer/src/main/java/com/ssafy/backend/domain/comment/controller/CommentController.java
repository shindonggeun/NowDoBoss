package com.ssafy.backend.domain.comment.controller;

import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {
    @PostMapping
    public ResponseEntity<Message<Void>> createComment() {
        return ResponseEntity.ok().body(Message.success());
    }
}
