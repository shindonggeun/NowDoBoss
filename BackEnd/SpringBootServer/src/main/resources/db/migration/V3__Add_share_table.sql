CREATE TABLE `share` (
                         `token` varchar(255) COLLATE utf8mb3_bin NOT NULL COMMENT '토큰',
                         `url` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '입력화면 url',
                         `input` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '입력 데이터',
                         PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;