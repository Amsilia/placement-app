#!/bin/bash

echo "=== INSTALL DEPENDENCIES BACKEND ==="

cd /home/ubuntu/app/BE

# Install Node.js dependencies
npm install

# Build jika perlu
npm run build || echo "Skip build (tidak ada perintah build)"

# Migrasi database (jika digunakan)
node ace migration:run || echo "Skip migration (jika belum ada)"
