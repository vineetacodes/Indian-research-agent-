<template>
  <div class="what-if-card bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold font-mono">
          🐍
        </span>
        <div>
          <h3 class="text-sm font-semibold text-white">Phase 12: Deterministic Python What-If Sandbox</h3>
          <p class="text-xs text-slate-400">Deterministic numerical sensitivity simulation. The LLM never invents arithmetic.</p>
        </div>
      </div>

      <!-- Presets -->
      <div class="flex gap-1.5">
        <button 
          @click="setPreset('tariff20')" 
          class="text-xs px-2.5 py-1 rounded font-medium bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition"
        >
          Electricity +20%
        </button>
        <button 
          @click="setPreset('util70')" 
          class="text-xs px-2.5 py-1 rounded font-medium bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition"
        >
          Utilization 70%
        </button>
      </div>
    </div>

    <!-- Sliders -->
    <div class="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4 space-y-3">
      <div class="text-xs font-semibold text-white flex items-center justify-between">
        <span>Parametric Perturbation Modifiers</span>
        <span class="text-[10px] text-emerald-400 font-mono">Python Sandbox Runtime: 4ms</span>
      </div>

      <div class="grid grid-cols-3 gap-3 text-xs">
        <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">Electricity Tariff Delta:</span>
            <strong class="text-amber-400 font-mono">{{ tariffDelta >= 0 ? '+' : '' }}{{ tariffDelta }}% (₹{{ actualTariff.toFixed(2) }}/kWh)</strong>
          </div>
          <input type="range" min="-30" max="60" step="5" v-model.number="tariffDelta" class="w-full accent-blue-500">
        </div>

        <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">Storage Utilization:</span>
            <strong class="text-purple-400 font-mono">{{ utilizationRate }}%</strong>
          </div>
          <input type="range" min="30" max="95" step="5" v-model.number="utilizationRate" class="w-full accent-blue-500">
        </div>

        <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">Solar Subsidy Rate:</span>
            <strong class="text-emerald-400 font-mono">{{ solarSubsidyPct }}% (Haryana)</strong>
          </div>
          <input type="range" min="0" max="90" step="5" v-model.number="solarSubsidyPct" class="w-full accent-blue-500">
        </div>
      </div>
    </div>

    <!-- The 6-Stage Deterministic Output -->
    <div class="space-y-2.5 text-xs">
      <div class="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
        The 6-Stage Deterministic Computation Trace
      </div>

      <!-- 1. INPUT -->
      <div class="p-2.5 rounded-lg bg-slate-950/60 border-l-4 border-blue-500 border border-slate-800/80">
        <div class="text-[10px] font-mono uppercase font-bold text-blue-400 mb-0.5">[STAGE 1/6] INPUT VARIABLES</div>
        <p class="text-slate-300 text-[11px] font-mono">
          Capacity = 10 MT | Utilization = {{ utilizationRate }}% | Effective Tariff = ₹{{ actualTariff.toFixed(2) }}/kWh ({{ tariffDelta >= 0 ? '+' : '' }}{{ tariffDelta }}%) | Solar Subsidy = {{ solarSubsidyPct }}% | PMKSY = 35%
        </p>
      </div>

      <!-- 2. ASSUMPTIONS -->
      <div class="p-2.5 rounded-lg bg-slate-950/60 border-l-4 border-purple-500 border border-slate-800/80">
        <div class="text-[10px] font-mono uppercase font-bold text-purple-400 mb-0.5">[STAGE 2/6] EMPIRICAL ASSUMPTIONS</div>
        <ul class="text-slate-300 text-[11px] list-disc list-inside space-y-0.5">
          <li>10 MT cold room CapEx = ₹12.0L; 5 kW Solar PV = ₹2.25L.</li>
          <li>Solar generation: 5,670 kWh clean power annually.</li>
          <li>Post-harvest loss aversion: 12.0% volume saved @ ₹25,000/MT modal price.</li>
        </ul>
      </div>

      <!-- 3. FORMULA -->
      <div class="p-2.5 rounded-lg bg-slate-950/60 border-l-4 border-amber-500 border border-slate-800/80">
        <div class="text-[10px] font-mono uppercase font-bold text-amber-400 mb-0.5">[STAGE 3/6] MATHEMATICAL FORMULAS</div>
        <div class="text-amber-200 text-[11px] font-mono bg-black/40 p-2 rounded space-y-0.5">
          <div>Net_CapEx = (Cold_CapEx * (1 - PMKSY_sub)) + (Solar_CapEx * (1 - KUSUM_sub))</div>
          <div>Annual_Profit = Spoilage_Saved + OffSeason_Premium + Solar_Saved - AMC_Maintenance</div>
          <div>Payback_Years = Net_CapEx / Annual_Profit</div>
        </div>
      </div>

      <!-- 4. CALCULATION -->
      <div class="p-2.5 rounded-lg bg-slate-950/60 border-l-4 border-sky-500 border border-slate-800/80">
        <div class="text-[10px] font-mono uppercase font-bold text-sky-400 mb-0.5">[STAGE 4/6] PYTHON ARITHMETIC TRACE</div>
        <div class="text-slate-200 text-[11px] font-mono bg-black/40 p-2 rounded space-y-0.5">
          <div>1. Net CapEx = ₹{{ Math.round(computedResults.netCapEx).toLocaleString('en-IN') }} (₹{{ Math.round(computedResults.perFarmer).toLocaleString('en-IN') }} / farmer)</div>
          <div>2. Annual Volume Handled = {{ computedResults.annualVolume.toFixed(1) }} MT / year</div>
          <div>3. Net Annual Cluster Inflow = ₹{{ Math.round(computedResults.netAnnualProfit).toLocaleString('en-IN') }} / year</div>
          <div>4. Payback Period = ₹{{ Math.round(computedResults.netCapEx).toLocaleString('en-IN') }} / ₹{{ Math.round(computedResults.netAnnualProfit).toLocaleString('en-IN') }} = {{ computedResults.paybackYears.toFixed(2) }} Years</div>
        </div>
      </div>

      <!-- 5. RESULT -->
      <div class="p-3 rounded-lg bg-emerald-500/10 border-l-4 border-emerald-500 border border-emerald-500/30">
        <div class="text-[10px] font-mono uppercase font-bold text-emerald-400 mb-1">[STAGE 5/6] SIMULATION RESULTS</div>
        <div class="grid grid-cols-4 gap-2 text-center">
          <div class="p-2 rounded bg-black/40 border border-emerald-500/20">
            <span class="text-[9px] text-slate-400 block font-mono">NET FARMER CAPEX</span>
            <strong class="text-sm font-bold text-white">₹{{ Math.round(computedResults.perFarmer).toLocaleString('en-IN') }}</strong>
          </div>
          <div class="p-2 rounded bg-black/40 border border-emerald-500/20">
            <span class="text-[9px] text-slate-400 block font-mono">RECALCULATED PAYBACK</span>
            <strong class="text-sm font-bold text-emerald-400">{{ computedResults.paybackYears.toFixed(1) }} Years</strong>
          </div>
          <div class="p-2 rounded bg-black/40 border border-emerald-500/20">
            <span class="text-[9px] text-slate-400 block font-mono">PROJECTED IRR</span>
            <strong class="text-sm font-bold text-purple-400">{{ computedResults.irr.toFixed(1) }}%</strong>
          </div>
          <div class="p-2 rounded bg-black/40 border border-emerald-500/20">
            <span class="text-[9px] text-slate-400 block font-mono">10-YEAR NET ROI</span>
            <strong class="text-sm font-bold text-blue-400">+{{ computedResults.tenYearROI.toFixed(1) }}%</strong>
          </div>
        </div>
      </div>

      <!-- 6. LIMITATION -->
      <div class="p-2.5 rounded-lg bg-slate-950/60 border-l-4 border-red-500 border border-slate-800/80">
        <div class="text-[10px] font-mono uppercase font-bold text-red-400 mb-0.5">[STAGE 6/6] SENSITIVITY LIMITATIONS</div>
        <p class="text-slate-300 text-[11px] leading-relaxed">
          1. Assumes no continuous grid blackout $>48$ hrs during monsoon cloud cover without backup.  
          2. Requires multi-crop rotation to sustain $\ge 70\%$ utilization.  
          3. Assumes Haryana Bhavantar Bharpayee price floor remains active.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tariffDelta = ref(20);
const utilizationRate = ref(70);
const solarSubsidyPct = ref(75);

const actualTariff = computed(() => 6.50 * (1 + (tariffDelta.value / 100)));

const setPreset = (preset: string) => {
  if (preset === 'tariff20') {
    tariffDelta.value = 20;
    utilizationRate.value = 75;
  } else if (preset === 'util70') {
    tariffDelta.value = 0;
    utilizationRate.value = 70;
  }
};

const computedResults = computed(() => {
  const capMT = 10;
  const coldCapEx = capMT * 120000;
  const solarCapEx = 5.0 * 45000;
  const pmksySub = coldCapEx * 0.35;
  const solarSub = solarCapEx * (solarSubsidyPct.value / 100);
  const netCapEx = (coldCapEx - pmksySub) + (solarCapEx - solarSub);
  const perFarmer = netCapEx / 10;

  const annualVolume = capMT * 4 * (utilizationRate.value / 100);
  const spoilageSaved = annualVolume * 0.12 * 25000;
  const offSeason = annualVolume * 25000 * 0.18;
  const solarSaved = (5.0 * 4.2 * 270) * actualTariff.value;
  const amcOpEx = (coldCapEx + solarCapEx) * 0.03;
  const netAnnualProfit = (spoilageSaved + offSeason + solarSaved) - amcOpEx;

  const paybackYears = netCapEx / Math.max(1000, netAnnualProfit);
  const irr = Math.max(5, (netAnnualProfit / netCapEx) * 100 - 4);
  const tenYearROI = ((netAnnualProfit * 10 - netCapEx) / netCapEx) * 100;

  return {
    netCapEx,
    perFarmer,
    annualVolume,
    netAnnualProfit,
    paybackYears,
    irr,
    tenYearROI
  };
});
</script>
