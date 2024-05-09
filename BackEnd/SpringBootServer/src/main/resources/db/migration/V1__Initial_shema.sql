CREATE TABLE `member` (
                          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                          `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '회원 아이디',
                          `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                          `email` varchar(255) COLLATE utf8mb3_bin NOT NULL COMMENT '이메일',
                          `name` varchar(40) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '이름',
                          `nickname` varchar(60) COLLATE utf8mb3_bin NOT NULL COMMENT '닉네임',
                          `password` varchar(80) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '비밀번호',
                          `profile_image` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '프로필 이미지 URL',
                          `provider` enum('KAKAO','NAVER','GOOGLE') COLLATE utf8mb3_bin DEFAULT NULL COMMENT '소셜 로그인 제공업체',
                          `role` enum('USER','ADMIN') COLLATE utf8mb3_bin NOT NULL COMMENT '권한',
                          PRIMARY KEY (`id`),
                          KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

