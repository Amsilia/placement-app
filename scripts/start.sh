#!/bin/bash

# Masuk ke direktori backend
cd /home/ubuntu/placement-app/backend

echo "🚀 Starting app..."
npm start > /home/ubuntu/placement-app/backend/app.log 2>&1 &

echo "✅ App started."

