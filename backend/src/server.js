import express from 'express';
import cors from 'cors';
import chatRoute from './routes/chatRoute.js';
import reportRoute from './routes/reportRoute.js';
import sourceRoute from './routes/sourceRoute.js';
import simulationRoute from './routes/simulationRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/chat', chatRoute);
app.use('/api/research', chatRoute);
app.use('/api/report', reportRoute);
app.use('/api/reports', reportRoute);
app.use('/api/sources', sourceRoute);
app.use('/api/simulation', simulationRoute);

// Serve demo static dashboard and assets
app.use(express.static(path.resolve(__dirname, '../../demo')));
app.get('/cockpit', (req, res) => res.sendFile(path.resolve(__dirname, '../../demo/index.html')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    platform: 'BharatOS Research Intelligence (भारत शोध प्रज्ञा)',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`  BharatOS Research Intelligence Platform (भारत शोध प्रज्ञा)`);
  console.log(`  Backend Engine active on: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/health`);
  console.log(`================================================================`);
});
