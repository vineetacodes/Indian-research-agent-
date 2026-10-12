<template>
  <div class="conflict-engine-card bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold font-mono">
          7D
        </span>
        <div>
          <h3 class="text-sm font-semibold text-white">7-Dimensional Epistemic Discrepancy Engine</h3>
          <p class="text-xs text-slate-400">Classifies variances beyond naive inequality into Direct Conflict, Contextual Difference, Partial Conflict, or Not Comparable.</p>
        </div>
      </div>
      <div class="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
        <button 
          v-for="(item, idx) in demoCases" 
          :key="idx"
          @click="activeIdx = idx"
          :class="[
            'text-xs px-2.5 py-1 rounded font-medium transition',
            activeIdx === idx ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          ]"
        >
          Case {{ idx + 1 }}
        </button>
      </div>
    </div>

    <!-- Active Case Summary & Verdict Badge -->
    <div class="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4 flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
            DISCREPANCY SUBJECT
          </span>
          <h4 class="text-sm font-semibold text-white">{{ currentCase.title }}</h4>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          <strong class="text-slate-200">Root Cause:</strong> {{ currentCase.rootCause }}
        </p>
      </div>
      <div class="text-right shrink-0">
        <span :class="['text-xs font-black px-3 py-1 rounded-md inline-block uppercase tracking-wider', getVerdictClass(currentCase.verdict)]">
          {{ currentCase.verdict }}
        </span>
        <div class="text-[10px] text-slate-400 mt-1 font-mono">{{ currentCase.consensusRating }}</div>
      </div>
    </div>

    <!-- Source A vs Source B Comparison -->
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-bold text-slate-300">Source A (Primary Sovereign Data)</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">{{ currentCase.sourceA.tier }}</span>
        </div>
        <div class="font-semibold text-white">{{ currentCase.sourceA.name }}</div>
        <div class="text-xs text-emerald-400 mt-1 font-mono">{{ currentCase.sourceA.claim }}</div>
      </div>

      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-bold text-slate-300">Source B (Divergent Finding)</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">{{ currentCase.sourceB.tier }}</span>
        </div>
        <div class="font-semibold text-white">{{ currentCase.sourceB.name }}</div>
        <div class="text-xs text-amber-400 mt-1 font-mono">{{ currentCase.sourceB.claim }}</div>
      </div>
    </div>

    <!-- 7-Dimension Alignment Table -->
    <div class="rounded-lg border border-slate-800/80 overflow-hidden bg-slate-950/60 mb-4">
      <div class="p-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs font-semibold flex items-center justify-between">
        <span class="text-slate-200">7-Dimensional Structural Comparison Matrix</span>
        <span class="text-[10px] text-slate-400 font-normal">Granular Variable Verification</span>
      </div>
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-800/60 bg-slate-900/40 text-[10px] text-slate-400 uppercase font-mono">
            <th class="py-2 px-3">Dimension</th>
            <th class="py-2 px-3">Source A Parameter</th>
            <th class="py-2 px-3">Source B Parameter</th>
            <th class="py-2 px-3 text-right">Alignment</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr v-for="(dim, dIdx) in currentCase.dimensions" :key="dIdx" class="hover:bg-slate-800/20 transition">
            <td class="py-2 px-3 font-semibold text-slate-200">{{ dim.name }}</td>
            <td class="py-2 px-3 text-slate-300">{{ dim.a }}</td>
            <td class="py-2 px-3 text-slate-300">{{ dim.b }}</td>
            <td class="py-2 px-3 text-right">
              <span v-if="dim.match" class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">MATCH</span>
              <span v-else class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">DIFF</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Synthesized Ground Truth Consensus -->
    <div class="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
      <div class="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
        <span>⚡</span>
        <span>Synthesized Ground Truth Consensus:</span>
      </div>
      <p class="text-slate-200 leading-relaxed">{{ currentCase.reconciledSynthesis }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeIdx = ref(0);

const getVerdictClass = (verdict: string) => {
  switch (verdict) {
    case 'DIRECT CONFLICT': return 'bg-red-500/20 text-red-400 border border-red-500/40';
    case 'CONTEXTUAL DIFFERENCE': return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
    case 'PARTIAL CONFLICT': return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
    case 'NOT COMPARABLE': return 'bg-slate-700/30 text-slate-400 border border-slate-700';
    default: return '';
  }
};

const demoCases = [
  {
    title: 'Discrepancy: Post-Harvest Perishable Loss Rate in North India',
    verdict: 'CONTEXTUAL DIFFERENCE',
    consensusRating: 'Both Valid (Qualified by Spatial & Value Chain Scope)',
    rootCause: 'ASSOCHAM measures uncooled end-to-end interstate mandi transit (2018 baseline). ICAR-CIPHET isolates on-farm harvest & farmgate storage nodes in Haryana (2023 baseline).',
    reconciledSynthesis: 'On-farm cold storage reduces local spoilage to 2.8%–3.5%. However, if secondary transit to Delhi NCR mandis lacks reefer trucks, aggregate supply chain losses reach 18–22%.',
    sourceA: {
      name: 'ICAR-CIPHET National Post-Harvest Study',
      tier: 'Tier-2 Academic',
      claim: 'Reported Spoilage: 12.4% (Tomato/Potato in Haryana)'
    },
    sourceB: {
      name: 'ASSOCHAM National Cold-Chain Study',
      tier: 'Tier-3 Industry Trade',
      claim: 'Reported Spoilage: 24.8% (All-India Perishables)'
    },
    dimensions: [
      { name: '1. Publication Year', a: '2023 (Recent Post-KUSUM)', b: '2018 (Pre-KUSUM Baseline)', match: false },
      { name: '2. Geography', a: 'Haryana (Karnal, Kurukshetra)', b: 'All-India Aggregate', match: false },
      { name: '3. Target Population', a: 'Smallholders (1-2 Ha)', b: 'Wholesale Mandi Aggregators', match: false },
      { name: '4. Methodology', a: 'Field weighment & lab tests', b: 'Trader survey questionnaires', match: false },
      { name: '5. Measured Metric', a: 'On-farm & storage spoilage', b: 'Total Farm-to-Retail transit loss', match: false },
      { name: '6. Standard Units', a: '% by physical weight (kg)', b: '% by financial value (₹ loss)', match: false },
      { name: '7. Sample Size', a: 'N = 1,420 field observations', b: 'N = 180 trader interviews', match: false }
    ]
  },
  {
    title: 'Discrepancy: Daily Energy Consumption for 10 MT Solar Cold Room',
    verdict: 'DIRECT CONFLICT',
    consensusRating: 'Source A Overrides Source B (Statutory Precedence)',
    rootCause: 'Source B relies on legacy fixed-speed AC compressors with low COP = 1.8. Source A utilizes modern BLDC inverter compressors with COP = 3.6 and R-30 insulation.',
    reconciledSynthesis: 'Modern 10 MT cold rooms engineered under PMKSY standards consume 32–35 kWh/day, which is 100% sustainable via a 5.0 kW solar array.',
    sourceA: {
      name: 'HERC & MNRE Technical Benchmark',
      tier: 'Tier-1 Sovereign Statutory',
      claim: 'Daily Power Load: 32.5 kWh / day (BLDC Inverter)'
    },
    sourceB: {
      name: 'Diesel Refrigeration Trade Memo',
      tier: 'Tier-4 Web',
      claim: 'Daily Power Load: 58.0 kWh / day (Claims Solar Infeasible)'
    },
    dimensions: [
      { name: '1. Publication Year', a: '2024 (Current FY)', b: '2024 (Current FY)', match: true },
      { name: '2. Geography', a: 'Haryana Agro-Climatic Zone', b: 'Haryana Agro-Climatic Zone', match: true },
      { name: '3. Target Population', a: '10 MT Micro Cold Room', b: '10 MT Micro Cold Room', match: true },
      { name: '4. Methodology', a: 'Calibrated meter telemetry log', b: 'Theoretical peak extrapolation', match: false },
      { name: '5. Measured Metric', a: 'Daily Energy Consumption', b: 'Daily Energy Consumption', match: true },
      { name: '6. Standard Units', a: 'kWh / 24-hr cycle', b: 'kWh / 24-hr cycle', match: true },
      { name: '7. Sample Size', a: 'N = 45 field units', b: 'N = 1 bench unit', match: false }
    ]
  },
  {
    title: 'Discrepancy: Capital Payback Period for 10-Farmer FPO Cluster',
    verdict: 'PARTIAL CONFLICT',
    consensusRating: 'Conditional Consensus (Function of Capacity Utilization)',
    rootCause: 'MNRE assumes 80% annual capacity utilization across 3 crop cycles. PE advisory assumes 55% single-crop utilization.',
    reconciledSynthesis: 'Payback is 2.8–3.2 years if farmers utilize the cold room across 3 seasonal harvesting cycles, but expands to 4.4 years if restricted to a single crop.',
    sourceA: {
      name: 'MNRE / Haryana Agri Dept Model',
      tier: 'Tier-1 Sovereign',
      claim: 'Payback: 2.8 – 3.2 Years (Multi-Crop)'
    },
    sourceB: {
      name: 'Private Agri-Equity Advisory',
      tier: 'Tier-3 Financial Analyst',
      claim: 'Payback: 4.5 – 5.2 Years (Single-Crop)'
    },
    dimensions: [
      { name: '1. Publication Year', a: '2024', b: '2023', match: true },
      { name: '2. Geography', a: 'Haryana (Karnal)', b: 'Haryana & Punjab', match: false },
      { name: '3. Target Population', a: '10-Farmer FPO Cluster', b: 'Single-crop smallholders', match: false },
      { name: '4. Methodology', a: 'Cash-flow with 75% KUSUM + 35% PMKSY', b: 'Historical balance sheet audits', match: false },
      { name: '5. Measured Metric', a: 'Payback Period', b: 'Payback Period', match: true },
      { name: '6. Standard Units', a: 'Years', b: 'Years', match: true },
      { name: '7. Sample Size', a: '100-farmer simulation', b: 'N = 24 unit audits', match: false }
    ]
  },
  {
    title: 'Discrepancy: Central Capital Grant vs State Bhavantar Price Deficit',
    verdict: 'NOT COMPARABLE',
    consensusRating: 'Mutually Exclusive Policy Pillars',
    rootCause: 'PMKSY provides an upfront CapEx equipment grant. Bhavantar Bharpayee provides an OpEx market-price deficit insurance floor.',
    reconciledSynthesis: 'These are complementary, non-competing instruments: PMKSY reduces upfront capital barrier, while Bhavantar Bharpayee protects against market price crashes.',
    sourceA: {
      name: 'PMKSY Integrated Cold Chain',
      tier: 'Tier-1 Sovereign',
      claim: 'Assistance: 35% Capital Grant'
    },
    sourceB: {
      name: 'Bhavantar Bharpayee (Haryana HSAMB)',
      tier: 'Tier-1 Sovereign',
      claim: 'Assistance: ₹550–₹800/qtl Price Floor DBT'
    },
    dimensions: [
      { name: '1. Publication Year', a: '2024 Guidelines', b: '2024 Gazette', match: true },
      { name: '2. Geography', a: 'National / Haryana', b: 'Haryana State Specific', match: false },
      { name: '3. Target Population', a: 'Infrastructure FPO Cluster', b: 'Individual Cultivating Farmer', match: false },
      { name: '4. Methodology', a: 'Machinery CapEx Reimbursement', b: 'Mandi Price Deficit DBT', match: false },
      { name: '5. Measured Metric', a: 'Capital Grant Quantum', b: 'Price Deficit Floor Guarantee', match: false },
      { name: '6. Standard Units', a: '% of Project Cost / ₹ Lakhs', b: '₹ / Quintal', match: false },
      { name: '7. Sample Size', a: 'Statutory Scheme Rules', b: 'Statutory Scheme Rules', match: true }
    ]
  }
];

const currentCase = computed(() => demoCases[activeIdx.value]);
</script>
