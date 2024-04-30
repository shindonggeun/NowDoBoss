#!/bin/bash

# HDFS 데몬 시작합니다.
$HADOOP_HOME/sbin/start-dfs.sh

# YARN 데몬 시작합니다.
$HADOOP_HOME/sbin/start-yarn.sh
