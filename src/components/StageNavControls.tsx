import React from 'react';
import { Globe2, FileSpreadsheet, Layers, ShieldAlert, LayoutDashboard } from 'lucide-react';

interface StageNavControlsProps {
  activeStage: 'all' | 'stage1' | 'stage2' | 'stage3' | 'bias_audit';
  setActiveStage: (stage: 'all' | 'stage1' | 'stage2' | 'stage3' | 'bias_audit') => void;
  testedCount: number;
  totalCategories: number;
}

export const StageNavControls: React.FC<StageNavControlsProps> = ({
  activeStage,
  setActiveStage,
  testedCount,
  totalCategories
}) => {
  return (
    <div className="space-y-4">
      {/* Segmented Corporate Stage Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-1.5 rounded-xl border border-stone-200/90 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-0.5">
          <button
            onClick={() => setActiveStage('all')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeStage === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Executive Synthesis (All Stages)</span>
          </button>

          <button
            onClick={() => setActiveStage('stage1')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeStage === 'stage1'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Stage 1: Market Selection (Top 7)</span>
          </button>

          <button
            onClick={() => setActiveStage('stage2')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeStage === 'stage2'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Stage 2: PESTEL Radar (Top 3)</span>
          </button>

          <button
            onClick={() => setActiveStage('stage3')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeStage === 'stage3'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Stage 3: Entry Mode Strategy</span>
          </button>

          <button
            onClick={() => setActiveStage('bias_audit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeStage === 'bias_audit'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Bias Audit Lab</span>
            <span className={`px-1.5 py-0.2 rounded text-[11px] font-mono tabular-nums font-bold ${
              activeStage === 'bias_audit' ? 'bg-amber-400 text-emerald-950' : 'bg-stone-200 text-stone-700'
            }`}>
              {testedCount}/{totalCategories}
            </span>
          </button>
        </div>
      </div>

      {/* 4-Step Executive Analytical Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Milestone 1 */}
        <div
          onClick={() => setActiveStage('stage1')}
          className={`p-4 rounded-xl border transition cursor-pointer bg-white ${
            activeStage === 'stage1' || activeStage === 'all'
              ? 'border-emerald-800 ring-1 ring-emerald-800/20 shadow-sm'
              : 'border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
            <span className="tracking-wider uppercase text-[11px]">Phase 01</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              Shortlisted 7 Markets
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm">Global Market Screening</h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            7-factor multi-criteria model evaluating commercial demand, purchasing power, and trade barriers.
          </p>
        </div>

        {/* Milestone 2 */}
        <div
          onClick={() => setActiveStage('stage2')}
          className={`p-4 rounded-xl border transition cursor-pointer bg-white ${
            activeStage === 'stage2' || activeStage === 'all'
              ? 'border-emerald-800 ring-1 ring-emerald-800/20 shadow-sm'
              : 'border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
            <span className="tracking-wider uppercase text-[11px]">Phase 02</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              Top 3 Identified
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm">PESTEL Risk & Opportunity</h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            Full 6-pillar analysis with empirical risk indicators and 60% Stage 1 / 40% PESTEL composite decision scores.
          </p>
        </div>

        {/* Milestone 3 */}
        <div
          onClick={() => setActiveStage('stage3')}
          className={`p-4 rounded-xl border transition cursor-pointer bg-white ${
            activeStage === 'stage3' || activeStage === 'all'
              ? 'border-emerald-800 ring-1 ring-emerald-800/20 shadow-sm'
              : 'border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
            <span className="tracking-wider uppercase text-[11px]">Phase 03</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              Optimal Strategy
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm">Entry Mode Evaluation</h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            Evaluates 6 entry pathways across 5 criteria for the Top 3 countries with executive implementation roadmaps.
          </p>
        </div>

        {/* Milestone 4 */}
        <div
          onClick={() => setActiveStage('bias_audit')}
          className={`p-4 rounded-xl border transition cursor-pointer bg-white ${
            activeStage === 'bias_audit' || activeStage === 'all'
              ? 'border-emerald-800 ring-1 ring-emerald-800/20 shadow-sm'
              : 'border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1.5">
            <span className="tracking-wider uppercase text-[11px]">Phase 04</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-300 font-mono">
              10 Categories
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 text-sm">Bias Testing & Audit Lab</h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            Empirical stress-testing across 10 diverse product categories to verify market and entry mode independence.
          </p>
        </div>
      </div>
    </div>
  );
};
