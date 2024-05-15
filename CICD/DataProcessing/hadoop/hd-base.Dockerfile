# 우분투 베이스 이미지 사용
FROM ubuntu:latest

# 필수 패키지 설치
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl openssh-server rsync wget vim iputils-ping htop openjdk-8-jdk

# 하둡 다운로드 및 설치
RUN wget http://mirror.navercorp.com/apache/hadoop/common/hadoop-3.2.4/hadoop-3.2.4.tar.gz \
    && tar zxvf hadoop-3.2.4.tar.gz \
    && rm hadoop-3.2.4.tar.gz \
    && mv hadoop-3.2.4 /usr/local/hadoop

# 환경변수 설정
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV HADOOP_HOME=/usr/local/hadoop
ENV PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$JAVA_HOME/bin

# 설정 파일과 및 setup-hadoop 쉘 스크립트 복사
COPY common/core-site.xml $HADOOP_HOME/etc/hadoop/core-site.xml
COPY common/mapred-stie.xml $HADOOP_HOME/etc/hadoop/mapred-site.xml
COPY common/yarn-site.xml $HADOOP_HOME/etc/hadoop/yarn-site.xml
COPY common/setup-hadoop.sh /usr/local/bin/setup-hadoop.sh
COPY common/init-ssh-keys.sh /usr/local/bin/init-ssh-keys.sh

# 쉘 스크립트 실행 권한 부여 및 실행
RUN chmod +x /usr/local/bin/setup-hadoop.sh /usr/local/bin/init-ssh-keys.sh

# SSH 구성
RUN service ssh start

# 포트 설정
EXPOSE 9870 8088 19888

# SSH 데몬 실행
CMD ["/usr/sbin/sshd", "-D"]
