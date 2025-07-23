#!/bin/bash
echo "=== INSTALL DEPENDENCIES BACKEND ==="

cd /home/ubuntu/app/BE || exit
npm install

if [ -f ace ]; then
  node ace migration:run
else
  echo "Skipping migration: ace not found"
fi
