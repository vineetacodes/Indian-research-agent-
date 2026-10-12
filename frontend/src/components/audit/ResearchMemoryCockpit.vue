<template>
  <div class="memory-card bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 font-bold font-mono">
          🧠
        </span>
        <div>
          <h3 class="text-sm font-semibold text-white">Phase 13: Persistent Epistemic Research Memory</h3>
          <p class="text-xs text-slate-400">Maintains 7-tier continuous research state for instant session resumption without repeating work.</p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-teal-400 font-mono font-bold">● State Synced (Session #3)</span>
      </div>
    </div>

    <!-- Active Resumed Project Banner -->
    <div class="p-3.5 rounded-lg bg-teal-950/40 border border-teal-800/50 mb-4 flex items-start justify-between gap-4 text-xs">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 uppercase">
            ACTIVE RESUMED PROJECT
          </span>
          <h4 class="font-bold text-white text-sm">Haryana Agri-Energy & Cold Chain Feasibility</h4>
        </div>
        <p class="text-slate-300 text-[11px]">
          User prompt: <code class="text-teal-300 font-mono bg-black/50 px-1.5 py-0.5 rounded">"Continue my Haryana cold-storage research."</code>
        </p>
        <p class="text-slate-400 text-[11px] mt-1">
          ✓ Restored: 3 deduplicated papers, 6 verified claims, 2 quarantined sources, 2 tracked gaps, 1 active hypothesis.
        </p>
      </div>
      <span class="text-[10px] font-mono text-slate-400 shrink-0 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
        Project ID: PRJ-HAR-2026-08
      </span>
    </div>

    <!-- 7-Tier Memory Hierarchy Grid -->
    <div class="grid grid-cols-3 gap-3 mb-3 text-xs">
      
      <!-- Tier 1: Papers Analysed -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-blue-400">📚 Papers Analysed (3)</span>
          <span class="text-[10px] text-slate-500 font-mono">Deduplicated</span>
        </div>
        <div class="space-y-1.5 text-[11px]">
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <strong class="text-slate-200 block">ICAR-CIPHET (2023)</strong>
            <span class="text-[10px] text-slate-400">12.4% baseline tomato/potato loss</span>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <strong class="text-slate-200 block">CCS HAU Hisar / IIT (2024)</strong>
            <span class="text-[10px] text-slate-400">5 kW solar PV + PCM thermal buffer</span>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <strong class="text-slate-200 block">CSIR-NIScPR NOPR (2023)</strong>
            <span class="text-[10px] text-slate-400">FPO cluster utilization model</span>
          </div>
        </div>
      </div>

      <!-- Tier 2: Verified Evidence -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-emerald-400">✅ Verified Evidence (6)</span>
          <span class="text-[10px] text-emerald-400 font-mono">Tier 1 & 2 Grounded</span>
        </div>
        <div class="space-y-1.5 text-[11px]">
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mr-1">PM-KUSUM</span>
            <span class="text-slate-200 font-mono">75% solar subsidy</span>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mr-1">PMKSY</span>
            <span class="text-slate-200 font-mono">35% capital grant</span>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mr-1">HERC TARIFF</span>
            <span class="text-slate-200 font-mono">₹6.50/kWh commercial</span>
          </div>
        </div>
      </div>

      <!-- Tier 3: Quarantined Sources -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-red-400">🚫 Quarantined Sources (2)</span>
          <span class="text-[10px] text-red-400 font-mono">Excluded</span>
        </div>
        <div class="space-y-1.5 text-[11px]">
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <strong class="text-red-300 block">Agri-Blogspot Post (2016)</strong>
            <span class="text-[10px] text-slate-400">Outdated pre-KUSUM data</span>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <strong class="text-red-300 block">Unverified Trade Forum</strong>
            <span class="text-[10px] text-slate-400">Claims 58 kWh/day without sensors</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Lower Row: Gaps -> Hypotheses -> Experiments -->
    <div class="grid grid-cols-3 gap-3 text-xs mb-4">
      
      <!-- Tier 4: Epistemic Gaps -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-pink-400">🌸 Epistemic Gaps (2)</span>
          <span class="text-[10px] text-pink-400 font-mono">Falsifiable</span>
        </div>
        <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
          <strong class="text-white block">Gap 1: Last-Mile Reefer Telemetry</strong>
          <span class="text-[10px] text-slate-400 block">No primary IoT transit log from Karnal to Azadpur.</span>
        </div>
      </div>

      <!-- Tier 5: Active Hypotheses -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-purple-400">💡 Active Hypotheses (1)</span>
          <span class="text-[10px] text-purple-400 font-mono">H₁ Protocol</span>
        </div>
        <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
          <strong class="text-white block">H₁: 10-Farmer FPO Model</strong>
          <span class="text-[10px] text-slate-400 block">&ge;70% utilization across 3-crop rotation &le;3.2 yr payback.</span>
        </div>
      </div>

      <!-- Tier 6: Experiments -->
      <div class="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span class="font-bold text-teal-400">🧪 Field Trials & Sim</span>
          <span class="text-[10px] text-teal-400 font-mono">1,000 Runs</span>
        </div>
        <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
          <strong class="text-white block">Quasi-Experimental Trial</strong>
          <span class="text-[10px] text-emerald-400 font-mono font-bold">P50 Payback: 2.8 Years (IRR: 28.4%)</span>
        </div>
      </div>

    </div>

    <!-- Footer Continuation -->
    <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
      <div>
        <span class="font-semibold text-white">Next Resumption Step:</span>
        <p class="text-slate-400 text-[11px]">Ready to evaluate transit logistics telemetry or run solar insolation sensitivity.</p>
      </div>
      <button class="px-3.5 py-1.5 rounded-md font-bold bg-teal-600 text-white hover:bg-teal-500 transition shadow">
        Resume Extended Investigation ➔
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Persistent Research Memory Component
</script>
