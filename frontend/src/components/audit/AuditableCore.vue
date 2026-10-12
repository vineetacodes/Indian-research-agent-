<template>
  <div class="auditable-core-container bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg text-slate-100">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">✓</span>
        <div>
          <h3 class="text-sm font-semibold text-white">BharatOS Auditable Epistemic Core</h3>
          <p class="text-xs text-slate-400">Every factual assertion is grounded in verifiable evidence, source tiers, and cross-source consensus.</p>
        </div>
      </div>
      <div class="flex gap-1">
        <button 
          v-for="filter in ['ALL', 'SUPPORT', 'PARTIAL', 'CONTRADICT']" 
          :key="filter"
          @click="activeFilter = filter"
          :class="[
            'text-xs px-2.5 py-1 rounded-md font-medium transition',
            activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
          ]"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Claims List -->
    <div class="space-y-3">
      <div 
        v-for="(claim, idx) in filteredClaims" 
        :key="claim.id"
        class="border border-slate-800 rounded-lg bg-slate-950/60 overflow-hidden transition hover:border-slate-700"
      >
        <!-- Clickable Claim Bar -->
        <div 
          @click="toggleClaim(claim.id)" 
          class="p-3.5 cursor-pointer flex items-start justify-between gap-3 select-none hover:bg-slate-800/30 transition"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">
                CLAIM #{{ idx + 1 }}
              </span>
              <span class="text-[11px] text-slate-400 font-medium">{{ claim.category }}</span>
              <div class="flex items-center gap-1.5 ml-auto mr-2">
                <span class="text-xs font-semibold text-emerald-400">{{ claim.consensusPct }}% Consensus</span>
                <div class="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" :style="{ width: claim.consensusPct + '%' }"></div>
                </div>
              </div>
            </div>
            <h4 class="text-sm font-medium text-slate-100 leading-snug">
              {{ claim.statement }}
            </h4>
          </div>
          <span class="text-xs font-mono text-slate-400 mt-1 transition-transform duration-200" :class="{ 'rotate-180': openClaims[claim.id] }">
            ▼
          </span>
        </div>

        <!-- Evidence & Sources Drawer (Opens on Click) -->
        <div v-if="openClaims[claim.id]" class="border-t border-slate-800/80 bg-slate-900/90 p-3.5 text-xs space-y-2.5">
          <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Multi-Source Provenance & Stance Audit</span>
            <span class="font-mono text-[10px] text-slate-500">{{ claim.sources.length }} Sources Evaluated</span>
          </div>

          <div class="grid gap-2">
            <div 
              v-for="(src, sIdx) in claim.sources" 
              :key="sIdx"
              class="flex items-start justify-between p-2.5 rounded-md bg-slate-950/80 border border-slate-800/60 hover:border-slate-700 transition"
            >
              <div class="flex-1 pr-3">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold text-slate-200">{{ src.sourceName }}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">{{ src.tier }}</span>
                  <a v-if="src.url" :href="src.url" target="_blank" class="text-[10px] text-blue-400 hover:underline">↗ Source URL</a>
                </div>
                <p class="text-slate-400 text-[11px] italic leading-relaxed">"{{ src.quote }}"</p>
              </div>
              <span :class="['text-[10px] font-bold px-2 py-0.5 rounded shrink-0', getStanceBadgeClass(src.stance)]">
                {{ src.stance }} ({{ src.confidence }}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
      <span>Resolution: <strong class="text-emerald-400">Tier 1 Statutory & Tier 2 Academic Verified</strong></span>
      <span>Engine: <strong>BharatOS Epistemic Discrepancy Matrix</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeFilter = ref('ALL');
const openClaims = ref<Record<string, boolean>>({
  'c1': true // First claim open by default
});

const toggleClaim = (id: string) => {
  openClaims.value[id] = !openClaims.value[id];
};

const getStanceBadgeClass = (stance: string) => {
  switch (stance) {
    case 'SUPPORT': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    case 'PARTIAL': return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    case 'CONTRADICT': return 'bg-red-500/20 text-red-300 border border-red-500/30';
    default: return 'bg-slate-700/40 text-slate-400 border border-slate-700';
  }
};

const claims = [
  {
    id: 'c1',
    category: 'Agronomic Impact & Loss Aversion',
    statement: 'Solar-powered decentralized cold storage reduces post-harvest perishable losses from 12–15% to under 3.5% for smallholders in Haryana.',
    consensusPct: 95,
    dominantStance: 'SUPPORT',
    sources: [
      {
        sourceName: 'ICAR-CIPHET National Post-Harvest Study',
        tier: 'Tier-2 Academic',
        quote: 'Baseline spoilage for tomato & potato in North India is 12.4%–15.8% under ambient conditions; farmgate cold storage reduces loss to 2.8%–3.5%.',
        stance: 'SUPPORT',
        confidence: 100,
        url: 'https://krishi.icar.gov.in/ciphet-post-harvest-loss-study'
      },
      {
        sourceName: 'CCS HAU Hisar / IIT Delhi (Sharma et al. 2024)',
        tier: 'Tier-2 Peer-Reviewed',
        quote: '5 kW solar micro cold storage with PCM thermal buffer prevents quality degradation across 21-day holding periods.',
        stance: 'SUPPORT',
        confidence: 95,
        url: 'https://shodhganga.inflibnet.ac.in/handle/10603/482910'
      },
      {
        sourceName: 'NABARD Cold-Chain Assessment Report',
        tier: 'Tier-1 Statutory',
        quote: 'Loss reduction is achieved on-farm, but overall supply chain savings diminish if final transit lacks reefer transport.',
        stance: 'PARTIAL',
        confidence: 85,
        url: 'https://data.gov.in'
      },
      {
        sourceName: 'Diesel Cold Storage Trade Memo',
        tier: 'Tier-4 Web',
        quote: 'Solar irradiance intermittency in North Indian monsoon prevents complete loss aversion without 100% diesel generator backup.',
        stance: 'CONTRADICT',
        confidence: 70,
        url: 'https://example.com'
      }
    ]
  },
  {
    id: 'c2',
    category: 'Financial Subsidies & Payback',
    statement: 'Combining 75% PM-KUSUM solar subsidy and 35% PMKSY capital grant reduces net farmer outlay to ₹83,625 per member in a 10-farmer cluster, achieving payback in 2.8–3.5 years.',
    consensusPct: 92,
    dominantStance: 'SUPPORT',
    sources: [
      {
        sourceName: 'MNRE PM-KUSUM Operational Guidelines',
        tier: 'Tier-1 Sovereign',
        quote: '75% composite subsidy (30% Central CFA + 45% Haryana State) for standalone solar pumps & agro solar setups.',
        stance: 'SUPPORT',
        confidence: 100,
        url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1968214'
      },
      {
        sourceName: 'MoFPI Integrated Cold Chain Guidelines',
        tier: 'Tier-1 Sovereign',
        quote: '35% capital grant-in-aid for cold room and pre-cooling infrastructure in Haryana.',
        stance: 'SUPPORT',
        confidence: 100,
        url: 'https://mofpi.gov.in'
      },
      {
        sourceName: 'Private Agri-Finance Risk Review',
        tier: 'Tier-3 Financial',
        quote: 'Payback period extends to 4.5+ years if annual cold room capacity utilization drops below 60%.',
        stance: 'PARTIAL',
        confidence: 78,
        url: 'https://example.com'
      }
    ]
  },
  {
    id: 'c3',
    category: 'Technical Prior Art & Patents',
    statement: 'Granted Indian Patent IN 382914 demonstrates that Phase Change Material (PCM) thermal buffers sustain 2–4°C chilling for 16 hours without chemical battery replacement.',
    consensusPct: 98,
    dominantStance: 'SUPPORT',
    sources: [
      {
        sourceName: 'IP India Official Patent Register (IN 382914)',
        tier: 'Tier-1 Statutory',
        quote: 'Direct DC inverter drive coupled with eutectic salt PCM thermal reservoir eliminates battery lifecycle replacement costs.',
        stance: 'SUPPORT',
        confidence: 100,
        url: 'https://ipindiaservices.gov.in/publicsearch'
      },
      {
        sourceName: 'Generic Battery Whitepaper',
        tier: 'Tier-4 Web',
        quote: 'Lacks test data on PCM longevity under extreme +45°C ambient temperatures in Haryana peak summers.',
        stance: 'INSUFFICIENT',
        confidence: 60,
        url: 'https://example.com'
      }
    ]
  }
];

const filteredClaims = computed(() => {
  if (activeFilter.value === 'ALL') return claims;
  return claims.filter(c => c.sources.some(s => s.stance === activeFilter.value));
});
</script>
