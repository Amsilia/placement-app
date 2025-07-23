#!/bin/bash
echo "=== STOPPING BACKEND ==="

pm2 stop backend-app || echo "PM2 process not found. Skipping stop."

