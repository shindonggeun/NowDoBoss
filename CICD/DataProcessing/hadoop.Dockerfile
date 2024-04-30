# 베이스 이미지로 Ubuntu 20.04를 사용합니다.
FROM ubuntu:20.04

# 환경변수를 설정합니다.
# HADOOP_VERSION은 설치할 하둡의 버전을 지정합니다.
# HADOOP_HOME은 하둡 설치 경로를 지정합니다.
# PATH 환경변수에 하둡 실행 파일 경로를 추가합니다.
ENV HADOOP_VERSION 3.4.0
ENV HADOOP_HOME /usr/local/hadoop
ENV PATH $PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

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

# 하둡 설치 파일을 다운로드하고 압축을 해제한 다음 지정된 위치로 이동시킵니다.
ADD http://apache.mirrors.pair.com/hadoop/common/hadoop-$HADOOP_VERSION/hadoop-$HADOOP_VERSION.tar.gz /tmp
RUN tar -xzvf /tmp/hadoop-$HADOOP_VERSION.tar.gz -C /usr/local && \
    mv /usr/local/hadoop-$HADOOP_VERSION $HADOOP_HOME && \
    rm /tmp/hadoop-$HADOOP_VERSION.tar.gz

# SSH 설정을 합니다. 비밀번호 없는 SSH 로그인을 설정하여 하둡 노드 간 통신을 용이하게 합니다.
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && \
    chmod 0600 ~/.ssh/authorized_keys

# 하둡 설정 파일 복사 (호스트 머신에서 컨테이너로)
# COPY core-site.xml $HADOOP_HOME/etc/hadoop/
# COPY hdfs-site.xml $HADOOP_HOME/etc/hadoop/
# COPY mapred-site.xml $HADOOP_HOME/etc/hadoop/
# COPY yarn-site.xml $HADOOP_HOME/etc/hadoop/

# 하둡 데몬 실행 스크립트를 복사하고 실행 권한을 부여합니다.
COPY start_hadoop.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start_hadoop.sh

# 컨테이너 실행 시 하둡 데몬을 시작합니다.
CMD ["start_hadoop.sh"]
