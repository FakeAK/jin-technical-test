import cors from 'cors';
import express from 'express';
import { loadRoutes } from './routesLoader';
import http from 'http';

function initExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  return app;
}

function initServer(app) {
  const httpServer = http.createServer(app);
  const httpPort = 3020;

  httpServer.listen(httpPort, () => {
    console.log('State: API running on port ' + httpPort);
  });
}

function App() {
  const app = initExpress()
  loadRoutes(app);
  initServer(app);
}

App();