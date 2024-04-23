#!/bin/bash

sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

sudo certbot --nginx -d k10C208.p.ssafy.io
