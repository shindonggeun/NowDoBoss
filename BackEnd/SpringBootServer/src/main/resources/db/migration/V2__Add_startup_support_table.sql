CREATE TABLE `startup_support` (
                                   `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '정부지원 아이디',
                                   `title` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '정부지원 제목',
                                   `type` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '지원유형',
                                   `application_period` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '신청기간',
                                   `receiving_institution` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '접수기관',
                                   `detail_page_link` text COLLATE utf8mb3_bin COMMENT '상세페이지 링크',
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=735 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;