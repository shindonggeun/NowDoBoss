#!/bin/bash
# init-ssh-keys.sh

# SSH 설정 디렉터리 확인 및 생성
mkdir -p /root/.ssh
chmod 700 /root/.ssh

# 로깅 시작
echo "SSH 설정 디렉터리 준비 완료."

# SSH 키 생성 (키가 존재하지 않는 경우)
if [ ! -f /root/.ssh/id_rsa ]; then
    echo "SSH 키가 존재하지 않습니다. 키를 생성합니다."
    ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N ''
    # 생성된 공개 키를 공유 볼륨에 저장
    cp /root/.ssh/id_rsa.pub /root/.ssh/$(hostname).pub
    echo "$(hostname)의 공개 키가 공유 볼륨에 저장되었습니다."
else
    echo "SSH 키가 이미 존재합니다."
fi

# 공유 볼륨에서 모든 공개 키를 읽어 authorized_keys에 추가
echo "공개 키를 authorized_keys에 추가하는 중..."
for key in /root/.ssh/*.pub; do
    # 중복 키가 없도록 검사 후 추가
    if ! grep -qxF "$key" /root/.ssh/authorized_keys; then
        cat "$key" >> /root/.ssh/authorized_keys
        echo "$key 공개 키가 authorized_keys 파일에 추가되었습니다."
    fi
done

# authorized_keys 파일의 권한 설정
chmod 600 /root/.ssh/authorized_keys
echo "authorized_keys 파일의 권한이 설정되었습니다."

# SSH 데몬 실행
echo "SSH 데몬을 시작합니다."
/usr/sbin/sshd -D
