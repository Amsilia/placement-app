#!/bin/bash
echo "=== STARTING BACKEND ==="

cd /home/ubuntu/app/BE || exit
pm2 start server.js --name backend-app || npm run start
