# 베이스 이미지 선택
FROM ubuntu:20.04

# 환경변수 설정
ENV HADOOP_VERSION 3.4.0
ENV HADOOP_HOME /usr/local/hadoop
ENV PATH $PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
# 기본 시간대 설정 (예: UTC)
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# 하둡 필요 패키지 설치
RUN apt-get update && \
    apt-get install -y ssh pdsh openjdk-8-jdk && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# 하둡 설치
ADD http://apache.mirrors.pair.com/hadoop/common/hadoop-$HADOOP_VERSION/hadoop-$HADOOP_VERSION.tar.gz /tmp
RUN tar -xzvf /tmp/hadoop-$HADOOP_VERSION.tar.gz -C /usr/local && \
    mv /usr/local/hadoop-$HADOOP_VERSION $HADOOP_HOME && \
    rm /tmp/hadoop-$HADOOP_VERSION.tar.gz

# 하둡 설정 파일 복사 (호스트 머신에서 컨테이너로)
# COPY core-site.xml $HADOOP_HOME/etc/hadoop/
# COPY hdfs-site.xml $HADOOP_HOME/etc/hadoop/
# COPY mapred-site.xml $HADOOP_HOME/etc/hadoop/
# COPY yarn-site.xml $HADOOP_HOME/etc/hadoop/

# SSH 설정 (비밀번호 없는 SSH 로그인 설정)
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && \
    chmod 0600 ~/.ssh/authorized_keys

# 하둡 데몬 실행 스크립트 복사
COPY start-all.sh /usr/local/bin/

# 하둡 데몬 실행 스크립트 실행
CMD ["start-all.sh"]
