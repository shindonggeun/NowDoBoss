#!/bin/bash
# collect-ssh-keys.sh

# SSH 설정 디렉터리 확인 및 생성
mkdir -p /root/.ssh
chmod 700 /root/.ssh

# authorized_keys 파일 초기화
echo "" > /root/.ssh/authorized_keys

# 지정된 시간 동안 대기
sleep $1

# 볼륨을 통해 공유된 모든 키를 authorized_keys에 추가
echo "공개 키를 authorized_keys에 추가하는 중..."
for key in /shared_keys/*.pub; do
    echo "Adding $key to authorized_keys"
    cat "$key" >> /root/.ssh/authorized_keys
done
echo "모든 공개 키가 authorized_keys에 추가되었습니다."

# authorized_keys 파일의 권한 설정
chmod 600 /root/.ssh/authorized_keys

# SSH 데몬 실행
echo "SSH 데몬을 시작합니다."
/usr/sbin/sshd &
