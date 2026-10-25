import React from 'react';
import { Shirt, Building2, Calculator, Loader2, ArrowRight } from 'lucide-react';
import { WorldMapGraphic } from './WorldMapGraphic';

interface ExecutiveContextStripProps {
  productCategory: string;
  setProductCategory: (cat: string) => void;
  businessProfile: string;
  setBusinessProfile: (prof: string) => void;
  productPresets: string[];
  profilePresets: string[];
  handleApplyCategory: (catOrRecord: string) => void;
  isApplyingCategoryId: number | null;
  categoryApplyError: string | null;
}

export const ExecutiveContextStrip: React.FC<ExecutiveContextStripProps> = ({
  productCategory,
  setProductCategory,
  businessProfile,
  setBusinessProfile,
  productPresets,
  profilePresets,
  handleApplyCategory,
  isApplyingCategoryId,
  categoryApplyError
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Subtle World Map Ambient Graphic in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <WorldMapGraphic className="w-full h-full text-emerald-950 scale-110" opacity={0.06} />
      </div>

      <div className="relative z-10 p-6 sm:p-7 space-y-6">
        {/* Executive Header Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded">
                Strategic Baseline
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-semibold text-stone-600">
                Assigned Case Study Framework
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900 tracking-tight">
              Global Market Expansion & Risk Governance
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Empirical multi-stage decision architecture assisting an <strong>Established Exporter from India</strong> in
              identifying optimal foreign market destinations, calibrating PESTEL macro-risks, and selecting governance entry pathways.
            </p>
          </div>

          {/* Decision Funnel Micro-Badge */}
          <div className="bg-[#f8f9fa] border border-stone-200 rounded-lg p-3 lg:max-w-xs shrink-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Active Funnel Pipeline
            </div>
            <div className="text-xs font-medium text-stone-800 flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-emerald-900">Stage 1 (Top 7)</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
              <span className="font-semibold text-emerald-900">Stage 2 PESTEL (Top 3)</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
              <span className="font-semibold text-emerald-900">Stage 3 Strategy</span>
            </div>
          </div>
        </div>

        {/* Interactive Configuration Matrix: Product Category & Business Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Category Input Card */}
          <div className="bg-[#fafaf8] rounded-lg p-4 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Shirt className="w-4 h-4 text-emerald-800" />
                Product Category Under Assessment
              </label>
              <span className="text-[11px] font-medium text-emerald-900 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded">
                Assigned Topic
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="e.g. Winter/Cold-Climate Apparel"
                className="flex-1 bg-white border border-stone-300 rounded-md px-3.5 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition shadow-inner font-medium"
              />
              <button
                type="button"
                onClick={() => handleApplyCategory(productCategory)}
                disabled={isApplyingCategoryId !== null}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white flex items-center gap-1.5 transition disabled:opacity-50 shadow-sm whitespace-nowrap active:scale-[0.99]"
                title="Execute scoring model and calculate market rankings for this category"
              >
                {isApplyingCategoryId === -1 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-3.5 h-3.5 text-amber-300" />
                    <span>Apply & Calculate</span>
                  </>
                )}
              </button>
            </div>

            {/* Category Presets */}
            <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
              <span className="text-[11px] font-medium text-stone-500 mr-1">Presets:</span>
              {productPresets.map((preset) => {
                const isActive = productCategory.toLowerCase().trim() === preset.toLowerCase().trim();
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleApplyCategory(preset)}
                    disabled={isApplyingCategoryId !== null}
                    className={`text-[11px] px-2.5 py-1 rounded transition border font-medium ${
                      isActive
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Profile Input Card */}
          <div className="bg-[#fafaf8] rounded-lg p-4 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-800" />
                Firm Profile & Exporter Operating Posture
              </label>
              <span className="text-[11px] font-medium text-stone-700 bg-stone-200/70 border border-stone-300 px-2 py-0.5 rounded">
                Assigned Context
              </span>
            </div>

            <input
              type="text"
              value={businessProfile}
              onChange={(e) => setBusinessProfile(e.target.value)}
              placeholder="e.g. Established Exporter from India"
              className="w-full bg-white border border-stone-300 rounded-md px-3.5 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition shadow-inner font-medium"
            />

            {/* Profile Presets */}
            <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
              <span className="text-[11px] font-medium text-stone-500 mr-1">Presets:</span>
              {profilePresets.map((preset) => {
                const isActive = businessProfile === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBusinessProfile(preset)}
                    className={`text-[11px] px-2.5 py-1 rounded transition border font-medium ${
                      isActive
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Error notification if apply fails */}
        {categoryApplyError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs font-medium">
            <strong>Calculation Notice:</strong> {categoryApplyError}
          </div>
        )}

        {/* Live Operational Context Strip */}
        <div className="bg-[#f4f5f6] rounded-lg px-4 py-2.5 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span>
              Target Sector: <strong className="text-stone-900">{productCategory}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-700" />
            <span>
              Firm Profile: <strong className="text-stone-900">{businessProfile}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>
              Origin Trade Hub: <strong className="text-stone-900">India (Direct Air/Sea Freight)</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
