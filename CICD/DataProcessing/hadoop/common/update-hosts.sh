#!/bin/bash
# update-hosts.sh

sleep 3

# 기존 호스트 항목을 제거하고 새로운 항목을 추가하는 함수
update_host() {
    local ip=$1
    local hostname=$2

    # 임시 파일을 사용하여 /etc/hosts 파일을 수정
    local temp_file=$(mktemp)

    # /etc/hosts 파일에서 기존 항목 제거하고 임시 파일로 저장
    grep -v "$hostname" /etc/hosts > "$temp_file"

    # 새로운 항목 추가
    echo "$ip $hostname" >> "$temp_file"

    # 임시 파일을 원래 /etc/hosts 파일로 이동
    cat "$temp_file" > /etc/hosts

    # 임시 파일 삭제
    rm -f "$temp_file"
}

# IP 주소와 호스트명을 사용하여 업데이트
update_host "172.24.0.100" "master1"
update_host "172.24.0.101" "worker1"
update_host "172.24.0.102" "worker2"

echo "/etc/hosts 파일이 업데이트되었습니다."