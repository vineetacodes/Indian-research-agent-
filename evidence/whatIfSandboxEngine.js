/**
 * BharatOS Phase 12 — Deterministic Python What-If Sandbox Engine
 *
 * Enforces the strict 6-stage mathematical trace:
 * INPUT -> ASSUMPTION -> FORMULA -> CALCULATION -> RESULT -> LIMITATION
 *
 * Never allows the LLM to invent arithmetic or fabricate calculations.
 */

export class WhatIfSandboxEngine {
  /**
   * Executes deterministic sensitivity calculations
   * @param {Object} params - User perturbation inputs
   * @returns {Object} Full 6-stage mathematical trace
   */
  executeWhatIfSimulation({
    capacityMT = 10,
    utilizationPct = 70.0,
    gridTariffDeltaPct = 20.0,
    solarSubsidyPct = 75.0,
    pmksySubsidyPct = 35.0
  } = {}) {
    const baseGridTariff = 6.50; // HERC baseline
    const actualGridTariff = baseGridTariff * (1 + (gridTariffDeltaPct / 100));

    // 1. Stage 1: INPUT
    const inputStage = {
      storageCapacityMT: capacityMT,
      utilizationRatePct: utilizationPct,
      gridTariffDeltaPct,
      effectiveGridTariffINR: Number(actualGridTariff.toFixed(2)),
      solarSubsidyPct,
      pmksySubsidyPct
    };

    // 2. Stage 2: ASSUMPTION
    const assumptionStage = [
      "10 MT micro cold room baseline CapEx = ₹12,00,000 (₹1.2L / MT).",
      "5.0 kW Solar array CapEx = ₹2,25,000 (₹45 / Wp).",
      "Solar power generation = 21.0 kWh/day over 270 operating days = 5,670 kWh clean energy annually.",
      "Post-harvest spoilage loss aversion: 12.0% volume saved @ ₹25,000 / MT modal price.",
      "Off-season price realization premium = +18% on volume handled."
    ];

    // 3. Stage 3: FORMULA
    const formulaStage = {
      netCapEx: "Net_CapEx = (Cold_CapEx * (1 - PMKSY_sub)) + (Solar_CapEx * (1 - KUSUM_sub))",
      annualInflow: "Annual_Inflow = (Handled_MT * Loss_Saved * Price) + (Handled_MT * Price * 0.18) + (Solar_kWh * Tariff) - AMC",
      paybackHorizon: "Payback_Years = Net_CapEx / Annual_Inflow",
      irr: "IRR = (Annual_Inflow / Net_CapEx) * 100 - Depreciation_Discount"
    };

    // 4. Stage 4: CALCULATION (Deterministic Arithmetic)
    const coldGrossCapEx = capacityMT * 120000;
    const solarGrossCapEx = 5.0 * 45000;
    const totalGrossCapEx = coldGrossCapEx + solarGrossCapEx;

    const pmksyGrant = coldGrossCapEx * (pmksySubsidyPct / 100);
    const solarSubsidy = solarGrossCapEx * (solarSubsidyPct / 100);
    const netCapEx = totalGrossCapEx - (pmksyGrant + solarSubsidy);
    const perFarmerOutlay = netCapEx / 10;

    const annualCropMT = capacityMT * 4 * (utilizationPct / 100);
    const spoilageSavedINR = annualCropMT * 0.12 * 25000;
    const offSeasonSavedINR = annualCropMT * 25000 * 0.18;
    const solarSavedINR = (5.0 * 4.2 * 270) * actualGridTariff;
    const amcOpEx = totalGrossCapEx * 0.03;
    const netAnnualProfit = (spoilageSavedINR + offSeasonSavedINR + solarSavedINR) - amcOpEx;

    const paybackYears = netCapEx / Math.max(1000, netAnnualProfit);
    const irrPct = Math.max(6.0, (netAnnualProfit / netCapEx) * 100 - 4.0);
    const tenYearROI = ((netAnnualProfit * 10 - netCapEx) / netCapEx) * 100;

    const calculationTrace = [
      `1. Net Capital Outlay = (₹${coldGrossCapEx.toLocaleString('en-IN')} * ${(1 - pmksySubsidyPct / 100).toFixed(2)}) + (₹${solarGrossCapEx.toLocaleString('en-IN')} * ${(1 - solarSubsidyPct / 100).toFixed(2)}) = ₹${Math.round(netCapEx).toLocaleString('en-IN')} (₹${Math.round(perFarmerOutlay).toLocaleString('en-IN')} per farmer)`,
      `2. Annual Volume Handled = ${capacityMT} MT * 4 seasonal turns * ${(utilizationPct / 100).toFixed(2)} = ${annualCropMT.toFixed(1)} MT / year`,
      `3. Gross Annual Gains = Spoilage Aversion (₹${Math.round(spoilageSavedINR).toLocaleString('en-IN')}) + Off-Season Premium (₹${Math.round(offSeasonSavedINR).toLocaleString('en-IN')}) + Solar Power Saved (₹${Math.round(solarSavedINR).toLocaleString('en-IN')}) = ₹${Math.round(spoilageSavedINR + offSeasonSavedINR + solarSavedINR).toLocaleString('en-IN')}`,
      `4. Net Annual Cluster Inflow = Gross Gains - AMC Maintenance (₹${Math.round(amcOpEx).toLocaleString('en-IN')}) = ₹${Math.round(netAnnualProfit).toLocaleString('en-IN')} / year`,
      `5. Payback Horizon = ₹${Math.round(netCapEx).toLocaleString('en-IN')} / ₹${Math.round(netAnnualProfit).toLocaleString('en-IN')} = ${paybackYears.toFixed(2)} Years`
    ];

    // 5. Stage 5: RESULT
    const resultStage = {
      netFarmerCapExINR: Math.round(netCapEx),
      perFarmerOutlayINR: Math.round(perFarmerOutlay),
      netAnnualProfitINR: Math.round(netAnnualProfit),
      paybackPeriodYears: Number(paybackYears.toFixed(2)),
      irrPercentage: Number(irrPct.toFixed(1)),
      tenYearROIPercentage: Number(tenYearROI.toFixed(1)),
      feasibilityStatus: paybackYears <= 3.5 ? "Highly Economically Viable" : paybackYears <= 5.0 ? "Viable with Subsidies" : "Borderline Viability"
    };

    // 6. Stage 6: LIMITATION
    const limitationStage = [
      "Assumes no continuous grid power outage exceeding 48 hours without auxiliary solar insolation.",
      "Requires FPO farmer cluster to maintain multi-crop rotation (Potato followed by Tomato/Onion) to sustain >= 70% capacity utilization.",
      "Assumes Haryana Bhavantar Bharpayee Yojana (BBY) remains active to insure downside commodity price collapses."
    ];

    return {
      pipeline: {
        stage1_input: inputStage,
        stage2_assumption: assumptionStage,
        stage3_formula: formulaStage,
        stage4_calculation: calculationTrace,
        stage5_result: resultStage,
        stage6_limitation: limitationStage
      }
    };
  }
}

export const whatIfSandboxEngine = new WhatIfSandboxEngine();
