//package com.ssafy.backend.global.component.kafka.controller;
//
//import com.ssafy.backend.global.common.dto.Message;
//import com.ssafy.backend.global.component.kafka.service.KafkaRealTimeStreamServiceImpl;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/realtime")
//public class KafkaRealTimeStreamController {
//    private final KafkaRealTimeStreamServiceImpl kafkaRealTimeStreamService;
//
//    @GetMapping("/{key}")
//    public ResponseEntity<Message<Long>> getRealTimeCount(@PathVariable String key) {
//        Long count = kafkaRealTimeStreamService.getRealTimeCount(key);
//        return ResponseEntity.ok().body(Message.success(count));
//    }
//}
