#!/bin/bash

echo "Menjalankan proses deployment..." >> /home/ubuntu/app/deploy.log

cd /home/ubuntu/app

# Build Angular
echo "Build frontend (Angular)..." >> deploy.log
cd frontend
npm install >> ../deploy.log 2>&1
ng build --configuration production >> ../deploy.log 2>&1

# Copy hasil build ke folder backend/public
cp -r dist/* ../backend/public

# Jalankan backend AdonisJS
cd ../backend
echo "Start backend (AdonisJS)..." >> ../deploy.log
npm install >> ../deploy.log 2>&1

# Jalankan server (asumsinya AdonisJS pakai node ace)
nohup node ace serve --watch > output.log 2>&1 &
