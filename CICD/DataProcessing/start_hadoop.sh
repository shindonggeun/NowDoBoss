#!/bin/bash
# HDFS 데몬 시작
$HADOOP_HOME/sbin/start-dfs.sh
# YARN 데몬 시작
$HADOOP_HOME/sbin/start-yarn.sh
