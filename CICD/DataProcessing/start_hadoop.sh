#!/bin/bash

# 하둡이 자바 환경을 찾을 수 있도록 JAVA_HOME 환경변수를 설정합니다.
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

# HDFS 데몬 시작합니다.
$HADOOP_HOME/sbin/start-dfs.sh

# YARN 데몬 시작합니다.
$HADOOP_HOME/sbin/start-yarn.sh
