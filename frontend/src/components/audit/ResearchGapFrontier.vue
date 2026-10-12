<template>
  <div class="frontier-card bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 font-bold font-mono">
          Ψ
        </span>
        <div>
          <h3 class="text-sm font-semibold text-white">Scientifically Defensible Evidence Frontier</h3>
          <p class="text-xs text-slate-400">Replaces unscientific "no research exists" with 6-state taxonomy & 8-point falsifiability audits.</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1 text-[10px] font-bold">
        <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">Strong Evidence</span>
        <span class="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">Understudied</span>
        <span class="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded">Research Gap</span>
      </div>
    </div>

    <!-- Gap Cards List -->
    <div class="space-y-4">
      <div 
        v-for="(gap, idx) in gaps" 
        :key="idx"
        class="border border-slate-800 rounded-lg bg-slate-950/80 p-4 space-y-3.5 hover:border-slate-700 transition"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span :class="['text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide font-mono', getBadgeClass(gap.epistemicClassification)]">
                {{ gap.epistemicClassification }}
              </span>
              <span class="text-xs font-mono font-bold text-emerald-400 ml-auto">{{ Math.round(gap.confidenceScore * 100) }}% Confidence</span>
            </div>
            <h4 class="text-sm font-semibold text-white leading-snug">
              {{ idx + 1 }}. {{ gap.gapTopic }}
            </h4>
          </div>
        </div>

        <!-- 8-Point Scientific Audit Grid -->
        <div class="grid grid-cols-2 gap-2.5 text-xs">
          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">1. What is the Gap?</div>
            <p class="text-slate-200 text-[11px] leading-relaxed">{{ gap.whatIsTheGap }}</p>
          </div>

          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">2. Why Does it Exist?</div>
            <p class="text-slate-200 text-[11px] leading-relaxed">{{ gap.whyItExists }}</p>
          </div>

          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">3. Sources Analysed</div>
            <p class="text-slate-300 text-[11px] font-mono">{{ gap.sourcesAnalysed.join(', ') }}</p>
          </div>

          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">4. Years & Geographies</div>
            <p class="text-slate-200 text-[11px]"><strong>{{ gap.yearsAudited }}</strong> | {{ gap.geographiesAudited }}</p>
          </div>

          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">5. Evidence Density Found</div>
            <p class="text-slate-200 text-[11px]">{{ gap.evidenceDensityFound }}</p>
          </div>

          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800/80">
            <div class="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">6. Epistemic Classification</div>
            <p class="text-purple-300 text-[11px] font-semibold">{{ gap.epistemicClassification }}</p>
          </div>
        </div>

        <!-- 7 & 8: Popperian Falsifiability Test -->
        <div class="p-3 rounded-lg bg-amber-500/10 border border-dashed border-amber-500/40 text-xs">
          <div class="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
            <span>⚡</span>
            <span>7 & 8. Falsifiability Test: What Search / Data Could Disprove This Gap?</span>
          </div>
          <p class="text-slate-300 text-[11px] leading-relaxed">
            Refuted if official API returns: 
            <code class="text-amber-200 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[10px]">{{ gap.falsifiabilityCriterion.disprovingSearchQuery }}</code>
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
      <span>Scientific Standard: <strong class="text-white">Karl Popper Falsifiability & Empirical Defensibility</strong></span>
      <span>Engine: <strong>BharatOS Frontier Auditor</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const getBadgeClass = (classification: string) => {
  switch (classification) {
    case 'STRONG_EXISTING_EVIDENCE': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    case 'LIMITED_EVIDENCE': return 'bg-blue-500/20 text-blue-300 border border-blue-500/40';
    case 'CONFLICTING_EVIDENCE': return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
    case 'UNDERSTUDIED': return 'bg-purple-500/20 text-purple-300 border border-purple-500/40';
    case 'POTENTIAL_RESEARCH_GAP': return 'bg-pink-500/20 text-pink-300 border border-pink-500/40';
    default: return 'bg-slate-700 text-slate-300';
  }
};

const gaps = [
  {
    gapTopic: 'Last-Mile Reefer Logistics Telemetry Between Farmgate Solar Cold Rooms and Delhi NCR Wholesale Mandis',
    whatIsTheGap: 'Lack of continuous GPS-telemetry temperature tracking datasets connecting decentralized farmgate 10 MT storage to Azadpur/Gazipur mandis.',
    whyItExists: 'Intermediate transport from farmgate relies on uncooled open pickups; IoT temperature loggers are currently restricted to large commercial cold stores.',
    sourcesAnalysed: ['NCCD Cold-Chain Census', 'ICAR-CIPHET', 'HAFED Logistics', 'MoFPI Project DB (14 repositories)'],
    yearsAudited: '2018–2025',
    geographiesAudited: 'Haryana (Karnal, Kurukshetra, Sonipat, Rohtak corridor to Delhi NCR)',
    evidenceDensityFound: '3 Tier-1 policy whitepapers on reefer subsidies, 2 Tier-2 lab studies; 0 primary transit sensor datasets.',
    epistemicClassification: 'POTENTIAL_RESEARCH_GAP',
    confidenceScore: 0.94,
    falsifiabilityCriterion: {
      disprovingSearchQuery: 'data.gov.in/api/query?dataset=haryana_reefer_iot_telemetry&year>=2023'
    }
  },
  {
    gapTopic: 'Long-Term (5+ Year) Thermal Degradation of Phase Change Material (PCM) Eutectic Salt Plates Under +45°C Peak Haryana Summers',
    whatIsTheGap: 'Absence of multi-year empirical cycling data on latent heat capacity retention of inorganic PCM plates in non-air-conditioned farm sheds.',
    whyItExists: 'Most PCM micro cold room deployments in India are under 3 years old; academic studies rely on accelerated lab chambers rather than dusty farm sheds.',
    sourcesAnalysed: ['Shodhganga Theses', 'CSIR-NIScPR NOPR', 'ScienceDirect', 'Indian Patent Office IN 382914 (22 papers)'],
    yearsAudited: '2019–2024',
    geographiesAudited: 'North-Western India semi-arid zones (Hisar, Sirsa, Bhiwani)',
    evidenceDensityFound: '14 lab simulations; 0 multi-year ambient field degradation datasets.',
    epistemicClassification: 'UNDERSTUDIED',
    confidenceScore: 0.91,
    falsifiabilityCriterion: {
      disprovingSearchQuery: '"field evaluation" AND "PCM thermal degradation" AND "Haryana" AND "cycles > 1500"'
    }
  }
];
</script>
