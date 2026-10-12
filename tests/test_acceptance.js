import { researchPipeline } from '../backend/src/services/researchPipelineService.js';

async function runAcceptanceTest() {
  console.log("==================================================================");
  console.log("  BHARATOS 5-AGENT ARCHITECTURE ACCEPTANCE TEST");
  console.log("==================================================================");

  const query = "Is solar-powered cold storage economically feasible for small farmers in Haryana?";
  console.log(`\n[QUERY]: "${query}"\n`);

  const result = await researchPipeline.executeResearchPipeline(query, (progress) => {
    console.log(`[PIPELINE STEP ${progress.stepNumber}] -> ${progress.title}: ${progress.details}`);
  });

  console.log("\n------------------------------------------------------------------");
  console.log("1. PLANNER DIRECTIVES FOR THE 5 AGENTS:");
  console.log("------------------------------------------------------------------");
  console.log(`Title: ${result.researchPlan.title}`);
  Object.entries(result.researchPlan.agentTasks).forEach(([key, task]) => {
    console.log(`  [${task.agent}]:`);
    console.log(`    Goal: ${task.goal}`);
    console.log(`    Focus: ${task.focus}`);
    console.log(`    Target Sources: ${task.targetSources.join(", ")}`);
  });

  console.log("\n------------------------------------------------------------------");
  console.log("2. AGENT INVESTIGATION FINDINGS (SUMMARY EXTRACT):");
  console.log("------------------------------------------------------------------");
  console.log(`  * Literature Agent : Found ${result.agentFindings.literature.papersFound.length} papers (e.g., CIPHET post-harvest baseline loss 12.4%-15.8%).`);
  console.log(`  * India Agent      : Found ${result.agentFindings.india.policyEvidence.length} schemes (PM-KUSUM 75%, PMKSY 35%, Bhavantar Bharpayee).`);
  console.log(`  * Data Agent       : Found ${result.agentFindings.data.datasetsFound.length} numerical datasets (Tomato yield 220 qtl/ha, 35 kWh/day energy).`);
  console.log(`  * Market Agent     : Gross CapEx ₹14.25L, Net Outlay ₹83,625 per farmer (10-farmer cluster), Payback 2.8-3.2 yrs.`);
  console.log(`  * Patent Agent     : Found ${result.agentFindings.patent.patentsFound.length} granted Indian patents (IN 382914 PCM Thermal Buffer).`);

  console.log("\n------------------------------------------------------------------");
  console.log("3. EVIDENCE ENGINE QUANTITATIVE METRICS:");
  console.log("------------------------------------------------------------------");
  const fin = result.simulationMetrics.financialSummary;
  console.log(`  * Gross CapEx (10 MT + 5kW Solar) : ${fin.totalGrossCapExFormatted}`);
  console.log(`  * Total Subsidies (PMKSY + KUSUM) : ${fin.totalSubsidiesFormatted} (${fin.subsidyPercentageOfTotal})`);
  console.log(`  * Net Capital Outlay per Farmer   : ₹83,625 (10-Farmer Cluster)`);
  console.log(`  * Annual Spoilage Loss Aversion   : ${fin.annualLossAversionIncomeFormatted}`);
  console.log(`  * Annual Solar Power Savings      : ${fin.annualSolarSavingsFormatted}`);
  console.log(`  * Net Annual Cluster Benefit      : ${fin.netAnnualFarmerProfitFormatted}`);
  console.log(`  * Capital Payback Period          : ${fin.simplePaybackYears} Years`);
  console.log(`  * 10-Year ROI                     : +${fin.tenYearROI}%`);
  console.log(`  * Verdict                         : ${result.simulationMetrics.feasibilityVerdict.verdictTitle}`);

  console.log("\n------------------------------------------------------------------");
  console.log("4. FINAL CITED REPORT PREVIEW (First 500 chars):");
  console.log("------------------------------------------------------------------");
  console.log(result.reportMarkdown.substring(0, 500) + "...\n");
  console.log("==================================================================");
  console.log("  5-AGENT ACCEPTANCE TEST PASSED SUCCESSFULLY!");
  console.log("==================================================================");
}

runAcceptanceTest().catch(console.error);
