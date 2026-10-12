import express from 'express';
import { sourceRegistry } from '../services/sourceRegistryService.js';

const router = express.Router();

router.get('/registry', (req, res) => {
  const { tier } = req.query;
  const sources = sourceRegistry.getSources(tier);
  res.json({
    code: 200,
    total: sources.length,
    data: sources
  });
});

router.get('/datasets', (req, res) => {
  const datasets = sourceRegistry.getStudyDatasets();
  res.json({
    code: 200,
    data: datasets
  });
});

export default router;
