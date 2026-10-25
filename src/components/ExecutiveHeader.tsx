import { Compass, BookOpen, RotateCcw, ShieldCheck, ChevronDown, ChevronUp, Layers, CheckCircle2, Menu } from 'lucide-react';

interface ExecutiveHeaderProps {
  productCategory: string;
  businessProfile: string;
  showMethodology: boolean;
  setShowMethodology: (show: boolean) => void;
  resetAllToDefaults: () => void;
  testedCount: number;
  totalCategories: number;
  onOpenAuditLab: () => void;
  isAuditLabOpen: boolean;
  onToggleMobileMenu?: () => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  productCategory,
  businessProfile,
  showMethodology,
  setShowMethodology,
  resetAllToDefaults,
  testedCount,
  totalCategories,
  onOpenAuditLab,
  isAuditLabOpen,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Top Corporate Branding & Intelligence Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo & Platform Title with Mobile Toggle */}
          <div className="flex items-center gap-3">
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-emerald-900" />
              </button>
            )}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-900 border border-emerald-800 text-amber-400 flex items-center justify-center shadow-sm shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                  Trade Intelligence
                </span>
                <span className="text-stone-300 hidden sm:inline">·</span>
                <span className="text-xs font-medium text-stone-500 hidden sm:inline">
                  MBA Decision Framework
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-serif-display font-bold tracking-tight text-stone-900 flex items-center gap-2 mt-0.5">
                Global Risk Radar
                <span className="font-sans text-xs font-normal text-stone-500 hidden md:inline border-l border-stone-300 pl-2">
                  Market Entry Decision Dashboard
                </span>
              </h1>
            </div>
          </div>

          {/* Right Header Utility Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Bias Audit Lab Quick-Access Pill / Button */}
            <button
              onClick={onOpenAuditLab}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition border ${
                isAuditLabOpen
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-300'
              }`}
              title="Open or focus the 10-Category Bias Testing & Audit Lab"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Audit Lab</span>
              <span className={`px-1.5 py-0.2 rounded text-[11px] font-mono tabular-nums ${
                testedCount > 0
                  ? isAuditLabOpen ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-emerald-100 text-emerald-900 font-bold'
                  : isAuditLabOpen ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-700'
              }`}>
                {testedCount} / {totalCategories} Tested
              </span>
            </button>

            {/* Methodology Brief Toggle */}
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-300 transition"
              title="Review the 3-Stage Decision Methodology & Academic Framework"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
              <span className="hidden sm:inline">Methodology Dossier</span>
              {showMethodology ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
            </button>

            {/* Reset All Benchmarks */}
            <button
              onClick={resetAllToDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition"
              title="Reset all model weights, ratings, and filters to baseline defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Methodology Brief Drawer */}
      {showMethodology && (
        <div className="bg-[#f8f9fa] border-t border-b border-stone-200 px-4 py-5 sm:px-6 lg:px-8 text-stone-700 transition">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-emerald-100 text-emerald-900">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                    Executive Decision Funnel: Academic Methodology & Invariant Guarantees
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600 leading-relaxed">
                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900 mb-1 text-xs">Stage 1 · Global Market Selection</div>
                    <p>
                      Evaluates 10 international candidate economies across 7 commercial attractiveness criteria (Demand, Purchasing Power, Regulations, Logistics, Barriers). Automatically shortlists the <strong>Top 7 ranked destinations</strong> for in-depth environmental analysis.
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900 mb-1 text-xs">Stage 2 · PESTEL Risk & Opportunity Radar</div>
                    <p>
                      Analyzes the 7 shortlisted countries across all 6 PESTEL pillars with specific empirical risks & opportunities. Synthesizes a <strong>Composite Decision Score (60% Stage 1 / 40% PESTEL)</strong> to isolate the <strong>Top 3 Strategic Entry Markets</strong>.
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900 mb-1 text-xs">Stage 3 · Entry Mode Strategy & Validation</div>
                    <p>
                      Evaluates 6 entry pathways across 5 criteria (Investment Cost, Risk, Control, Knowledge, Exporter Fit) for the Top 3 countries. Delivers a final operational governance recommendation followed by a 10-category Bias Audit.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowMethodology(false)}
                className="text-xs px-3 py-1.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition shrink-0"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
