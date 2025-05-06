#!/bin/bash

# Usage: ./start_servers.sh [count] [base_port]
# Default count = 8
# Default base_port = 3000

COUNT=${1:-8}
BASE_PORT=${2:-3000}

for ((i = 0; i < COUNT; i++)); do
  PORT=$((BASE_PORT + i))
  echo "🚀 Starting server on port $PORT"
  bun run ./src/index.ts $PORT &
done

echo "✅ Launched $COUNT Elysia servers from port $BASE_PORT to $((BASE_PORT + COUNT - 1))"
