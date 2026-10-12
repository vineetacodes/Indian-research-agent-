/**
 * Copyright 2024 BharatOS Research Intelligence Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Agent: योजना प्रज्ञा (Yojana Prajna) — Planning & Orchestration Agent
 * Role : Deconstructs the user research inquiry into 5 specialised agent
 *        investigation directives and returns a BharatOS 5-Agent Blueprint.
 *        Routes each sub-task to the appropriate Hindi-named domain agent.
 *
 * Agent Roster:
 *   साहित्य प्रज्ञा  — Literature Intelligence (Shodhganga, ICAR, NOPR, OpenAlex)
 *   नीति प्रज्ञा     — Policy Intelligence    (8-Tier Bharat Cascade Enrichment)
 *   सांख्यिकी प्रज्ञा — Statistical Intelligence (Unit/Variance Validation)
 *   विपणन प्रज्ञा   — Market Intelligence     (FPO Unit Economics + Amortization)
 *   आविष्कार प्रज्ञा — Patent Intelligence     (IP India InPASS + Claims Extraction)
 */

export class PlannerAgent {
  /**
   * योजना प्रज्ञा — Deconstructs the research inquiry into 5 specialised
   * agent investigation directives. Returns a BharatOS 5-Agent Blueprint
   * mapping each domain to its Hindi-named agent with explicit goals,
   * focus areas, and target sovereign Indian data sources.
   *
   * @param {string} query - The user research inquiry string
   * @returns {Object} 5-Agent Execution Blueprint with enriched directives
   */
  async plan(query) {
    const isColdStorage = query.toLowerCase().includes('cold') || query.toLowerCase().includes('storage');
    const isHaryana     = query.toLowerCase().includes('haryana');

    return {
      query,
      title: `BharatOS 5-Agent Blueprint: ${query}`,
      agentTasks: {
        literature: {
          agent     : "साहित्य प्रज्ञा (Sahitya Prajna)",
          agentRole : "Literature Intelligence",
          goal      : "Find peer-reviewed academic papers & post-harvest research from Indian sovereign repositories",
          focus     : "Crop spoilage baselines (CIPHET 12-15%), PCM thermal storage, shelf-life extension in tomato/potato. Cross-check N, methodology (RCT/Survey/Field), and peer-review tier (Q1/Q2/National).",
          targetSources: [
            "ICAR KRISHI Repository",
            "Shodhganga (INFLIBNET)",
            "CSIR-NIScPR NOPR",
            "OpenAlex",
          ],
          validationAxes: ["sampleSize (N >= 30)", "methodologyType", "peerReviewTier"],
        },
        india: {
          agent     : "नीति प्रज्ञा (Niti Prajna)",
          agentRole : "Policy Intelligence — 8-Tier Bharat Cascade Enrichment",
          goal      : "Find Indian government policies, schemes & regulatory context; enrich with 8-tier Bharat Cascade",
          focus     : "PM-KUSUM (75% solar subsidy), PMKSY SAMPADA (35% cold chain grant), Bhavantar Bharpayee Yojana (BBY price floor via DBT), HERC power tariffs, Gram Panchayat land nodes.",
          targetSources: [
            "data.gov.in (PIB India)",
            "MNRE (PM-KUSUM)",
            "MoFPI (PMKSY)",
            "agriharyana.gov.in (HSAMB)",
            "HERC (Tariff Orders)",
            "NABARD (FPO Promotion)",
            "pmfby.gov.in (PMFBY)",
            "haryanapanchayat.gov.in",
          ],
          cascadeTiers: [
            "T1_National_Policy", "T2_State_Scheme", "T3_District_Mandi",
            "T4_Agro_Climatic_Zone", "T5_Electricity_Tariff", "T6_Crop_Cycle",
            "T7_Deficit_Pricing_DBT", "T8_Gram_Panchayat",
          ],
        },
        data: {
          agent     : "सांख्यिकी प्रज्ञा (Sankhyiki Prajna)",
          agentRole : "Statistical Intelligence — Unit & Variance Validation",
          goal      : "Find verified numerical datasets & time-series with unit consistency and variance checks",
          focus     : "District-wise horticulture yields in Haryana (Karnal, Kurukshetra, Sonipat), NCCD cold capacity (8.2 Lakh MT), specific energy consumption (30-35 kWh/day). Year-range 2018-2026.",
          targetSources: [
            "DES MoA&FW (data.gov.in)",
            "NCCD Cold-Chain Census",
            "RBI DBIE",
            "MOSPI NADA",
          ],
          validationAxes: ["unitConsistency (Lakhs/Crores/Quintals/MT/INR/kWh)", "yearRange (2018-2026)", "varianceCheck"],
        },
        market: {
          agent     : "विपणन प्रज्ञा (Vipanan Prajna)",
          agentRole : "Market Intelligence — FPO Cluster Unit Economics",
          goal      : "Find equipment costs, unit economics & financial margins; compute FPO amortization and subsidy netting",
          focus     : "10 MT Cold Room CapEx (Rs 12 Lakhs), 5 kW Solar PV (Rs 2.25 Lakhs), subsidy netting: PMKSY 35% + PM-KUSUM 75%, net farmer outlay per 10-farmer cluster, payback period (2.8-3.5 yrs).",
          targetSources: [
            "Commercial cold-chain vendors (Snowman, Tessol, ColdEx)",
            "HERC Commercial Tariff Schedules",
            "NABARD AIF / Agriculture Infrastructure Fund",
          ],
          fpoClusterConfig: { farmerCount: 10, assetLifeYears: 10 },
        },
        patent: {
          agent     : "आविष्कार प्रज्ञा (Aavishkar Prajna)",
          agentRole : "Patent Intelligence — IP India InPASS Search",
          goal      : "Search IP India InPASS for prior art; extract claims[], IPC codes, and PCM thermal buffer design fields",
          focus     : "Solar DC inverter cold rooms (F25D 11/00), PCM eutectic plates (F28D 20/02), off-grid modular cold containers, farmgate FPO installations. Extract patentGrantNumber and claims[] per record.",
          targetSources: [
            "IP India InPASS (ipindiaservices.gov.in)",
            "WIPO PATENTSCOPE",
            "Google Patents (IN jurisdiction filter)",
          ],
          ipcCodesOfInterest: ["F25D 11/00", "F25D 3/10", "F28D 20/02", "H02S 10/30", "A01F 25/00"],
        },
      },
    };
  }
}

export const plannerAgent = new PlannerAgent();
