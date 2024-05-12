CREATE TABLE `member` (
                          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                          `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '회원 아이디',
                          `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                          `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '이메일',
                          `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '이름',
                          `nickname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '닉네임',
                          `password` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '비밀번호',
                          `profile_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '프로필 이미지 URL',
                          `provider` enum('KAKAO','NAVER','GOOGLE') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '소셜 로그인 제공업체',
                          `role` enum('USER','ADMIN') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '권한',
                          PRIMARY KEY (`id`),
                          KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `chat_room` (
                             `chat_room_limit` int unsigned DEFAULT NULL COMMENT '채팅방 제한 인원수',
                             `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                             `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '채팅방 아이디',
                             `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                             `chat_room_introduction` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '채팅방 소개',
                             `chat_room_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '채팅방 이름',
                             `category` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '카테고리',
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `chat_message` (
                                `chat_room_id` int unsigned NOT NULL COMMENT '채팅방 아이디',
                                `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                                `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '채팅 내역 아이디',
                                `member_id` int unsigned NOT NULL COMMENT '작성자 아이디',
                                `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                                `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '채팅 내용',
                                `type` enum('ENTER','EXIT','TALK') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '채팅 내용 종류',
                                PRIMARY KEY (`id`),
                                KEY `FKj52yap2xrm9u0721dct0tjor9` (`chat_room_id`),
                                KEY `FKynfbnbqot8mpd1tquoc2s1w5` (`member_id`),
                                CONSTRAINT `FKj52yap2xrm9u0721dct0tjor9` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
                                CONSTRAINT `FKynfbnbqot8mpd1tquoc2s1w5` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `chat_room_member` (
                                    `chat_room_id` int unsigned NOT NULL COMMENT '채팅방 아이디',
                                    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '채팅방 구성 아이디',
                                    `member_id` int unsigned NOT NULL COMMENT '구성원 아이디',
                                    PRIMARY KEY (`id`),
                                    KEY `FKo6a9v51aal2574fjb1ldlw4di` (`chat_room_id`),
                                    KEY `FKq64atn9y4cyjpp4qcrllxi3o5` (`member_id`),
                                    CONSTRAINT `FKo6a9v51aal2574fjb1ldlw4di` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
                                    CONSTRAINT `FKq64atn9y4cyjpp4qcrllxi3o5` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `community` (
                             `read_count` int unsigned NOT NULL COMMENT '조회수',
                             `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                             `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '커뮤니티 아이디',
                             `member_id` int unsigned NOT NULL COMMENT '작성자 아이디',
                             `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                             `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '커뮤니티 글 내용',
                             `title` varchar(65) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '제목',
                             `category` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '카테고리',
                             PRIMARY KEY (`id`),
                             KEY `FKhcwt9ggjfvanatb6u621vbf1r` (`member_id`),
                             CONSTRAINT `FKhcwt9ggjfvanatb6u621vbf1r` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `comment` (
                           `community_id` int unsigned NOT NULL COMMENT '커뮤니티 글 아이디',
                           `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
                           `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '댓글 아이디',
                           `member_id` int unsigned NOT NULL COMMENT '작성자 아이디',
                           `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
                           `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '댓글 내용',
                           PRIMARY KEY (`id`),
                           KEY `FKbwy7a8hwdjqbm26qadw82ikqg` (`community_id`),
                           KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
                           CONSTRAINT `FKbwy7a8hwdjqbm26qadw82ikqg` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`),
                           CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `image` (
                         `community_id` int unsigned NOT NULL COMMENT '커뮤니티 아이디',
                         `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '커뮤니티 이미지 아이디',
                         `url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '이미지 url',
                         PRIMARY KEY (`id`),
                         KEY `FKqv3gf8jaakhx7b0yp5x84642q` (`community_id`),
                         CONSTRAINT `FKqv3gf8jaakhx7b0yp5x84642q` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `service_type` (
                                `key_money` int NOT NULL COMMENT '권리금 수준 평균, 단위: 만원',
                                `key_money_level` decimal(10,2) DEFAULT NULL COMMENT '권리금 수준 ㎡당 평균, 만원/㎡',
                                `key_money_ratio` decimal(10,2) DEFAULT NULL COMMENT '권리금 유 비율',
                                `large_size` int NOT NULL COMMENT '대형 크기(m²)',
                                `medium_size` int NOT NULL COMMENT '중형 크기(m²)',
                                `small_size` int NOT NULL COMMENT '소형 크기(m²)',
                                `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '서비스 아이디',
                                `service_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '업종 코드',
                                `service_code_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '업종 이름',
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `rent` (
                        `first_floor` int NOT NULL COMMENT '1층 임대료(단위: 3.3㎡당 월환산임대료, 원)',
                        `other_floor` int NOT NULL COMMENT '1층 외 임대료(단위: 3.3㎡당 월환산임대료, 원)',
                        `total` int NOT NULL COMMENT '전체 층 임대료(단위: 3.3㎡당 월환산임대료, 원)',
                        `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '임대료 아이디',
                        `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                        `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `franchisee` (
                              `area` int NOT NULL COMMENT '기준점포면적(㎡)',
                              `deposit` int NOT NULL COMMENT '가맹 보증금, 천원',
                              `education` int NOT NULL COMMENT '교육비, 천원',
                              `etc` int NOT NULL COMMENT '기타비용, 천원',
                              `interior` int NOT NULL COMMENT '인테리어 비용, 천원',
                              `subscription` int NOT NULL COMMENT '가입비, 천원',
                              `total_levy` int NOT NULL COMMENT '부담금 합계, 천원',
                              `unit_area` int NOT NULL COMMENT '단위면적(3.3㎡)당 인테리어 비용, 천원',
                              `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '프랜차이즈 아이디',
                              `service_type_id` int unsigned NOT NULL COMMENT '서비스 아이디',
                              `brand_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '브랜드 이름',
                              PRIMARY KEY (`id`),
                              KEY `FK3046354yfkxp6v9fo14gswkhw` (`service_type_id`),
                              CONSTRAINT `FK3046354yfkxp6v9fo14gswkhw` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12124 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `area_commercial` (
                                   `x` float NOT NULL COMMENT 'x 좌표 값',
                                   `y` float NOT NULL COMMENT 'y 좌표 값',
                                   `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '영역_상권 아이디',
                                   `administration_code` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드',
                                   `administration_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드 명',
                                   `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                   `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                   `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                   `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                   `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                   `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                   PRIMARY KEY (`id`),
                                   KEY `idx_district_code` (`district_code`),
                                   KEY `idx_administration_code` (`administration_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1651 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `area_district` (
                                 `x` float NOT NULL COMMENT 'x 좌표 값',
                                 `y` float NOT NULL COMMENT 'y 좌표 값',
                                 `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '영역 자치구 아이디',
                                 `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                 `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                 PRIMARY KEY (`id`),
                                 KEY `idx_district_code` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `change_district` (
                                   `closed_months` int NOT NULL COMMENT '폐업 영업 개월 평균',
                                   `opened_months` int NOT NULL COMMENT '운영 영업 개월 평균',
                                   `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '상권 변화 지표 자치구 아이디',
                                   `change_indicator` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '상권 변화 지표',
                                   `change_indicator_name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '상권 변화 지표 명',
                                   `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                   `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                   `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                   PRIMARY KEY (`id`),
                                   KEY `idx_period_code` (`period_code`),
                                   KEY `idx_district_code` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `device_token` (
                                `member_id` int unsigned NOT NULL COMMENT '회원 아이디',
                                `device_token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '디바이스 토큰',
                                PRIMARY KEY (`device_token`),
                                KEY `FKqbpc6xf21ge7sek3op9t4ru3v` (`member_id`),
                                CONSTRAINT `FKqbpc6xf21ge7sek3op9t4ru3v` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `facility_commercial` (
                                       `bus_stop_cnt` int unsigned DEFAULT NULL COMMENT '버스 정거장 수',
                                       `elementary_school_cnt` int unsigned DEFAULT NULL COMMENT '초등학교 수',
                                       `facility_cnt` int unsigned DEFAULT NULL COMMENT '집객 시설 수',
                                       `high_school_cnt` int unsigned DEFAULT NULL COMMENT '고등학교 수',
                                       `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '집객시설_상권 아이디',
                                       `middle_school_cnt` int unsigned DEFAULT NULL COMMENT '중학교 수',
                                       `subway_station_cnt` int unsigned DEFAULT NULL COMMENT '지하철 역 수',
                                       `university_cnt` int unsigned DEFAULT NULL COMMENT '대학교 수',
                                       `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                       `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                       `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                       `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                       `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                       PRIMARY KEY (`id`),
                                       KEY `idx_period_code` (`period_code`),
                                       KEY `idx_commercial_code` (`commercial_code`)
) ENGINE=InnoDB AUTO_INCREMENT=18937 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `foot_traffic_commercial` (
                                           `female_foot_traffic` int unsigned DEFAULT NULL COMMENT '여성 유동인구 수',
                                           `fifty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 50 유동인구 수',
                                           `foot_traffic_00` int unsigned DEFAULT NULL COMMENT '시간대 00 ~ 06 유동인구 수',
                                           `foot_traffic_06` int unsigned DEFAULT NULL COMMENT '시간대 06 ~ 11 유동인구 수',
                                           `foot_traffic_11` int unsigned DEFAULT NULL COMMENT '시간대 11 ~ 14 유동인구 수',
                                           `foot_traffic_14` int unsigned DEFAULT NULL COMMENT '시간대 14 ~ 17 유동인구 수',
                                           `foot_traffic_17` int unsigned DEFAULT NULL COMMENT '시간대 17 ~ 21 유동인구 수',
                                           `foot_traffic_21` int unsigned DEFAULT NULL COMMENT '시간대 21 ~ 24 유동인구 수',
                                           `forty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 40 유동인구 수',
                                           `fri_foot_traffic` int unsigned DEFAULT NULL COMMENT '금요일 유동인구 수',
                                           `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '유동인구_상권 아이디',
                                           `male_foot_traffic` int unsigned DEFAULT NULL COMMENT '남성 유동인구 수',
                                           `mon_foot_traffic` int unsigned DEFAULT NULL COMMENT '월요일 유동인구 수',
                                           `sat_foot_traffic` int unsigned DEFAULT NULL COMMENT '토요일 유동인구 수',
                                           `sixty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 60 이상 유동인구 수',
                                           `sun_foot_traffic` int unsigned DEFAULT NULL COMMENT '일요일 유동인구 수',
                                           `teen_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 10 유동인구 수',
                                           `thirty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 30 유동인구 수',
                                           `thu_foot_traffic` int unsigned DEFAULT NULL COMMENT '목요일 유동인구 수',
                                           `total_foot_traffic` int unsigned DEFAULT NULL COMMENT '총 유동인구 수',
                                           `tue_foot_traffic` int unsigned DEFAULT NULL COMMENT '화요일 유동인구 수',
                                           `twenty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 20 유동인구 수',
                                           `wed_foot_traffic` int unsigned DEFAULT NULL COMMENT '수요일 유동인구 수',
                                           `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                           `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                           `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                           `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                           `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                           PRIMARY KEY (`id`),
                                           KEY `idx_period_code` (`period_code`),
                                           KEY `idx_commercial_code` (`commercial_code`)
) ENGINE=InnoDB AUTO_INCREMENT=31347 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `foot_traffic_district` (
                                         `female_foot_traffic` int unsigned DEFAULT NULL COMMENT '여성 유동인구 수',
                                         `fifty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 50 유동인구 수',
                                         `foot_traffic_00` int unsigned DEFAULT NULL COMMENT '시간대 00 ~ 06 유동인구 수',
                                         `foot_traffic_06` int unsigned DEFAULT NULL COMMENT '시간대 06 ~ 11 유동인구 수',
                                         `foot_traffic_11` int unsigned DEFAULT NULL COMMENT '시간대 11 ~ 14 유동인구 수',
                                         `foot_traffic_14` int unsigned DEFAULT NULL COMMENT '시간대 14 ~ 17 유동인구 수',
                                         `foot_traffic_17` int unsigned DEFAULT NULL COMMENT '시간대 17 ~ 21 유동인구 수',
                                         `foot_traffic_21` int unsigned DEFAULT NULL COMMENT '시간대 21 ~ 24 유동인구 수',
                                         `forty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 40 유동인구 수',
                                         `fri_foot_traffic` int unsigned DEFAULT NULL COMMENT '금요일 유동인구 수',
                                         `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '유동인구_자치구_아이디',
                                         `male_foot_traffic` int unsigned DEFAULT NULL COMMENT '남성 유동인구 수',
                                         `mon_foot_traffic` int unsigned DEFAULT NULL COMMENT '월요일 유동인구 수',
                                         `sat_foot_traffic` int unsigned DEFAULT NULL COMMENT '토요일 유동인구 수',
                                         `sixty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 60 유동인구 수',
                                         `sun_foot_traffic` int unsigned DEFAULT NULL COMMENT '일요일 유동인구 수',
                                         `teen_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 10 유동인구 수',
                                         `thirty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 30 유동인구 수',
                                         `thu_foot_traffic` int unsigned DEFAULT NULL COMMENT '목요일 유동인구 수',
                                         `total_foot_traffic` int unsigned DEFAULT NULL COMMENT '총 유동인구 수',
                                         `tue_foot_traffic` int unsigned DEFAULT NULL COMMENT '화요일 유동인구 수',
                                         `twenty_foot_traffic` int unsigned DEFAULT NULL COMMENT '연령대 20 유동인구 수',
                                         `wed_foot_traffic` int unsigned DEFAULT NULL COMMENT '수요일 유동인구 수',
                                         `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                         `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                         `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                         PRIMARY KEY (`id`),
                                         KEY `idx_period_code` (`period_code`),
                                         KEY `idx_district_code` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `income_administration` (
                                         `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '소득소비_행정동 아이디',
                                         `total_price` bigint unsigned DEFAULT NULL COMMENT '지출 총금액',
                                         `administration_code` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드',
                                         `administration_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드 명',
                                         `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                         PRIMARY KEY (`id`),
                                         KEY `idx_period_code` (`period_code`),
                                         KEY `idx_administration_code` (`administration_code`)
) ENGINE=InnoDB AUTO_INCREMENT=8076 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `income_commercial` (
                                     `income_section_code` int DEFAULT NULL COMMENT '소득 구간 코드',
                                     `clothes_price` bigint unsigned DEFAULT NULL COMMENT '의류 신발 지출 총금액',
                                     `culture_price` bigint unsigned DEFAULT NULL COMMENT '문화 지출 총금액',
                                     `education_price` bigint unsigned DEFAULT NULL COMMENT '교육 지출 총금액',
                                     `grocery_price` bigint unsigned DEFAULT NULL COMMENT '식료품 지출 총금액',
                                     `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '소득소비_상권 아이디',
                                     `leisure_price` bigint unsigned DEFAULT NULL COMMENT '여가 지출 총금액',
                                     `life_price` bigint unsigned DEFAULT NULL COMMENT '생활용품 지출 총금액',
                                     `luxury_price` bigint unsigned DEFAULT NULL COMMENT '유흥 총금액',
                                     `medical_price` bigint unsigned DEFAULT NULL COMMENT '의료비 지출 총금액',
                                     `month_avg_income` bigint unsigned DEFAULT NULL COMMENT '월 평균 소득 금액',
                                     `total_price` bigint unsigned DEFAULT NULL COMMENT '지출 총금액',
                                     `traffic_price` bigint unsigned DEFAULT NULL COMMENT '교통 지출 총금액',
                                     `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                     `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                     `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                     `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                     `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                     PRIMARY KEY (`id`),
                                     KEY `idx_period_code` (`period_code`),
                                     KEY `idx_commercial_code` (`commercial_code`)
) ENGINE=InnoDB AUTO_INCREMENT=30984 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `income_district` (
                                   `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '소득소비_자치구 아이디',
                                   `total_price` bigint unsigned DEFAULT NULL COMMENT '지출 총금액',
                                   `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                   `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                   `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                   PRIMARY KEY (`id`),
                                   KEY `idx_period_code` (`period_code`),
                                   KEY `idx_district_code` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `population_commercial` (
                                         `female_population` int unsigned DEFAULT NULL COMMENT '여성 상주인구 수',
                                         `fifty_population` int unsigned DEFAULT NULL COMMENT '연령대 50 상주인구 수',
                                         `forty_population` int unsigned DEFAULT NULL COMMENT '연령대 40 상주인구 수',
                                         `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '상주인구_상권 아이디',
                                         `male_population` int unsigned DEFAULT NULL COMMENT '남성 상주인구 수',
                                         `sixty_population` int unsigned DEFAULT NULL COMMENT '연령대 60 이상 상주인구 수',
                                         `teen_population` int unsigned DEFAULT NULL COMMENT '연령대 10 상주인구 수',
                                         `thirty_population` int unsigned DEFAULT NULL COMMENT '연령대 30 상주인구 수',
                                         `total_population` int unsigned DEFAULT NULL COMMENT '총 상주인구 수',
                                         `twenty_population` int unsigned DEFAULT NULL COMMENT '연령대 20 상주인구 수',
                                         `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                         `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                         `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                         `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                         `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                         PRIMARY KEY (`id`),
                                         KEY `idx_period_code` (`period_code`),
                                         KEY `idx_commercial_code` (`commercial_code`)
) ENGINE=InnoDB AUTO_INCREMENT=26112 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `sales_administration` (
                                        `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '추정매출_행정동_아이디',
                                        `month_sales` bigint unsigned DEFAULT NULL COMMENT '당월 매출 금액',
                                        `weekday_sales` bigint unsigned DEFAULT NULL COMMENT '주중 매출 금액',
                                        `weekend_sales` bigint unsigned DEFAULT NULL COMMENT '주말 매출 금액',
                                        `administration_code` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드',
                                        `administration_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드 명',
                                        `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                        `service_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드',
                                        `service_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드 명',
                                        `service_type` enum('RESTAURANT','ACADEMY','LEISURE','SERVICE','RETAIL','HOUSEHOLDS') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '서비스 업종 타입',
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=317955 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `sales_commercial` (
                                    `female_sales` bigint unsigned DEFAULT NULL COMMENT '여성 매출 금액',
                                    `female_sales_count` int unsigned DEFAULT NULL COMMENT '여성 매출 건수',
                                    `fifty_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 50 매출 금액',
                                    `forty_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 40 매출 금액',
                                    `fri_sales` bigint unsigned DEFAULT NULL COMMENT '금요일 매출 금액',
                                    `fri_sales_count` int unsigned DEFAULT NULL COMMENT '금요일 매출 건수',
                                    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '추정매출_상권 아이디',
                                    `male_sales` bigint unsigned DEFAULT NULL COMMENT '남성 매출 금액',
                                    `male_sales_count` int unsigned DEFAULT NULL COMMENT '남성 매출 건수',
                                    `mon_sales` bigint unsigned DEFAULT NULL COMMENT '월요일 매출 금액',
                                    `mon_sales_count` int unsigned DEFAULT NULL COMMENT '월요일 매출 건수',
                                    `month_sales` bigint unsigned DEFAULT NULL COMMENT '당월 매출 금액',
                                    `sales_00` bigint unsigned DEFAULT NULL COMMENT '시간대 00 ~ 06 매출 금액',
                                    `sales_06` bigint unsigned DEFAULT NULL COMMENT '시간대 06 ~ 11 매출 금액',
                                    `sales_11` bigint unsigned DEFAULT NULL COMMENT '시간대 11 ~ 14 매출 금액',
                                    `sales_14` bigint unsigned DEFAULT NULL COMMENT '시간대 14 ~ 17 매출 금액',
                                    `sales_17` bigint unsigned DEFAULT NULL COMMENT '시간대 17 ~ 21 매출 금액',
                                    `sales_21` bigint unsigned DEFAULT NULL COMMENT '시간대 21 ~ 24 매출 금액',
                                    `sales_count_00` int unsigned DEFAULT NULL COMMENT '시간대 00 ~ 06 매출 건수',
                                    `sales_count_06` int unsigned DEFAULT NULL COMMENT '시간대 06 ~ 11 매출 건수',
                                    `sales_count_11` int unsigned DEFAULT NULL COMMENT '시간대 11 ~ 14 매출 건수',
                                    `sales_count_14` int unsigned DEFAULT NULL COMMENT '시간대 14 ~ 17 매출 건수',
                                    `sales_count_17` int unsigned DEFAULT NULL COMMENT '시간대 17 ~ 21 매출 건수',
                                    `sales_count_21` int unsigned DEFAULT NULL COMMENT '시간대 21 ~ 24 매출 건수',
                                    `sat_sales` bigint unsigned DEFAULT NULL COMMENT '토요일 매출 금액',
                                    `sat_sales_count` int unsigned DEFAULT NULL COMMENT '토요일 매출 건수',
                                    `sixty_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 60 이상 매출 금액',
                                    `sun_sales` bigint unsigned DEFAULT NULL COMMENT '일요일 매출 금액',
                                    `sun_sales_count` int unsigned DEFAULT NULL COMMENT '일요일 매출 건수',
                                    `teen_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 10 매출 금액',
                                    `thirty_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 30 매출 금액',
                                    `thu_sales` bigint unsigned DEFAULT NULL COMMENT '목요일 매출 금액',
                                    `thu_sales_count` int unsigned DEFAULT NULL COMMENT '목요일 매출 건수',
                                    `tue_sales` bigint unsigned DEFAULT NULL COMMENT '화요일 매출 금액',
                                    `tue_sales_count` int unsigned DEFAULT NULL COMMENT '화요일 매출 건수',
                                    `twenty_sales` bigint unsigned DEFAULT NULL COMMENT '연령대 20 매출 금액',
                                    `wed_sales` bigint unsigned DEFAULT NULL COMMENT '수요일 매출 금액',
                                    `wed_sales_count` int unsigned DEFAULT NULL COMMENT '수요일 매출 건수',
                                    `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                    `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                    `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                    `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                    `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                    `service_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드',
                                    `service_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드명',
                                    `service_type` enum('RESTAURANT','ACADEMY','LEISURE','SERVICE','RETAIL','HOUSEHOLDS') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '서비스 업종 타입',
                                    PRIMARY KEY (`id`),
                                    KEY `idx_period_code` (`period_code`),
                                    KEY `idx_commercial_code` (`commercial_code`),
                                    KEY `idx_service_code` (`service_code`)
) ENGINE=InnoDB AUTO_INCREMENT=597130 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `sales_district` (
                                  `female_sales` bigint unsigned DEFAULT NULL COMMENT '여성 매출 금액',
                                  `fifty_sales` bigint unsigned DEFAULT NULL COMMENT '50대 매출_금액',
                                  `forty_sales` bigint unsigned DEFAULT NULL COMMENT '40대 매출_금액',
                                  `fri_sales` bigint unsigned DEFAULT NULL COMMENT '금요일 매출 금액',
                                  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '추정매출_자치구_아이디',
                                  `male_sales` bigint unsigned DEFAULT NULL COMMENT '남성 매출 금액',
                                  `mon_sales` bigint unsigned DEFAULT NULL COMMENT '월요일 매출 금액',
                                  `month_sales` bigint unsigned DEFAULT NULL COMMENT '당월 매출 금액',
                                  `sales_00` bigint unsigned DEFAULT NULL COMMENT '시간대 00 ~ 06 매출 금액',
                                  `sales_06` bigint unsigned DEFAULT NULL COMMENT '시간대 06 ~ 11 매출 금액',
                                  `sales_11` bigint unsigned DEFAULT NULL COMMENT '시간대 11 ~ 14 매출 금액',
                                  `sales_14` bigint unsigned DEFAULT NULL COMMENT '시간대 14 ~ 17 매출 금액',
                                  `sales_17` bigint unsigned DEFAULT NULL COMMENT '시간대 17 ~ 21 매출 금액',
                                  `sales_21` bigint unsigned DEFAULT NULL COMMENT '시간대 21 ~ 24 매출 금액',
                                  `sat_sales` bigint unsigned DEFAULT NULL COMMENT '토요일 매출 금액',
                                  `sixty_sales` bigint unsigned DEFAULT NULL COMMENT '60대 매출_금액',
                                  `sun_sales` bigint unsigned DEFAULT NULL COMMENT '일요일 매출 금액',
                                  `teen_sales` bigint unsigned DEFAULT NULL COMMENT '10대 매출_금액',
                                  `thirty_sales` bigint unsigned DEFAULT NULL COMMENT '30대 매출_금액',
                                  `thu_sales` bigint unsigned DEFAULT NULL COMMENT '목요일 매출 금액',
                                  `tue_sales` bigint unsigned DEFAULT NULL COMMENT '화요일 매출 금액',
                                  `twenty_sales` bigint unsigned DEFAULT NULL COMMENT '20대 매출_금액',
                                  `wed_sales` bigint unsigned DEFAULT NULL COMMENT '수요일 매출 금액',
                                  `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
                                  `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
                                  `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                  `service_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드',
                                  `service_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드 명',
                                  `service_type` enum('RESTAURANT','ACADEMY','LEISURE','SERVICE','RETAIL','HOUSEHOLDS') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '서비스 업종 타입',
                                  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29305 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `store_administration` (
                                        `closed_rate` float DEFAULT NULL COMMENT '폐업률',
                                        `opened_rate` float DEFAULT NULL COMMENT '개업률',
                                        `closed_store` int unsigned DEFAULT NULL COMMENT '폐업 점포 수',
                                        `franchise_store` int unsigned DEFAULT NULL COMMENT '프랜차이즈 점포 수',
                                        `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '점포_행정동_아이디',
                                        `opened_store` int unsigned DEFAULT NULL COMMENT '개업 점포 수',
                                        `similar_store` int unsigned DEFAULT NULL COMMENT '유사 업종 점포 수',
                                        `total_store` int unsigned DEFAULT NULL COMMENT '점포 수',
                                        `administration_code` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드',
                                        `administration_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '행정동 코드 명',
                                        `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                        `service_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드',
                                        `service_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드 명',
                                        `service_type` enum('RESTAURANT','ACADEMY','LEISURE','SERVICE','RETAIL','HOUSEHOLDS') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '서비스 업종 타입',
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=668717 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


CREATE TABLE `store_commercial` (
                                    `closed_rate` float DEFAULT NULL COMMENT '폐업률',
                                    `opened_rate` float DEFAULT NULL COMMENT '개업률',
                                    `closed_store` int unsigned DEFAULT NULL COMMENT '폐업 점포 수',
                                    `franchise_store` int unsigned DEFAULT NULL COMMENT '프렌차이즈 점포 수',
                                    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '점포_상권 아이디',
                                    `opened_store` int unsigned DEFAULT NULL COMMENT '개업 점포 수',
                                    `similar_store` int unsigned DEFAULT NULL COMMENT '유사 업종 점포 수',
                                    `total_store` int unsigned DEFAULT NULL COMMENT '점포 수',
                                    `commercial_classification_code` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드',
                                    `commercial_classification_code_name` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 구분 코드 명',
                                    `commercial_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드',
                                    `commercial_code_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '상권 코드 명',
                                    `period_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '기준 년분기 코드',
                                    `service_code` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드',
                                    `service_code_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '서비스 업종 코드명',
                                    `service_type` enum('RESTAURANT','ACADEMY','LEISURE','SERVICE','RETAIL','HOUSEHOLDS') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '서비스 업종 타입',
                                    PRIMARY KEY (`id`),
                                    KEY `idx_period_code` (`period_code`),
                                    KEY `idx_commercial_code` (`commercial_code`),
                                    KEY `idx_service_code` (`service_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1436382 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;