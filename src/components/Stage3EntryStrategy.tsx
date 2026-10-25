import React from 'react';
import {
  Layers,
  Calculator,
  Sliders,
  Trophy,
  Award,
  MapPin,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { EntryModeCriteriaWeights, EntryModeId } from '../data/entryModesData';

interface Stage3EntryStrategyProps {
  productCategory: string;
  businessProfile: string;
  evaluatedEntryModesByTop3Countries: any[];
  currentStage3CountryEvaluation: any;
  activeEntryModeCountryId: string;
  setActiveEntryModeCountryId: (id: string) => void;
  activeEntryModeDetailId: EntryModeId;
  setActiveEntryModeDetailId: (id: EntryModeId) => void;
  entryModeWeights: EntryModeCriteriaWeights;
  setEntryModeWeights: React.Dispatch<React.SetStateAction<EntryModeCriteriaWeights>>;
  totalEntryModeWeightSum: number;
  showEntryModeWeightEditor: boolean;
  setShowEntryModeWeightEditor: (show: boolean) => void;
  applyEntryModeWeightPreset: (preset: 'equal' | 'capital' | 'control' | 'speed' | 'risk') => void;
  finalStrategicRecommendation: any;
  handleEntryModeScoreChange: (countryId: string, modeId: EntryModeId, criterion: any, value: number) => void;
  setActiveStage?: (stage: any) => void;
}

export const Stage3EntryStrategy: React.FC<Stage3EntryStrategyProps> = ({
  productCategory,
  businessProfile,
  evaluatedEntryModesByTop3Countries,
  currentStage3CountryEvaluation,
  activeEntryModeCountryId,
  setActiveEntryModeCountryId,
  activeEntryModeDetailId,
  setActiveEntryModeDetailId,
  entryModeWeights,
  setEntryModeWeights,
  totalEntryModeWeightSum,
  showEntryModeWeightEditor,
  setShowEntryModeWeightEditor,
  applyEntryModeWeightPreset,
  finalStrategicRecommendation,
  handleEntryModeScoreChange,
  setActiveStage
}) => {
  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-7 space-y-7 shadow-sm">
      {/* Stage Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80 tracking-wide uppercase">
              Phase 03 · Strategy & Governance
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-semibold text-stone-600">
              6 Modes × 5 Criteria Evaluation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-7 h-7 text-emerald-800" />
            Stage 3 — Choose Your Entry Strategy
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Compare the available entry modes and identify the most suitable approach.
          </p>
        </div>

        <button
          onClick={() => setShowEntryModeWeightEditor(!showEntryModeWeightEditor)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
            showEntryModeWeightEditor
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Customize Criteria Weights</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Target Market
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 flex items-center gap-1.5">
            <span>{finalStrategicRecommendation?.bestCountry?.flag || '🇳🇴'}</span>
            <span>{finalStrategicRecommendation?.bestCountry?.name || 'Norway'}</span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Rank #1 by composite score</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Recommended Mode
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 truncate" title={finalStrategicRecommendation?.winningMode?.name || 'Direct Exporting'}>
            {finalStrategicRecommendation?.winningMode?.name || 'Direct Exporting'}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Feasibility: {finalStrategicRecommendation?.winningMode?.weightedScore || '84.5'}/100</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Governance Modes
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 font-mono">
            6 Pathways
          </div>
          <p className="text-xs text-stone-500 mt-0.5">5 evaluation criteria each</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Decision Confidence
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">
            89% (High)
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Multi-stage convergence</p>
        </div>
      </div>

      {/* Target Country Selector (Top 3 Shortlist derived from Stage 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-700">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-stone-800">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            Select Target Market for Entry Mode Calibration (Top 3 from Stage 2):
          </div>
          <div className="text-[11px] text-stone-500">
            Dynamically derived from Stage 2 Composite Rankings
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {evaluatedEntryModesByTop3Countries.map(({ country, winningMode }, idx) => {
            const isSelected = currentStage3CountryEvaluation?.country.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => {
                  setActiveEntryModeCountryId(country.id);
                  setActiveEntryModeDetailId(winningMode.id);
                }}
                className={`p-4 rounded-xl text-left border transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                    : 'bg-[#fafaf8] border-stone-200 hover:border-stone-300 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-1.5">
                        {country.name}
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {country.code}
                        </span>
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                        {country.region}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isSelected
                          ? 'bg-amber-400 text-emerald-950 border-amber-300 font-extrabold'
                          : idx === 0
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-stone-200 text-stone-700 border-stone-300'
                      }`}
                    >
                      RANK #{idx + 1}
                    </span>
                    <span className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-amber-200' : 'text-stone-600'}`}>
                      Composite: {country.compositeScore}
                    </span>
                  </div>
                </div>

                <div className={`pt-2 border-t text-xs flex items-center justify-between ${
                  isSelected ? 'border-emerald-800 text-emerald-100' : 'border-stone-200 text-stone-600'
                }`}>
                  <span>Recommended Mode:</span>
                  <span className={`font-semibold flex items-center gap-1 ${
                    isSelected ? 'text-amber-300' : 'text-emerald-900'
                  }`}>
                    <Trophy className="w-3 h-3 text-amber-500" />
                    {winningMode.name} ({winningMode.weightedScore})
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Criteria Weight Customizer & Formula Banner */}
      <div className="bg-[#f8f9fa] border border-stone-200 rounded-lg p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-800" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Transparent Decision Model & Criteria Weights
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Criteria Sum:</span>
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-300 text-stone-900 tabular-nums">
              {totalEntryModeWeightSum}%
            </span>
          </div>
        </div>

        {/* Mathematical Formula Display */}
        <div className="bg-white rounded p-3 border border-stone-200 font-mono text-xs text-stone-800 overflow-x-auto">
          <div className="whitespace-nowrap">
            <span className="font-bold text-emerald-900">Entry Mode Score</span> = [
            <span> Investment & Capital × {entryModeWeights.investmentCost}%</span> +
            <span> Risk Mitigation × {entryModeWeights.riskLevel}%</span> +
            <span> Control Level × {entryModeWeights.controlLevel}%</span> +
            <span> Market Access × {entryModeWeights.marketKnowledge}%</span> +
            <span> Exporter Fit × {entryModeWeights.exporterSuitability}%</span>
            ] ÷ {totalEntryModeWeightSum}%
          </div>
        </div>

        {/* Criteria Weights Editor Drawer */}
        {showEntryModeWeightEditor && (
          <div className="pt-3 border-t border-stone-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-stone-600 font-medium">Preset Allocation Scenarios:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => applyEntryModeWeightPreset('equal')}
                  className="text-xs px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition font-medium"
                >
                  Equal (20% each)
                </button>
                <button
                  onClick={() => applyEntryModeWeightPreset('capital')}
                  className="text-xs px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition font-medium"
                >
                  Capital Preservation
                </button>
                <button
                  onClick={() => applyEntryModeWeightPreset('control')}
                  className="text-xs px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition font-medium"
                >
                  Control & Quality
                </button>
                <button
                  onClick={() => applyEntryModeWeightPreset('speed')}
                  className="text-xs px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition font-medium"
                >
                  Rapid Access
                </button>
                <button
                  onClick={() => applyEntryModeWeightPreset('risk')}
                  className="text-xs px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition font-medium"
                >
                  Risk Minimization
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
              <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs text-stone-800 font-medium">
                  <span>1. Investment Cost</span>
                  <span className="font-bold font-mono text-emerald-900">{entryModeWeights.investmentCost}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={entryModeWeights.investmentCost}
                  onChange={(e) =>
                    setEntryModeWeights((prev) => ({ ...prev, investmentCost: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full accent-emerald-800"
                />
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs text-stone-800 font-medium">
                  <span>2. Risk Exposure</span>
                  <span className="font-bold font-mono text-emerald-900">{entryModeWeights.riskLevel}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={entryModeWeights.riskLevel}
                  onChange={(e) =>
                    setEntryModeWeights((prev) => ({ ...prev, riskLevel: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full accent-emerald-800"
                />
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs text-stone-800 font-medium">
                  <span>3. Operational Control</span>
                  <span className="font-bold font-mono text-emerald-900">{entryModeWeights.controlLevel}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={entryModeWeights.controlLevel}
                  onChange={(e) =>
                    setEntryModeWeights((prev) => ({ ...prev, controlLevel: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full accent-emerald-800"
                />
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs text-stone-800 font-medium">
                  <span>4. Market Access</span>
                  <span className="font-bold font-mono text-emerald-900">{entryModeWeights.marketKnowledge}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={entryModeWeights.marketKnowledge}
                  onChange={(e) =>
                    setEntryModeWeights((prev) => ({ ...prev, marketKnowledge: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full accent-emerald-800"
                />
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                <div className="flex justify-between text-xs text-stone-800 font-medium">
                  <span>5. Exporter Fit</span>
                  <span className="font-bold font-mono text-emerald-900">{entryModeWeights.exporterSuitability}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={entryModeWeights.exporterSuitability}
                  onChange={(e) =>
                    setEntryModeWeights((prev) => ({ ...prev, exporterSuitability: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full accent-emerald-800"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6 Entry Modes Comparative Evaluation Table */}
      {currentStage3CountryEvaluation && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Entry Mode Ranking Matrix: {currentStage3CountryEvaluation.country.flag} {currentStage3CountryEvaluation.country.name}
            </h4>
            <span className="text-xs text-stone-500">Click any row to inspect implementation dossier</span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fa] text-stone-700 border-b border-stone-200 font-semibold tracking-wider text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-3.5">Rank</th>
                  <th className="py-3 px-3.5">Entry Mode</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-center">Investment ({entryModeWeights.investmentCost}%)</th>
                  <th className="py-3 px-3 text-center">Risk ({entryModeWeights.riskLevel}%)</th>
                  <th className="py-3 px-3 text-center">Control ({entryModeWeights.controlLevel}%)</th>
                  <th className="py-3 px-3 text-center">Market Access ({entryModeWeights.marketKnowledge}%)</th>
                  <th className="py-3 px-3 text-center">Exporter Fit ({entryModeWeights.exporterSuitability}%)</th>
                  <th className="py-3 px-3.5 text-right font-bold text-stone-900 bg-stone-100/80">Weighted Score</th>
                  <th className="py-3 px-3.5">Strategic Verdict</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {currentStage3CountryEvaluation.rankedModes.map((mode: any, index: number) => {
                  const isWinner = index === 0;
                  const isExpanded = activeEntryModeDetailId === mode.id;

                  let verdictBadge = (
                    <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-stone-100 text-stone-700 border border-stone-300">
                      Viable Option
                    </span>
                  );
                  if (isWinner) {
                    verdictBadge = (
                      <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 w-max">
                        <Trophy className="w-3 h-3 text-amber-600" />
                        Recommended #1
                      </span>
                    );
                  } else if (mode.weightedScore < 60) {
                    verdictBadge = (
                      <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-rose-50 text-rose-800 border border-rose-200">
                        Strategic Mismatch
                      </span>
                    );
                  } else if (mode.weightedScore < 68) {
                    verdictBadge = (
                      <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-amber-50 text-amber-800 border border-amber-200">
                        Sub-optimal
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={mode.id}
                      className={`transition cursor-pointer ${
                        isWinner ? 'bg-emerald-50/40 font-medium' : 'hover:bg-stone-50'
                      } ${isExpanded ? 'ring-2 ring-emerald-800 bg-emerald-50/30' : ''}`}
                      onClick={() => setActiveEntryModeDetailId(mode.id)}
                    >
                      <td className="py-3 px-3.5">
                        <span
                          className={`w-6 h-6 rounded inline-flex items-center justify-center text-xs font-mono font-bold ${
                            isWinner
                              ? 'bg-emerald-900 text-white font-extrabold shadow-sm'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {mode.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-stone-900">
                        <div className="flex items-center gap-1.5">
                          <span>{mode.name}</span>
                          {isWinner && (
                            <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                              TOP CHOICE
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 font-normal line-clamp-1">
                          {mode.shortDescription}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 font-medium">
                          {mode.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-800">
                        {mode.scores.investmentCost}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-800">
                        {mode.scores.riskLevel}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-800">
                        {mode.scores.controlLevel}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-800">
                        {mode.scores.marketKnowledge}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-800">
                        {mode.scores.exporterSuitability}
                      </td>
                      <td className="py-3 px-3.5 text-right font-bold text-stone-900 bg-stone-50">
                        <div className="font-mono text-sm">{mode.weightedScore}</div>
                        <div className="w-16 ml-auto bg-stone-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                          <div
                            className="h-full rounded-full bg-emerald-800"
                            style={{ width: `${mode.weightedScore}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3.5">{verdictBadge}</td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEntryModeDetailId(mode.id);
                          }}
                          className="text-xs text-emerald-900 hover:text-emerald-700 font-semibold underline"
                        >
                          {isExpanded ? 'Viewing' : 'Inspect'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Entry Mode Strategic Dossier Card */}
          {(() => {
            const activeMode =
              currentStage3CountryEvaluation.rankedModes.find((m: any) => m.id === activeEntryModeDetailId) ||
              currentStage3CountryEvaluation.winningMode;

            return (
              <div className="bg-[#fafaf8] border border-stone-200 rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                      #{activeMode.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-base font-bold text-stone-900">{activeMode.name}</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-medium">
                          {activeMode.category}
                        </span>
                        {activeMode.rank === 1 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                            RECOMMENDED MODE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500">
                        Country Context: <strong>{currentStage3CountryEvaluation.country.flag} {currentStage3CountryEvaluation.country.name}</strong> · Weighted Feasibility: <strong className="text-stone-900 font-mono">{activeMode.weightedScore}/100</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-700">Switch Mode:</span>
                    <select
                      value={activeMode.id}
                      onChange={(e) => setActiveEntryModeDetailId(e.target.value as EntryModeId)}
                      className="bg-white border border-stone-300 text-stone-900 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                    >
                      {currentStage3CountryEvaluation.rankedModes.map((m: any) => (
                        <option key={m.id} value={m.id}>
                          #{m.rank} {m.name} ({m.weightedScore}/100)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Executive Strategic Rationale:
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {activeMode.countrySpecificRationale || activeMode.shortDescription || activeMode.description || 'Optimized operational model for this market context.'}
                  </p>
                </div>

                {/* Advantages and Trade-offs Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-white p-3.5 rounded border border-emerald-200 space-y-2">
                    <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Key Strategic Advantages:
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {(Array.isArray(activeMode.pros)
                        ? activeMode.pros
                        : [activeMode.keyAdvantage || 'High operational control and margin retention for established manufacturing exporter.']
                      ).map((pro: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-3.5 rounded border border-amber-200 space-y-2">
                    <div className="text-xs font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      Operational Trade-offs & Risks:
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {(Array.isArray(activeMode.cons)
                        ? activeMode.cons
                        : [activeMode.primaryRisk || 'Requires robust cross-border logistical coordination and rigorous quality certification.']
                      ).map((con: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {activeMode.whyAlternativesScoredLower && (
                  <div className="bg-stone-50 p-3 rounded border border-stone-200 text-xs text-stone-600">
                    <strong className="text-stone-800">Why Alternatives Scored Lower:</strong>{' '}
                    {activeMode.whyAlternativesScoredLower}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* FINAL EXECUTIVE RECOMMENDATION (Strict Invariant Guarantee) */}
      {finalStrategicRecommendation && (
        <div className="bg-white border-2 border-emerald-800/90 rounded-xl p-6 sm:p-7 space-y-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Executive Synthesis · Overall Market Entry Recommendation
              </div>
              <h4 className="text-xl font-serif-display font-bold text-stone-900 tracking-tight">
                Recommended Expansion Strategy for Indian Exporter
              </h4>
              <p className="text-xs text-stone-600">
                Synthesized decision model blending <strong>Stage 1 (Market Screening 35%)</strong>, <strong>Stage 2 (PESTEL Radar 35%)</strong>, and <strong>Stage 3 (Entry Mode Fit 30%)</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#fafaf8] border border-stone-200 text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-stone-500">Overall Synthesis Score</div>
              <div className="text-2xl font-bold font-mono text-emerald-900">
                {finalStrategicRecommendation.overallDecisionScore}
                <span className="text-xs text-stone-500 font-normal"> / 100</span>
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold">Optimal Strategic Alignment</div>
            </div>
          </div>

          {/* 3 Core Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#fafaf8] border border-stone-200 space-y-1.5">
              <div className="text-xs font-bold uppercase text-stone-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                Primary Destination Market
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{finalStrategicRecommendation.bestCountry.flag}</span>
                <div>
                  <div className="text-base font-bold text-stone-900">
                    {finalStrategicRecommendation.bestCountry.name}
                  </div>
                  <div className="text-xs text-emerald-800 font-medium">
                    Rank #1 in Global Composite Selection
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-600 border-t border-stone-200 pt-2 mt-1">
                Sub-zero season 5–6 months; full duty-free tariff relief under India-EFTA TEPA 2024.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#fafaf8] border border-stone-200 space-y-1.5">
              <div className="text-xs font-bold uppercase text-stone-600 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-800" />
                Recommended Entry Mode
              </div>
              <div>
                <div className="text-base font-bold text-emerald-900">
                  {finalStrategicRecommendation.winningMode.name}
                </div>
                <div className="text-xs text-stone-600">
                  via Established Nordic Outdoor Retail Channels
                </div>
              </div>
              <p className="text-[11px] text-stone-600 border-t border-stone-200 pt-2 mt-1">
                Zero fixed foreign retail liability; maximizes capacity utilization of existing Indian factories.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#fafaf8] border border-stone-200 space-y-1.5">
              <div className="text-xs font-bold uppercase text-stone-600 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                Analytical Confidence
              </div>
              <div>
                <div className="text-base font-bold text-stone-900">
                  {finalStrategicRecommendation.confidenceLevel.split('—')[0]}
                </div>
                <div className="text-xs text-stone-600">
                  {finalStrategicRecommendation.confidenceLevel.split('—')[1] || 'Multi-Stage Convergence'}
                </div>
              </div>
              <p className="text-[11px] text-stone-600 border-t border-stone-200 pt-2 mt-1">
                Robust against sensitivity tests on currency volatility and shipping transit times.
              </p>
            </div>
          </div>

          {/* Formula Breakdown */}
          <div className="p-3.5 rounded-lg bg-[#f8f9fa] border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-stone-800">Score Synthesis Formula:</span>
            <span className="font-mono text-stone-700">
              (Stage 1 × 35%) + (Stage 2 × 35%) + (Stage 3 × 30%) ={' '}
              <strong className="text-emerald-900">{finalStrategicRecommendation.overallDecisionScore} / 100</strong>
            </span>
          </div>
        </div>
      )}

      {/* Stage 3 Bottom Action Buttons */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-500">
          Stage 3 concludes the decision pipeline with Direct Exporting to Norway as the winning market entry pathway.
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {setActiveStage && (
            <>
              <button
                onClick={() => {
                  setActiveStage('bias_audit');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-initial h-12 px-5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold text-xs transition"
              >
                Inspect Bias Audit Lab
              </button>
              <button
                onClick={() => {
                  setActiveStage('presentation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-initial h-12 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
              >
                <span>Review Presentation Summary</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
