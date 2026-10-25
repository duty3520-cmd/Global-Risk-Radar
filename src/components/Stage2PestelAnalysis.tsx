import React from 'react';
import {
  FileSpreadsheet,
  Sliders,
  Award,
  Target,
  FileText,
  Lightbulb,
  AlertTriangle,
  Layers,
  Check,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { PestelDossier } from '../App';

interface Stage2PestelAnalysisProps {
  productCategory: string;
  businessProfile: string;
  marketSelectionWeight: number;
  setMarketSelectionWeight: (w: number) => void;
  pestelWeight: number;
  showPestelTuner: boolean;
  setShowPestelTuner: (show: boolean) => void;
  top3RecommendedMarkets: any[];
  shortlistedTop7Stage1: any[];
  activePestelCountryId: string;
  setActivePestelCountryId: (id: string) => void;
  setExpandedPestelDossierId: (id: string | null) => void;
  currentPestelCountry: any;
  combinedEvaluatedCountries: any[];
  updatePestelFactorScore: (countryId: string, pillar: keyof PestelDossier, score: number) => void;
  resetPestelToDefaults: () => void;
  setActiveStage: (stage: 'all' | 'stage1' | 'stage2' | 'stage3' | 'bias_audit') => void;
}

export const Stage2PestelAnalysis: React.FC<Stage2PestelAnalysisProps> = ({
  productCategory,
  businessProfile,
  marketSelectionWeight,
  setMarketSelectionWeight,
  pestelWeight,
  showPestelTuner,
  setShowPestelTuner,
  top3RecommendedMarkets,
  shortlistedTop7Stage1,
  activePestelCountryId,
  setActivePestelCountryId,
  setExpandedPestelDossierId,
  currentPestelCountry,
  combinedEvaluatedCountries,
  updatePestelFactorScore,
  resetPestelToDefaults,
  setActiveStage
}) => {
  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-7 space-y-7 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80 tracking-wide uppercase">
              Phase 02 · Environmental Radar
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-semibold text-stone-600">
              60% Market / 40% PESTEL Composite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 flex items-center gap-2">
            <FileSpreadsheet className="w-7 h-7 text-emerald-800" />
            Stage 2 — Country Risk Assessment
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Compare political, economic, social, technological, environmental, and legal factors.
          </p>
        </div>

        <button
          onClick={() => setShowPestelTuner(!showPestelTuner)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
            showPestelTuner
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Tune Blend Weights</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Evaluated Pool
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">7 Markets Analyzed</div>
          <p className="text-xs text-stone-500 mt-0.5">Shortlisted from Stage 1</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Top Shortlisted 3
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">
            {top3RecommendedMarkets.map((c) => c.name).join(', ') || 'Norway, Switzerland, Canada'}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Advance to Stage 3 Entry Mode</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            PESTEL Structure
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 font-mono">
            6 Macro Pillars
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Equal 16.67% weight each</p>
        </div>

        <div className="bg-[#fafaf8] p-4 rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Synthesis Ratio
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1 font-mono">
            {marketSelectionWeight}% Mkt / {pestelWeight}% PESTEL
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Composite decision score</p>
        </div>
      </div>

      {/* Decision Blend Banner */}
      <div className="bg-[#f8f9fa] border border-stone-200 rounded-lg p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-800" />
              Composite Decision Formula (Strict Invariant Guarantee)
            </div>
            <p className="text-stone-600 leading-relaxed text-xs max-w-4xl">
              <strong>Equal Weighting:</strong> All six PESTEL dimensions are evaluated at <strong>16.67% (1/6)</strong> each.
              <br />
              <strong>Composite Formula:</strong>{' '}
              <span className="font-mono text-stone-900 font-semibold bg-white px-2 py-0.5 rounded border border-stone-200">
                Composite Score = (Stage 1 × {(marketSelectionWeight / 100).toFixed(2)}) + (PESTEL × {(pestelWeight / 100).toFixed(2)})
              </span>
            </p>
          </div>

          <div className="shrink-0 bg-white p-2.5 rounded border border-stone-200 text-right font-mono text-xs font-bold text-stone-900">
            <span className="text-emerald-900">{marketSelectionWeight}% Stage 1</span> +{' '}
            <span className="text-stone-700">{pestelWeight}% Stage 2</span>
          </div>
        </div>

        {/* Blend Weight Sensitivity Slider */}
        {showPestelTuner && (
          <div className="pt-3 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-stone-800 font-medium">
                <span>Stage 1 vs Stage 2 Weight Balance:</span>
                <span className="font-bold text-emerald-900 font-mono">
                  {marketSelectionWeight}% Market / {pestelWeight}% PESTEL
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                value={marketSelectionWeight}
                onChange={(e) => setMarketSelectionWeight(parseInt(e.target.value) || 60)}
                className="w-full accent-emerald-800"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setMarketSelectionWeight(60)}
                className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium transition"
              >
                Reset 60/40 Baseline
              </button>
              <button
                onClick={() => setMarketSelectionWeight(50)}
                className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium transition"
              >
                50/50 Equal Blend
              </button>
              <button
                onClick={() => setMarketSelectionWeight(70)}
                className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium transition"
              >
                70/30 Demand Heavy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TOP THREE RECOMMENDED MARKETS (EXECUTIVE SPOTLIGHT) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Top 3 Strategic Entry Markets: Final Recommendations
            </h4>
          </div>
          <span className="text-xs text-stone-500">
            Synthesized from Stage 1 + Stage 2 Decision Blend
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3RecommendedMarkets.map((market, idx) => {
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
            const cardAccent =
              idx === 0
                ? 'border-amber-400/80 bg-amber-50/20 shadow-sm'
                : idx === 1
                ? 'border-stone-300 bg-stone-50/30'
                : 'border-amber-600/40 bg-white';

            const priorityLabel =
              idx === 0 ? 'Primary Target Market' : idx === 1 ? 'Secondary Target Market' : 'High-Value Strategic Niche';

            return (
              <div
                key={market.id}
                onClick={() => {
                  setActivePestelCountryId(market.id);
                  setExpandedPestelDossierId(market.id);
                }}
                className={`p-5 rounded-xl border ${cardAccent} space-y-4 cursor-pointer hover:border-emerald-700 transition relative`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{medal}</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        Rank #{idx + 1} · {priorityLabel}
                      </span>
                      <h5 className="text-base font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                        <span>{market.flag}</span>
                        <span>{market.name}</span>
                      </h5>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-stone-900 font-mono">
                      {market.compositeScore.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium">Composite Score</div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-1.5 bg-white p-3 rounded-lg border border-stone-200 text-xs">
                  <div className="flex justify-between items-center text-stone-700">
                    <span className="text-[11px]">Stage 1 ({marketSelectionWeight}%):</span>
                    <span className="font-mono font-bold text-stone-900">
                      {market.stage1Score.toFixed(1)} pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-stone-700">
                    <span className="text-[11px]">PESTEL ({pestelWeight}%):</span>
                    <span className="font-mono font-bold text-stone-900">
                      {market.pestelScore.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                {/* Strategy Summary */}
                <div className="text-xs text-stone-600 space-y-1 leading-relaxed">
                  <div className="text-[11px] font-semibold text-stone-800">Strategic Rationale:</div>
                  <p className="text-[11px] line-clamp-3">
                    {market.dossier?.scoreExplanation || market.suitabilityExplanation}
                  </p>
                </div>

                {/* Primary Advantage */}
                <div className="pt-2 border-t border-stone-200 text-[11px] space-y-1">
                  <div className="text-emerald-900 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Primary Strategic Lever:</span>
                  </div>
                  <p className="text-stone-600 text-[11px] line-clamp-2">
                    {market.dossier?.top3Opportunities?.[0] || 'High Demand Consistency'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COUNTRY PESTEL DEEP-DIVE TABS */}
      <div className="bg-[#fafaf8] border border-stone-200/90 rounded-xl p-5 sm:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-800" />
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Factor-by-Factor PESTEL Analysis Dossier
              </h4>
              <p className="text-xs text-stone-600">
                Inspect specific risks, opportunities, and verified evidence across all six macro dimensions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {shortlistedTop7Stage1.map((c, i) => {
              const isSelected = activePestelCountryId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActivePestelCountryId(c.id);
                    setExpandedPestelDossierId(c.id);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono opacity-80 font-bold">#{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Country Detail Header */}
        {currentPestelCountry && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentPestelCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-lg font-bold text-stone-900">{currentPestelCountry.name}</h5>
                    <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {currentPestelCountry.region}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Evaluated for an <strong>{businessProfile}</strong> exporting <strong>{productCategory}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-center">
                <div className="px-3 py-2 rounded bg-stone-50 border border-stone-200">
                  <div className="text-[10px] uppercase font-bold text-stone-500">Stage 1 Score</div>
                  <div className="text-sm font-bold text-stone-900 font-mono">{currentPestelCountry.stage1Score.toFixed(1)}</div>
                </div>
                <div className="px-3 py-2 rounded bg-stone-50 border border-stone-200">
                  <div className="text-[10px] uppercase font-bold text-stone-500">PESTEL Score</div>
                  <div className="text-sm font-bold text-stone-900 font-mono">{currentPestelCountry.pestelScore.toFixed(1)}</div>
                </div>
                <div className="px-3 py-2 rounded bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] uppercase text-emerald-900 font-bold">Composite Score</div>
                  <div className="text-sm font-extrabold text-emerald-950 font-mono">{currentPestelCountry.compositeScore.toFixed(1)}</div>
                </div>
              </div>
            </div>

            {/* PESTEL Rationale Narrative */}
            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-1">
              <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                PESTEL Strategic Summary & Macro Context:
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentPestelCountry.dossier?.scoreExplanation}
              </p>
            </div>

            {/* Opportunities vs Risks Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Opportunities */}
              <div className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 uppercase tracking-wider border-b border-emerald-200 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-emerald-800" />
                    Top Strategic Opportunities
                  </span>
                  <span className="text-[10px] bg-white text-emerald-900 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    Key Catalysts
                  </span>
                </div>
                <ol className="space-y-2 text-xs text-stone-700">
                  {currentPestelCountry.dossier?.top3Opportunities?.map((opp: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{opp}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Risks */}
              <div className="bg-amber-50/40 border border-amber-200 rounded-lg p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950 uppercase tracking-wider border-b border-amber-200 pb-2">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Top Risks & Mitigations
                  </span>
                  <span className="text-[10px] bg-white text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                    Watchouts
                  </span>
                </div>
                <ol className="space-y-2 text-xs text-stone-700">
                  {currentPestelCountry.dossier?.top3Risks?.map((risk: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 6 PESTEL Factor Cards */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-800" />
                Detailed 6-Pillar Macro Analysis
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Political */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Political Environment</h6>
                      <div className="text-[10px] text-stone-500">Government Policy & Treaties</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.political.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.political.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.political.risk}
                    </p>
                  </div>
                </div>

                {/* 2. Economic */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Economic Conditions</h6>
                      <div className="text-[10px] text-stone-500">Purchasing Power & Currency</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.economic.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.economic.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.economic.risk}
                    </p>
                  </div>
                </div>

                {/* 3. Social */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Socio-Cultural Dynamics</h6>
                      <div className="text-[10px] text-stone-500">Outdoor Culture & Winter Habit</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.social.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.social.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.social.risk}
                    </p>
                  </div>
                </div>

                {/* 4. Technological */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Technological Infrastructure</h6>
                      <div className="text-[10px] text-stone-500">E-Commerce & Digital Logistics</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.technological.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.technological.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.technological.risk}
                    </p>
                  </div>
                </div>

                {/* 5. Environmental */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Environmental Standards</h6>
                      <div className="text-[10px] text-stone-500">Sustainability & Climate Severity</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.environmental.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.environmental.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.environmental.risk}
                    </p>
                  </div>
                </div>

                {/* 6. Legal */}
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs">Legal & Regulatory</h6>
                      <div className="text-[10px] text-stone-500">Tariffs & Labeling Standards</div>
                    </div>
                    <span className="text-sm font-bold text-stone-900 font-mono">
                      {currentPestelCountry.dossier?.legal.score} <span className="text-[10px] text-stone-500">/100</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Opportunity:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.legal.opportunity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50/50 border border-amber-200 text-[11px] space-y-1">
                    <div className="font-semibold text-amber-950 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Risk:</span>
                    </div>
                    <p className="text-stone-700 leading-snug">
                      {currentPestelCountry.dossier?.legal.risk}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full 7-Country PESTEL Comparison Table */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              7-Country PESTEL Matrix & Composite Synthesis Table
            </h5>
            <span className="text-xs text-stone-500 font-mono">
              Composite = (Stage 1 × {(marketSelectionWeight/100).toFixed(2)}) + (PESTEL × {(pestelWeight/100).toFixed(2)})
            </span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fa] text-stone-700 border-b border-stone-200 font-semibold tracking-wider text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-3 text-center w-12">Rank</th>
                  <th className="py-3 px-4 min-w-[170px]">Shortlisted Market</th>
                  <th className="py-3 px-3 text-center bg-stone-100 font-bold">Stage 1 ({marketSelectionWeight}%)</th>
                  <th className="py-3 px-2 text-center">P</th>
                  <th className="py-3 px-2 text-center">E</th>
                  <th className="py-3 px-2 text-center">S</th>
                  <th className="py-3 px-2 text-center">T</th>
                  <th className="py-3 px-2 text-center">E</th>
                  <th className="py-3 px-2 text-center">L</th>
                  <th className="py-3 px-3 text-center bg-stone-100 font-bold">PESTEL ({pestelWeight}%)</th>
                  <th className="py-3 px-4 text-center font-bold text-stone-900 bg-emerald-50/60 min-w-[120px]">
                    Composite Score
                  </th>
                  <th className="py-3 px-3 text-center">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {combinedEvaluatedCountries.map((c) => {
                  const isSelected = activePestelCountryId === c.id;
                  const scores = c.dossier
                    ? {
                        political: c.dossier.political.score,
                        economic: c.dossier.economic.score,
                        social: c.dossier.social.score,
                        technological: c.dossier.technological.score,
                        environmental: c.dossier.environmental.score,
                        legal: c.dossier.legal.score
                      }
                    : { political: 80, economic: 80, social: 80, technological: 80, environmental: 80, legal: 80 };

                  return (
                    <tr
                      key={c.id}
                      onClick={() => {
                        setActivePestelCountryId(c.id);
                        setExpandedPestelDossierId(c.id);
                      }}
                      className={`cursor-pointer transition ${
                        c.compositeRank === 1
                          ? 'bg-amber-50/30'
                          : c.compositeRank === 2
                          ? 'bg-stone-50/60'
                          : c.compositeRank === 3
                          ? 'bg-emerald-50/20'
                          : 'hover:bg-stone-50'
                      } ${isSelected ? 'ring-2 ring-emerald-800 bg-emerald-50/30' : ''}`}
                    >
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-bold ${
                            c.compositeRank === 1
                              ? 'bg-amber-500 text-white shadow-sm'
                              : c.compositeRank === 2
                              ? 'bg-stone-600 text-white'
                              : c.compositeRank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {c.compositeRank}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl shrink-0">{c.flag}</span>
                          <div>
                            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                              {c.name}
                              {c.compositeRank <= 3 && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                                  Top 3
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-500">{c.region}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center font-bold text-stone-900 font-mono bg-stone-50">
                        {c.stage1Score.toFixed(1)}
                      </td>

                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.political}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.economic}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.social}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.technological}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.environmental}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-stone-700">{scores.legal}</td>

                      <td className="py-3.5 px-3 text-center font-bold text-stone-900 font-mono bg-stone-50">
                        {c.pestelScore.toFixed(1)}
                      </td>

                      <td className="py-3.5 px-4 text-center bg-emerald-50/50 border-x border-stone-200">
                        <div className="text-base font-bold text-stone-900 font-mono">
                          {c.compositeScore.toFixed(1)}
                          <span className="text-[10px] font-normal text-stone-500">/100</span>
                        </div>
                        <div className="w-16 h-1.5 bg-stone-200 rounded-full mx-auto mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-800"
                            style={{ width: `${Math.min(100, Math.max(0, c.compositeScore))}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        {c.compositeRank === 1 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            Primary
                          </span>
                        ) : c.compositeRank === 2 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300">
                            Secondary
                          </span>
                        ) : c.compositeRank === 3 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            Niche
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-500 px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                            Evaluated
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stage 2 Bottom Action Button to Continue */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-500">
          Composite score blends 60% Stage 1 commercial screening + 40% Stage 2 macro-environmental stability.
        </div>
        <button
          onClick={() => {
            setActiveStage('stage3');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto h-12 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
        >
          <span>Proceed to Stage 3: Choose Your Entry Strategy</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </section>
  );
};
