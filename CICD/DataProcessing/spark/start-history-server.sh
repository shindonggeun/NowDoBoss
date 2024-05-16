#!/bin/bash
# start-history-server.sh

echo "spark-history-server.sh을 실행합니다."
$SPARK_HOME/sbin/start-history-server.sh

# 무한 대기 프로세스 추가
tail -f /dev/null