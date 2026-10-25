import React from 'react';
import {
  Globe2,
  Sliders,
  SlidersHorizontal,
  Info,
  Trophy,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CountryCandidate, FactorWeights } from '../App';

interface Stage1MarketMatrixProps {
  productCategory: string;
  businessProfile: string;
  stage1Weights: FactorWeights;
  setStage1Weights: (weights: FactorWeights) => void;
  applyStage1WeightPreset: (preset: 'default' | 'demand' | 'purchasing' | 'trade') => void;
  totalStage1WeightSum: number;
  showWeightEditor: boolean;
  setShowWeightEditor: (show: boolean) => void;
  showCountryEditor: boolean;
  setShowCountryEditor: (show: boolean) => void;
  countries: CountryCandidate[];
  handleCountryFactorChange: (factor: keyof FactorWeights, value: number) => void;
  selectedCountry: CountryCandidate;
  selectedCountryId: string;
  setSelectedCountryId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showAllCandidateMarkets: boolean;
  setShowAllCandidateMarkets: (show: boolean) => void;
  displayedStage1Countries: (CountryCandidate & { stage1Score: number; stage1Rank: number })[];
  rankedStage1Countries: (CountryCandidate & { stage1Score: number; stage1Rank: number })[];
  expandedExplanationId: string | null;
  setExpandedExplanationId: (id: string | null) => void;
  setActivePestelCountryId: (id: string) => void;
  setExpandedPestelDossierId: (id: string | null) => void;
  setActiveStage: (stage: 'all' | 'stage1' | 'stage2' | 'stage3' | 'bias_audit') => void;
  DEFAULT_STAGE1_WEIGHTS: FactorWeights;
}

export const Stage1MarketMatrix: React.FC<Stage1MarketMatrixProps> = ({
  productCategory,
  businessProfile,
  stage1Weights,
  setStage1Weights,
  applyStage1WeightPreset,
  totalStage1WeightSum,
  showWeightEditor,
  setShowWeightEditor,
  showCountryEditor,
  setShowCountryEditor,
  countries,
  handleCountryFactorChange,
  selectedCountry,
  selectedCountryId,
  setSelectedCountryId,
  searchQuery,
  setSearchQuery,
  showAllCandidateMarkets,
  setShowAllCandidateMarkets,
  displayedStage1Countries,
  rankedStage1Countries,
  expandedExplanationId,
  setExpandedExplanationId,
  setActivePestelCountryId,
  setExpandedPestelDossierId,
  setActiveStage,
  DEFAULT_STAGE1_WEIGHTS
}) => {
  const [showFormulaExplanation, setShowFormulaExplanation] = React.useState(false);

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-7 space-y-6 shadow-sm">
      {/* Stage Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80 tracking-wide uppercase">
              Phase 01 · Screening Matrix
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-semibold text-stone-600">
              Top 7 Automatic Shortlist
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 flex items-center gap-2">
            <Globe2 className="w-7 h-7 text-emerald-800" />
            Stage 1 — Market Screening
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Find the most attractive international markets for winter apparel.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowWeightEditor(!showWeightEditor)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
              showWeightEditor
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Adjust Criteria Weights</span>
          </button>

          <button
            onClick={() => setShowCountryEditor(!showCountryEditor)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
              showCountryEditor
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Simulate Ratings</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Screening Universe
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">7 Markets Screened</div>
          <p className="text-xs text-stone-500 mt-0.5">Cold climate and OECD economies</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Top Ranked Country
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 flex items-center gap-1.5">
            <span>{displayedStage1Countries[0]?.flag || '🇳🇴'}</span>
            <span>{displayedStage1Countries[0]?.name || 'Norway'}</span>
            <span className="text-xs font-mono font-bold text-emerald-800">
              ({displayedStage1Countries[0]?.stage1Score || '91.2'}/100)
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Rank #1 by weighted score</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Criteria Weights Sum
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 font-mono">
            {totalStage1WeightSum}% Total
          </div>
          <p className="text-xs text-stone-500 mt-0.5">7 weighted criteria combined</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Shortlist Filter
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">Top 7 Forwarded</div>
          <p className="text-xs text-stone-500 mt-0.5">Advanced to Stage 2 PESTEL</p>
        </div>
      </div>

      {/* Expandable "How is this calculated?" Section */}
      <div className="bg-[#f8f9fa] border border-stone-200 rounded-xl p-4 text-xs space-y-2">
        <button
          onClick={() => setShowFormulaExplanation(!showFormulaExplanation)}
          className="w-full flex items-center justify-between text-left font-bold text-stone-800 hover:text-emerald-900 transition"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-800" />
            <span className="text-sm">How is this calculated? (Weighted Scoring Formula)</span>
          </div>
          <span className="text-xs font-semibold text-emerald-800">
            {showFormulaExplanation ? 'Hide Details' : 'View Formula Details'}
          </span>
        </button>

        {showFormulaExplanation && (
          <div className="pt-2 border-t border-stone-200/80 space-y-2 text-stone-600 leading-relaxed">
            <p>
              Each country is evaluated on a 0–100 scale across 7 commercial criteria. The <strong>Weighted Score</strong> is calculated as:
            </p>
            <div className="p-2.5 rounded bg-white border border-stone-200 font-mono text-stone-900 font-semibold text-[11px]">
              Weighted Score = ∑ (Factor Rating × Factor Weight) / ∑ (All Weights)
            </div>
            <p>
              For example, <em>Market Demand</em> carries 25% importance, <em>Purchasing Power</em> carries 20%, <em>Competition</em> carries 15%, <em>Import Regulations</em> carries 15%, <em>Logistics</em> carries 10%, <em>Trade Barriers</em> carries 10%, and <em>Business Potential</em> carries 5%.
            </p>
          </div>
        )}
      </div>

      {/* Factor Weights Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Market Demand</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.marketDemand}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Purchasing Power</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.purchasingPower}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Competition</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.competition}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Import Regs</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.importRegulations}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Logistics</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.logistics}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Trade Barriers</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.tradeBarriers}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
        <div className="bg-[#fafaf8] p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-[10px] uppercase font-bold text-stone-500">Potential</div>
          <div className="text-base font-bold text-stone-900 font-mono mt-0.5">{stage1Weights.businessPotential}%</div>
          <div className="text-[10px] text-stone-500">Weight</div>
        </div>
      </div>

      {/* Interactive Weight Editor Drawer */}
      {showWeightEditor && (
        <div className="bg-[#fafaf8] border border-stone-300 rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-800" />
                Dynamic Weight Sensitivity Sliders (Stage 1)
              </h4>
              <p className="text-xs text-stone-600">
                Adjust criteria weight distributions. Rankings recalculate dynamically in real time.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-stone-500">Presets:</span>
              <button
                onClick={() => applyStage1WeightPreset('default')}
                className="text-[11px] px-2 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition font-medium"
              >
                Default Baseline
              </button>
              <button
                onClick={() => applyStage1WeightPreset('demand')}
                className="text-[11px] px-2 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition font-medium"
              >
                Demand Heavy
              </button>
              <button
                onClick={() => applyStage1WeightPreset('purchasing')}
                className="text-[11px] px-2 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition font-medium"
              >
                Purchasing Power
              </button>
              <button
                onClick={() => applyStage1WeightPreset('trade')}
                className="text-[11px] px-2 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition font-medium"
              >
                Trade & FTA
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Market Demand:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.marketDemand}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={stage1Weights.marketDemand}
                onChange={(e) => setStage1Weights({ ...stage1Weights, marketDemand: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Purchasing Power:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.purchasingPower}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={stage1Weights.purchasingPower}
                onChange={(e) => setStage1Weights({ ...stage1Weights, purchasingPower: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Competition:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.competition}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={stage1Weights.competition}
                onChange={(e) => setStage1Weights({ ...stage1Weights, competition: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Import Regulations:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.importRegulations}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={stage1Weights.importRegulations}
                onChange={(e) => setStage1Weights({ ...stage1Weights, importRegulations: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Logistics:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.logistics}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={stage1Weights.logistics}
                onChange={(e) => setStage1Weights({ ...stage1Weights, logistics: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Trade Barriers:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.tradeBarriers}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={stage1Weights.tradeBarriers}
                onChange={(e) => setStage1Weights({ ...stage1Weights, tradeBarriers: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Business Potential:</span>
                <span className="font-bold text-emerald-900 font-mono">{stage1Weights.businessPotential}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={stage1Weights.businessPotential}
                onChange={(e) => setStage1Weights({ ...stage1Weights, businessPotential: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-white border border-stone-200">
              <div>
                <div className="text-[11px] text-stone-500 font-medium">Total Weight:</div>
                <div className={`font-bold font-mono ${totalStage1WeightSum === 100 ? 'text-emerald-900' : 'text-amber-700'}`}>
                  {totalStage1WeightSum}% {totalStage1WeightSum === 100 ? '(Normalized)' : '(Scaled)'}
                </div>
              </div>
              <button
                onClick={() => setStage1Weights(DEFAULT_STAGE1_WEIGHTS)}
                className="text-[11px] px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Country Factor Rating Tuner */}
      {showCountryEditor && (
        <div className="bg-[#fafaf8] border border-stone-300 rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                Individual Country Factor Simulation Console (Stage 1)
              </h4>
              <p className="text-xs text-stone-600">
                Adjust country ratings to test market sensitivity and observe rank transitions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">Country:</span>
              <select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                className="bg-white border border-stone-300 text-stone-900 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Market Demand:</span>
                <span className="font-bold text-emerald-900 font-mono">{selectedCountry.marketDemand} / 100</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={selectedCountry.marketDemand}
                onChange={(e) => handleCountryFactorChange('marketDemand', parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-800"
              />
              <div className="text-[10px] text-stone-500 mt-1">Severity of cold season & climate demand</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Purchasing Power:</span>
                <span className="font-bold text-emerald-900 font-mono">{selectedCountry.purchasingPower} / 100</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={selectedCountry.purchasingPower}
                onChange={(e) => handleCountryFactorChange('purchasingPower', parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-800"
              />
              <div className="text-[10px] text-stone-500 mt-1">Disposable income for premium apparel</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Competition (Openness):</span>
                <span className="font-bold text-emerald-900 font-mono">{selectedCountry.competition} / 100</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={selectedCountry.competition}
                onChange={(e) => handleCountryFactorChange('competition', parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-800"
              />
              <div className="text-[10px] text-stone-500 mt-1">Market openness vs domestic brand dominance</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex justify-between mb-1 text-stone-800 font-medium">
                <span>Import Regulations:</span>
                <span className="font-bold text-emerald-900 font-mono">{selectedCountry.importRegulations} / 100</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={selectedCountry.importRegulations}
                onChange={(e) => handleCountryFactorChange('importRegulations', parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-800"
              />
              <div className="text-[10px] text-stone-500 mt-1">Clarity of customs, standards & labeling</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 7 Ranked Markets Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-600" />
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Market Screening Matrix (Ranked 1–10)
          </h4>
          <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium border border-stone-200">
            {showAllCandidateMarkets ? `Showing All ${rankedStage1Countries.length}` : 'Showing Shortlisted Top 7'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or region..."
              className="bg-white border border-stone-300 text-xs rounded-md pl-8 pr-3 py-1.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 w-44 sm:w-56 font-medium shadow-inner"
            />
          </div>

          <button
            onClick={() => setShowAllCandidateMarkets(!showAllCandidateMarkets)}
            className="text-xs px-3 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 whitespace-nowrap transition font-medium"
          >
            {showAllCandidateMarkets ? 'Restrict to Shortlisted Top 7' : 'View Full Longlist (10)'}
          </button>
        </div>
      </div>

      {/* Corporate Data Table */}
      <div className="overflow-x-auto border border-stone-200 rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8f9fa] text-stone-700 border-b border-stone-200 font-semibold tracking-wider text-[11px] uppercase">
            <tr>
              <th className="py-3 px-3 text-center w-12">Rank</th>
              <th className="py-3 px-4 min-w-[170px]">Candidate Market</th>
              <th className="py-3 px-3 text-center">Demand (25%)</th>
              <th className="py-3 px-3 text-center">Purchasing (20%)</th>
              <th className="py-3 px-3 text-center">Competition (15%)</th>
              <th className="py-3 px-3 text-center">Regs (15%)</th>
              <th className="py-3 px-3 text-center">Logistics (10%)</th>
              <th className="py-3 px-3 text-center">Trade (10%)</th>
              <th className="py-3 px-3 text-center">Potential (5%)</th>
              <th className="py-3 px-4 text-center font-bold text-stone-900 bg-stone-100/90 min-w-[110px]">
                Stage 1 Score
              </th>
              <th className="py-3 px-4 min-w-[190px]">Screening Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {displayedStage1Countries.map((c) => {
              const isExpanded = expandedExplanationId === c.id;
              const isShortlisted = c.stage1Rank <= 7;

              return (
                <React.Fragment key={c.id}>
                  <tr
                    className={`hover:bg-stone-50 transition ${
                      c.stage1Rank === 1
                        ? 'bg-amber-50/40'
                        : c.stage1Rank === 2
                        ? 'bg-stone-50/60'
                        : c.stage1Rank === 3
                        ? 'bg-emerald-50/30'
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-bold ${
                          c.stage1Rank === 1
                            ? 'bg-amber-500 text-white font-extrabold shadow-sm'
                            : c.stage1Rank === 2
                            ? 'bg-stone-600 text-white'
                            : c.stage1Rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {c.stage1Rank}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0" role="img" aria-label={c.name}>
                          {c.flag}
                        </span>
                        <div>
                          <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-stone-500">{c.region}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.marketDemand}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.purchasingPower}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.competition}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.importRegulations}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.logistics}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.tradeBarriers}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                      {c.businessPotential}
                    </td>

                    <td className="py-3.5 px-4 text-center bg-stone-50 border-x border-stone-200">
                      <div className="text-base font-bold text-stone-900 font-mono tracking-tight">
                        {c.stage1Score.toFixed(1)}
                        <span className="text-[10px] font-normal text-stone-500">/100</span>
                      </div>
                      <div className="w-16 h-1.5 bg-stone-200 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-800"
                          style={{ width: `${Math.min(100, c.stage1Score)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-between gap-2">
                        {isShortlisted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                            Shortlisted for Stage 2
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-500 border border-stone-200">
                            Screening Cut-off
                          </span>
                        )}

                        <button
                          onClick={() => setExpandedExplanationId(isExpanded ? null : c.id)}
                          className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-100 transition"
                          title="Expand market rationale"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Market Rationale Row */}
                  {isExpanded && (
                    <tr className="bg-[#fafaf8] border-b border-stone-200">
                      <td colSpan={11} className="p-4 sm:p-5">
                        <div className="space-y-3 text-xs text-stone-700 max-w-4xl">
                          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                            <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                              {c.flag} {c.name} · Market Rationale & Screening Summary
                            </span>
                            {isShortlisted && (
                              <button
                                onClick={() => {
                                  setActivePestelCountryId(c.id);
                                  setExpandedPestelDossierId(c.id);
                                  setActiveStage('stage2');
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded transition"
                              >
                                View Stage 2 PESTEL Dossier <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <p className="leading-relaxed text-stone-600">{c.suitabilityExplanation || c.winterClimateNote}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                            <div className="p-2 rounded bg-white border border-stone-200">
                              <span className="font-semibold text-stone-900">Cold Climate Demand:</span>{' '}
                              <span className="text-stone-600">{c.marketDemand}/100</span>
                            </div>
                            <div className="p-2 rounded bg-white border border-stone-200">
                              <span className="font-semibold text-stone-900">Purchasing Power:</span>{' '}
                              <span className="text-stone-600">{c.purchasingPower}/100</span>
                            </div>
                            <div className="p-2 rounded bg-white border border-stone-200">
                              <span className="font-semibold text-stone-900">Trade Barriers Index:</span>{' '}
                              <span className="text-stone-600">{c.tradeBarriers}/100</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stage 1 Bottom Action Button to Continue */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-500">
          Showing 7 candidate countries ranked by weighted criteria score. Top 3 advance to final entry strategy.
        </div>
        <button
          onClick={() => {
            setActiveStage('stage2');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto h-12 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
        >
          <span>Proceed to Stage 2: Country Risk Assessment</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </section>
  );
};
