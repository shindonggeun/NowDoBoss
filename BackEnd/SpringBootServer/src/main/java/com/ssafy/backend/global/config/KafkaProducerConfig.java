//package com.ssafy.backend.global.config;
//
//import com.google.common.collect.ImmutableMap;
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.apache.kafka.common.serialization.StringSerializer;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.annotation.EnableKafka;
//import org.springframework.kafka.core.DefaultKafkaProducerFactory;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.kafka.core.ProducerFactory;
//
//import java.util.Map;
//
//@EnableKafka
//@Configuration
//public class KafkaProducerConfig {
//    @Value("${spring.kafka.bootstrap-servers}")
//    private String bootstrapServers;
//
//    // kafka producer 설정
//    public Map<String, Object> producerConfigs() {
//        return ImmutableMap.<String, Object>builder()
//                .put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
//                .put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class)
//                .put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class)
////                .put(ConsumerConfig.GROUP_ID_CONFIG, groupId)
//                .build();
//    }
//
//    // kafka 메시지 생성
//    @Bean
//    public ProducerFactory<String, String> producerFactory() {
//        return new DefaultKafkaProducerFactory<>(producerConfigs());
//    }
//
//    // 메시지를 kafka에 보내는데 이용, send 메소드 등을 통해 메시지를 kafka topic에 발행할 수 있다.
//    @Bean
//    public KafkaTemplate<String, String> kafkaTemplate() {
//        return new KafkaTemplate<>(producerFactory());
//    }
//
//    /*@Bean
//    public ProducerFactory<String, ResponseMessageDto> producerFactory() {
//        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration());
//    }
//
//    @Bean
//    public Map<String, Object> kafkaProducerConfiguration() {
//        return ImmutableMap.<String, Object>builder()
//                .put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER)
//                .put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class)
//                .put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class)
//                .put("group.id", KafkaConstants.GROUP_ID)
//                .build();
//    }
//
//    @Bean
//    public KafkaTemplate<String, ResponseMessageDto> kafkaTemplate() {
//        return new KafkaTemplate<>(producerFactory());
//    }*/
//
//}
