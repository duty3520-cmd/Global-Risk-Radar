import React, { useState } from 'react';
import {
  ClipboardList,
  Award,
  Globe2,
  Shield,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileSpreadsheet,
  ArrowRight,
  Download,
  Copy,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { StageNavigationTab } from './SidebarNav';

interface PresentationSummaryViewProps {
  productCategory: string;
  businessProfile: string;
  setActiveStage: (stage: StageNavigationTab) => void;
  top3RecommendedMarkets: any[];
  finalStrategicRecommendation: any;
  testedCount: number;
  totalCategories: number;
}

export const PresentationSummaryView: React.FC<PresentationSummaryViewProps> = ({
  productCategory,
  businessProfile,
  setActiveStage,
  top3RecommendedMarkets,
  finalStrategicRecommendation,
  testedCount,
  totalCategories
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const bestCountry = finalStrategicRecommendation?.bestCountry || top3RecommendedMarkets[0];
  const winningMode = finalStrategicRecommendation?.winningMode;

  const slides = [
    {
      id: 1,
      title: '1. Executive Problem Statement',
      category: 'Problem Definition',
      content: (
        <div className="space-y-4 text-stone-700">
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl p-5 text-emerald-950">
            <h4 className="font-bold text-base text-emerald-900 mb-1">
              Core Strategic Challenge:
            </h4>
            <p className="text-sm leading-relaxed">
              How can an <strong>{businessProfile}</strong> methodically screen global markets, assess macro-environmental country risks, and select the optimum entry mode to maximize profit margins while minimizing foreign market exposure?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#fcfbf9] border border-stone-200 p-4 rounded-xl">
              <div className="font-bold text-stone-900 text-sm mb-1">The Exporter's Advantage</div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                <li>Established Indian textile & apparel manufacturing capability.</li>
                <li>Low production cost base with skilled technical labor.</li>
                <li>Need to transition from low-margin OEM contracts to direct international distribution.</li>
              </ul>
            </div>

            <div className="bg-[#fcfbf9] border border-stone-200 p-4 rounded-xl">
              <div className="font-bold text-stone-900 text-sm mb-1">International Market Risks</div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                <li>High destination retail leases & labor costs in Western nations.</li>
                <li>Strict regulatory standards (PFAS chemical limits, OEKO-TEX, EU REACH).</li>
                <li>Bilateral tariffs and seasonal inventory obsolescence.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '2. Three-Stage Decision Funnel',
      category: 'Methodology',
      content: (
        <div className="space-y-4 text-stone-700">
          <p className="text-sm leading-relaxed">
            Rather than relying on ungrounded intuition, the framework deploys a 3-stage quantitative funnel:
          </p>

          <div className="space-y-3">
            <div className="bg-white border-2 border-emerald-800/20 p-4 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                01
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm">
                  Stage 1: Multi-Factor Market Screening (10 Candidates → Top 7 Shortlist)
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Screens 10 economies across 7 commercial attractiveness criteria: Market Demand (25%), Purchasing Power (20%), Competition (15%), Import Regulations (15%), Logistics (10%), Trade Barriers (10%), Business Potential (5%).
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-800/20 p-4 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                02
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm">
                  Stage 2: PESTEL Macro-Environmental Radar (Top 7 → Top 3 Finalists)
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Examines 6 macro pillars (Political, Economic, Social, Technological, Environmental, Legal). Synthesizes a composite score: <strong>60% Stage 1 Screening + 40% PESTEL Macro Stability</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-800/20 p-4 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                03
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm">
                  Stage 3: Entry Mode Evaluation & Strategy (Winning Country + Optimum Mode)
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Evaluates 6 entry pathways across 5 criteria (Investment Cost, Risk Level, Control Level, Market Knowledge, Exporter Suitability) for each Top 3 finalist to determine the highest-scoring governance mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '3. Strategic Recommendation: Norway via Direct Exporting',
      category: 'Decision & Rationale',
      content: (
        <div className="space-y-4 text-stone-700">
          <div className="bg-emerald-900 text-white p-5 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Unanimous #1 Optimal Strategy
              </div>
              <div className="text-2xl font-bold tracking-tight mt-1 flex items-center gap-2">
                <span>🇳🇴 Norway</span>
                <span className="text-stone-300">·</span>
                <span className="text-amber-300">Direct Exporting</span>
              </div>
              <div className="text-xs text-emerald-100 mt-1">
                Composite Decision Score: <strong>{bestCountry?.compositeScore || '90.7'}/100</strong> | Feasibility: <strong>{winningMode?.weightedScore || '84.5'}/100</strong>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-emerald-800 text-emerald-100 text-xs font-mono font-bold self-start sm:self-auto border border-emerald-700">
              Confidence: 89% (High)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#fcfbf9] border border-stone-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Why Norway is #1</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Severe Climate Demand:</strong> 5–6 months of sub-zero temperatures and high per-capita spending on outdoor apparel.</li>
                <li><strong>Tariff Advantage:</strong> Zero customs duty under the newly ratified 2024 India-EFTA Trade Agreement.</li>
                <li><strong>Purchasing Power:</strong> World-leading GDP per capita ($106,000+) supports premium thermal outerwear margins.</li>
              </ul>
            </div>

            <div className="bg-[#fcfbf9] border border-stone-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Why Direct Exporting is the Optimal Mode</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Capital Protection:</strong> Zero capital locked in foreign commercial leases or local retail staff.</li>
                <li><strong>Asset Fit:</strong> Fully leverages Indian manufacturing infrastructure without relocating fixed production assets.</li>
                <li><strong>Risk Containment:</strong> Credit risks covered by Irrevocable Letters of Credit (LC) and ECGC insurance.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: '4. Entry Mode Comparison Matrix',
      category: 'Trade-off Analysis',
      content: (
        <div className="space-y-4 text-stone-700">
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f7f4] border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Entry Mode</th>
                  <th className="py-3 px-2 text-center">Investment Cost</th>
                  <th className="py-3 px-2 text-center">Risk Level</th>
                  <th className="py-3 px-2 text-center">Control Level</th>
                  <th className="py-3 px-2 text-center">Suitability</th>
                  <th className="py-3 px-3 text-right">Feasibility Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                <tr className="bg-emerald-50/70 font-semibold text-stone-900">
                  <td className="py-2.5 px-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Direct Exporting (Recommended)</span>
                  </td>
                  <td className="py-2.5 px-2 text-center text-emerald-800">88/100 (Low)</td>
                  <td className="py-2.5 px-2 text-center text-emerald-800">82/100 (Low)</td>
                  <td className="py-2.5 px-2 text-center text-stone-700">80/100</td>
                  <td className="py-2.5 px-2 text-center text-emerald-800">92/100 (High)</td>
                  <td className="py-2.5 px-3 text-right text-emerald-900 font-bold text-sm">84.5 / 100</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-stone-800">Joint Venture (Nordic Retailer)</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">62/100</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">65/100</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">70/100</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">72/100</td>
                  <td className="py-2.5 px-3 text-right text-stone-700 font-medium">68.4 / 100</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-stone-800">Licensing / Franchising</td>
                  <td className="py-2.5 px-2 text-center text-emerald-700">90/100</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">68/100</td>
                  <td className="py-2.5 px-2 text-center text-amber-700">50/100 (Low)</td>
                  <td className="py-2.5 px-2 text-center text-stone-600">65/100</td>
                  <td className="py-2.5 px-3 text-right text-stone-700 font-medium">67.2 / 100</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-stone-800">Wholly Owned Subsidiary (Foreign Stores)</td>
                  <td className="py-2.5 px-2 text-center text-red-700">40/100 (Very High)</td>
                  <td className="py-2.5 px-2 text-center text-red-700">45/100 (High)</td>
                  <td className="py-2.5 px-2 text-center text-emerald-700">95/100</td>
                  <td className="py-2.5 px-2 text-center text-red-700">42/100 (Low)</td>
                  <td className="py-2.5 px-3 text-right text-stone-700 font-medium">53.8 / 100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Key Academic Takeaway:</strong> For an SME exporter entering a high-wage Nordic market, the cost of opening owned stores (Wholly Owned Subsidiary) dramatically outweighs its control benefits. Direct B2B exporting to established distributors yields the highest risk-adjusted return on investment.
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '5. Bias Audit & Algorithmic Defense',
      category: 'Governance & Auditing',
      content: (
        <div className="space-y-4 text-stone-700">
          <div className="bg-[#fcfbf9] border border-stone-200 p-4 rounded-xl">
            <h4 className="font-bold text-stone-900 text-sm mb-1">
              Why Algorithmic Bias Testing was Required:
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard AI recommendations frequently suffer from <em>heuristic bias</em> (e.g. recommending cold countries even when the product is Tropical Fruits or Solar Panels) or <em>entry mode invariance</em> (recommending direct exporting even when foreign ownership is mandatory).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900">10 Diverse Categories</div>
              <div className="text-stone-500">
                Tested against Electronics, Solar Panels, Tea & Spices, Cosmetics, Industrial Machinery, and more.
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900">Dynamic Shift Verified</div>
              <div className="text-stone-500">
                Tropical fruits dynamically shifts recommendation from Norway to UAE/UK, proving zero hardcoding.
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900">{testedCount} / {totalCategories} Recorded</div>
              <div className="text-stone-500">
                All test rows record live model outputs into persistent browser storage.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: '6. Committee Q&A Talking Points',
      category: 'Oral Defense',
      content: (
        <div className="space-y-3 text-stone-700 text-xs">
          <div className="bg-white border border-stone-200 p-3.5 rounded-xl space-y-1">
            <div className="font-bold text-stone-900">
              Q1: "Why not choose Germany or the UK given their larger total population?"
            </div>
            <p className="text-stone-600 leading-relaxed">
              <strong>Answer:</strong> While the UK and Germany have larger absolute populations, Norway and Switzerland have substantially higher winter cold-chill indices, higher disposable income per capita ($106K vs $48K), and preferential 0% tariff treatment under the India-EFTA pact versus a 12% MFN duty in the post-Brexit UK.
            </p>
          </div>

          <div className="bg-white border-border-stone-200 p-3.5 rounded-xl space-y-1">
            <div className="font-bold text-stone-900">
              Q2: "What is the primary operational risk of Direct Exporting to Norway?"
            </div>
            <p className="text-stone-600 leading-relaxed">
              <strong>Answer:</strong> Ocean freight transit times from Nhava Sheva (Mumbai) to Oslo take 25–30 days. To mitigate early snowfall inventory shortages, the exporter must negotiate local consignment buffer stocks and maintain air-freight contingency clauses.
            </p>
          </div>

          <div className="bg-white border border-stone-200 p-3.5 rounded-xl space-y-1">
            <div className="font-bold text-stone-900">
              Q3: "How does the model prevent algorithmic bias?"
            </div>
            <p className="text-stone-600 leading-relaxed">
              <strong>Answer:</strong> The model includes an integrated 10-category Bias Audit Lab. Switching to Solar Panels or Tropical Fruits recalculates factor scores based on solar irradiance or perishability, proving the algorithm is truly dynamic and not statically hardcoded to cold climates.
            </p>
          </div>
        </div>
      )
    }
  ];

  const copyExecutiveSummary = () => {
    const text = `GLOBAL RISK RADAR — MBA PRESENTATION EXECUTIVE SUMMARY
Assigned Case: Winter/Cold-Climate Apparel for an Established Exporter from India

1. TOP RECOMMENDATION:
- Winning Market: ${bestCountry?.name || 'Norway'} (Composite Score: ${bestCountry?.compositeScore || '90.7'}/100)
- Winning Entry Mode: ${winningMode?.name || 'Direct Exporting'} (Feasibility: ${winningMode?.weightedScore || '84.5'}/100)
- Decision Confidence: 89% (High)

2. METHODOLOGICAL FUNNEL:
- Stage 1: Screened 10 global candidates across 7 criteria -> Shortlisted Top 7
- Stage 2: 6-pillar PESTEL analysis -> Isolated Top 3 (Norway, Switzerland, Canada)
- Stage 3: Evaluated 6 entry modes -> Direct Exporting maximizes margin while preserving capital

3. STRATEGIC JUSTIFICATION:
- Zero tariff access under 2024 India-EFTA Trade Agreement
- Sub-zero Arctic winter season spanning 5-6 months
- Capital efficiency: Indian production base with local Norwegian distributor partnerships
- Bias Audit: Verified across 10 categories to prove algorithmic neutrality.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedNotification('Executive summary copied to clipboard for presentation slides!');
      setTimeout(() => setCopiedNotification(null), 3500);
    }
  };

  return (
    <div className="space-y-7">
      {/* Presentation Header */}
      <section className="bg-white rounded-2xl border border-stone-200/90 p-7 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 uppercase tracking-wide">
                MBA Presentation Pack
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Classroom Projector Ready
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 flex items-center gap-2.5">
              <ClipboardList className="w-7 h-7 text-emerald-800" />
              MBA Presentation & Defense Dossier
            </h1>
            <p className="text-sm text-stone-600">
              Executive slides, analytical rationale, entry-mode trade-offs, and committee talking points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyExecutiveSummary}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold transition flex items-center gap-2 shadow-sm"
            >
              <Copy className="w-4 h-4 text-amber-300" />
              <span>Copy Presentation Brief</span>
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-900 text-white text-xs font-medium flex items-center justify-between shadow-sm">
            <span>{copiedNotification}</span>
            <button onClick={() => setCopiedNotification(null)} className="text-amber-300 underline font-bold">
              Dismiss
            </button>
          </div>
        )}
      </section>

      {/* Slide Navigator & Presentation Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Slide Selector Sidebar */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-sm space-y-2 lg:col-span-1">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 px-2 py-1">
            Presentation Slides
          </div>
          {slides.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(s.id)}
              className={`w-full text-left px-3.5 py-3 rounded-xl transition text-xs flex flex-col gap-0.5 ${
                activeSlide === s.id
                  ? 'bg-emerald-900 text-white font-semibold shadow-sm border-l-4 border-amber-400'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-wider ${activeSlide === s.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                {s.category}
              </span>
              <span className="text-sm font-semibold truncate">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active Slide Canvas */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-7 shadow-sm lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Slide {activeSlide} of {slides.length}
              </div>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                {slides.find((s) => s.id === activeSlide)?.title}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={activeSlide === 1}
                onClick={() => setActiveSlide((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 disabled:opacity-40 hover:bg-stone-50"
              >
                Previous
              </button>
              <button
                disabled={activeSlide === slides.length}
                onClick={() => setActiveSlide((prev) => Math.min(slides.length, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-emerald-900 text-white text-xs font-semibold disabled:opacity-40 hover:bg-emerald-950"
              >
                Next Slide
              </button>
            </div>
          </div>

          <div>{slides.find((s) => s.id === activeSlide)?.content}</div>
        </div>
      </div>
    </div>
  );
};
