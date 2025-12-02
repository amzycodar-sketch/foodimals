import type { Express } from "express";
import { createServer, type Server } from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { storage } from "./storage";
import { spawn } from 'child_process';

// Start Python backend on port 8000
const pythonBackend = spawn('python', ['-m', 'uvicorn', 'backend.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload']);

pythonBackend.stdout.on('data', (data) => {
  console.log(`[Python Backend] ${data}`);
});

pythonBackend.stderr.on('data', (data) => {
  console.error(`[Python Backend] ${data}`);
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Proxy all /api requests to Python FastAPI backend on port 8000
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    logLevel: 'info',
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[Proxy] ${req.method} ${req.url} -> http://localhost:8000${req.url}`);
    }
  }));

  return httpServer;
}
