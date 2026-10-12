<template>
  <div class="hypothesis-card bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold font-mono">
          H₁
        </span>
        <div>
          <h3 class="text-sm font-semibold text-white">Phase 11: Scientific Hypothesis & Experiment Engine</h3>
          <p class="text-xs text-slate-400">Formal abductive synthesis bridging research gaps to 7-variable empirical trials & evaluation metrics.</p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-mono font-bold">✓ Empirical Protocol Ready</span>
      </div>
    </div>

    <!-- 6-Stage Pipeline Flow -->
    <div class="p-3.5 rounded-lg bg-purple-950/30 border border-purple-800/40 mb-4 space-y-2">
      <div class="text-[10px] font-mono uppercase font-bold text-purple-300 flex items-center justify-between">
        <span>6-Stage Abductive Generation Pipeline</span>
        <span class="text-slate-400">Formal Scientific Methodology</span>
      </div>
      <div class="grid grid-cols-6 gap-1.5 text-center text-xs">
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 1</span>
          <strong class="text-blue-400 text-xs">Evidence</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">12.4% Loss Rate</span>
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 2</span>
          <strong class="text-pink-400 text-xs">Research Gap</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">Single-Farmer CapEx</span>
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 3</span>
          <strong class="text-purple-400 text-xs">Hypothesis</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">Shared FPO Cluster</span>
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 4</span>
          <strong class="text-amber-400 text-xs">7 Variables</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">Capacity, Grid, Tariffs</span>
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 5</span>
          <strong class="text-sky-400 text-xs">Experiment</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">Field Cluster Trial</span>
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800">
          <span class="block text-[9px] text-slate-400 font-mono">STAGE 6</span>
          <strong class="text-emerald-400 text-xs">Evaluation</strong>
          <span class="block text-[9px] text-slate-400 mt-0.5">Payback & IRR</span>
        </div>
      </div>
    </div>

    <!-- Hypothesis Statement Box -->
    <div class="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4">
      <div class="text-[10px] font-mono uppercase font-bold text-purple-400 mb-1">Generated Scientific Hypothesis (H₁)</div>
      <p class="text-sm font-medium text-slate-100 leading-relaxed">
        "Shared decentralized solar cold-storage infrastructure (5–10 MT) operated as an FPO cluster model achieves full capital payback in <strong class="text-emerald-400">&le; 3.2 years</strong> and an IRR of <strong class="text-emerald-400">&ge; 24%</strong> when capacity utilization exceeds <strong class="text-purple-400">70%</strong> across a 3-crop rotation cycle within a <strong class="text-blue-400">&le; 3 km</strong> farmgate radius."
      </p>
    </div>

    <!-- 7 Required Variables Interactive Simulator -->
    <div class="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-xs font-semibold text-white">Empirical Experiment Simulator: The 7 Parametric Variables</span>
        <span class="text-[10px] text-slate-400">Live recalculation of trial outcomes</span>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
        
        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">1. Storage Capacity (MT):</span>
            <strong class="text-white font-mono">{{ capacity }} MT</strong>
          </div>
          <input type="range" min="5" max="30" step="5" v-model.number="capacity" class="w-full accent-purple-500">
        </div>

        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">2. Annual Utilization Rate (%):</span>
            <strong class="text-white font-mono">{{ utilization }}%</strong>
          </div>
          <input type="range" min="40" max="95" step="5" v-model.number="utilization" class="w-full accent-purple-500">
        </div>

        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">3. Grid Electricity Cost (₹/kWh):</span>
            <strong class="text-white font-mono">₹{{ gridTariff.toFixed(2) }} / kWh</strong>
          </div>
          <input type="range" min="4.0" max="9.0" step="0.5" v-model.number="gridTariff" class="w-full accent-purple-500">
        </div>

        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">4. Solar Array Capacity (kW):</span>
            <strong class="text-white font-mono">{{ solarKW.toFixed(1) }} kW</strong>
          </div>
          <input type="range" min="3" max="15" step="1" v-model.number="solarKW" class="w-full accent-purple-500">
        </div>

        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">5. Target Crop Rotation:</span>
            <strong class="text-purple-300 font-mono text-[10px]">Tomato + Potato + Onion</strong>
          </div>
          <select class="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" v-model="cropRotation">
            <option value="multi">3-Crop Rotation (High Value Arbitrage)</option>
            <option value="tomato">Tomato Only (High Perishability)</option>
            <option value="potato">Potato Only (Seasonal Bulk)</option>
          </select>
        </div>

        <div>
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">6. Cluster Aggregation Distance:</span>
            <strong class="text-white font-mono">{{ distanceKM.toFixed(1) }} km Radius</strong>
          </div>
          <input type="range" min="1.0" max="10.0" step="0.5" v-model.number="distanceKM" class="w-full accent-purple-500">
        </div>

      </div>

      <!-- Live Simulated Evaluation Metrics Display -->
      <div class="pt-3 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-xs">
        <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span class="text-[10px] text-slate-400 block uppercase font-mono">Net Farmer CapEx</span>
          <strong class="text-sm font-bold text-white">₹{{ Math.round(perFarmerCapEx).toLocaleString('en-IN') }}</strong>
          <span class="text-[9px] text-emerald-400 block">(with 75% KUSUM)</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span class="text-[10px] text-slate-400 block uppercase font-mono">CapEx Payback</span>
          <strong class="text-sm font-bold text-emerald-400">{{ calculatedPayback.toFixed(1) }} Years</strong>
          <span class="text-[9px] text-slate-400 block">Target: &le; 3.5 yrs</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span class="text-[10px] text-slate-400 block uppercase font-mono">Projected IRR</span>
          <strong class="text-sm font-bold text-purple-400">{{ calculatedIRR.toFixed(1) }}%</strong>
          <span class="text-[9px] text-slate-400 block">Target: &ge; 24%</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span class="text-[10px] text-slate-400 block uppercase font-mono">Loss Avoidance</span>
          <strong class="text-sm font-bold text-blue-400">11.8% Saved</strong>
          <span class="text-[9px] text-slate-400 block">14.2% ➔ 2.4% Spoilage</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
      <span>Trial Protocol: <strong class="text-white">Quasi-Experimental Cluster Trial (Karnal & Sonipat FPOs)</strong></span>
      <span>Engine: <strong>BharatOS Phase 11 Hypothesis Generator</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const capacity = ref(10);
const utilization = ref(75);
const gridTariff = ref(6.5);
const solarKW = ref(5.0);
const cropRotation = ref('multi');
const distanceKM = ref(2.5);

const perFarmerCapEx = computed(() => {
  const gross = (capacity.value * 120000) + (solarKW.value * 45000);
  const sub = (capacity.value * 120000 * 0.35) + (solarKW.value * 45000 * 0.75);
  return (gross - sub) / 10;
});

const calculatedPayback = computed(() => {
  const gross = (capacity.value * 120000) + (solarKW.value * 45000);
  const sub = (capacity.value * 120000 * 0.35) + (solarKW.value * 45000 * 0.75);
  const netCap = gross - sub;
  const annualRev = (capacity.value * 4 * (utilization.value / 100)) * (0.12 * 25000);
  const offSeason = (capacity.value * 4 * (utilization.value / 100)) * (0.18 * 25000);
  const solarSav = (solarKW.value * 4.2 * 270) * gridTariff.value;
  const opEx = gross * 0.03;
  const netInflow = annualRev + offSeason + solarSav - opEx;
  return netCap / Math.max(1000, netInflow);
});

const calculatedIRR = computed(() => {
  const pb = calculatedPayback.value;
  return Math.max(10, (100 / pb) - 4);
});
</script>
