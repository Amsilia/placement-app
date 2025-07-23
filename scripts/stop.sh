#!/bin/bash

echo "🛑 Stopping existing app process..."

# Cari dan kill proses Node.js (jika ada)
pkill node || echo "No node process found."

echo "✅ Stopped."
