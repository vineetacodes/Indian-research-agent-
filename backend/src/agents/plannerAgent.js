export class PlannerAgent {
  /**
   * Deconstructs inquiry into 5 specialized agent investigation directives
   * @param {string} query
   * @returns {Object} 5-Agent Execution Blueprint
   */
  async plan(query) {
    const isColdStorage = query.toLowerCase().includes('cold') || query.toLowerCase().includes('storage');
    const isHaryana = query.toLowerCase().includes('haryana');

    return {
      query,
      title: `BharatOS 5-Agent Blueprint: ${query}`,
      agentTasks: {
        literature: {
          agent: "Literature Agent",
          goal: "Find peer-reviewed academic papers & post-harvest research",
          focus: "Crop spoilage baselines (CIPHET 12-15%), phase change material (PCM) thermal storage, shelf-life extension in tomato/potato.",
          targetSources: ["ICAR-CIPHET", "Shodhganga (INFLIBNET)", "CSIR-NIScPR", "OpenAlex"]
        },
        india: {
          agent: "India Agent",
          goal: "Find Indian government policies, schemes & regulatory context",
          focus: "PM-KUSUM (75% solar subsidy in Haryana), PMKSY SAMPADA (35% cold chain grant), Bhavantar Bharpayee Yojana (BBY price floor), HERC power tariffs.",
          targetSources: ["data.gov.in", "PIB India", "MNRE", "MoFPI", "agriharyana.gov.in", "HERC"]
        },
        data: {
          agent: "Data Agent",
          goal: "Find verified numerical datasets & time-series",
          focus: "District-wise horticulture yields in Haryana (Karnal, Kurukshetra, Sonipat), NCCD cold capacity (8.2 Lakh MT), specific energy consumption (30-35 kWh/day).",
          targetSources: ["DES MoA&FW", "NCCD Census", "RBI DBIE", "MOSPI NADA"]
        },
        market: {
          agent: "Market Agent",
          goal: "Find equipment costs, unit economics & financial margins",
          focus: "10 MT Cold Room CapEx (₹12 Lakhs), 5 kW Solar PV (₹2.25 Lakhs), net farmer outlay (₹83,625/farmer in 10-farmer cluster), payback period (2.8-3.5 yrs).",
          targetSources: ["Commercial cold-chain vendors", "HERC Commercial Tariff Schedules", "NABARD AIF"]
        },
        patent: {
          agent: "Patent Agent",
          goal: "Check prior inventions & technical patents",
          focus: "Indian Patent Office (IP India) prior art on solar DC inverter cold rooms, thermal energy storage, and off-grid modular cold containers.",
          targetSources: ["IP India InPASS", "WIPO PATENTSCOPE", "Google Patents"]
        }
      }
    };
  }
}

export const plannerAgent = new PlannerAgent();
