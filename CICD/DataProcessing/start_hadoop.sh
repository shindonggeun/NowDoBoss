#!/bin/bash

# HDFS 데몬 시작합니다.
su hdfs -c "$HADOOP_HOME/sbin/start-dfs.sh"

# YARN 데몬 시작합니다.
su yarn -c "$HADOOP_HOME/sbin/start-yarn.sh"
