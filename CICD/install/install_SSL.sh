#!/bin/bash
# 이 스크립트는 Ubuntu 시스템에서 실행되는 것을 가정합니다.

# 시스템의 패키지 목록을 업데이트합니다.
# 이 단계는 최신 패키지 정보를 얻기 위해 필요하며, 종속성 문제를 방지합니다.
sudo apt-get update

# Certbot과 그 Nginx 플러그인을 설치합니다.
# Certbot은 Let's Encrypt에서 무료 SSL 인증서를 제공받을 수 있게 해주는 도구입니다.
# python3-certbot-nginx는 Certbot을 Nginx와 통합할 수 있게 해주는 플러그인입니다.
sudo apt-get install certbot python3-certbot-nginx
# Certbot을 실행하여 자동으로 Nginx 설정에 SSL 인증서를 설치하고 구성합니다.
# '-d' 옵션 뒤에는 SSL 인증서를 설치하려는 도메인 이름을 명시합니다.
# 이 명령은 Certbot이 Nginx 설정 파일을 자동으로 수정하여 SSL을 설정하게 합니다.
# Certbot은 도메인의 소유권을 검증하기 위해 잠시 HTTP 서버를 실행할 수도 있습니다.
sudo certbot --nginx -d k10C208.p.ssafy.io