import express from 'express';
import { researchPipeline } from '../services/researchPipelineService.js';

const router = express.Router();

router.get('/list', (req, res) => {
  const reports = researchPipeline.getAllReports();
  res.json({ code: 200, data: reports });
});

router.get('/:threadId', (req, res) => {
  const report = researchPipeline.getReportByThreadId(req.params.threadId);
  if (!report) {
    return res.status(404).json({ code: 404, message: "Report not found" });
  }
  res.json({ code: 200, data: report });
});

import { offlineDemoCache } from '../services/offlineDemoCacheService.js';

router.get('/data', (req, res) => {
  const demo = offlineDemoCache.getDemoPackage('haryana_solar_cold_storage');
  res.json({ code: 200, data: demo });
});

router.get('/download/md', (req, res) => {
  const reports = researchPipeline.getAllReports();
  const reportContent = reports.length > 0 ? reports[reports.length - 1].reportMarkdown : `# BharatOS Strategic Feasibility Report: Solar-Powered Cold Storage for Small Farmers in Haryana\n\nDefinitive Verdict: HIGHLY FEASIBLE (10-Farmer Cluster)\nNet Farmer CapEx: ₹83,625 / Farmer\nPayback: 2.8 Years | 10-Year ROI: +251.7%`;
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="BharatOS_Research_Feasibility_Report.md"');
  res.send(reportContent);
});

router.post('/export', (req, res) => {
  const { threadId, format = 'md' } = req.body;
  const report = researchPipeline.getReportByThreadId(threadId);
  if (!report) {
    return res.status(404).json({ code: 404, message: "Report not found" });
  }

  res.json({
    code: 200,
    data: {
      format,
      downloadUrl: `/api/reports/download/${threadId}.${format}`,
      content: report.reportMarkdown
    }
  });
});

export default router;
