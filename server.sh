#!/usr/bin/env bash
# Simple local server helper for macOS (zsh/bash)
# Usage:
#   chmod +x serve.sh
#   ./serve.sh

set -eu

PORT=8000
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting static server from: $ROOT_DIR"
cd "$ROOT_DIR"

# Start Python's simple HTTP server in background
python3 -m http.server "$PORT" --bind 127.0.0.1 > /dev/null 2>&1 &
SERVER_PID=$!

echo "Serving at http://localhost:$PORT/index.html (PID $SERVER_PID)"

# Open default browser (macOS)
if command -v open >/dev/null 2>&1; then
  open "http://localhost:$PORT/index.html"
else
  echo "Open your browser to http://localhost:$PORT/index.html"
fi

echo "Press Enter to stop the server..."
read -r _

echo "Stopping server (PID $SERVER_PID)"
kill "$SERVER_PID" 2>/dev/null || true
echo "Server stopped."
