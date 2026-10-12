import express from 'express';
import { researchPipeline } from '../services/researchPipelineService.js';

const router = express.Router();

// Synchronous JSON Research Endpoint
router.post('/execute', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ code: 400, message: "Query parameter is required" });
    }

    const result = await researchPipeline.executeResearchPipeline(query);
    return res.json({
      code: 200,
      message: "Research execution completed successfully",
      data: result
    });
  } catch (err) {
    console.error("Pipeline execution error:", err);
    return res.status(500).json({ code: 500, message: err.message });
  }
});

// SSE Streaming Research Endpoint
router.post('/stream', async (req, res) => {
  const { query, thread_id } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  sendEvent('start', { message: 'BharatOS Research Engine Initialized' });

  try {
    const result = await researchPipeline.executeResearchPipeline(query, (progressStep) => {
      sendEvent('progress', progressStep);
    });

    sendEvent('plan', result.researchPlan);
    sendEvent('sources', result.sourcesGathered);
    sendEvent('simulation', result.simulationMetrics);
    sendEvent('report', result.reportMarkdown);
    sendEvent('finish', { status: 'DONE', threadId: result.threadId });
    res.end();
  } catch (err) {
    sendEvent('error', { error: err.message });
    res.end();
  }
});

export default router;
