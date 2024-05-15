#!/bin/bash

# 환경변수 설정
echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> /root/.bashrc
echo 'export HADOOP_HOME=/usr/local/hadoop' >> /root/.bashrc
echo 'export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$JAVA_HOME/bin' >> /root/.bashrc
echo 'export HADOOP_MAPRED_HOME=$HADOOP_HOME' >> /root/.bashrc
echo 'export HADOOP_COMMON_HOME=$HADOOP_HOME' >> /root/.bashrc
echo 'export HADOOP_HDFS_HOME=$HADOOP_HOME' >> /root/.bashrc
echo 'export YARN_HOME=$HADOOP_HOME' >> /root/.bashrc
echo 'export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native' >> /root/.bashrc
echo 'export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib"' >> /root/.bashrc

source /root/.bashrc

# hadoop 폴더내에 있는 구성 파일 복사
cp /hadoop/core-site.xml $HADOOP_HOME/etc/hadoop/core-site.xml
cp /hadoop/mapred-site.xml $HADOOP_HOME/etc/hadoop/mapred-site.xml
cp /hadoop/yarn-site.xml $HADOOP_HOME/etc/hadoop/yarn-site.xml

# masters와 workers 파일 설정
echo "master1" > $HADOOP_HOME/etc/hadoop/masters
echo -e "master1\nworker1\nworker2" > $HADOOP_HOME/etc/hadoop/workers
