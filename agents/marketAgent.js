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
 * Agent: विपणन प्रज्ञा (Vipanan Prajna) — Market Intelligence Agent
 * Role : Computes FPO cluster unit economics including gross CapEx, subsidy
 *        netting (PMKSY 35% + PM-KUSUM 75%), CapEx amortization across the
 *        asset life, and full IRR/payback projections for Haryana cold-chain
 *        infrastructure at the farmgate FPO level.
 */

// ---------------------------------------------------------------------------
// Subsidy constants — Indian government schemes for cold-chain & solar
// ---------------------------------------------------------------------------
const PMKSY_COLD_CHAIN_GRANT_PCT  = 35;   // MoFPI PMKSY capital grant rate (%)
const PM_KUSUM_SOLAR_SUBSIDY_PCT  = 75;   // PM-KUSUM Component-C composite subsidy (%)
const ASSET_LIFE_YEARS            = 10;   // Standard cold room & solar PV asset life
const CLUSTER_FARMER_COUNT        = 10;   // FPO cluster size for per-farmer share

/**
 * Computes straight-line amortization schedule for a capital asset.
 *
 * @param {number} netCapEx_INR  - Net capital expenditure after subsidy netting (INR)
 * @param {number} lifespanYears - Asset lifespan in years
 * @returns {{ annualDepreciation_INR: number, schedule: Object[] }}
 */
function computeAmortization(netCapEx_INR, lifespanYears) {
  const annualDepreciation_INR = netCapEx_INR / lifespanYears;
  const schedule = [];
  for (let yr = 1; yr <= lifespanYears; yr++) {
    schedule.push({
      year              : yr,
      depreciation_INR  : parseFloat(annualDepreciation_INR.toFixed(2)),
      bookValue_INR     : parseFloat((netCapEx_INR - annualDepreciation_INR * yr).toFixed(2)),
    });
  }
  return { annualDepreciation_INR: parseFloat(annualDepreciation_INR.toFixed(2)), schedule };
}

/**
 * Nets out eligible government subsidies from a gross CapEx breakdown.
 * Applies PMKSY grant to cold room cost and PM-KUSUM subsidy to solar PV cost.
 *
 * @param {Object} capExBreakdown - Object with itemised CapEx amounts in INR
 * @returns {Object} Subsidy amounts, net CapEx, and per-farmer share
 */
function netSubsidies(capExBreakdown) {
  const pmksyGrant_INR = Math.round(
    capExBreakdown.microColdRoom10MT_INR * (PMKSY_COLD_CHAIN_GRANT_PCT / 100)
  );
  const pmKusumSubsidy_INR = Math.round(
    capExBreakdown.solarPV5kW_INR * (PM_KUSUM_SOLAR_SUBSIDY_PCT / 100)
  );
  const totalSubsidies_INR   = pmksyGrant_INR + pmKusumSubsidy_INR;
  const totalGrossCapEx_INR  = Object.values(capExBreakdown).reduce((a, b) => a + b, 0);
  const netCapitalRequired_INR = totalGrossCapEx_INR - totalSubsidies_INR;
  const perFarmerShare_INR     = Math.round(netCapitalRequired_INR / CLUSTER_FARMER_COUNT);

  return {
    pmksyGrant_INR,
    pmKusumSubsidy_INR,
    totalSubsidies_INR,
    totalGrossCapEx_INR,
    netCapitalRequired_INR,
    perFarmerShareInCluster_INR: perFarmerShare_INR,
    subsidyNetingPct: parseFloat(((totalSubsidies_INR / totalGrossCapEx_INR) * 100).toFixed(1)),
  };
}

/**
 * Computes simple payback period and 10-year net ROI for an FPO cold unit.
 *
 * @param {number} netCapEx_INR          - Net capital after subsidies (INR)
 * @param {number} annualNetCashFlow_INR  - Annual net cash flow (INR)
 * @param {number} lifespanYears          - Asset life for ROI calculation
 * @returns {{ paybackYears: number, netROI_Pct: number }}
 */
function computeFPOUnitEconomics(netCapEx_INR, annualNetCashFlow_INR, lifespanYears) {
  const paybackYears = parseFloat((netCapEx_INR / annualNetCashFlow_INR).toFixed(2));
  const totalReturn  = annualNetCashFlow_INR * lifespanYears;
  const netROI_Pct   = parseFloat((((totalReturn - netCapEx_INR) / netCapEx_INR) * 100).toFixed(1));
  return { paybackYears, netROI_Pct };
}

export class MarketAgent {
  /**
   * विपणन प्रज्ञा — Finds equipment costs, commercial pricing, financial
   * margins, and economic variables for FPO-scale cold-chain infrastructure
   * in Haryana. Computes subsidy netting, CapEx amortization, and full
   * FPO cluster unit economics.
   *
   * Subsidy netting: PMKSY 35% (cold room) + PM-KUSUM 75% (solar PV)
   * Amortization   : Straight-line over 10-year asset life
   * FPO cluster    : 10-farmer cooperative unit
   *
   * @param {Object} task - Investigation task directive from PlannerAgent
   * @returns {Object} Commercial costs and FPO unit economics with amortization
   */
  async investigate(task) {
    // Itemised gross CapEx components (INR)
    const capExBreakdown = {
      microColdRoom10MT_INR   : 1200000,   // Rs 12.00 Lakhs — insulated cold room + compressor
      solarPV5kW_INR          : 225000,    // Rs 2.25 Lakhs  — solar PV panels + mounting
      inverterBatteryPCM_INR  : 110000,    // Rs 1.10 Lakhs  — inverter, PCM eutectic plates
    };

    // Apply subsidy netting — PMKSY 35% + PM-KUSUM 75%
    const subsidyResult = netSubsidies(capExBreakdown);

    // Revenue and cost drivers (INR/year)
    const revenueDrivers = {
      annualLossPreventedValue_INR     : 120000,  // Rs 1.20 Lakhs — 12-15% spoilage eliminated
      offSeasonPriceArbitrage_INR      : 180000,  // Rs 1.80 Lakhs — seasonal price arbitrage
      annualSolarElectricitySaved_INR  : 36855,   // Rs 36,855     — 60% solar fraction x Rs 6.50/kWh
      annualOperatingMaintenance_INR   : 42750,   // Rs 42,750     — annual O&M (3% of gross CapEx)
    };

    const annualNetCashFlow_INR =
      revenueDrivers.annualLossPreventedValue_INR +
      revenueDrivers.offSeasonPriceArbitrage_INR  +
      revenueDrivers.annualSolarElectricitySaved_INR -
      revenueDrivers.annualOperatingMaintenance_INR;

    // CapEx amortization — straight-line over ASSET_LIFE_YEARS
    const amortization = computeAmortization(
      subsidyResult.netCapitalRequired_INR,
      ASSET_LIFE_YEARS
    );

    // FPO unit economics — payback period and 10-year ROI
    const unitEconomics = computeFPOUnitEconomics(
      subsidyResult.netCapitalRequired_INR,
      annualNetCashFlow_INR,
      ASSET_LIFE_YEARS
    );

    return {
      agent: "विपणन प्रज्ञा (Vipanan Prajna)",
      agentRole: "Market Intelligence — FPO Cluster Unit Economics",
      status: "COMPLETED",
      subsidyConfig: {
        pmksyColdChainGrantPct  : PMKSY_COLD_CHAIN_GRANT_PCT,
        pmKusumSolarSubsidyPct  : PM_KUSUM_SOLAR_SUBSIDY_PCT,
        assetLifeYears          : ASSET_LIFE_YEARS,
        clusterFarmerCount      : CLUSTER_FARMER_COUNT,
      },
      economicData: {
        equipmentCosts: {
          ...capExBreakdown,
          totalGrossCapEx_INR: subsidyResult.totalGrossCapEx_INR,  // Rs 15.35 Lakhs gross
        },
        subsidiesApplicable: {
          pmksyGrant35Pct_INR          : subsidyResult.pmksyGrant_INR,             // Rs 4.20 Lakhs
          pmKusumSolarSubsidy75Pct_INR : subsidyResult.pmKusumSubsidy_INR,         // Rs 1.68 Lakhs
          totalSubsidies_INR           : subsidyResult.totalSubsidies_INR,         // Rs 5.88 Lakhs
          subsidyNetingPct             : subsidyResult.subsidyNetingPct,            // 38.3%
          netCapitalRequired_INR       : subsidyResult.netCapitalRequired_INR,     // Rs 9.46 Lakhs
          perFarmerShareIn10Cluster_INR: subsidyResult.perFarmerShareInCluster_INR,// Rs 94,625
        },
        revenueDrivers,
        netAnnualCashFlow_INR      : annualNetCashFlow_INR,           // Rs 2.94 Lakhs/yr
        amortization               : {
          annualDepreciation_INR   : amortization.annualDepreciation_INR,
          fullSchedule             : amortization.schedule,
        },
        capitalPaybackPeriodYears  : unitEconomics.paybackYears,       // ~3.2 years
        tenYearNetROI_Pct          : unitEconomics.netROI_Pct,         // ~210%
      },
    };
  }
}

export const marketAgent = new MarketAgent();
