# 베이스 이미지로 Ubuntu 20.04를 사용합니다.
FROM ubuntu:20.04

# 환경변수를 설정합니다.
# HADOOP_VERSION은 설치할 하둡의 버전을 지정합니다.
# HADOOP_HOME은 하둡 설치 경로를 지정합니다.
# JAVA_HOME은 Java 설치 경로를 지정합니다.
# PATH 환경변수에 하둡 및 Java 실행 파일 경로를 추가합니다.
ENV HADOOP_VERSION 3.2.4
ENV HADOOP_HOME /usr/local/hadoop
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# 기본적인 운영체제 설정을 합니다.
# DEBIAN_FRONTEND는 비대화식 설치를 위해 noninteractive로 설정됩니다.
# TZ는 시간대를 설정합니다.
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# 필요한 패키지들을 설치합니다.
# openssh-server, openjdk-8-jdk는 하둡 실행에 필수적입니다.
# 추가로 wget, nano, iputils-ping, net-tools, telnet 등의 유틸리티를 설치합니다.
RUN apt-get update && \
    apt-get install -y openssh-server openjdk-8-jdk wget nano iputils-ping net-tools telnet && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# 하둡 환경 설정 파일에 root 사용자 설정 추가
RUN echo "export HDFS_NAMENODE_USER=root" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh && \
    echo "export HDFS_DATANODE_USER=root" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh && \
    echo "export HDFS_SECONDARYNAMENODE_USER=root" >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh && \
    echo "export YARN_RESOURCEMANAGER_USER=root" >> $HADOOP_HOME/etc/hadoop/yarn-env.sh && \
    echo "export YARN_NODEMANAGER_USER=root" >> $HADOOP_HOME/etc/hadoop/yarn-env.sh

# 하둡 및 SSH 설정
RUN ssh-keygen -t rsa -P '' -f /root/.ssh/id_rsa && \
    cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys && \
    chmod 0600 /root/.ssh/authorized_keys

# 하둡 설정 파일 복사 (호스트 머신에서 컨테이너로)
COPY core-site.xml $HADOOP_HOME/etc/hadoop/
COPY hdfs-site.xml $HADOOP_HOME/etc/hadoop/
COPY mapred-site.xml $HADOOP_HOME/etc/hadoop/
COPY yarn-site.xml $HADOOP_HOME/etc/hadoop/

# 하둡 데몬 실행 스크립트를 복사하고 실행 권한을 부여합니다.
COPY start_hadoop.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start_hadoop.sh

# 컨테이너 실행 시 하둡 데몬을 시작합니다.
CMD ["/bin/bash", "-c", "source /etc/environment && /usr/local/bin/start_hadoop.sh"]