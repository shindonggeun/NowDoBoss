# 하둡을 실행하기 위한 Ubuntu 20.04 기반 이미지를 사용합니다.
FROM ubuntu:20.04

# `apt-get`이 대화식 대화 상자를 표시하지 않도록 환경 변수를 설정합니다.
ENV DEBIAN_FRONTEND=noninteractive

# 하둡과 관련된 환경 변수를 설정합니다.
ENV HADOOP_VERSION=3.2.4
ENV HADOOP_HOME=/usr/local/hadoop
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# 시스템 시간대를 설정합니다.
ENV TZ=Etc/UTC

# 필요한 패키지들을 설치하고 불필요한 파일들을 정리합니다.
RUN apt-get update && \
    apt-get install -y openssh-server openjdk-8-jdk wget nano iputils-ping net-tools telnet && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# 하둡 바이너리 파일을 다운로드하고 압축을 해제합니다.
ADD http://apache.mirrors.pair.com/hadoop/common/hadoop-$HADOOP_VERSION/hadoop-$HADOOP_VERSION.tar.gz /tmp
RUN tar -xzvf /tmp/hadoop-$HADOOP_VERSION.tar.gz -C /usr/local && \
    mv /usr/local/hadoop-$HADOOP_VERSION $HADOOP_HOME && \
    rm /tmp/hadoop-$HADOOP_VERSION.tar.gz

# SSH 설정을 합니다. 하둡 노드 간 통신을 위한 비밀번호 없는 SSH 로그인을 설정합니다.
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && \
    chmod 0600 ~/.ssh/authorized_keys

# 하둡 환경 설정 파일들을 컨테이너로 복사합니다.
COPY core-site.xml $HADOOP_HOME/etc/hadoop/
# COPY hdfs-site.xml $HADOOP_HOME/etc/hadoop/
COPY mapred-site.xml $HADOOP_HOME/etc/hadoop/
COPY yarn-site.xml $HADOOP_HOME/etc/hadoop/

# 하둡 데몬 실행 스크립트를 복사하고 실행 권한을 부여합니다.
COPY start-hadoop.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-hadoop.sh

# 컨테이너 실행 시 하둡 데몬을 자동으로 시작하도록 합니다.
CMD ["/bin/bash", "-c", "source /etc/environment && /usr/local/bin/start-hadoop.sh"]
