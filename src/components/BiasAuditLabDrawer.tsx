import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Copy,
  RotateCcw,
  CheckCircle,
  CheckCircle2,
  Lightbulb,
  Loader2,
  AlertTriangle,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Globe2,
  Target,
  Award,
  ArrowRight,
  Clock,
  Filter
} from 'lucide-react';
import { BiasTestRecord, BIAS_EVALUATION_CRITERIA } from '../data/biasAuditData';

interface BiasAuditLabDrawerProps {
  biasRecords: BiasTestRecord[];
  biasAuditFilter: 'all' | 'tested' | 'pending';
  setBiasAuditFilter: (filter: 'all' | 'tested' | 'pending') => void;
  productCategory: string;
  handleApplyCategory: (record: BiasTestRecord | string) => void;
  logCurrentDashboardToRecord: (id: number) => void;
  handleBiasFieldChange: (id: number, field: keyof BiasTestRecord, val: any) => void;
  copyMarkdownTable: () => void;
  resetBiasTests: () => void;
  isApplyingCategoryId: number | null;
  applyingCategoryName: string | null;
  categoryApplyError: string | null;
  setCategoryApplyError: (err: string | null) => void;
  isCompactMode?: boolean;
  top3RecommendedMarkets?: any[];
  finalStrategicRecommendation?: any;
}

export const BiasAuditLabDrawer: React.FC<BiasAuditLabDrawerProps> = ({
  biasRecords,
  biasAuditFilter,
  setBiasAuditFilter,
  productCategory,
  handleApplyCategory,
  logCurrentDashboardToRecord,
  handleBiasFieldChange,
  copyMarkdownTable,
  resetBiasTests,
  isApplyingCategoryId,
  applyingCategoryName,
  categoryApplyError,
  setCategoryApplyError,
  isCompactMode = false,
  top3RecommendedMarkets = [],
  finalStrategicRecommendation
}) => {
  const [showDiagnosticGuide, setShowDiagnosticGuide] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  // Selected category in dropdown
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(() => {
    return productCategory || biasRecords[0]?.category || 'Winter apparel';
  });

  // Keep dropdown in sync when external active productCategory changes
  useEffect(() => {
    if (productCategory) {
      const match = biasRecords.find(
        (r) => r.category.toLowerCase().trim() === productCategory.toLowerCase().trim()
      );
      if (match) {
        setSelectedCategoryName(match.category);
      }
    }
  }, [productCategory, biasRecords]);

  // Derived current record
  const currentSelectedRecord =
    biasRecords.find(
      (r) => r.category.toLowerCase().trim() === selectedCategoryName.toLowerCase().trim()
    ) || biasRecords[0];

  const testedCount = biasRecords.filter((r) => r.top3Countries !== '').length;
  const progressPercent = Math.round((testedCount / biasRecords.length) * 100);

  // Active top recommendations to display
  const topCountry = top3RecommendedMarkets[0] || finalStrategicRecommendation?.bestCountry;
  const winningMode = finalStrategicRecommendation?.winningMode;

  const handleApplyClick = async () => {
    if (!currentSelectedRecord) return;
    setLocalFeedback(null);
    try {
      await handleApplyCategory(currentSelectedRecord);
      setLocalFeedback({
        type: 'success',
        message: `Successfully applied category "${currentSelectedRecord.category}"! The decision model has recalculated all market criteria, PESTEL ratings, and entry mode feasibility.`
      });
      setTimeout(() => setLocalFeedback(null), 6000);
    } catch (e: any) {
      setLocalFeedback({
        type: 'error',
        message: e?.message || 'Error applying product category.'
      });
    }
  };

  const handleLogClick = async () => {
    if (!currentSelectedRecord) return;
    setLocalFeedback(null);
    try {
      await logCurrentDashboardToRecord(currentSelectedRecord.id);
      setLocalFeedback({
        type: 'success',
        message: `Live model output for "${currentSelectedRecord.category}" successfully recorded into Test Record #${currentSelectedRecord.id}! Audit progress updated to ${
          biasRecords.some((r) => r.id === currentSelectedRecord.id && r.top3Countries !== '')
            ? testedCount
            : Math.min(10, testedCount + 1)
        }/10.`
      });
      setTimeout(() => setLocalFeedback(null), 6000);
    } catch (e: any) {
      setLocalFeedback({
        type: 'error',
        message: e?.message || 'Error logging live output.'
      });
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-7 shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 tracking-wide uppercase">
              Phase 04 · Scientific Audit
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-semibold text-stone-600">
              Cross-Category Sensitivity & Anti-Bias Verification Lab
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-amber-700" />
            Model Bias Testing & Audit Lab
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-4xl">
            Empirical stress-testing across 10 diverse product categories to verify market independence, detect heuristic biases, and validate algorithmic neutrality for an MBA academic defense.
          </p>
        </div>

        {/* Global Test Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={copyMarkdownTable}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-300 transition shadow-xs"
            title="Copy test results formatted in Markdown for academic project documentation"
          >
            <Copy className="w-4 h-4 text-emerald-800" />
            <span>Copy Markdown Table</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all 10 bias test rows to blank testing state?')) {
                resetBiasTests();
                setLocalFeedback({
                  type: 'info',
                  message: 'All 10 bias test rows reset to blank testing state. Counter reset to 0/10.'
                });
                setTimeout(() => setLocalFeedback(null), 4000);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-300 transition shadow-xs"
            title="Reset recorded results to clean testing baseline"
          >
            <RotateCcw className="w-4 h-4 text-stone-500" />
            <span>Reset Test Sheet</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DEDICATED CONTROL PANEL: Product Category Dropdown & Prominent Buttons */}
      {/* ========================================================================= */}
      <div className="bg-[#fcfbf9] rounded-2xl border-2 border-emerald-900/20 p-6 sm:p-7 space-y-5 shadow-xs">
        <div>
          <label
            htmlFor="bias-category-select"
            className="block text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wide mb-2 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-emerald-800" />
            <span>Product Category</span>
          </label>
          <div className="text-xs text-stone-500 mb-2">
            Select one of the 10 test product categories to evaluate for algorithmic bias and heuristic distortion:
          </div>

          <div className="relative max-w-xl">
            <select
              id="bias-category-select"
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              disabled={isApplyingCategoryId !== null}
              className="w-full h-12 pl-4 pr-10 rounded-xl bg-white border-2 border-stone-300 hover:border-emerald-700 focus:border-emerald-800 text-stone-900 font-semibold text-sm sm:text-base shadow-xs transition focus:outline-none appearance-none cursor-pointer"
            >
              {biasRecords.map((record) => {
                const isTested = record.top3Countries !== '';
                return (
                  <option key={record.id} value={record.category}>
                    #{record.id}. {record.category} — {record.expectedArchetype} {isTested ? '✓ (Tested)' : '• (Pending)'}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-600">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Buttons placed beside or directly below */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
          {/* 1. Apply Category Button (Primary Emerald Green) */}
          <button
            id="apply-category-btn"
            type="button"
            onClick={handleApplyClick}
            disabled={isApplyingCategoryId !== null}
            className="h-12 px-7 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition active:scale-[0.99] border border-emerald-800 disabled:opacity-50 cursor-pointer"
            title="Execute model calculations for the selected category"
          >
            {isApplyingCategoryId !== null ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                <span>Applying Category...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Apply Category</span>
              </>
            )}
          </button>

          {/* 2. Log Live Output Button (Secondary High-Visibility) */}
          <button
            id="log-live-output-btn"
            type="button"
            onClick={handleLogClick}
            disabled={isApplyingCategoryId !== null}
            className="h-12 px-7 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition active:scale-[0.99] border border-amber-600 disabled:opacity-50 cursor-pointer"
            title="Save currently displayed results for this category into audit record"
          >
            <CheckCircle2 className="w-5 h-5 text-stone-950" />
            <span>Log Live Output</span>
          </button>
        </div>

        {/* Inline Feedback Banner */}
        {localFeedback && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs border ${
              localFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                : localFeedback.type === 'error'
                ? 'bg-rose-50 text-rose-950 border-rose-300'
                : 'bg-stone-100 text-stone-900 border-stone-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {localFeedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              ) : localFeedback.type === 'error' ? (
                <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
              ) : (
                <Lightbulb className="w-5 h-5 text-stone-700 shrink-0" />
              )}
              <span className="font-medium">{localFeedback.message}</span>
            </div>
            <button
              onClick={() => setLocalFeedback(null)}
              className="text-xs underline font-semibold text-stone-600 hover:text-stone-900 shrink-0 ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. METRIC CARDS: Active Category, Market Ranking, Entry Mode, Latest Result */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Category */}
        <div className="bg-[#fafaf8] p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Active Category</span>
            </div>
            <div className="text-lg font-bold text-stone-900 truncate" title={productCategory}>
              {productCategory}
            </div>
            <p className="text-xs text-stone-500 line-clamp-2">
              {currentSelectedRecord?.expectedArchetype || 'Evaluated in decision engine'}
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-stone-200/80 text-[11px] font-medium text-emerald-900 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Synchronized with Model</span>
          </div>
        </div>

        {/* Market Ranking */}
        <div className="bg-[#fafaf8] p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Market Ranking</span>
            </div>
            <div className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>{topCountry?.flag || '🇳🇴'}</span>
              <span>{topCountry?.name || 'Norway'}</span>
              <span className="text-xs font-mono font-bold text-emerald-800">
                ({topCountry?.compositeScore || topCountry?.stage1Score || '90.7'}/100)
              </span>
            </div>
            <p className="text-xs text-stone-500 truncate" title={top3RecommendedMarkets.map((c) => c.name).join(', ')}>
              Top 3: {top3RecommendedMarkets.map((c) => c.name).join(', ') || 'Norway, Switzerland, Canada'}
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
            Stage 1 & 2 Composite Ranking
          </div>
        </div>

        {/* Recommended Entry Mode */}
        <div className="bg-[#fafaf8] p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>Recommended Entry Mode</span>
            </div>
            <div className="text-lg font-bold text-stone-900 truncate" title={winningMode?.name || 'Direct Exporting'}>
              {winningMode?.name || 'Direct Exporting'}
            </div>
            <p className="text-xs text-stone-500">
              Feasibility: <strong className="text-stone-800 font-mono">{winningMode?.weightedScore || '84.5'}/100</strong>
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
            Optimal Risk-Adjusted Strategy
          </div>
        </div>

        {/* Latest Test Result */}
        <div className="bg-[#fafaf8] p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Latest Test Result</span>
            </div>
            {currentSelectedRecord?.top3Countries !== '' ? (
              <div>
                <div className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Tested & Saved</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Logged: {currentSelectedRecord.testedAt || 'Recently'}
                </div>
                <div className="text-[11px] font-medium text-stone-700 truncate mt-1">
                  Diagnosis: {currentSelectedRecord.biasSuspected}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-sm font-semibold text-amber-700 italic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Pending Test Execution</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Click &quot;Log Live Output&quot; to save this record.
                </p>
              </div>
            )}
          </div>
          <div className="pt-3 mt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
            Row #{currentSelectedRecord?.id || 1} Status
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. AUDIT PROGRESS COUNTER (e.g., 0/10 Completed) & Filter Tabs */}
      {/* ========================================================================= */}
      <div className="bg-[#f8f9fa] border border-stone-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
            <span>Audit Progress & Verification Integrity</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
            A product category counts as tested <strong>only after</strong> live model output has been generated and logged with the <strong>&quot;Log Live Output&quot;</strong> button. No fabricated results or placeholder counts.
          </p>
        </div>

        {/* Progress Metric & Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs min-w-[170px]">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>Completed:</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{testedCount} / {biasRecords.length}</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full rounded-full bg-emerald-800 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-stone-500 text-right mt-1 font-mono">{progressPercent}% Audited</div>
          </div>

          {/* Filter Pills */}
          <div className="flex rounded-xl bg-stone-200/70 p-1 border border-stone-300 text-xs font-semibold">
            <button
              onClick={() => setBiasAuditFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                biasAuditFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({biasRecords.length})
            </button>
            <button
              onClick={() => setBiasAuditFilter('tested')}
              className={`px-3 py-1.5 rounded-lg transition ${
                biasAuditFilter === 'tested'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tested ({testedCount})
            </button>
            <button
              onClick={() => setBiasAuditFilter('pending')}
              className={`px-3 py-1.5 rounded-lg transition ${
                biasAuditFilter === 'pending'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pending ({biasRecords.length - testedCount})
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TEST HISTORY WORKSHEET TABLE (Full 10 Categories) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-800" />
            <span>Test History Table (10 Product Categories)</span>
          </div>
          <div className="text-xs text-stone-500">
            Showing {biasAuditFilter === 'all' ? 'all 10' : biasAuditFilter === 'tested' ? testedCount : biasRecords.length - testedCount} categories
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f7f4] text-stone-700 border-b border-stone-200 font-bold tracking-wider text-[11px] uppercase">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3.5 min-w-[160px]">Product Category</th>
                <th className="py-3 px-3 min-w-[150px]">Business Profile</th>
                <th className="py-3 px-3.5 min-w-[220px]">Top 3 Recommended Countries</th>
                <th className="py-3 px-3.5 min-w-[150px]">Recommended Entry Mode</th>
                <th className="py-3 px-3.5 min-w-[220px]">Reasons for Result</th>
                <th className="py-3 px-3.5 min-w-[170px]">Suspected Bias Diagnosis</th>
                <th className="py-3 px-3 text-center min-w-[150px]">Action Runner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {biasRecords
                .filter((r) => {
                  if (biasAuditFilter === 'tested') return r.top3Countries !== '';
                  if (biasAuditFilter === 'pending') return r.top3Countries === '';
                  return true;
                })
                .map((record) => {
                  const isTested = record.top3Countries !== '';
                  const isCurrentlyActive =
                    productCategory.toLowerCase().trim() === record.category.toLowerCase().trim();
                  const isDropdownSelected =
                    selectedCategoryName.toLowerCase().trim() === record.category.toLowerCase().trim();

                  return (
                    <tr
                      key={record.id}
                      className={`transition ${
                        isCurrentlyActive
                          ? 'bg-emerald-50/70 font-medium'
                          : isDropdownSelected
                          ? 'bg-amber-50/40'
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-stone-500">
                        {record.id}
                      </td>

                      <td className="py-3 px-3.5 font-semibold text-stone-900">
                        <div className="flex items-center gap-1.5">
                          <span>{record.category}</span>
                          {isCurrentlyActive && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 font-normal">
                          {record.expectedArchetype}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-stone-600">
                        {record.businessProfile}
                      </td>

                      <td className="py-3 px-3.5">
                        {isTested ? (
                          <div className="space-y-0.5">
                            <div className="font-semibold text-stone-900 text-xs">
                              {record.top3Countries}
                            </div>
                            {record.testedAt && (
                              <div className="text-[10px] text-stone-400 font-mono">
                                Logged at {record.testedAt}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-amber-700 italic text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            Pending Test Execution
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3.5">
                        {isTested ? (
                          <span className="font-semibold text-emerald-950 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                            {record.recommendedEntryMode}
                          </span>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-3.5 max-w-xs">
                        {isTested ? (
                          <input
                            type="text"
                            value={record.reasonsForResult}
                            onChange={(e) => handleBiasFieldChange(record.id, 'reasonsForResult', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-[11px] text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                          />
                        ) : (
                          <span className="text-stone-400 text-[11px] italic">Will populate upon live log</span>
                        )}
                      </td>

                      <td className="py-3 px-3.5">
                        <select
                          value={record.biasSuspected}
                          onChange={(e) => handleBiasFieldChange(record.id, 'biasSuspected', e.target.value)}
                          className={`text-[11px] rounded px-2.5 py-1 border focus:outline-none font-medium ${
                            record.biasSuspected.startsWith('Yes') ||
                            record.biasSuspected.includes('Bias') ||
                            record.biasSuspected.includes('Distortion')
                              ? 'bg-rose-50 text-rose-900 border-rose-300 font-semibold'
                              : record.biasSuspected.includes('No Evident')
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        >
                          <option value="Undetermined (Test Pending)">Undetermined (Test Pending)</option>
                          <option value="Geographic / Climate-Proxy Bias">Geographic / Climate-Proxy Bias</option>
                          <option value="Entry Mode Invariance Bias">Entry Mode Invariance Bias</option>
                          <option value="Market Scale Distortion">Market Scale Distortion</option>
                          <option value="Bilateral Treaty Conflation">Bilateral Treaty Conflation</option>
                          <option value="No Evident Bias Detected">No Evident Bias Detected</option>
                        </select>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="flex flex-col gap-1 items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategoryName(record.category);
                              handleApplyCategory(record);
                            }}
                            disabled={isApplyingCategoryId !== null}
                            aria-label={`Apply ${record.category}`}
                            title={`Apply ${record.category} to dashboard`}
                            className={`text-[11px] px-3 py-1 rounded-lg transition whitespace-nowrap font-bold flex items-center justify-center gap-1 border ${
                              isApplyingCategoryId === record.id
                                ? 'bg-emerald-800 text-white cursor-wait animate-pulse border-emerald-800'
                                : isCurrentlyActive
                                ? 'bg-emerald-900 text-white shadow-xs border-emerald-900'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}
                          >
                            {isApplyingCategoryId === record.id ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-amber-300" />
                                <span>Calculating...</span>
                              </>
                            ) : isCurrentlyActive ? (
                              <>
                                <Check className="w-3 h-3 text-amber-300" />
                                <span>Active</span>
                              </>
                            ) : (
                              <span>Apply Category</span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategoryName(record.category);
                              logCurrentDashboardToRecord(record.id);
                            }}
                            disabled={isApplyingCategoryId !== null}
                            className="text-[10px] text-amber-800 hover:text-amber-950 font-bold underline disabled:opacity-40"
                            title="Record current live dashboard outputs into this row"
                          >
                            Log Live Output
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expandable Diagnostic Guide Drawer */}
      <div className="border border-stone-200 rounded-xl overflow-hidden bg-[#fafaf8]">
        <button
          onClick={() => setShowDiagnosticGuide(!showDiagnosticGuide)}
          className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-100 transition"
        >
          <span className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-800" />
            <span>How to Identify Bias: The 4 Core Diagnostic Heuristics (MBA Defense Guide)</span>
          </span>
          {showDiagnosticGuide ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
        </button>

        {showDiagnosticGuide && (
          <div className="p-5 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {BIAS_EVALUATION_CRITERIA.map((criterion, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="font-bold text-stone-900 text-xs">{criterion.name}</div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                    {criterion.tag}
                  </span>
                  <p className="text-stone-600 text-[11px] leading-relaxed pt-1">{criterion.description}</p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                  <strong>Warning Symptom:</strong> {criterion.warningSymptom}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
