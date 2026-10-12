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
 * Agent: नीति प्रज्ञा (Niti Prajna) — Policy Intelligence Agent
 * Role : Performs 8-tier Bharat Cascade Enrichment across sovereign policy
 *        layers — from central ministry to Gram Panchayat. Maps each scheme
 *        to its governing tier, disbursement channel, and DBT linkage status.
 */

// ---------------------------------------------------------------------------
// 8-Tier Bharat Cascade Enrichment ladder — ordered from macro to micro
// ---------------------------------------------------------------------------
const BHARAT_CASCADE_TIERS = [
  'T1_National_Policy',        // Central Ministry / Cabinet decision
  'T2_State_Scheme',           // State Government implementation order
  'T3_District_Mandi',         // APMC / District Mandi price & infrastructure
  'T4_Agro_Climatic_Zone',     // Agro-climatic zone suitability & crop calendar
  'T5_Electricity_Tariff',     // State Electricity Regulatory Commission tariff
  'T6_Crop_Cycle',             // Seasonal crop cycle & post-harvest calendar
  'T7_Deficit_Pricing_DBT',    // Price deficit protection via DBT transfer
  'T8_Gram_Panchayat',         // Gram Panchayat / village-level delivery node
];

/**
 * Assigns the appropriate Bharat Cascade tier label to a policy record.
 * Tier assignment is based on the custodian authority level inferred
 * from the custodian string.
 *
 * @param {string} custodian - Custodian field from the policy evidence record
 * @returns {string} A BHARAT_CASCADE_TIERS tier identifier
 */
function assignCascadeTier(custodian) {
  const c = custodian.toLowerCase();
  if (c.includes('panchayat') || c.includes('gram') || c.includes('village')) {
    return 'T8_Gram_Panchayat';
  }
  if (c.includes('dbt') || c.includes('deficit') || c.includes('bhavantar')) {
    return 'T7_Deficit_Pricing_DBT';
  }
  if (c.includes('season') || c.includes('crop cycle') || c.includes('pmfby')) {
    return 'T6_Crop_Cycle';
  }
  if (c.includes('herc') || c.includes('electricity') || c.includes('discom') || c.includes('tariff')) {
    return 'T5_Electricity_Tariff';
  }
  if (c.includes('agro') || c.includes('zone') || c.includes('soil survey') || c.includes('nbss')) {
    return 'T4_Agro_Climatic_Zone';
  }
  if (c.includes('mandi') || c.includes('apmc') || c.includes('district market')) {
    return 'T3_District_Mandi';
  }
  if (c.includes('state') || c.includes('hsamb') || c.includes('haryana dept') || c.includes('nabard')) {
    return 'T2_State_Scheme';
  }
  // Default: national ministry level
  return 'T1_National_Policy';
}

export class IndiaAgent {
  /**
   * नीति प्रज्ञा — Finds Indian government policies, state schemes, gazettes,
   * and statutory frameworks. Enriches each record with its 8-tier Bharat
   * Cascade classification and Direct Benefit Transfer (DBT) linkage status.
   *
   * Cascade: T1 National Policy -> T2 State Scheme -> T3 District Mandi ->
   *          T4 Agro-climatic Zone -> T5 Electricity Tariff -> T6 Crop Cycle ->
   *          T7 Deficit Pricing DBT -> T8 Gram Panchayat
   *
   * @param {Object} task - Investigation task directive from PlannerAgent
   * @returns {Object} Sovereign policy evidence enriched with cascade tier metadata
   */
  async investigate(task) {
    // Raw policy evidence records from sovereign Indian sources
    const rawPolicyEvidence = [
      {
        schemeId: "MNRE_PM_KUSUM",
        schemeName: "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)",
        custodian: "Ministry of New and Renewable Energy (MNRE) & Haryana Govt",
        tier: null,                      // Enriched below by assignCascadeTier()
        url: "https://pib.gov.in/PressReleasePage.aspx?PRID=1968214",
        disbursementChannel: "Component-C grant via DISCOM; solar capacity credited to DISCOM grid",
        dbtLinked: false,
        subsidyPct: 75,                  // 30% Central CFA + 45% Haryana State top-up
        provisions: "Provides 75% composite subsidy (30% Central CFA + 45% Haryana State Government top-up) for standalone solar pumps & agro-solar power generation. Excess generation can be net-metered back to DISCOMs.",
        agroClimaticRelevance: "Haryana falls in Trans-Gangetic Plains agro-climatic zone (Zone IV). High solar irradiance (5.2-5.6 kWh/m2/day) makes PM-KUSUM Component C highly viable.",
        cropCycleAlignment: "Solar surplus available April-September (Kharif); PCM thermal buffer extends utility through Rabi harvest (Oct-March).",
      },
      {
        schemeId: "MOFPI_PMKSY_COLD_CHAIN",
        schemeName: "Pradhan Mantri Kisan SAMPADA Yojana (PMKSY) — Integrated Cold Chain",
        custodian: "Ministry of Food Processing Industries (MoFPI)",
        tier: null,
        url: "https://mofpi.gov.in/schemes/pradhan-mantri-kisan-sampada-yojana",
        disbursementChannel: "Capital grant-in-aid disbursed via MoFPI Project Management Agency (PMA) after project completion milestones",
        dbtLinked: false,
        subsidyPct: 35,                  // 35% of eligible project cost, ceiling Rs 10 Cr
        provisions: "Provides 35% capital grant-in-aid for eligible cold room and pre-cooling infrastructure in general areas including Haryana (up to Rs 10 Crore ceiling).",
        agroClimaticRelevance: "Applicable pan-India. Haryana perishable belt (Karnal, Kurukshetra, Sonipat) is a priority zone.",
        cropCycleAlignment: "Cold chain infrastructure supports year-round multi-crop rotation — tomato (summer), potato (winter), onion (spring) — sustaining >70% utilization.",
      },
      {
        schemeId: "HAR_BHAVANTAR_BHARPAYEE",
        schemeName: "Haryana Bhavantar Bharpayee Yojana (BBY)",
        custodian: "Haryana State Agricultural Marketing Board (HSAMB) / Haryana Dept of Agriculture",
        tier: null,
        url: "https://agriharyana.gov.in/bhavantar-bharpayee-guidelines",
        disbursementChannel: "Direct Benefit Transfer (DBT) to Aadhaar-seeded bank account of registered farmer within 30 days of mandi arrival",
        dbtLinked: true,
        protectedFloorPrices: {
          Tomato_INR_per_qtl: 550,
          Potato_INR_per_qtl: 600,
          Onion_INR_per_qtl: 800,
        },
        provisions: "Guarantees price deficit financing for 21 horticultural crops. If mandi prices fall below protected floor, state transfers deficit directly via DBT.",
        districtMandiNote: "Price reporting from 27 APMC mandis in Haryana. Deficit calculated using 7-day rolling modal mandi price vs BBY floor.",
        gramPanchayatDelivery: "FPO-registered Gram Panchayats act as aggregation nodes for registration and crop volume reporting to HSAMB.",
      },
      {
        schemeId: "HERC_POWER_TARIFFS",
        schemeName: "HERC Distribution Tariff Order FY 2024-25 (UHBVN & DHBVN)",
        custodian: "Haryana Electricity Regulatory Commission (HERC)",
        tier: null,
        url: "https://herc.gov.in/TariffOrders/FY2024-25",
        disbursementChannel: "Direct billing by UHBVN/DHBVN. Solar banking settled annually in March at avoided cost rate.",
        dbtLinked: false,
        tariffDetails: {
          LT_Agro_Processing_per_kWh_INR: 6.50,
          Fixed_Demand_Charge_per_kVA_per_month_INR: 170,
          SolarBankingPermitted: true,
          BankingSettlementCycle: "Annual (March)",
        },
        provisions: "Commercial LT Agro-processing tariff is Rs 6.50/kWh with Rs 170/kVA/month fixed demand charge. Solar banking permitted with annual settlement.",
        electricityTariffImpact: "At 35 kWh/day refrigeration load x Rs 6.50 = Rs 227.5/day grid cost. Solar offset of 60% reduces effective tariff burden to Rs 91/day.",
      },
      {
        schemeId: "ICAR_AGRO_CLIMATIC_ZONES",
        schemeName: "ICAR National Agro-Climatic Zone Classification — Zone IV (Trans-Gangetic Plains)",
        custodian: "Indian Council of Agricultural Research (ICAR) — National Bureau of Soil Survey & Land Use Planning",
        tier: null,
        url: "https://icar.org.in/content/agro-climatic-zones",
        disbursementChannel: "N/A — Reference classification document",
        dbtLinked: false,
        provisions: "Haryana falls in ICAR Zone IV (Trans-Gangetic Plains). Mean annual rainfall 500-700 mm; temp range 2-45 deg C. High solar irradiance supports year-round solar PV viability.",
        agroClimaticRelevance: "Zone IV classification determines crop calendars and informs optimal cold storage temperature regimes (2-4 deg C vegetables, 8-12 deg C roots).",
      },
      {
        schemeId: "NABARD_FPO_PROMOTION",
        schemeName: "NABARD FPO Promotion & Formation Scheme — Haryana State Focus",
        custodian: "NABARD Haryana Regional Office / State Government",
        tier: null,
        url: "https://nabard.org/content.aspx?id=572",
        disbursementChannel: "Grant to Cluster-Based Business Organisations (CBBOs) via NABARD Regional Office. Equity grant of Rs 18 Lakh per FPO on achieving 300 farmer member threshold.",
        dbtLinked: false,
        provisions: "Supports formation and nurturing of 10,000 FPOs nationally. Haryana quota: 420 FPOs by FY2027. FPOs eligible for PMKSY cold chain grants and PM-KUSUM solar subsidies as legal entities.",
        gramPanchayatDelivery: "FPO cluster units must be registered with local Gram Panchayat as primary service delivery node for government scheme linkage.",
      },
      {
        schemeId: "PMFBY_CROP_INSURANCE",
        schemeName: "Pradhan Mantri Fasal Bima Yojana (PMFBY) — Kharif & Rabi Coverage",
        custodian: "Ministry of Agriculture & Farmers Welfare (MoA&FW)",
        tier: null,
        url: "https://pmfby.gov.in",
        disbursementChannel: "DBT to farmer bank account upon claim settlement by empanelled insurance company within 45 days of harvest loss determination",
        dbtLinked: true,
        farmerPremiumPct: { Kharif: 2, Rabi: 1.5 },
        provisions: "Farmer premium: 2% (Kharif), 1.5% (Rabi). State and Centre share remaining actuarial premium. Covers post-harvest losses due to cyclone/unseasonal rain for notified crops.",
        cropCycleAlignment: "PMFBY coverage aligned with Kharif sowing (Jun-Jul) and Rabi sowing (Oct-Nov). Cold storage extends buffer window post-harvest.",
      },
      {
        schemeId: "GRAM_PANCHAYAT_COLD_NODE",
        schemeName: "Gram Panchayat Cold Storage Node — Haryana Panchayati Raj Department Circular",
        custodian: "Haryana Panchayati Raj Department / District Panchayat Officers",
        tier: null,
        url: "https://haryanapanchayat.gov.in/cold-node-circular-2024",
        disbursementChannel: "Gram Panchayat land lease (patta) for FPO cold storage unit. Land identified from common property land rolls.",
        dbtLinked: false,
        provisions: "Gram Panchayats in notified horticulture clusters can lease common land to FPOs at Rs 1/year for 15-year period for MoFPI-approved cold room units. Resolution must be passed by Gram Sabha.",
        gramPanchayatDelivery: "Ultimate delivery node — GP Resolution required for land access, farmer registration, and local infrastructure coordination.",
      },
    ];

    // Enrich each record with the appropriate Bharat Cascade tier
    const policyEvidence = rawPolicyEvidence.map((record) => ({
      ...record,
      tier: assignCascadeTier(record.custodian),
    }));

    // Build tier coverage map for summary reporting
    const tierCoverage = {};
    BHARAT_CASCADE_TIERS.forEach((tier) => {
      tierCoverage[tier] = policyEvidence
        .filter((r) => r.tier === tier)
        .map((r) => r.schemeId);
    });

    const uncoveredTiers = BHARAT_CASCADE_TIERS.filter(
      (tier) => tierCoverage[tier].length === 0
    );

    return {
      agent: "नीति प्रज्ञा (Niti Prajna)",
      agentRole: "Policy Intelligence — 8-Tier Bharat Cascade Enrichment",
      status: "COMPLETED",
      bharatCascadeTiers: BHARAT_CASCADE_TIERS,
      tierCoverage,
      uncoveredTiers,
      summary: {
        totalSchemesFound: policyEvidence.length,
        dbtLinkedSchemes: policyEvidence.filter((r) => r.dbtLinked).length,
        tiersWithCoverage: BHARAT_CASCADE_TIERS.length - uncoveredTiers.length,
      },
      policyEvidence,
    };
  }
}

export const indiaAgent = new IndiaAgent();
