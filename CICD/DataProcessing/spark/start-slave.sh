#!/bin/bash
# start-slave.sh

echo "Spark Worker를 시작합니다."
$SPARK_HOME/sbin/start-slave.sh spark://master1:7077

# 무한 대기 프로세스 추가
tail -f /dev/null