#!/bin/bash
# create-hdfs-log-dir.sh

echo "HDFS에 로그 디렉토리를 생성합니다."
hdfs dfs -mkdir -p /spark-logs
hdfs dfs -chmod 1777 /spark-logs