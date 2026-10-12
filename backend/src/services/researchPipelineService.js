import { plannerAgent } from '../agents/plannerAgent.js';
import { evidenceEngine } from '../engine/evidenceEngine.js';
import crypto from 'node:crypto';
const uuidv4 = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15));

export class ResearchPipelineService {
  constructor() {
    this.sessionReports = new Map();
  }

  /**
   * Execute 5-Agent Pipeline:
   * Question -> Planner -> 5 Specialized Agents (Literature, India, Data, Market, Patent) -> Evidence Engine -> Cited Report
   *
   * @param {string} query - User Question
   * @param {Function} onProgress - Callback for SSE streaming steps
   * @returns {Object} Full Research Intelligence Object
   */
  async executeResearchPipeline(query, onProgress = () => {}) {
    const threadId = 'th_' + uuidv4().substring(0, 8);

    // 1. QUESTION GROUNDING & INTENT DECOMPOSITION
    onProgress({
      stepNumber: 1,
      stage: 'question_grounding',
      title: 'Intent Grounding & Target Mapping',
      details: `Analyzing research query: "${query}"`
    });

    // 2. PLANNER (Deconstructs query into 5 specialized agent tasks)
    onProgress({
      stepNumber: 2,
      stage: 'planner',
      title: 'Bharat Multi-Track Planner',
      details: 'Formulating task directives for Literature Agent, India Agent, Data Agent, Market Agent, and Patent Agent.'
    });

    const plan = await plannerAgent.plan(query);

    // 3. 5-AGENT CONCURRENT DISPATCH & EVIDENCE ENGINE SYNTHESIS
    const synthesisResult = await evidenceEngine.executeAndSynthesize(plan, onProgress);

    const fullResult = {
      threadId,
      query,
      timestampIST: synthesisResult.timestampIST,
      financialYear: synthesisResult.financialYear,
      researchPlan: plan,
      agentFindings: synthesisResult.agentFindings,
      claimEvidenceGraph: synthesisResult.claimEvidenceGraph,
      simulationMetrics: synthesisResult.simulationMetrics,
      reportMarkdown: synthesisResult.reportMarkdown
    };

    this.sessionReports.set(threadId, fullResult);
    return fullResult;
  }

  getReportByThreadId(threadId) {
    return this.sessionReports.get(threadId);
  }

  getAllReports() {
    return Array.from(this.sessionReports.values());
  }
}

export const researchPipeline = new ResearchPipelineService();
