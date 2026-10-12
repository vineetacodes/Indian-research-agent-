import express from 'express';
import { simulationService } from '../services/simulationService.js';

const router = express.Router();

router.post('/calculate', (req, res) => {
  try {
    const params = req.body || {};
    const result = simulationService.calculateColdStorageEconomics(params);
    res.json({
      code: 200,
      message: "Simulation calculated successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
});

export default router;
