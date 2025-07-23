#!/bin/bash

echo "=== MENGHENTIKAN BACKEND ==="

pm2 stop adonis-app || echo "AdonisJS belum berjalan"
