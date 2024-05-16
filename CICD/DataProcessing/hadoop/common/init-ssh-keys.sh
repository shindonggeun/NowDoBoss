#!/bin/bash
# init-ssh-keys.sh

# SSH 설정 디렉터리 확인 및 생성
mkdir -p /root/.ssh
chmod 700 /root/.ssh

# SSH 키 생성
if [ ! -f /root/.ssh/id_rsa ]; then
    echo "SSH 키가 존재하지 않습니다. 키를 생성합니다."
    ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N ''
fi

# 공유 디렉터리에 키 저장
cp /root/.ssh/id_rsa.pub /shared_keys/$(hostname)_id_rsa.pub

# 지정된 시간 동안 대기
# sleep $1

# authorized_keys 파일에 키 추가
# echo "Adding $(hostname) key to authorized_keys"
# cat /root/.ssh/$(hostname)_id_rsa.pub >> /root/.ssh/authorized_keys

# authorized_keys 파일의 권한 설정
# chmod 600 /root/.ssh/authorized_keys

# SSH 데몬 실행
# echo "SSH 데몬을 시작합니다."
# /usr/sbin/sshd -D
