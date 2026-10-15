import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articlesData';
import { updateDocumentSeoMeta } from '../utils/seoDomUpdater';
import { SlidersHorizontal, ArrowUpRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface SectorSimulationModel {
  articleSlug: string;
  sectorName: string;
  mainKeyword: string;
  baseEfficiencyGain: number; // %
  baseCarbonReductionMt: number; // Million tons CO2e
  baseHumanProductivityMultiplier: number; // e.g., 1.8x
  unitLabel: string;
  questionPrompt: string;
  synthesizedAnswerTemplate: (year: number, computeMult: number, auditLevel: string) => string;
}

const SECTOR_MODELS: SectorSimulationModel[] = [
  {
    articleSlug: 'future-of-ai-in-healthcare-diagnostics',
    sectorName: '01. Clinical Genomics & Precision Medicine',
    mainKeyword: 'future of AI in healthcare',
    baseEfficiencyGain: 48,
    baseCarbonReductionMt: 18,
    baseHumanProductivityMultiplier: 2.6,
    unitLabel: 'Months saved in Phase-I biologic synthesis',
    questionPrompt:
      'How will increasing photonic compute and federated governance impact clinical diagnostics by your target year?',
    synthesizedAnswerTemplate: (year, computeMult, auditLevel) =>
      `By ${year}, deploying ${computeMult}x photonic compute acceleration under ${auditLevel} governance enables hospitals to screen cell-free DNA liquid biopsies 4.5 years prior to symptom onset while cutting custom mRNA synthesis timelines by ${Math.min(
        82,
        Math.round(42 + computeMult * 1.1 + (year - 2026) * 2.5)
      )}%.`,
  },
  {
    articleSlug: 'future-of-ai-climate-energy-grids',
    sectorName: '02. Autonomous Renewable Grids & Carbon Capture',
    mainKeyword: 'AI for climate change',
    baseEfficiencyGain: 34,
    baseCarbonReductionMt: 420,
    baseHumanProductivityMultiplier: 3.1,
    unitLabel: 'Megawatt-hour curtailment eliminated across grids',
    questionPrompt:
      'What happens to renewable energy curtailment and direct-air carbon capture costs under your simulation parameters?',
    synthesizedAnswerTemplate: (year, computeMult, auditLevel) =>
      `By ${year}, physics-informed neural grid controllers operating at ${computeMult}x energy efficiency under ${auditLevel} audit standards reduce renewable wind and solar curtailment by ${Math.min(
        96,
        Math.round(35 + computeMult * 1.4 + (year - 2026) * 3.8)
      )}% and lower direct-air carbon capture thermal energy demand by 31%.`,
  },
  {
    articleSlug: 'future-of-ai-collaborative-robotics',
    sectorName: '03. Embodied Collaborative Robotics & Craft',
    mainKeyword: 'future of AI robotics',
    baseEfficiencyGain: 52,
    baseCarbonReductionMt: 85,
    baseHumanProductivityMultiplier: 3.8,
    unitLabel: 'Reduction in musculoskeletal workplace strain',
    questionPrompt:
      'How do Vision-Language-Action cobots transform local manufacturing and worker safety in this scenario?',
    synthesizedAnswerTemplate: (year, computeMult, auditLevel) =>
      `By ${year}, force-compliant collaborative robots with ${computeMult}x onboard tactile inference and ${auditLevel} safety verification reduce industrial musculoskeletal injuries by ${Math.min(
        91,
        Math.round(54 + (year - 2026) * 3.2)
      )}% while cutting timber and composite fabrication waste by 38%.`,
  },
  {
    articleSlug: 'future-of-ai-personalized-education',
    sectorName: '04. Socratic Pedagogy & Creative Studios',
    mainKeyword: 'future of AI in education',
    baseEfficiencyGain: 61,
    baseCarbonReductionMt: 12,
    baseHumanProductivityMultiplier: 2.4,
    unitLabel: 'Increase in 12-month student concept retention',
    questionPrompt:
      'How does Socratic AI tutoring impact long-term student mastery without increasing screen fatigue?',
    synthesizedAnswerTemplate: (year, computeMult, auditLevel) =>
      `By ${year}, pairing analog studio instruments with transparent spatial displays and ${auditLevel} provenance increases 12-month STEM and humanities concept retention to ${Math.min(
        95,
        Math.round(68 + (year - 2026) * 2.4 + computeMult * 0.4)
      )}% across diverse student cohorts.`,
  },
  {
    articleSlug: 'future-of-ai-quantum-material-discovery',
    sectorName: '05. Quantum-AI Hybrid Material Discovery',
    mainKeyword: 'quantum AI computing',
    baseEfficiencyGain: 74,
    baseCarbonReductionMt: 190,
    baseHumanProductivityMultiplier: 4.5,
    unitLabel: 'Faster screening of solid-state battery electrolytes',
    questionPrompt:
      'How rapidly can hybrid quantum-neural lattices synthesize cobalt-free solid-state electrolytes?',
    synthesizedAnswerTemplate: (year, computeMult, auditLevel) =>
      `By ${year}, coupling logical qubits with ${computeMult}x graph neural accelerators under ${auditLevel} reproducibility standards expands verified inorganic crystal libraries by ${(
        1.8 +
        (year - 2026) * 0.45 +
        computeMult * 0.08
      ).toFixed(1)} million stable structures.`,
  },
];

export const FutureSimulatorPage: React.FC = () => {
  const [targetYear, setTargetYear] = useState<number>(2032);
  const [computeEfficiency, setComputeEfficiency] = useState<number>(16);
  const [governanceMode, setGovernanceMode] = useState<
    'Standard Compliance' | 'Federated Swarm Privacy' | 'Zero-Knowledge Formal Proof'
  >('Zero-Knowledge Formal Proof');
  const [selectedSectorSlug, setSelectedSectorSlug] = useState<string>(
    SECTOR_MODELS[0].articleSlug
  );

  useEffect(() => {
    updateDocumentSeoMeta({
      pageName: '2035 Future Use of AI Impact Simulator App',
      urlPath: '/future-ai-simulator',
      seoTitle: '2035 AI Impact Simulator: Forecasting App | Aethelgard',
      metaDescription:
        'Simulate the future use of AI across healthcare, climate grids, and robotics from 2026 to 2035 with our interactive multi-variable forecasting application.',
      mainKeyword: '2035 AI impact simulator',
      relatedKeywords: ['future use of AI forecasting app', 'autonomous systems ROI model'],
      monthlySearchVolume: 11200,
      keywordDifficulty: 29,
      searchIntent: 'Informational',
      isCoreStep2Target: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activeModel =
    SECTOR_MODELS.find((m) => m.articleSlug === selectedSectorSlug) || SECTOR_MODELS[0];
  const linkedArticle =
    ARTICLES_DATA.find((a) => a.slug === activeModel.articleSlug) || ARTICLES_DATA[0];

  const yearFactor = (targetYear - 2025) / 10; // 0.1 to 1.0
  const governanceBonus =
    governanceMode === 'Zero-Knowledge Formal Proof'
      ? 1.18
      : governanceMode === 'Federated Swarm Privacy'
      ? 1.1
      : 1.0;

  const calculatedEfficiency = Math.min(
    96,
    Math.round(
      activeModel.baseEfficiencyGain * (0.65 + yearFactor * 0.55) * (1 + computeEfficiency / 80)
    )
  );
  const calculatedCarbonSaved = Math.round(
    activeModel.baseCarbonReductionMt * (0.5 + yearFactor * 0.8) * governanceBonus
  );
  const calculatedMultiplier = (
    activeModel.baseHumanProductivityMultiplier *
    (0.8 + yearFactor * 0.45) *
    governanceBonus
  ).toFixed(1);
  const trustScore =
    governanceMode === 'Zero-Knowledge Formal Proof'
      ? '99.4% Mathematical Invariant'
      : governanceMode === 'Federated Swarm Privacy'
      ? '94.8% Encrypted Cohort'
      : '81.2% Benchmark Audited';

  const handleReset = () => {
    setTargetYear(2032);
    setComputeEfficiency(16);
    setGovernanceMode('Zero-Knowledge Formal Proof');
    setSelectedSectorSlug(SECTOR_MODELS[0].articleSlug);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1320px] mx-auto px-6 space-y-12">
        {/* Header */}
        <header className="border-b border-stone-300 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              Interactive Foresight Application · 2026–2035 Scenario Engine
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight text-balance">
              2035 AI Impact Simulator: Forecasting the Future Use of AI Across Ten Domains
            </h1>
            <p className="text-base text-stone-700 leading-relaxed">
              Configure target horizon year, neuromorphic hardware efficiency, and algorithmic audit
              governance below to model empirical productivity, decarbonization, and clinical outcomes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 border border-stone-300 bg-white text-stone-800 text-xs font-medium rounded-lg hover:border-stone-900 transition-colors inline-flex items-center gap-2 self-start lg:self-auto cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation Parameters</span>
          </button>
        </header>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Controls (5 columns) */}
          <div className="lg:col-span-5 border border-stone-300 bg-white p-6 sm:p-8 space-y-7">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-stone-600 border-b border-stone-200 pb-3">
              <SlidersHorizontal className="w-4 h-4 text-[#9A3412]" />
              <span>SIMULATION INPUT PARAMETERS</span>
            </div>

            {/* 1. Domain Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-stone-800">
                1. Select Future AI Application Sector
              </label>
              <div className="space-y-1.5">
                {SECTOR_MODELS.map((model) => (
                  <button
                    key={model.articleSlug}
                    type="button"
                    onClick={() => setSelectedSectorSlug(model.articleSlug)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs rounded border transition-colors cursor-pointer flex items-center justify-between ${
                      selectedSectorSlug === model.articleSlug
                        ? 'bg-stone-900 text-stone-50 border-stone-900 font-medium'
                        : 'bg-[#FBF9F5] text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <span className="truncate">{model.sectorName}</span>
                    <span className="font-mono-tabular text-[11px] opacity-75 shrink-0 ml-2">
                      {model.mainKeyword}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Horizon Year Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="horizon-year-slider" className="font-semibold text-stone-800">
                  2. Deployment Horizon Year
                </label>
                <span className="font-mono-tabular font-bold text-[#9A3412] text-sm">
                  Year {targetYear}
                </span>
              </div>
              <input
                id="horizon-year-slider"
                type="range"
                min={2026}
                max={2035}
                step={1}
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="w-full accent-[#9A3412] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-stone-500">
                <span>2026 (Current)</span>
                <span>2030 (Mid-Term)</span>
                <span>2035 (Full Maturity)</span>
              </div>
            </div>

            {/* 3. Photonic Compute Efficiency Multiplier */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="compute-efficiency-slider" className="font-semibold text-stone-800">
                  3. Photonic &amp; Neuromorphic Efficiency Gain
                </label>
                <span className="font-mono-tabular font-bold text-stone-900">
                  {computeEfficiency}x Perf / Watt
                </span>
              </div>
              <input
                id="compute-efficiency-slider"
                type="range"
                min={2}
                max={40}
                step={2}
                value={computeEfficiency}
                onChange={(e) => setComputeEfficiency(Number(e.target.value))}
                className="w-full accent-[#9A3412] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-stone-500">
                <span>2x CMOS Baseline</span>
                <span>20x Optical Hybrid</span>
                <span>40x Neuromorphic</span>
              </div>
            </div>

            {/* 4. Algorithmic Governance Architecture */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-800">
                4. Algorithmic Safety &amp; Audit Architecture
              </label>
              <div className="grid grid-cols-1 gap-2">
                {(
                  [
                    'Standard Compliance',
                    'Federated Swarm Privacy',
                    'Zero-Knowledge Formal Proof',
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setGovernanceMode(mode)}
                    className={`px-3.5 py-2 text-xs rounded border text-left transition-colors cursor-pointer flex items-center justify-between ${
                      governanceMode === mode
                        ? 'border-[#9A3412] bg-[#9A3412]/10 text-stone-900 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{mode}</span>
                    {governanceMode === mode && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9A3412]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Forecast Output & AEO Brief (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 4-Card KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="border border-stone-300 bg-white p-6">
                <span className="text-xs font-mono-tabular uppercase text-stone-500 block">
                  PROJECTED EFFICIENCY GAIN ({targetYear})
                </span>
                <span className="font-mono-tabular text-4xl font-semibold text-[#9A3412] mt-2 block">
                  +{calculatedEfficiency}%
                </span>
                <span className="text-xs text-stone-600 mt-1 block">{activeModel.unitLabel}</span>
              </div>

              <div className="border border-stone-300 bg-white p-6">
                <span className="text-xs font-mono-tabular uppercase text-stone-500 block">
                  HUMAN-AI COLLABORATION MULTIPLIER
                </span>
                <span className="font-mono-tabular text-4xl font-semibold text-stone-900 mt-2 block">
                  {calculatedMultiplier}x
                </span>
                <span className="text-xs text-stone-600 mt-1 block">
                  Researcher &amp; artisan throughput vs. 2024 baseline
                </span>
              </div>

              <div className="border border-stone-300 bg-white p-6">
                <span className="text-xs font-mono-tabular uppercase text-stone-500 block">
                  ANNUAL DECARBONIZATION IMPACT
                </span>
                <span className="font-mono-tabular text-3xl font-semibold text-emerald-900 mt-2 block">
                  -{calculatedCarbonSaved} Mt CO₂e
                </span>
                <span className="text-xs text-stone-600 mt-1 block">
                  Verified industrial &amp; grid emissions avoided globally
                </span>
              </div>

              <div className="border border-stone-300 bg-white p-6">
                <span className="text-xs font-mono-tabular uppercase text-stone-500 block">
                  VERIFIABLE GOVERNANCE RELIABILITY
                </span>
                <span className="font-mono-tabular text-xl font-semibold text-stone-900 mt-3 block">
                  {trustScore}
                </span>
                <span className="text-xs text-stone-600 mt-2 block">
                  Architecture: {governanceMode}
                </span>
              </div>
            </div>

            {/* Dynamic AEO Question & Answer Synthesis Box */}
            <div className="border border-stone-300 bg-[#F3EFE6] p-8 space-y-5">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#9A3412] font-semibold">
                LIVE AEO QUESTION &amp; ANSWER FORECAST BRIEF
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug">
                {activeModel.questionPrompt}
              </h2>

              <p className="text-base text-stone-800 leading-relaxed">
                {activeModel.synthesizedAnswerTemplate(
                  targetYear,
                  computeEfficiency,
                  governanceMode
                )}
              </p>

              <div className="pt-4 border-t border-stone-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-stone-600 font-mono-tabular">
                  Primary Monograph Keyword: <strong className="text-stone-900">{linkedArticle.mainKeyword}</strong>
                </div>

                <Link
                  to={linkedArticle.urlPath}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-[#9A3412] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Read Full {linkedArticle.mainKeyword} Monograph</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Comparative 10-Article Trajectory Table */}
            <div className="border border-stone-300 bg-white p-6 space-y-4">
              <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                How Do All 10 AI Domains Compare by {targetYear}?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-mono-tabular uppercase text-[11px]">
                      <th className="py-2.5 pr-4">Monograph Domain</th>
                      <th className="py-2.5 px-4">Target Keyword</th>
                      <th className="py-2.5 px-4 text-right">2035 Benchmark</th>
                      <th className="py-2.5 pl-4 text-right">Research Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {ARTICLES_DATA.map((art) => (
                      <tr key={art.id} className="hover:bg-stone-50">
                        <td className="py-3 pr-4 font-medium text-stone-900">
                          {art.numberIndex}. {art.category}
                        </td>
                        <td className="py-3 px-4 font-mono-tabular text-stone-700">
                          {art.mainKeyword}
                        </td>
                        <td className="py-3 px-4 font-mono-tabular text-right font-semibold text-[#9A3412]">
                          {art.forecast2035Metric.value}
                        </td>
                        <td className="py-3 pl-4 text-right">
                          <Link
                            to={art.urlPath}
                            className="text-[#9A3412] hover:underline font-medium"
                          >
                            Explore {art.mainKeyword} →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
