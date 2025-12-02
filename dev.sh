#!/bin/bash

# Start Python backend on port 8000
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Start Vite dev server with proxy
npm run dev:client &
FRONTEND_PID=$!

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

# Wait for both processes
wait
