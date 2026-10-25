import React, { useState } from 'react';
import {
  Globe2,
  BarChart3,
  Shield,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Compass
} from 'lucide-react';
import { StageNavigationTab } from './SidebarNav';

interface OverviewDashboardProps {
  productCategory: string;
  businessProfile: string;
  setActiveStage: (stage: StageNavigationTab) => void;
  shortlistedTop7Stage1: any[];
  top3RecommendedMarkets: any[];
  finalStrategicRecommendation: any;
  currentStage3CountryEvaluation: any;
  testedCount: number;
  totalCategories: number;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  productCategory,
  businessProfile,
  setActiveStage,
  shortlistedTop7Stage1,
  top3RecommendedMarkets,
  finalStrategicRecommendation,
  currentStage3CountryEvaluation,
  testedCount,
  totalCategories
}) => {
  const [showJargonGuide, setShowJargonGuide] = useState(false);

  const topCountry = top3RecommendedMarkets[0] || shortlistedTop7Stage1[0];
  const winningMode = finalStrategicRecommendation?.winningMode;
  const bestCountry = finalStrategicRecommendation?.bestCountry || topCountry;

  return (
    <div className="space-y-8">
      {/* 1. Executive Top Hero Header */}
      <section className="bg-white rounded-2xl border border-stone-200/90 p-7 sm:p-9 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-50 via-emerald-50/40 to-transparent rounded-bl-full pointer-events-none" />

        <div className="max-w-4xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Decision Intelligence Framework
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif-display font-bold tracking-tight text-stone-900">
            Global Risk Radar
          </h1>

          <p className="text-base sm:text-lg font-medium text-emerald-900/90 italic">
            AI-Assisted International Market Entry Decision Dashboard
          </p>

          <p className="text-[15px] sm:text-base text-stone-600 leading-relaxed pt-1">
            Compare international markets, evaluate country risks, and select the most suitable
            entry strategy for an Indian winter-apparel exporter.
          </p>

          {/* Quick Context Chips */}
          <div className="pt-3 flex flex-wrap items-center gap-2.5 text-xs text-stone-700">
            <span className="font-semibold text-stone-500 uppercase tracking-wide text-[11px]">
              Active Scope:
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 font-semibold text-stone-900">
              🧥 {productCategory}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 font-medium text-stone-800">
              🏢 {businessProfile}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 font-medium text-emerald-900">
              ✅ 3-Stage Multi-Criteria Decision Funnel
            </span>
          </div>
        </div>
      </section>

      {/* 2. Four Easy-to-Understand Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Markets Screened */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Screening Scope
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                <Globe2 className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                7 Markets
              </div>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Markets Screened
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Assessed across 7 key trade criteria including winter demand, GDP per capita, and import tariffs.
            </p>
          </div>

          <button
            onClick={() => setActiveStage('stage1')}
            className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 group"
          >
            <span>Inspect screening table</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card 2: Shortlisted Markets */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Macro Filter
              </span>
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Shield className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Top 3 Shortlist
              </div>
              <div className="text-xs font-semibold text-amber-800 mt-1">
                Shortlisted Markets
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {top3RecommendedMarkets.map((c) => c.name).join(', ') || 'Norway, Switzerland, Canada'} advanced through comprehensive 6-pillar PESTEL risk assessment.
            </p>
          </div>

          <button
            onClick={() => setActiveStage('stage2')}
            className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 group"
          >
            <span>Review PESTEL risk radar</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card 3: Recommended Country */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border-l-4 border-l-emerald-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                #1 Destination
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shadow-sm">
                <Award className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <span>{bestCountry?.flag || '🇳🇴'}</span>
                <span>{bestCountry?.name || 'Norway'}</span>
              </div>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Recommended Country (Score: {bestCountry?.compositeScore || bestCountry?.stage1Score || '90.7'}/100)
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Highest composite score combining multi-month arctic sub-zero winter temperatures with 0% tariff access.
            </p>
          </div>

          <button
            onClick={() => setActiveStage('stage2')}
            className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 group"
          >
            <span>Country dossier & ratings</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card 4: Recommended Entry Mode */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border-l-4 border-l-amber-500">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Strategic Fit
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-950 text-emerald-200 flex items-center justify-center shadow-sm">
                <Target className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight truncate" title={winningMode?.name || 'Direct Exporting'}>
                {winningMode?.name || 'Direct Exporting'}
              </div>
              <div className="text-xs font-semibold text-amber-800 mt-1">
                Recommended Entry Mode (Feasibility: {winningMode?.weightedScore || '84.5'}/100)
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Supplying overseas wholesale distributors from Indian manufacturing base to minimize capital risk and protect margins.
            </p>
          </div>

          <button
            onClick={() => setActiveStage('stage3')}
            className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 group"
          >
            <span>Compare entry pathways</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 3. Prominent Three-Step Progress Section */}
      <section className="bg-white rounded-2xl border border-stone-200/90 p-7 sm:p-9 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Executive Decision Funnel
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900 mt-0.5">
              Three-Stage Structured Decision Flow
            </h2>
          </div>
          <div className="text-xs font-medium text-stone-500 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>All Stages Verified & Calibrated</span>
          </div>
        </div>

        {/* 3 Interactive Milestone Cards with Connecting Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* STEP 1 */}
          <div className="bg-[#fcfbf9] rounded-2xl border-2 border-emerald-900/15 p-6 hover:border-emerald-900 transition flex flex-col justify-between relative shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-amber-300">
                  STEP 1
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  7 Candidate Markets
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-md">
                <Globe2 className="w-8 h-8 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                  SCREEN MARKETS
                </h3>
                <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                  Compare 7 countries using weighted criteria.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-semibold text-stone-800">Key Criteria Evaluated:</div>
                <div className="text-stone-500">Demand (25%), Purchasing Power (20%), Tariffs, Logistics.</div>
              </div>
            </div>

            <button
              onClick={() => setActiveStage('stage1')}
              className="mt-6 w-full h-12 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
            >
              <span>Open Stage 1</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#fcfbf9] rounded-2xl border-2 border-emerald-900/15 p-6 hover:border-emerald-900 transition flex flex-col justify-between relative shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-amber-300">
                  STEP 2
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  Top 3 Shortlist
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-md">
                <Shield className="w-8 h-8 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                  ASSESS RISKS
                </h3>
                <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                  Evaluate the top 3 markets using PESTEL.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-semibold text-stone-800">6 Macro Pillars:</div>
                <div className="text-stone-500">Political stability, Economic power, Social, Tech, Eco, Legal.</div>
              </div>
            </div>

            <button
              onClick={() => setActiveStage('stage2')}
              className="mt-6 w-full h-12 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
            >
              <span>Open Stage 2</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* STEP 3 */}
          <div className="bg-[#fcfbf9] rounded-2xl border-2 border-emerald-900/15 p-6 hover:border-emerald-900 transition flex flex-col justify-between relative shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-amber-300">
                  STEP 3
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  Final Recommendation
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-md">
                <Target className="w-8 h-8 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                  CHOOSE ENTRY MODE
                </h3>
                <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                  Compare entry strategies and make a final recommendation.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-semibold text-stone-800">5 Entry Pathways Compared:</div>
                <div className="text-stone-500">Direct Export, Joint Venture, Licensing, Wholly Owned, etc.</div>
              </div>
            </div>

            <button
              onClick={() => setActiveStage('stage3')}
              className="mt-6 w-full h-12 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
            >
              <span>Open Stage 3</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Plain English Explanations Guide (Expandable for MBA presentation) */}
      <section className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm">
        <button
          onClick={() => setShowJargonGuide(!showJargonGuide)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-900 transition">
                Plain English Explanations: Concepts Made Simple
              </h3>
              <p className="text-xs text-stone-500">
                Understand Weighted Scores, PESTEL Risk Factors, Entry Modes, and Bias Audits in simple terms.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-stone-100 text-stone-600 group-hover:bg-emerald-50 group-hover:text-emerald-900 transition">
            {showJargonGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showJargonGuide && (
          <div className="mt-5 pt-5 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700 animate-in fade-in duration-200">
            <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-800" />
                <span>What is a "Weighted Score"?</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Not all factors matter equally to a business. A weighted score multiplies each country's rating by how important that criterion is (for example, Market Demand is given 25% importance, while Business Potential is 5%). This produces a single, objective composite number out of 100.
              </p>
            </div>

            <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-800" />
                <span>What is "PESTEL Analysis"?</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                PESTEL stands for the 6 big external environmental factors outside a company's direct control: <strong>Political</strong>, <strong>Economic</strong>, <strong>Social</strong>, <strong>Technological</strong>, <strong>Environmental</strong> (e.g. sub-zero winter temperatures), and <strong>Legal</strong>. Assessing them ensures the company doesn't enter a high-demand market only to be crippled by political instability or tariffs.
              </p>
            </div>

            <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-800" />
                <span>What are "Entry Modes"?</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                An entry mode is how a company actually sells goods in a foreign country. For an Indian SME apparel manufacturer:
                <br />
                • <strong>Direct Exporting</strong>: Selling directly to overseas retailers from your home factory (Low capital, high control).
                <br />
                • <strong>Joint Venture</strong>: Partnering 50/50 with a local company (Shared risk, shared profits).
                <br />
                • <strong>Wholly Owned Subsidiary</strong>: Opening your own foreign shops/warehouses (Very expensive, highest risk).
              </p>
            </div>

            <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <span>Why is a "Bias Audit Lab" included?</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                AI and algorithmic decision models can develop "heuristics" or biases (for example, always recommending the richest country regardless of climate, or always recommending direct export even when local manufacturing is legally required). The Bias Audit tests 10 diverse product categories to ensure recommendations change based on genuine market dynamics.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 5. Quick Links to Other Key Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveStage('bias_audit')}
          className="p-5 rounded-xl bg-white border border-stone-200 hover:border-emerald-800 transition cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
              Verification Lab
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
              {testedCount}/{totalCategories} Tested
            </span>
          </div>
          <h4 className="font-bold text-stone-900 text-base mt-2 group-hover:text-emerald-900">
            🔍 Bias Testing & Audit Lab
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Test 10 diverse product categories to detect algorithmic bias and log live model outputs.
          </p>
        </div>

        <div
          onClick={() => setActiveStage('dev_log')}
          className="p-5 rounded-xl bg-white border border-stone-200 hover:border-emerald-800 transition cursor-pointer shadow-sm group"
        >
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
            Model Evolution
          </div>
          <h4 className="font-bold text-stone-900 text-base mt-2 group-hover:text-emerald-900">
            📝 Development Log
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Review algorithmic iterations, weight sensitivity calibration, and verified bug fixes.
          </p>
        </div>

        <div
          onClick={() => setActiveStage('presentation')}
          className="p-5 rounded-xl bg-white border border-stone-200 hover:border-emerald-800 transition cursor-pointer shadow-sm group"
        >
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
            Academic Defense
          </div>
          <h4 className="font-bold text-stone-900 text-base mt-2 group-hover:text-emerald-900">
            📋 Presentation Summary
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Executive slides, evaluation talking points, and Q&A defense material for an MBA panel.
          </p>
        </div>
      </section>
    </div>
  );
};
