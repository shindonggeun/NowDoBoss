#!/bin/bash
# start-history-server.sh

echo "spark-history-server.sh을 실행합니다."
$SPARK_HOME/sbin/start-history-server.sh

# wordcount 테스트
# HDFS에 테스트 파일 업로드
hdfs dfs -mkdir -p /input
hdfs dfs -copyFromLocal $SPARK_HOME/README.md /input

hdfs dfs -mkdir -p /output

# Spark 애플리케이션 실행
$SPARK_HOME/bin/spark-submit \
  --class org.apache.spark.examples.JavaWordCount \
  --master spark://master1:7077 \
  $SPARK_HOME/examples/jars/spark-examples_2.12-3.2.1.jar \
  hdfs://master1:9000/input/README.md hdfs://master1:9000/output

# 결과 확인
hdfs dfs -ls /output
hdfs dfs -cat /output/part-00000

# 무한 대기 프로세스 추가
tail -f /dev/null