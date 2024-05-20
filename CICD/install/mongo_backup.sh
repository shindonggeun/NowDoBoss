#!/bin/bash

# 백업 디렉토리 경로 설정
BACKUP_DIR="/home/ubuntu/backups"

# 현재 날짜로 백업 파일 이름 설정
TIMESTAMP=$(date +'%Y%m%d%H%M%S')
BACKUP_FILE="$BACKUP_DIR/mongo_backup_$TIMESTAMP.gz"

# 백업 디렉토리 생성 (존재하지 않는 경우)
mkdir -p $BACKUP_DIR

# MongoDB 백업 수행
mongodump --archive=$BACKUP_FILE --gzip --username ssafy --password ssafy!2341234 --authenticationDatabase admin --db nowdoboss

# 오래된 백업 파일 삭제 (예: 7일 이상된 백업 파일)
find $BACKUP_DIR -type f -name "mongo_backup_*.gz" -mtime +7 -exec rm {} \;
