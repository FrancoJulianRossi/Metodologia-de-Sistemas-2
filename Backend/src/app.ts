import express from 'express';

export function makeApp() {
  const app = express();
  app.use(express.json());

  const cors = require('cors');
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    })
  );

  const medicRoutes = require('./routes/medic.routes');
  app.use('/medics', medicRoutes);

  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  });

  return app;
}

export default makeApp;