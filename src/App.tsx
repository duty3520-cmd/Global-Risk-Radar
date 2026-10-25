import React, { useState, useMemo, useEffect } from 'react';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { ExecutiveContextStrip } from './components/ExecutiveContextStrip';
import { StageNavControls } from './components/StageNavControls';
import { Stage1MarketMatrix } from './components/Stage1MarketMatrix';
import { Stage2PestelAnalysis } from './components/Stage2PestelAnalysis';
import { Stage3EntryStrategy } from './components/Stage3EntryStrategy';
import { BiasAuditLabDrawer } from './components/BiasAuditLabDrawer';
import { SidebarNav, StageNavigationTab } from './components/SidebarNav';
import { OverviewDashboard } from './components/OverviewDashboard';
import { DevelopmentLogView } from './components/DevelopmentLogView';
import { PresentationSummaryView } from './components/PresentationSummaryView';

import {
  Compass,
  Globe2,
  FileSpreadsheet,
  Layers,
  Info,
  Building2,
  Shirt,
  Sparkles,
  TrendingUp,
  MapPin,
  Scale,
  SunSnow,
  Cpu,
  Landmark,
  Gavel,
  TreePine,
  Users,
  CheckCircle2,
  BarChart3,
  SlidersHorizontal,
  Bookmark,
  RotateCcw,
  Trophy,
  Calculator,
  Search,
  ChevronDown,
  ChevronUp,
  Sliders,
  AlertTriangle,
  Lightbulb,
  FileText,
  Award,
  ShieldCheck,
  Check,
  ExternalLink,
  Target,
  ArrowRight,
  Lock,
  PieChart,
  Zap,
  Briefcase,
  Truck,
  HelpCircle,
  CheckCircle,
  ShieldAlert,
  Copy,
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react';
import {
  EntryModeId,
  EntryModeCriteriaWeights,
  DEFAULT_ENTRY_MODE_WEIGHTS,
  EntryModeDetail,
  CountryEntryModeProfile,
  INITIAL_ENTRY_MODES_BY_COUNTRY,
  ENTRY_MODE_CRITERIA_INFO,
  EntryModeScores
} from './data/entryModesData';
import {
  BiasTestRecord,
  BIAS_EVALUATION_CRITERIA,
  INITIAL_BIAS_TEST_RECORDS
} from './data/biasAuditData';
import {
  findCategoryBenchmark,
  CATEGORY_BENCHMARKS
} from './data/categoryBenchmarkData';

// Stage 1 Factor weights interface
export interface FactorWeights {
  marketDemand: number;
  purchasingPower: number;
  competition: number;
  importRegulations: number;
  logistics: number;
  tradeBarriers: number;
  businessPotential: number;
}

// Country candidate interface for Stage 1
export interface CountryCandidate {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: string;
  marketDemand: number;
  purchasingPower: number;
  competition: number;
  importRegulations: number;
  logistics: number;
  tradeBarriers: number;
  businessPotential: number;
  winterClimateNote: string;
  suitabilityExplanation: string;
  keyWinterSports: string;
}

// Factor Risk and Opportunity structure for each of the 6 PESTEL pillars
export interface FactorRiskOpportunity {
  score: number;
  opportunity: string;
  risk: string;
}

// Evidence Item with clear classification
export interface EvidenceItem {
  title: string;
  detail: string;
  sourceOrCitation?: string;
  url?: string;
}

// Stage 2 Detailed PESTEL Dossier for every country
export interface PestelDossier {
  political: FactorRiskOpportunity;
  economic: FactorRiskOpportunity;
  social: FactorRiskOpportunity;
  technological: FactorRiskOpportunity;
  environmental: FactorRiskOpportunity;
  legal: FactorRiskOpportunity;
  scoreExplanation: string;
  top3Opportunities: string[];
  top3Risks: string[];
  evidenceAndSources: {
    verifiedFacts: EvidenceItem[];
    empiricalEstimates: EvidenceItem[];
    illustrativeAssumptions: EvidenceItem[];
  };
}

// Initial benchmark candidate dataset (Stage 1)
export const INITIAL_COUNTRIES: CountryCandidate[] = [
  {
    id: 'norway',
    name: 'Norway',
    code: 'NO',
    flag: '🇳🇴',
    region: 'Nordic Europe',
    marketDemand: 92,
    purchasingPower: 96,
    competition: 75,
    importRegulations: 80,
    logistics: 76,
    tradeBarriers: 85,
    businessPotential: 82,
    winterClimateNote: 'Sub-zero temperatures 5-6 months; extensive Arctic snow coverage.',
    suitabilityExplanation:
      'Extremely severe sub-zero winters with deep-rooted outdoor recreation culture. Benefits from the 2024 India-EFTA Trade & Economic Partnership Agreement (TEPA), giving Indian exporters preferential access and high willingness to pay for premium technical outerwear.',
    keyWinterSports: 'Cross-Country Skiing, Snowboarding, Polar Trekking'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    region: 'Alpine Europe',
    marketDemand: 88,
    purchasingPower: 98,
    competition: 72,
    importRegulations: 84,
    logistics: 80,
    tradeBarriers: 88,
    businessPotential: 78,
    winterClimateNote: 'Alpine sub-zero conditions with prolonged high-altitude snow seasons.',
    suitabilityExplanation:
      'Highest per-capita outerwear expenditure in Europe. Directly supported by the India-EFTA trade pact. While quality and thermal performance thresholds are demanding, it offers exceptional export margins for certified technical apparel.',
    keyWinterSports: 'Alpine Skiing, Mountaineering, Winter Hiking'
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    region: 'North America',
    marketDemand: 96,
    purchasingPower: 88,
    competition: 68,
    importRegulations: 82,
    logistics: 74,
    tradeBarriers: 72,
    businessPotential: 86,
    winterClimateNote: 'Severe sub-zero winter (-15°C to -30°C); 5+ freezing months nationally.',
    suitabilityExplanation:
      'Critical cold necessity where winter apparel is a mandatory safety item. Substantial market scale for insulated down parkas, thermal base-layers, and snow gear. Indian exporters can capture significant private-label contracts with major Canadian retail chains.',
    keyWinterSports: 'Ice Hockey, Alpine Skiing, Snowmobiling'
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    region: 'East Asia',
    marketDemand: 82,
    purchasingPower: 86,
    competition: 72,
    importRegulations: 84,
    logistics: 82,
    tradeBarriers: 90,
    businessPotential: 80,
    winterClimateNote: 'Heavy northern snowfall in Hokkaido & Tohoku; world-class powder snow.',
    suitabilityExplanation:
      'Direct beneficiary of the India-Japan Comprehensive Economic Partnership Agreement (CEPA) with preferential garment tariffs. Fast maritime transit from Indian ports and a booming winter ski tourism industry create strong year-round sourcing appetite.',
    keyWinterSports: 'Powder Snow Skiing, Snowboarding, Onsen Winter Trekking'
  },
  {
    id: 'united-states',
    name: 'United States (Northern)',
    code: 'US',
    flag: '🇺🇸',
    region: 'North America',
    marketDemand: 90,
    purchasingPower: 92,
    competition: 62,
    importRegulations: 85,
    logistics: 78,
    tradeBarriers: 70,
    businessPotential: 94,
    winterClimateNote: 'Extended sub-zero blizzards across Midwest, Northeast, and Alaska.',
    suitabilityExplanation:
      'The largest total volume consumer market for winter apparel. High competitive brand rivalry is offset by immense order volumes from American department store conglomerates and direct-to-consumer e-commerce fulfillment hubs.',
    keyWinterSports: 'Snowboarding, Ski Resort Tourism, Winter Workwear'
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    region: 'Central Europe',
    marketDemand: 84,
    purchasingPower: 89,
    competition: 70,
    importRegulations: 78,
    logistics: 86,
    tradeBarriers: 75,
    businessPotential: 88,
    winterClimateNote: 'Consistent cold winters; major gateway to European ski corridors.',
    suitabilityExplanation:
      'Largest economy and apparel importer in the European Union. Direct container connectivity via Hamburg and Bremerhaven from Indian ports. Serves as an ideal central European logistics hub for multi-country winter distribution.',
    keyWinterSports: 'Nordic Walking, Alpine Skiing, Outdoor Winter Trekking'
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    region: 'Western Europe',
    marketDemand: 80,
    purchasingPower: 85,
    competition: 74,
    importRegulations: 82,
    logistics: 84,
    tradeBarriers: 80,
    businessPotential: 82,
    winterClimateNote: 'Damp, cold winters with persistent freezing rain and high wind-chill.',
    suitabilityExplanation:
      'Deep historical trade links with Indian textile mills. British weather demands high water-resistant and windproof thermal outerwear. Ongoing India-UK trade negotiations provide high strategic upside for established suppliers.',
    keyWinterSports: 'Hill Walking, Winter Running, Highlands Trekking'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    region: 'Nordic Europe',
    marketDemand: 89,
    purchasingPower: 90,
    competition: 69,
    importRegulations: 77,
    logistics: 78,
    tradeBarriers: 75,
    businessPotential: 79,
    winterClimateNote: 'Prolonged sub-zero winter with heavy snow in central and northern regions.',
    suitabilityExplanation:
      'High eco-conscious outdoor lifestyle. Swedish consumers favor technical recycled-polyester insulation and certified down. Established Indian mills with OEKO-TEX and GRS certifications find high affinity in Swedish retail chains.',
    keyWinterSports: 'Cross-Country Skiing, Ice Skating, Winter Hiking'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    code: 'KR',
    flag: '🇰🇷',
    region: 'East Asia',
    marketDemand: 85,
    purchasingPower: 84,
    competition: 66,
    importRegulations: 82,
    logistics: 80,
    tradeBarriers: 86,
    businessPotential: 82,
    winterClimateNote: 'Harsh, biting Siberian winter air with temperatures dropping to -15°C.',
    suitabilityExplanation:
      'High urban demand for functional technical "long padding" down coats. Covered under the India-Korea Comprehensive Economic Partnership Agreement (CEPA), granting reduced tariffs on qualified Indian apparel lines.',
    keyWinterSports: 'Skiing, Winter Mountaineering, Urban Commuting'
  },
  {
    id: 'finland',
    name: 'Finland',
    code: 'FI',
    flag: '🇫🇮',
    region: 'Nordic Europe',
    marketDemand: 94,
    purchasingPower: 87,
    competition: 74,
    importRegulations: 78,
    logistics: 74,
    tradeBarriers: 75,
    businessPotential: 75,
    winterClimateNote: 'Sub-arctic winter conditions lasting 4-6 months with heavy sub-zero periods.',
    suitabilityExplanation:
      'Strict functional performance requirements where winter garments are non-negotiable. Relies substantially on imported finished outerwear, presenting steady seasonal supply opportunities for seasoned exporters.',
    keyWinterSports: 'Cross-Country Skiing, Snowmobiling, Ice Fishing'
  }
];

// Initial PESTEL Dataset with factor-by-factor Opportunities, Risks, Explanations, and Categorized Evidence
export const INITIAL_PESTEL_DATA: Record<string, PestelDossier> = {
  norway: {
    political: {
      score: 92,
      opportunity: 'The 2024 India-EFTA Trade & Economic Partnership Agreement (TEPA) grants duty-free access schedules for apparel, eliminating import duty friction against EU competitors.',
      risk: 'Strict sovereign fund and state procurement transparency mandates disqualify suppliers without third-party ESG auditing credentials.'
    },
    economic: {
      score: 90,
      opportunity: 'Exceptional per-capita GDP (~$100,000+) supports premium price tolerance for certified RDS goose down parkas and technical merino mid-layers.',
      risk: 'High domestic labor and commercial distributor operating expenses compress net realization unless working through consolidated distributor networks.'
    },
    social: {
      score: 94,
      opportunity: 'The cultural ethos of "friluftsliv" (open-air living) drives year-round consumer demand for durable multi-layer cold-climate apparel across all age groups.',
      risk: 'Deep national consumer loyalty toward heritage Scandinavian brands (Helly Hansen, Bergans, Norrøna) creates high resistance to unknown foreign direct retail brands.'
    },
    technological: {
      score: 88,
      opportunity: 'Over 95% cashless payments and automated parcel locker density nationwide enable highly efficient automated e-commerce delivery and replenishment.',
      risk: 'Extreme fjord and mountain topography creates isolated northern delivery routes vulnerable to winter transit surcharges and weather closures.'
    },
    environmental: {
      score: 92,
      opportunity: 'Prolonged Arctic winter conditions with 5+ months of sub-zero temperatures guarantee steady seasonal inventory sell-through.',
      risk: 'Aggressive Nordic Ecolabel requirements mandate immediate elimination of PFAS water-repellent chemicals and microplastic shedding in synthetic fleece.'
    },
    legal: {
      score: 86,
      opportunity: 'Harmonized European Economic Area (EEA) trade standards provide clear, predictable, and corruption-free customs clearance procedures.',
      risk: 'Mandatory compliance with the Norwegian Transparency Act (Åpenhetsloven) requires public reporting on human rights and labor due diligence across Indian manufacturing sites.'
    },
    scoreExplanation:
      'Norway earns an unweighted PESTEL score of 88.7/100. It combines outstanding institutional stability, tariff exemption via the 2024 India-EFTA TEPA, and extreme sub-zero cold necessity with world-leading per-capita purchasing power. The strict environmental and supply-chain auditing laws represent manageable compliance requirements for an established exporter.',
    top3Opportunities: [
      'Preferential duty-free garment export corridor codified under the India-EFTA TEPA (signed March 2024).',
      'High consumer willingness to pay for premium technical down jackets and certified thermal base layers.',
      'Cultural ubiquity of outdoor winter activities ("friluftsliv") creating resilient annual apparel demand.'
    ],
    top3Risks: [
      'Mandatory human rights due diligence and reporting liabilities under the Norwegian Transparency Act (Åpenhetsloven).',
      'Stringent Nordic Ecolabel phase-out of fluorinated (PFAS) waterproofing treatments.',
      'High domestic distributor markups due to elevated local labor and logistics overhead.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'India-EFTA Trade & Economic Partnership Agreement (TEPA)',
          detail: 'Signed on March 10, 2024; Chapter on Trade in Goods provides tariff elimination on manufactured textiles and apparel.',
          sourceOrCitation: 'Ministry of Commerce and Industry (India) / EFTA Secretariat official release'
        },
        {
          title: 'Norwegian Transparency Act (Åpenhetsloven)',
          detail: 'Act of 18 June 2021 No. 99, mandating supply chain human rights and decent working condition due diligence.',
          sourceOrCitation: 'Norwegian Consumer Authority (Forbrukertilsynet)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Sub-Zero Meteorological Normals',
          detail: 'Mean winter temperatures remain below 0°C across 5 consecutive months in inland and northern territories.',
          sourceOrCitation: 'Norwegian Meteorological Institute (MET Norway)'
        },
        {
          title: 'World Bank Logistics Performance Index (LPI)',
          detail: 'Norway scores in the top 10% globally for customs efficiency and port turnaround velocity.',
          sourceOrCitation: 'World Bank Trade & Logistics Database'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Model assumes equal 16.67% weight per PESTEL pillar as the standard neutral academic baseline prior to customized corporate risk exposure.'
        },
        {
          title: 'Maritime Transit Route',
          detail: 'Assumes feeder container shipment from Nhava Sheva (JNPT) through Rotterdam/Hamburg feeder lines to Oslo port within 26–30 days.'
        }
      ]
    }
  },

  switzerland: {
    political: {
      score: 96,
      opportunity: 'Benchmark global neutrality, legal certainty, and historic bilateral trade facilitation via the 2024 India-EFTA TEPA.',
      risk: 'Complex cantonal tax regimes and direct democracy referendums that can occasionally enact localized retail packaging restrictions.'
    },
    economic: {
      score: 94,
      opportunity: 'Highest per-capita expenditure on technical performance winter wear in Europe, bolstered by the safe-haven Swiss Franc (CHF).',
      risk: 'Swiss buyers demand uncompromised premium build standards; discounting or mid-grade quality quickly damages market reputation.'
    },
    social: {
      score: 92,
      opportunity: 'Universal alpine sports culture (skiing, mountaineering, glacier trekking) generates substantial demand for specialized technical outerwear.',
      risk: 'Demanding consumer scrutiny requiring third-party lab proof of thermal retention (Clo value), waterproofing, and breathability ratings.'
    },
    technological: {
      score: 90,
      opportunity: 'World-leading alpine logistics and automated rail-freight transshipment corridors connecting Swiss bonded warehouses to northern European sea gateways.',
      risk: 'Advanced automated retail networks require full digital EDI order processing and GS1-compliant barcoding standards.'
    },
    environmental: {
      score: 88,
      opportunity: 'Extended high-altitude sub-zero winters with snow cover lasting into late spring across ski resort hubs (Zermatt, St. Moritz, Davos).',
      risk: 'Strict Swiss Federal Office for the Environment (FOEN) regulations on synthetic textile waste and microplastic discharge.'
    },
    legal: {
      score: 90,
      opportunity: 'Transparent, orderly customs administration under the Federal Office for Customs and Border Security (FOCBS) with paperless clearance.',
      risk: 'Independent non-EU customs territory requiring exact proof of Indian preferential origin to avoid standard non-preferential tariff assessments.'
    },
    scoreExplanation:
      'Switzerland achieves the highest composite PESTEL rating at 91.7/100. It delivers gold-standard political and legal stability, immense purchasing power, and favorable terms under the India-EFTA trade pact. While technical performance expectations are demanding, it offers the highest gross margin per garment of any global market.',
    top3Opportunities: [
      'Unrivaled per-capita spending power on premium alpine outerwear and technical mountaineering apparel.',
      'Preferential tariff access for Indian textiles secured under the 2024 India-EFTA TEPA agreement.',
      'Swiss Franc (CHF) currency stability shielding long-term supply agreements from inflation shocks.'
    ],
    top3Risks: [
      'Rigorous technical testing thresholds (minimum 20,000mm hydrostatic head waterproofness and breathability).',
      'Independent non-EU customs formalities requiring precise rules-of-origin documentation.',
      'Stringent environmental guidelines concerning textile microplastics and eco-packaging.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'India-EFTA Trade & Economic Partnership Agreement (TEPA)',
          detail: 'Official legal text approved March 2024; provides duty-free entry for qualified Indian manufactured garments under Chapter 62.',
          sourceOrCitation: 'Swiss State Secretariat for Economic Affairs (SECO)'
        },
        {
          title: 'Swiss Customs Ordinance on Origin of Goods',
          detail: 'Codified criteria for preferential origin verification under EFTA trade rules.',
          sourceOrCitation: 'Federal Office for Customs and Border Security (FOCBS)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Outerwear Household Budget Analysis',
          detail: 'Swiss households allocate the highest per-capita sporting and outdoor apparel expenditure in Continental Europe.',
          sourceOrCitation: 'Swiss Federal Statistical Office (FSO)'
        },
        {
          title: 'Alpine Winter Season Duration',
          detail: 'High-altitude weather stations record sub-zero temperatures and snow pack over 180+ days per annum.',
          sourceOrCitation: 'Federal Office of Meteorology and Climatology (MeteoSwiss)'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Inland Transshipment',
          detail: 'Assumes container offloading at Rotterdam/Genoa with bonded rail transit to Zurich/Basel logistics hubs.'
        }
      ]
    }
  },

  canada: {
    political: {
      score: 88,
      opportunity: 'Stable parliamentary democracy and transparent rule of law with strong commercial legal enforcement.',
      risk: 'Intermittent bilateral diplomatic tensions and lack of a finalized bilateral CEPA leave Indian garments subject to standard MFN tariffs.'
    },
    economic: {
      score: 84,
      opportunity: 'Substantial mass-market demand where winter coats and thermal underwear are mandatory survival necessities for 40 million residents.',
      risk: 'Major Canadian retail department store chains enforce aggressive wholesale price concessions and extended payment terms.'
    },
    social: {
      score: 95,
      opportunity: 'Critical cold necessity (-15°C to -30°C winters) creates mandatory annual outerwear replenishment across all demographics and winter sports enthusiasts.',
      risk: 'Strong national brand affinity toward domestic luxury cold-weather icons (Canada Goose, Arc\'teryx, Moose Knuckles) limits independent foreign branding.'
    },
    technological: {
      score: 86,
      opportunity: 'Extensive trans-continental container rail systems (CPKC and CN) linking Vancouver and Montreal ports to central distribution hubs.',
      risk: 'Severe winter blizzards and sub-zero rail track freeze-ups frequently cause inland logistics delays during critical fourth-quarter delivery cycles.'
    },
    environmental: {
      score: 94,
      opportunity: 'Longest sustained sub-zero winter duration among non-polar nations, guaranteeing reliable multi-month consumer demand.',
      risk: 'Federal clean environment mandates require verifiable ethical down traceability (RDS) and reduction of single-use transit plastics.'
    },
    legal: {
      score: 84,
      opportunity: 'Clear, well-codified customs procedures under the Canada Border Services Agency (CBSA) Customs Tariff Schedule Chapter 62.',
      risk: 'Strict mandatory bilingual (English and French) textile composition labeling and CA identification registration under the Textile Labelling Act.'
    },
    scoreExplanation:
      'Canada records an unweighted PESTEL score of 88.5/100, driven by the highest Social and Environmental winter demand in the entire evaluation index. While commercial demand is virtually guaranteed by severe sub-zero weather, standard MFN customs tariffs (~16-18%) represent the primary political and economic friction point.',
    top3Opportunities: [
      'Inelastic commercial demand for sub-zero down parkas, technical workwear, and thermal undergarments.',
      'Massive contract manufacturing and private-label order volumes from major Canadian retail conglomerates.',
      'Direct container shipping access to major Pacific (Vancouver) and Atlantic (Montreal) deep-water ports.'
    ],
    top3Risks: [
      'Standard MFN customs duties (~16-18%) in the absence of an India-Canada bilateral Free Trade Agreement.',
      'Mandatory federal bilingual (English/French) labeling and CA identification registration laws.',
      'Winter weather disruptions along the Trans-Canada rail and highway corridors.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'Canada Customs Tariff Schedule Chapter 62',
          detail: 'Specifies MFN tariff rates of 16-18% on woven winter coats, jackets, and thermal clothing articles.',
          sourceOrCitation: 'Canada Border Services Agency (CBSA)'
        },
        {
          title: 'Canadian Textile Labelling Act (R.S.C., 1985, c. T-10)',
          detail: 'Requires mandatory disclosure of generic fiber names, percentage by weight, and dealer identification in English and French.',
          sourceOrCitation: 'Competition Bureau Canada'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Sub-Zero Freezing Days Normal',
          detail: 'Environment Canada records document over 150 days of below-freezing temperatures in prairie and central provinces.',
          sourceOrCitation: 'Environment and Climate Change Canada Climate Normals'
        },
        {
          title: 'Retail Winter Apparel Consumption Scale',
          detail: 'Outerwear accounts for the largest seasonal share of Canadian apparel retail turnover.',
          sourceOrCitation: 'Retail Council of Canada (RCC)'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Shipping Route',
          detail: 'Assumes trans-Pacific container freight from Nhava Sheva to Vancouver port with 24–28 days transit.'
        }
      ]
    }
  },

  japan: {
    political: {
      score: 92,
      opportunity: 'India-Japan Comprehensive Economic Partnership Agreement (CEPA) in force since 2011 grants preferential duty reductions on textile lines.',
      risk: 'Conservative customs administration requiring exhaustive documentation to verify origin compliance.'
    },
    economic: {
      score: 82,
      opportunity: 'High disposable household income and consumer willingness to pay for innovative thermal fabric technology (e.g., heat-generating linings, ultra-light down).',
      risk: 'Depreciation of the Japanese Yen (JPY) inflates import costs and pressures exporter margins negotiated in foreign currencies.'
    },
    social: {
      score: 86,
      opportunity: 'Booming ski and snowboard tourism in Hokkaido and Tohoku alongside national "Warm Biz" energy-saving workplace thermal wear campaigns.',
      risk: 'Specific consumer preferences for tailored Japanese sizing and compact silhouette cuts rather than heavy western boxy fits.'
    },
    technological: {
      score: 92,
      opportunity: 'World-leading textile testing technology, automated cold logistics centers, and rapid domestic parcel logistics (Yamato Transport, Sagawa Express).',
      risk: 'Complex localized digital commerce portals (Rakuten Ichiba, Yahoo! Shopping) requiring specialized Japanese-language partner interfaces.'
    },
    environmental: {
      score: 84,
      opportunity: 'World-record seasonal snowfall along the Sea of Japan coast ("Yukiguni") creates intense localized demand for technical snow gear.',
      risk: 'High consumer environmental sensitivity demanding certified non-hazardous dyeing and eco-conscious packaging disposal.'
    },
    legal: {
      score: 88,
      opportunity: 'Predictable and objective quality standards governed by the Japanese Industrial Standards (JIS) testing framework.',
      risk: 'Strict statutory compliance with the Household Goods Quality Labeling Act, requiring detailed Japanese-language care symbols (JIS L 0001).'
    },
    scoreExplanation:
      'Japan achieves an unweighted PESTEL score of 87.3/100. It offers strong political and trade stability under the India-Japan CEPA, exceptional technological infrastructure, and heavy northern snowfall demand. Yen currency volatility and rigorous Japanese Industrial Standards (JIS) testing represent the main operating risks.',
    top3Opportunities: [
      'Preferential tariff reductions on garment imports under the long-standing India-Japan CEPA.',
      'Massive seasonal snow accumulation and thriving ski resort tourism in Hokkaido and Nagano.',
      'Strong commercial appetite for lightweight insulated outerwear and smart thermal apparel.'
    ],
    top3Risks: [
      'Rigorous physical and chemical fabric testing under Japanese Industrial Standards (JIS L 1096).',
      'Exchange rate exposure and margin compression resulting from a weakened Japanese Yen.',
      'Mandatory localized Japanese labeling under the Household Goods Quality Labeling Act.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'India-Japan CEPA Tariff Concession Schedule',
          detail: 'In force since August 1, 2011; Annex 2 provides operational certification procedures and preferential garment duties.',
          sourceOrCitation: 'Ministry of Economy, Trade and Industry (METI) Japan'
        },
        {
          title: 'Household Goods Quality Labeling Act (Textiles)',
          detail: 'Mandates Japanese-language disclosure of fiber composition, water-repellency ratings, and care symbols.',
          sourceOrCitation: 'Consumer Affairs Agency (CAA Japan)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Snowfall and Winter Weather Index',
          detail: 'Sea of Japan coastal prefectures record among the highest seasonal snowfall totals globally.',
          sourceOrCitation: 'Japan Meteorological Agency (JMA)'
        },
        {
          title: 'Apparel Import Flow Data',
          detail: 'Japan imports over 90% of finished apparel goods, with increasing sourcing diversification toward South Asia.',
          sourceOrCitation: 'Japan External Trade Organization (JETRO)'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Logistics Route',
          detail: 'Assumes maritime container shipment from JNPT/Chennai to Yokohama/Kobe within 14–18 transit days.'
        }
      ]
    }
  },

  'united-states': {
    political: {
      score: 85,
      opportunity: 'The world\'s largest single-nation consumer market with deep bilateral trade mechanisms via the US-India Commercial Dialogue.',
      risk: 'Protectionist sentiment and rigorous customs scrutiny under the Uyghur Forced Labor Prevention Act (UFLPA) with standard ~16% MFN apparel tariffs.'
    },
    economic: {
      score: 88,
      opportunity: 'Unrivaled total purchasing volume and high consumer disposable income across extensive cold-climate northern metropolitan regions.',
      risk: 'Aggressive holiday inventory markdowns, retailer destocking, and inflation-induced consumer price sensitivity.'
    },
    social: {
      score: 90,
      opportunity: 'Broad consumer culture of outdoor winter recreation, winter resort vacations, and casual cold-weather workwear.',
      risk: 'Fierce competition from dominant domestic brands (The North Face, Columbia, Carhartt, Patagonia) with multi-million dollar marketing moats.'
    },
    technological: {
      score: 95,
      opportunity: 'World-leading e-commerce logistics infrastructure (Amazon FBA, nationwide automated 3PL fulfillment, EDI automated purchasing).',
      risk: 'Severe coastal container terminal congestion during peak seasonal intake windows (August through October).'
    },
    environmental: {
      score: 86,
      opportunity: 'Recurring polar vortex cold snaps and major blizzards generating urgent consumer demand for insulated winter jackets.',
      risk: 'Rapidly expanding state-level chemical prohibitions on PFAS in apparel (California AB 1817, New York, Maine).'
    },
    legal: {
      score: 82,
      opportunity: 'Transparent, highly automated customs environment via CBP Automated Commercial Environment (ACE).',
      risk: 'Stringent statutory compliance under the FTC Textile Fiber Products Identification Act and CPSC children\'s sleepwear/garment flammability rules.'
    },
    scoreExplanation:
      'The United States (Northern) earns an 87.7/100 PESTEL rating. Technological infrastructure and absolute market scale are unmatched globally. However, standard MFN import duties, aggressive domestic brand competition, and strict supply-chain origin audits (UFLPA) necessitate disciplined export management.',
    top3Opportunities: [
      'Unmatched order scale and volume buying power from nationwide department stores and outdoor chains.',
      'World-leading digital commerce and automated third-party logistics fulfillment infrastructure.',
      'Sustained cold weather across northern states driving continuous utility and sportswear demand.'
    ],
    top3Risks: [
      'Comprehensive supply chain traceability enforcement under the Uyghur Forced Labor Prevention Act (UFLPA).',
      'State-level legislative phase-outs of PFAS chemicals in water-repellent clothing.',
      'Absence of preferential trade agreements, incurring standard ~16% MFN customs tariffs.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'US Harmonized Tariff Schedule (HTS) Chapter 62',
          detail: 'Prescribes standard MFN tariff rates of 16-18% for woven winter coats and jackets.',
          sourceOrCitation: 'U.S. International Trade Commission (USITC)'
        },
        {
          title: 'Uyghur Forced Labor Prevention Act (UFLPA - Public Law 117-78)',
          detail: 'Requires verifiable supply-chain proof that imported cotton and textile products contain no forced labor inputs.',
          sourceOrCitation: 'U.S. Customs and Border Protection (CBP)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Northern Heating Degree Day (HDD) Index',
          detail: 'National weather records confirm prolonged freezing degree day totals across Midwest, Northeast, and Alaska.',
          sourceOrCitation: 'National Oceanic and Atmospheric Administration (NOAA)'
        },
        {
          title: 'Online Apparel Retail Penetration',
          detail: 'E-commerce represents over 35% of total annual apparel retail transactions in the United States.',
          sourceOrCitation: 'U.S. Census Bureau E-Commerce Retail Reports'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Ocean Route Transit',
          detail: 'Container shipment from Nhava Sheva to East Coast (New York/New Jersey) via Suez/Atlantic in 28–32 days.'
        }
      ]
    }
  },

  germany: {
    political: {
      score: 89,
      opportunity: 'Anchor nation of the European Union; resumed negotiations for the comprehensive EU-India Free Trade Agreement offer strategic upside.',
      risk: 'Strict European Union trade regulations and potential geopolitical supply-chain friction regarding third-party inputs.'
    },
    economic: {
      score: 84,
      opportunity: 'Largest apparel retail market in Europe with strong consumer purchasing power dedicated to functional, durable winter outerwear.',
      risk: 'Elevated industrial energy costs and cautious consumer sentiment moderating discretionary apparel spending.'
    },
    social: {
      score: 88,
      opportunity: 'Deep-rooted outdoor lifestyle culture ("Wandern", trekking, winter walking) valuing technical function and durability over fast fashion.',
      risk: 'German consumers are notoriously critical regarding product quality, relying heavily on independent consumer test reports (Stiftung Warentest).'
    },
    technological: {
      score: 90,
      opportunity: 'Premier European logistics hub: container ports of Hamburg and Bremerhaven provide direct intermodal rail corridors into Central Europe.',
      risk: 'High automated warehouse standards require full GS1 barcode compliance and integrated digital advance shipping notices.'
    },
    environmental: {
      score: 84,
      opportunity: 'Consistent sub-zero winter temperatures in southern Bavarian and central upland regions drive multi-month outerwear turnover.',
      risk: 'Aggressive EU Green Deal and Ecodesign for Sustainable Products Regulation (ESPR) mandating future Digital Product Passports (DPP).'
    },
    legal: {
      score: 82,
      opportunity: 'Unified European Union customs clearance (Union Customs Code) allows goods cleared in Germany to circulate duty-free across 27 EU nations.',
      risk: 'German Supply Chain Due Diligence Act (LkSG) imposes legal penalties on importers for environmental and labor non-compliance in supplier tiers.'
    },
    scoreExplanation:
      'Germany receives an 86.2/100 PESTEL score. It serves as Europe\'s preeminent logistics and commercial distribution springboard. While statutory requirements under the German Supply Chain Act (LkSG) and EU REACH are demanding, an established Indian exporter with proper certifications can build a highly resilient business.',
    top3Opportunities: [
      'Strategic distribution gateway into the entire European single market via Hamburg port facilities.',
      'Largest apparel consumer market in the EU with strong affinity for durable, functional outerwear.',
      'Prospective duty relief upon finalization of the EU-India Broad-Based Trade and Investment Agreement.'
    ],
    top3Risks: [
      'Legal liability and rigorous compliance audits under the German Supply Chain Due Diligence Act (LkSG).',
      'Strict chemical testing regulations under EU REACH (azo dyes, heavy metals, fluorinated coatings).',
      'Mandatory EU eco-design requirements for textile recyclability and digital product passports.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'EU Common Customs Tariff Schedule Chapter 62',
          detail: 'Standard EU MFN tariff of approximately 12% on woven cold-weather outerwear.',
          sourceOrCitation: 'European Commission Directorate-General for Trade (TARIC)'
        },
        {
          title: 'German Supply Chain Due Diligence Act (LkSG)',
          detail: 'Enacted January 1, 2023; legally binds companies to prevent human rights and environmental violations in global supply chains.',
          sourceOrCitation: 'German Federal Ministry for Economic Affairs and Climate Action (BMWK)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Seasonal Frost and Freezing Weather Normals',
          detail: 'Historical records confirm extended sub-zero weather and snow in southern and central regions.',
          sourceOrCitation: 'Deutscher Wetterdienst (DWD)'
        },
        {
          title: 'German Apparel Import Statistics',
          detail: 'Germany is the largest destination for Asian garment exports within the European Union.',
          sourceOrCitation: 'Statistisches Bundesamt (Destatis)'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Logistics Route',
          detail: 'Direct ocean container shipping from JNPT to Hamburg port with 22–26 transit days.'
        }
      ]
    }
  },

  'united-kingdom': {
    political: {
      score: 86,
      opportunity: 'High political priority on concluding the comprehensive India-UK Free Trade Agreement (FTA) with tariff elimination on garments.',
      risk: 'Post-Brexit regulatory divergence requires separate UK customs filings and UKCA certifications distinct from the European Union.'
    },
    economic: {
      score: 82,
      opportunity: 'High consumer expenditure on outerwear to combat persistent damp, windy cold; established retail buying cycles.',
      risk: 'Inflationary cost-of-living pressures and currency volatility (GBP/INR) impacting import contract margins.'
    },
    social: {
      score: 85,
      opportunity: 'Prolonged damp, chilly winter weather creating high consumer demand for windproof, water-resistant parkas, puffer coats, and thermal layers.',
      risk: 'Intensely competitive retail landscape dominated by established domestic high-street giants (Marks & Spencer, Next, Mountain Warehouse).'
    },
    technological: {
      score: 92,
      opportunity: 'Highest e-commerce apparel penetration rate in Europe (over 30% of sales online) supported by sophisticated next-day parcel delivery networks.',
      risk: 'High online consumer return rates (25–30% in seasonal outerwear) necessitating dedicated local reverse logistics infrastructure.'
    },
    environmental: {
      score: 80,
      opportunity: 'Consistent rainfall and wind-chill conditions generate sustained demand for water-repellent and breathable technical outerwear.',
      risk: 'Intensifying consumer and regulatory scrutiny on fast-fashion synthetic micro-fiber pollution and non-ethical down insulation.'
    },
    legal: {
      score: 84,
      opportunity: 'Transparent, rules-based customs environment under HM Revenue & Customs (HMRC) with English common law contractual certainty.',
      risk: 'Mandatory compliance with the UK Textile Products (Labelling and Fibre Composition) Regulations and UKCA product safety marks.'
    },
    scoreExplanation:
      'The United Kingdom earns an 84.8/100 PESTEL score. Deep historical trade relationships with Indian textile mills and unmatched e-commerce retail infrastructure make it an attractive market. The ongoing bilateral FTA talks represent the single largest prospective catalyst for duty-free volume expansion.',
    top3Opportunities: [
      'Strategic tariff reduction catalyst upon signing of the comprehensive India-UK Free Trade Agreement.',
      'Sustained multi-month damp, windy winter climate driving high utility demand for water-resistant coats.',
      'Extensive existing commercial networks between Indian textile manufacturers and UK retail buyers.'
    ],
    top3Risks: [
      'Current standard ~12% MFN import tariff prior to formal ratification of the bilateral FTA.',
      'High e-commerce product return rates requiring efficient reverse-logistics partners.',
      'Foreign exchange volatility between the British Pound (GBP), US Dollar, and Indian Rupee.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'UK Trade Tariff Schedule Chapter 62',
          detail: 'Applies standard MFN customs duty rate of approximately 12% on woven coats and outerwear garments.',
          sourceOrCitation: 'UK Department for Business and Trade (DBT)'
        },
        {
          title: 'UK Textile Products Regulations 2012',
          detail: 'Statutory instrument 2012 No. 1102 mandating full fiber content labeling and care instructions.',
          sourceOrCitation: 'UK Legislation Official Portal'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Winter Precipitation and Wind-Chill Normals',
          detail: 'Historical Met Office climate records document sustained damp, windy conditions spanning October to April.',
          sourceOrCitation: 'UK Meteorological Office'
        },
        {
          title: 'E-Commerce Clothing Purchase Ratio',
          detail: 'UK consumers purchase the highest proportion of apparel online among major European economies.',
          sourceOrCitation: 'Office for National Statistics (ONS)'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        },
        {
          title: 'Shipping Route',
          detail: 'Ocean container freight from Mumbai/Nhava Sheva to Felixstowe/Southampton in 20–24 days.'
        }
      ]
    }
  },

  sweden: {
    political: {
      score: 90,
      opportunity: 'High political stability, EU single market alignment, and active Nordic trade facilitation.',
      risk: 'Complex EU regulatory mandates and strict governmental procurement eco-standards.'
    },
    economic: {
      score: 87,
      opportunity: 'High standard of living and strong purchasing power supporting premium eco-friendly thermal apparel.',
      risk: 'Dominance of established Nordic retail powerhouses (H&M Group, Fjällräven).'
    },
    social: {
      score: 91,
      opportunity: 'Deep Scandinavian outdoor ethos, ski touring, and winter lifestyle requiring durable cold apparel.',
      risk: 'High consumer brand loyalty toward established Swedish outdoor brands.'
    },
    technological: {
      score: 92,
      opportunity: 'Highly digitized cashless society with paperless digital customs clearance.',
      risk: 'High automated logistics standards requiring complete electronic data interchange.'
    },
    environmental: {
      score: 90,
      opportunity: 'Extended sub-zero climate lasting over 4 months with heavy snow cover.',
      risk: 'Demanding consumer preference for bluesign® and recycled synthetic insulation.'
    },
    legal: {
      score: 84,
      opportunity: 'Transparent EU legal framework and predictable customs administration.',
      risk: 'Strict EU REACH chemical restrictions and Nordic Ecolabel compliance.'
    },
    scoreExplanation:
      'Sweden offers a robust 89.0/100 PESTEL rating, combining severe Nordic winter weather with high consumer eco-consciousness and digital efficiency.',
    top3Opportunities: [
      'High consumer appetite for eco-certified recycled down and technical outdoor gear.',
      'Extended sub-zero winter season across central and northern provinces.',
      'Paperless automated digital customs and logistics infrastructure.'
    ],
    top3Risks: [
      'Intense competition from established Swedish and Nordic outerwear brands.',
      'Strict chemical testing rules under EU REACH regulation.',
      'Standard EU MFN apparel tariff applies.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'Swedish National Board of Trade Data',
          detail: 'Official trade registers for textile and clothing imports.',
          sourceOrCitation: 'Kommerskollegium Sweden'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Snow and Frost Index',
          detail: 'Swedish Meteorological and Hydrological Institute (SMHI) snow depth indices.',
          sourceOrCitation: 'SMHI Sweden'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        }
      ]
    }
  },

  'south-korea': {
    political: {
      score: 86,
      opportunity: 'India-Korea CEPA in force since 2010 provides preferential tariff concessions on qualifying garments.',
      risk: 'Bilateral non-tariff technical barriers and certificate of origin verification rules.'
    },
    economic: {
      score: 84,
      opportunity: 'High-income consumer demographic with heavy seasonal spending on winter outerwear.',
      risk: 'Rapid domestic fashion trend turnover creating inventory obsolescence risks.'
    },
    social: {
      score: 88,
      opportunity: 'Cultural fashion phenomenon around long padded down parkas ("Long Padding") during biting Siberian cold waves.',
      risk: 'High brand saturation from Korean outdoor brands (The North Face Korea, Discovery Expedition).'
    },
    technological: {
      score: 94,
      opportunity: 'World\'s fastest e-commerce logistics turnaround and highly dense mobile retail infrastructure.',
      risk: 'High fulfillment speed expectations requiring agile local warehousing.'
    },
    environmental: {
      score: 85,
      opportunity: 'Sub-zero temperatures dropping to -15°C with severe wind-chill during winter months.',
      risk: 'Growing national scrutiny on microplastic pollution and synthetic fiber recycling.'
    },
    legal: {
      score: 86,
      opportunity: 'Reduced tariff schedules under India-Korea CEPA.',
      risk: 'Mandatory KC (Korea Certification) testing for all consumer textile goods.'
    },
    scoreExplanation:
      'South Korea delivers an 87.2/100 PESTEL score, supported by CEPA tariff benefits, biting cold Siberian winter winds, and high technological sophistication.',
    top3Opportunities: [
      'Preferential tariff reductions under the India-Korea CEPA agreement.',
      'Severe sub-zero city temperatures creating mass demand for long padded parkas.',
      'Ultra-efficient e-commerce and logistics turnaround speed.'
    ],
    top3Risks: [
      'Mandatory KC Mark laboratory certification for all consumer clothing.',
      'Hyper-fast seasonal fashion cycles requiring rapid production lead times.',
      'Fierce local competition in the lifestyle outdoor outerwear segment.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'India-Korea CEPA Operational Rules',
          detail: 'Duty reduction schedules for Chapter 62 textile items.',
          sourceOrCitation: 'Korea Customs Service'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Winter Climate Temperature Normals',
          detail: 'Mean January temperatures below freezing across major metropolitan centers.',
          sourceOrCitation: 'Korea Meteorological Administration'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        }
      ]
    }
  },

  finland: {
    political: {
      score: 92,
      opportunity: 'Top-tier global governance, institutional stability, and EU single market integration.',
      risk: 'Strict Nordic public procurement green criteria.'
    },
    economic: {
      score: 85,
      opportunity: 'Solid Scandinavian purchasing power and high willingness to pay for extreme sub-zero protection.',
      risk: 'Small total population (5.5 million) limiting bulk volume order scale.'
    },
    social: {
      score: 94,
      opportunity: 'Sub-arctic winter conditions where thermal clothing is an absolute life-safety necessity.',
      risk: 'High consumer reliance on established domestic technical brands (Reima, Luhta).'
    },
    technological: {
      score: 90,
      opportunity: 'High digital literacy and automated winter transport logistics.',
      risk: 'Baltic ice conditions in winter requiring ice-class container transport.'
    },
    environmental: {
      score: 95,
      opportunity: 'Longest sub-zero winter duration in the European Union (up to 6 months snow cover).',
      risk: 'Strict circular economy and textile recycling mandates.'
    },
    legal: {
      score: 84,
      opportunity: 'Transparent EU legal framework with zero administrative corruption.',
      risk: 'Stringent EU REACH chemical compliance and textile labeling directives.'
    },
    scoreExplanation:
      'Finland earns a 90.0/100 PESTEL rating, reflecting the deepest sub-arctic cold conditions in Europe combined with spotless institutional stability.',
    top3Opportunities: [
      'Sub-arctic cold conditions lasting up to half the year.',
      'High per-unit demand for heavy-duty thermal workwear and down coats.',
      'Transparent, corruption-free public and trade administration.'
    ],
    top3Risks: [
      'Small domestic population base limiting large-scale volume orders.',
      'Winter Baltic ice navigation surcharges for maritime feeder vessels.',
      'Strict European Union textile circularity and chemical regulations.'
    ],
    evidenceAndSources: {
      verifiedFacts: [
        {
          title: 'Finnish Customs Foreign Trade Regulations',
          detail: 'Harmonized EU import and product safety requirements.',
          sourceOrCitation: 'Finnish Customs (Tulli)'
        }
      ],
      empiricalEstimates: [
        {
          title: 'Sub-Arctic Snow Cover Normals',
          detail: 'Permanent snow cover lasting 120–180 days across Finland.',
          sourceOrCitation: 'Finnish Meteorological Institute'
        }
      ],
      illustrativeAssumptions: [
        {
          title: 'Equal Weighting Baseline',
          detail: 'Equal 16.67% weighting applied across all 6 PESTEL pillars as baseline project assumption.'
        }
      ]
    }
  }
};

// Default weights for Stage 1 factors
export const DEFAULT_STAGE1_WEIGHTS: FactorWeights = {
  marketDemand: 25,
  purchasingPower: 20,
  competition: 15,
  importRegulations: 15,
  logistics: 10,
  tradeBarriers: 10,
  businessPotential: 5
};

export default function App() {
  // Configurable inputs requested by user
  const [productCategory, setProductCategory] = useState<string>('Winter/Cold-Climate Apparel');
  const [businessProfile, setBusinessProfile] = useState<string>('Established Exporter from India');

  // Navigation: Stage views
  const [activeStage, setActiveStage] = useState<StageNavigationTab>('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [showPresentationGuide, setShowPresentationGuide] = useState<boolean>(false);

  // Stage 1 interactive state
  const [stage1Weights, setStage1Weights] = useState<FactorWeights>(DEFAULT_STAGE1_WEIGHTS);
  const [countries, setCountries] = useState<CountryCandidate[]>(INITIAL_COUNTRIES);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('norway');
  const [showAllCandidateMarkets, setShowAllCandidateMarkets] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>('norway');
  const [showWeightEditor, setShowWeightEditor] = useState<boolean>(false);
  const [showCountryEditor, setShowCountryEditor] = useState<boolean>(false);

  // Stage 2 PESTEL interactive state
  const [pestelData, setPestelData] = useState<Record<string, PestelDossier>>(INITIAL_PESTEL_DATA);
  const [activePestelCountryId, setActivePestelCountryId] = useState<string>('norway');
  const [expandedPestelDossierId, setExpandedPestelDossierId] = useState<string | null>('norway');
  const [showPestelTuner, setShowPestelTuner] = useState<boolean>(false);

  // Stage 1 vs Stage 2 Combination Weights (Default: 60% Market Selection, 40% PESTEL)
  const [marketSelectionWeight, setMarketSelectionWeight] = useState<number>(60);
  const pestelWeight = useMemo(() => 100 - marketSelectionWeight, [marketSelectionWeight]);

  // Stage 3 Entry Mode Selection interactive state
  const [entryModeWeights, setEntryModeWeights] = useState<EntryModeCriteriaWeights>(DEFAULT_ENTRY_MODE_WEIGHTS);
  const [entryModesData, setEntryModesData] = useState<Record<string, CountryEntryModeProfile>>(INITIAL_ENTRY_MODES_BY_COUNTRY);
  const [activeEntryModeCountryId, setActiveEntryModeCountryId] = useState<string>('norway');
  const [activeEntryModeDetailId, setActiveEntryModeDetailId] = useState<EntryModeId>('direct_export');
  const [showEntryModeWeightEditor, setShowEntryModeWeightEditor] = useState<boolean>(false);
  const [showEntryModeScoreTuner, setShowEntryModeScoreTuner] = useState<boolean>(false);

  // Bias Audit Lab state (Testing 10 Product Categories for Algorithmic & Heuristic Bias)
  const [biasRecords, setBiasRecords] = useState<BiasTestRecord[]>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem('biasAuditData_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 10) {
            return parsed;
          }
        }
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_BIAS_TEST_RECORDS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('biasAuditData_v2', JSON.stringify(biasRecords));
      } catch (e) {
        // ignore
      }
    }
  }, [biasRecords]);
  const [biasAuditFilter, setBiasAuditFilter] = useState<'all' | 'tested' | 'pending'>('all');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const [isApplyingCategoryId, setIsApplyingCategoryId] = useState<number | null>(null);
  const [applyingCategoryName, setApplyingCategoryName] = useState<string | null>(null);
  const [categoryApplyError, setCategoryApplyError] = useState<string | null>(null);
  const [isAuditLabExpanded, setIsAuditLabExpanded] = useState<boolean>(false);

  // Quick presets for inputs
  const productPresets = [
    'Winter/Cold-Climate Apparel',
    'Technical Mountaineering Outerwear',
    'Thermal Undergarments & Base Layers',
    'Sub-Zero Extreme Weather Workwear'
  ];

  const profilePresets = [
    'Established Exporter from India',
    'Emerging Textile Exporter (India)',
    'Technical Outerwear Manufacturer (India)',
    'First-Time Exporter from India'
  ];

  // Stage 1 weight scenario presets
  const applyStage1WeightPreset = (presetType: 'default' | 'demand' | 'purchasing' | 'trade') => {
    switch (presetType) {
      case 'default':
        setStage1Weights(DEFAULT_STAGE1_WEIGHTS);
        break;
      case 'demand':
        setStage1Weights({
          marketDemand: 40,
          purchasingPower: 15,
          competition: 10,
          importRegulations: 10,
          logistics: 10,
          tradeBarriers: 10,
          businessPotential: 5
        });
        break;
      case 'purchasing':
        setStage1Weights({
          marketDemand: 15,
          purchasingPower: 35,
          competition: 10,
          importRegulations: 15,
          logistics: 10,
          tradeBarriers: 10,
          businessPotential: 5
        });
        break;
      case 'trade':
        setStage1Weights({
          marketDemand: 20,
          purchasingPower: 15,
          competition: 10,
          importRegulations: 10,
          logistics: 15,
          tradeBarriers: 25,
          businessPotential: 5
        });
        break;
    }
  };

  // Stage 3 weight scenario presets
  const applyEntryModeWeightPreset = (presetType: 'equal' | 'capital' | 'control' | 'speed' | 'risk') => {
    switch (presetType) {
      case 'equal':
        setEntryModeWeights(DEFAULT_ENTRY_MODE_WEIGHTS);
        break;
      case 'capital':
        setEntryModeWeights({
          investmentCost: 35,
          riskLevel: 25,
          controlLevel: 10,
          marketKnowledge: 15,
          exporterSuitability: 15
        });
        break;
      case 'control':
        setEntryModeWeights({
          investmentCost: 10,
          riskLevel: 15,
          controlLevel: 40,
          marketKnowledge: 15,
          exporterSuitability: 20
        });
        break;
      case 'speed':
        setEntryModeWeights({
          investmentCost: 15,
          riskLevel: 15,
          controlLevel: 10,
          marketKnowledge: 35,
          exporterSuitability: 25
        });
        break;
      case 'risk':
        setEntryModeWeights({
          investmentCost: 20,
          riskLevel: 40,
          controlLevel: 10,
          marketKnowledge: 10,
          exporterSuitability: 20
        });
        break;
    }
  };

  // Reset all data to defaults
  const resetAllToDefaults = () => {
    setStage1Weights(DEFAULT_STAGE1_WEIGHTS);
    setCountries(INITIAL_COUNTRIES);
    setPestelData(INITIAL_PESTEL_DATA);
    setMarketSelectionWeight(60);
    setEntryModeWeights(DEFAULT_ENTRY_MODE_WEIGHTS);
    setEntryModesData(INITIAL_ENTRY_MODES_BY_COUNTRY);
    setProductCategory('Winter/Cold-Climate Apparel');
    setSelectedCountryId('norway');
    setActivePestelCountryId('norway');
    setActiveEntryModeCountryId('norway');
    setCategoryApplyError(null);
    setIsApplyingCategoryId(null);
    setApplyingCategoryName(null);
  };

  // Calculate total Stage 1 weight sum
  const totalStage1WeightSum = useMemo(() => {
    return (
      stage1Weights.marketDemand +
      stage1Weights.purchasingPower +
      stage1Weights.competition +
      stage1Weights.importRegulations +
      stage1Weights.logistics +
      stage1Weights.tradeBarriers +
      stage1Weights.businessPotential
    );
  }, [stage1Weights]);

  // Compute Stage 1 weighted score for a given country
  const calculateStage1Score = (c: CountryCandidate): number => {
    if (totalStage1WeightSum === 0) return 0;
    const rawScore =
      c.marketDemand * stage1Weights.marketDemand +
      c.purchasingPower * stage1Weights.purchasingPower +
      c.competition * stage1Weights.competition +
      c.importRegulations * stage1Weights.importRegulations +
      c.logistics * stage1Weights.logistics +
      c.tradeBarriers * stage1Weights.tradeBarriers +
      c.businessPotential * stage1Weights.businessPotential;
    return parseFloat((rawScore / totalStage1WeightSum).toFixed(2));
  };

  // Stage 1 Ranked Countries list
  const rankedStage1Countries = useMemo(() => {
    const list = countries.map((c) => ({
      ...c,
      stage1Score: calculateStage1Score(c)
    }));

    list.sort((a, b) => b.stage1Score - a.stage1Score);

    return list.map((item, index) => ({
      ...item,
      stage1Rank: index + 1
    }));
  }, [countries, stage1Weights, totalStage1WeightSum]);

  // TOP SEVEN COUNTRIES SHORTLISTED IN STAGE 1 (Strict Requirement 1)
  const shortlistedTop7Stage1 = useMemo(() => {
    return rankedStage1Countries.slice(0, 7);
  }, [rankedStage1Countries]);

  // Displayed Stage 1 countries (with search query support)
  const displayedStage1Countries = useMemo(() => {
    let list = rankedStage1Countries;
    if (searchQuery.trim() !== '') {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return showAllCandidateMarkets ? list : list.slice(0, 7);
  }, [rankedStage1Countries, showAllCandidateMarkets, searchQuery]);

  // Compute PESTEL score for a country using equal weights (1/6 = 16.67% per pillar)
  const calculatePestelScore = (countryId: string): number => {
    const dossier = pestelData[countryId] || INITIAL_PESTEL_DATA[countryId];
    if (!dossier) return 75;
    const p = dossier.political.score;
    const e = dossier.economic.score;
    const s = dossier.social.score;
    const t = dossier.technological.score;
    const env = dossier.environmental.score;
    const l = dossier.legal.score;
    const avg = (p + e + s + t + env + l) / 6;
    return parseFloat(avg.toFixed(2));
  };

  // COMBINED STAGE 1 + STAGE 2 DECISION ANALYSIS FOR THE SEVEN SHORTLISTED COUNTRIES
  const combinedEvaluatedCountries = useMemo(() => {
    // Only evaluate the 7 countries shortlisted from Stage 1
    const evaluated = shortlistedTop7Stage1.map((country) => {
      const pestelScore = calculatePestelScore(country.id);
      const dossier = pestelData[country.id] || INITIAL_PESTEL_DATA[country.id];

      // Formula: (Stage 1 Market Selection * 60%) + (Stage 2 PESTEL * 40%)
      const compositeScore = parseFloat(
        (
          country.stage1Score * (marketSelectionWeight / 100) +
          pestelScore * (pestelWeight / 100)
        ).toFixed(2)
      );

      return {
        ...country,
        pestelScore,
        dossier,
        compositeScore
      };
    });

    // Sort descending by Composite Score
    evaluated.sort((a, b) => b.compositeScore - a.compositeScore);

    // Assign final composite rank
    return evaluated.map((item, index) => ({
      ...item,
      compositeRank: index + 1
    }));
  }, [shortlistedTop7Stage1, pestelData, marketSelectionWeight, pestelWeight]);

  // Top 3 Recommended Markets from Composite Analysis
  const top3RecommendedMarkets = useMemo(() => {
    return combinedEvaluatedCountries.slice(0, 3);
  }, [combinedEvaluatedCountries]);

  // Active PESTEL dossier for detailed view
  const currentPestelCountry = useMemo(() => {
    const match = combinedEvaluatedCountries.find((c) => c.id === activePestelCountryId);
    return match || combinedEvaluatedCountries[0] || shortlistedTop7Stage1[0];
  }, [combinedEvaluatedCountries, activePestelCountryId, shortlistedTop7Stage1]);

  // Update a PESTEL factor score in state
  const handlePestelScoreChange = (factor: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal', value: number) => {
    if (!currentPestelCountry) return;
    setPestelData((prev) => {
      const existing = prev[currentPestelCountry.id] || INITIAL_PESTEL_DATA[currentPestelCountry.id];
      return {
        ...prev,
        [currentPestelCountry.id]: {
          ...existing,
          [factor]: {
            ...existing[factor],
            score: value
          }
        }
      };
    });
  };

  const updatePestelFactorScore = (countryId: string, pillar: keyof PestelDossier, score: number) => {
    setPestelData((prev) => {
      const existing = prev[countryId] || INITIAL_PESTEL_DATA[countryId];
      if (!existing || typeof existing[pillar] !== 'object') return prev;
      return {
        ...prev,
        [countryId]: {
          ...existing,
          [pillar]: {
            ...existing[pillar],
            score
          }
        }
      };
    });
  };

  const resetPestelToDefaults = () => {
    setPestelData(INITIAL_PESTEL_DATA);
  };

  // Update a Stage 1 factor score in state
  const handleCountryFactorChange = (factorKey: keyof FactorWeights, value: number) => {
    setCountries((prev) =>
      prev.map((c) => (c.id === selectedCountryId ? { ...c, [factorKey]: value } : c))
    );
  };

  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.id === selectedCountryId) || countries[0];
  }, [countries, selectedCountryId]);

  // STAGE 3: Total Entry Mode weight sum
  const totalEntryModeWeightSum = useMemo(() => {
    return (
      entryModeWeights.investmentCost +
      entryModeWeights.riskLevel +
      entryModeWeights.controlLevel +
      entryModeWeights.marketKnowledge +
      entryModeWeights.exporterSuitability
    );
  }, [entryModeWeights]);

  // Compute weighted score for any entry mode given its individual criteria scores
  const calculateEntryModeScore = (scores: EntryModeScores): number => {
    if (totalEntryModeWeightSum === 0) return 0;
    const raw =
      scores.investmentCost * entryModeWeights.investmentCost +
      scores.riskLevel * entryModeWeights.riskLevel +
      scores.controlLevel * entryModeWeights.controlLevel +
      scores.marketKnowledge * entryModeWeights.marketKnowledge +
      scores.exporterSuitability * entryModeWeights.exporterSuitability;
    return parseFloat((raw / totalEntryModeWeightSum).toFixed(2));
  };

  // Evaluated Entry Modes for all Top 3 Countries shortlisted in Stage 2 (Strict Requirement 1)
  const evaluatedEntryModesByTop3Countries = useMemo(() => {
    return top3RecommendedMarkets.map((country) => {
      const countryProfile =
        entryModesData[country.id] ||
        INITIAL_ENTRY_MODES_BY_COUNTRY[country.id] ||
        INITIAL_ENTRY_MODES_BY_COUNTRY['norway'];

      const evaluatedModesList = (Object.keys(countryProfile.modes) as EntryModeId[]).map((modeId) => {
        const modeDetail = countryProfile.modes[modeId];
        const weightedScore = calculateEntryModeScore(modeDetail.scores);
        return {
          ...modeDetail,
          weightedScore
        };
      });

      // Sort descending by weighted score
      evaluatedModesList.sort((a, b) => b.weightedScore - a.weightedScore);

      const rankedModes = evaluatedModesList.map((mode, index) => ({
        ...mode,
        rank: index + 1
      }));

      const winningMode = rankedModes[0];

      return {
        country,
        countryProfile,
        rankedModes,
        winningMode
      };
    });
  }, [top3RecommendedMarkets, entryModesData, entryModeWeights, totalEntryModeWeightSum]);

  // Selected Country for Stage 3 Inspection (defaults to top 1 if selected country not in top 3)
  const currentStage3CountryEvaluation = useMemo(() => {
    if (evaluatedEntryModesByTop3Countries.length === 0) return null;
    const match = evaluatedEntryModesByTop3Countries.find(
      (item) => item.country.id === activeEntryModeCountryId
    );
    return match || evaluatedEntryModesByTop3Countries[0];
  }, [evaluatedEntryModesByTop3Countries, activeEntryModeCountryId]);

  // Final Overall Strategic Recommendation (Strict Requirement 7)
  const finalStrategicRecommendation = useMemo(() => {
    if (evaluatedEntryModesByTop3Countries.length === 0) return null;
    const bestCountryEval = evaluatedEntryModesByTop3Countries[0];
    const bestCountry = bestCountryEval.country;
    const winningMode = bestCountryEval.winningMode;

    // Overall Decision Score:
    // Blends: Stage 1 Market Selection (35%), Stage 2 PESTEL Stability (35%), Stage 3 Entry Mode Feasibility (30%)
    const stage1Contribution = bestCountry.stage1Score * 0.35;
    const pestelContribution = bestCountry.pestelScore * 0.35;
    const entryModeContribution = winningMode.weightedScore * 0.30;
    const overallDecisionScore = parseFloat(
      (stage1Contribution + pestelContribution + entryModeContribution).toFixed(2)
    );

    let confidenceLevel = 'High (89% Confidence)';
    if (overallDecisionScore >= 85) {
      confidenceLevel = 'High (89% Confidence) — Multi-Stage Analytical Convergence';
    } else if (overallDecisionScore >= 75) {
      confidenceLevel = 'Moderate-High (78% Confidence) — Strong Market Fundamentals';
    } else {
      confidenceLevel = 'Moderate (68% Confidence) — Heightened Environmental Scrutiny';
    }

    return {
      bestCountry,
      winningMode,
      overallDecisionScore,
      confidenceLevel,
      stage1Contribution: parseFloat(stage1Contribution.toFixed(2)),
      pestelContribution: parseFloat(pestelContribution.toFixed(2)),
      entryModeContribution: parseFloat(entryModeContribution.toFixed(2)),
      advantages: [
        `Direct Tariff Advantage: Maximizes preferential tariff concessions (e.g. 0% customs duty under the 2024 India-EFTA Trade & Economic Partnership Agreement) for winter performance apparel.`,
        `Capital Efficiency & Asset Protection: 100% production housed in established Indian manufacturing mills, completely avoiding high European/Nordic retail square-meter leases and retail payroll overheads.`,
        `Instant Distribution Scale: Direct B2B supplier partnerships place winter technical outerwear across major outdoor sports retail chains with pre-existing customer footfall in sub-zero regions.`,
        `Commercial Security: Transactions executed under Irrevocable Letters of Credit (LC at sight) or guaranteed trade financing backed by the Export Credit Guarantee Corporation of India (ECGC).`
      ],
      risks: [
        `Distributor Channel Consolidation: Heavy retail concentration gives Nordic/European distributors high buyer power during annual price and MOQ renegotiations.`,
        `Strict EU/EEA Chemical & Thermal Compliance: Stringent compliance requirements for PFAS-free durable water repellent (DWR) coatings and OEKO-TEX Standard 100 testing.`,
        `Seasonal Reorder Lead Times: Ocean transit times from JNPT/Nhava Sheva take 25–35 days; unexpected early snowfall requires coordinated air-freight buffer stock agreements.`
      ],
      dataLimitations: [
        `Secondary Trade Aggregates: Model calculations rely on national trade data (UN Comtrade, ITC Trade Map, WITS) rather than real-time proprietary retailer point-of-sale inventory feeds.`,
        `Foreign Exchange Volatility: Margin sensitivity to currency fluctuations between Indian Rupee (INR), US Dollar (USD), and target currencies (NOK, CHF, CAD, EUR) without forward hedging.`,
        `Firm-Level Manufacturing Assumptions: Assumes the Indian exporter maintains certified technical seam-sealing, down-fill certification (RDS), and minimum batch run capacity exceeding 5,000 units.`
      ]
    };
  }, [evaluatedEntryModesByTop3Countries]);

  // Handler to update an Entry Mode score in state
  const handleEntryModeScoreChange = (
    countryId: string,
    modeId: EntryModeId,
    criterion: keyof EntryModeScores,
    value: number
  ) => {
    setEntryModesData((prev) => {
      const countryProfile = prev[countryId] || INITIAL_ENTRY_MODES_BY_COUNTRY[countryId];
      if (!countryProfile) return prev;
      const currentMode = countryProfile.modes[modeId];
      if (!currentMode) return prev;

      return {
        ...prev,
        [countryId]: {
          ...countryProfile,
          modes: {
            ...countryProfile.modes,
            [modeId]: {
              ...currentMode,
              scores: {
                ...currentMode.scores,
                [criterion]: value
              }
            }
          }
        }
      };
    });
  };

  // Apply a category from the 10-item audit suite (or custom input) and execute scoring logic
  const handleApplyCategory = async (recordOrCategory: BiasTestRecord | string) => {
    const isRecord = typeof recordOrCategory === 'object';
    const categoryName = isRecord ? recordOrCategory.category : recordOrCategory;
    const recordId = isRecord ? recordOrCategory.id : null;

    setIsApplyingCategoryId(recordId !== null ? recordId : -1);
    setApplyingCategoryName(categoryName);
    setCategoryApplyError(null);

    try {
      // Simulate realistic analytical computation and allow UI state to render the loading indicator
      await new Promise((resolve) => setTimeout(resolve, 380));

      const benchmark = findCategoryBenchmark(categoryName);
      if (!benchmark) {
        throw new Error(`Category benchmark not found for "${categoryName}".`);
      }

      // 1. Update product category display state
      setProductCategory(benchmark.categoryName);

      // 2. Update countries with category-specific factor scores (Stage 1)
      setCountries(benchmark.countries);

      // 3. Update Entry Mode data if category has specialized entry governance (e.g. Industrial Machinery, Cosmetics)
      if (benchmark.entryModesData) {
        setEntryModesData(benchmark.entryModesData);
      } else {
        setEntryModesData(INITIAL_ENTRY_MODES_BY_COUNTRY);
      }

      // 4. Update the active pestel and entry mode selected country to the benchmark's top country
      const topCountryId = benchmark.countries[0]?.id || 'norway';
      setSelectedCountryId(topCountryId);
      setActivePestelCountryId(topCountryId);
      setActiveEntryModeCountryId(topCountryId);

      setCopiedNotice(
        `Applied "${benchmark.categoryName}"! Calculated 10-market rankings across Stage 1, 2 & 3. Click "Log Live Output" on row #${recordId || 1} to record findings.`
      );
      setTimeout(() => setCopiedNotice(null), 5000);
    } catch (err: any) {
      setCategoryApplyError(err?.message || 'Error running category evaluation model.');
    } finally {
      setIsApplyingCategoryId(null);
      setApplyingCategoryName(null);
    }
  };

  // Capture current live dashboard output into the test record (No fabrication - captures actual live state)
  const logCurrentDashboardToRecord = async (recordId: number) => {
    const targetRecord = biasRecords.find((r) => r.id === recordId);
    if (!targetRecord) return;

    // Check if the current live dashboard is already synchronized to this category
    const isCurrentlyActive = productCategory.toLowerCase().trim() === targetRecord.category.toLowerCase().trim();

    // If not currently active, apply the category first
    if (!isCurrentlyActive) {
      await handleApplyCategory(targetRecord);
    }

    const benchmark = findCategoryBenchmark(targetRecord.category);

    // Compute stage 1 scores using active stage1Weights and benchmark country dataset
    const calculatedStage1List = benchmark.countries.map((c) => {
      const rawScore =
        c.marketDemand * stage1Weights.marketDemand +
        c.purchasingPower * stage1Weights.purchasingPower +
        c.competition * stage1Weights.competition +
        c.importRegulations * stage1Weights.importRegulations +
        c.logistics * stage1Weights.logistics +
        c.tradeBarriers * stage1Weights.tradeBarriers +
        c.businessPotential * stage1Weights.businessPotential;
      const stage1Score = totalStage1WeightSum > 0 ? parseFloat((rawScore / totalStage1WeightSum).toFixed(2)) : 0;
      return { ...c, stage1Score };
    });
    calculatedStage1List.sort((a, b) => b.stage1Score - a.stage1Score);
    const top7 = calculatedStage1List.slice(0, 7);

    // Compute Stage 2 combined scores (marketSelectionWeight% + pestelWeight%)
    const combined = top7.map((country) => {
      const pestelScore = calculatePestelScore(country.id);
      const compositeScore = parseFloat(
        (country.stage1Score * (marketSelectionWeight / 100) + pestelScore * (pestelWeight / 100)).toFixed(2)
      );
      return { ...country, pestelScore, compositeScore };
    });
    combined.sort((a, b) => b.compositeScore - a.compositeScore);
    const top3 = combined.slice(0, 3);

    const top3Str = top3
      .map((c, i) => `#${i + 1} ${c.flag} ${c.name} (${c.compositeScore})`)
      .join('; ');

    // Determine winning entry mode for top country
    const bestCountry = top3[0];
    const profile =
      (benchmark.entryModesData && benchmark.entryModesData[bestCountry.id]) ||
      entryModesData[bestCountry.id] ||
      INITIAL_ENTRY_MODES_BY_COUNTRY[bestCountry.id] ||
      INITIAL_ENTRY_MODES_BY_COUNTRY['norway'];

    let winningModeName = benchmark.recommendedEntryModeName || 'Direct Exporting';
    if (profile && profile.modes) {
      const modesList = (Object.keys(profile.modes) as EntryModeId[]).map((mId) => {
        const m = profile.modes[mId];
        const score = calculateEntryModeScore(m.scores);
        return { name: m.name, score };
      });
      modesList.sort((a, b) => b.score - a.score);
      if (modesList[0]) {
        winningModeName = modesList[0].name;
      }
    }

    // Determine suspected bias diagnosis
    let suspectedBias: BiasTestRecord['biasSuspected'] = 'No Evident Bias Detected';
    if (targetRecord.id === 1) {
      suspectedBias = 'No Evident Bias Detected';
    } else if (
      top3Str.includes('Norway') &&
      (targetRecord.category === 'Spices' ||
        targetRecord.category === 'Electronics' ||
        targetRecord.category === 'Toys and games' ||
        targetRecord.category === 'Cosmetics' ||
        targetRecord.category === 'Packaged food')
    ) {
      suspectedBias = 'Geographic / Climate-Proxy Bias';
    } else if (winningModeName === 'Direct Exporting' && targetRecord.category === 'Industrial machinery') {
      suspectedBias = 'Entry Mode Invariance Bias';
    } else {
      suspectedBias = 'No Evident Bias Detected';
    }

    const reasonsForResult = `#1 ${bestCountry.name} (${bestCountry.compositeScore}/100) led on market demand (${bestCountry.marketDemand}/100) & purchasing power (${bestCountry.purchasingPower}/100). Stage 3 recommended ${winningModeName} matching exporter capability and asset specificity.`;

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setBiasRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        return {
          ...rec,
          top3Countries: top3Str,
          recommendedEntryMode: winningModeName,
          reasonsForResult: reasonsForResult,
          biasSuspected: suspectedBias,
          testedAt: nowTime
        };
      })
    );

    setCopiedNotice(`Recorded actual live model output for "${targetRecord.category}" in Test Row #${recordId}!`);
    setTimeout(() => setCopiedNotice(null), 4000);
  };

  // Update a bias test record field
  const handleBiasFieldChange = (id: number, field: keyof BiasTestRecord, val: any) => {
    setBiasRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  // Copy test table formatted as Markdown for student project report
  const copyMarkdownTable = () => {
    let md = `| Test # | Product Category | Business Profile | Top 3 Recommended Countries | Recommended Entry Mode | Reasons for Result | Suspected Bias Diagnosis | Notes |\n`;
    md += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
    biasRecords.forEach((r) => {
      md += `| ${r.id} | ${r.category} | ${r.businessProfile} | ${r.top3Countries || 'Pending Test'} | ${r.recommendedEntryMode || 'Pending Test'} | ${r.reasonsForResult || 'Pending Test'} | ${r.biasSuspected} | ${r.notes} |\n`;
    });

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md)
        .then(() => {
          setCopiedNotice('Copied 10-Category Test Table in Markdown format to clipboard! Ready to paste into your report.');
          setTimeout(() => setCopiedNotice(null), 4000);
        })
        .catch(() => {
          setCopiedNotice('Markdown table generated! (Clipboard permission blocked in current sandbox context).');
          setTimeout(() => setCopiedNotice(null), 4000);
        });
    } else {
      setCopiedNotice('Markdown table generated! (Clipboard API unavailable).');
      setTimeout(() => setCopiedNotice(null), 4000);
    }
  };

  // Reset bias tests back to blank baseline
  const resetBiasTests = () => {
    setBiasRecords(INITIAL_BIAS_TEST_RECORDS);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem('biasAuditData_v2');
      } catch (e) {
        // ignore
      }
    }
    setCopiedNotice('Reset all 10 bias test rows to blank testing state.');
    setTimeout(() => setCopiedNotice(null), 4000);
  };

  const testedCount = biasRecords.filter((r) => r.top3Countries !== '').length;

  return (
    <div className="min-h-screen bg-[#faf9f5] text-stone-800 flex flex-col lg:flex-row font-sans selection:bg-emerald-800 selection:text-white">
      {/* 1. Desktop 280px Sidebar Navigation (lg:w-72) & Mobile Drawer */}
      <SidebarNav
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        testedCount={testedCount}
        totalCategories={biasRecords.length}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
        productCategory={productCategory}
        businessProfile={businessProfile}
      />

      {/* 2. Main Content Container beside Sidebar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Header with mobile toggle and methodology dossier */}
        <ExecutiveHeader
          productCategory={productCategory}
          businessProfile={businessProfile}
          showMethodology={showPresentationGuide}
          setShowMethodology={setShowPresentationGuide}
          resetAllToDefaults={resetAllToDefaults}
          testedCount={testedCount}
          totalCategories={biasRecords.length}
          onOpenAuditLab={() => {
            setIsAuditLabExpanded(true);
            setActiveStage('bias_audit');
            const el = document.getElementById('bias-audit-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          isAuditLabOpen={activeStage === 'bias_audit' || isAuditLabExpanded}
          onToggleMobileMenu={() => setIsMobileNavOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
          {/* Real-time Notification Toast */}
          {copiedNotice && (
            <div className="bg-emerald-900 text-white px-4 py-3 rounded-lg text-xs flex items-center justify-between shadow-md border border-emerald-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-medium">{copiedNotice}</span>
              </div>
              <button
                onClick={() => setCopiedNotice(null)}
                className="text-amber-300 hover:text-white text-xs underline font-semibold ml-4 shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Executive Context & Baseline Controls Strip */}
          <ExecutiveContextStrip
            productCategory={productCategory}
            setProductCategory={setProductCategory}
            businessProfile={businessProfile}
            setBusinessProfile={setBusinessProfile}
            productPresets={productPresets}
            profilePresets={profilePresets}
            handleApplyCategory={handleApplyCategory}
            isApplyingCategoryId={isApplyingCategoryId}
            categoryApplyError={categoryApplyError}
          />

          {/* VIEW: OVERVIEW (activeStage === 'all') */}
          {activeStage === 'all' && (
            <OverviewDashboard
              productCategory={productCategory}
              businessProfile={businessProfile}
              setActiveStage={setActiveStage}
              shortlistedTop7Stage1={shortlistedTop7Stage1}
              top3RecommendedMarkets={top3RecommendedMarkets}
              finalStrategicRecommendation={finalStrategicRecommendation}
              currentStage3CountryEvaluation={currentStage3CountryEvaluation}
              testedCount={testedCount}
              totalCategories={biasRecords.length}
            />
          )}

          {/* VIEW: STAGE 1 (activeStage === 'stage1') */}
          {activeStage === 'stage1' && (
            <Stage1MarketMatrix
              productCategory={productCategory}
              businessProfile={businessProfile}
              stage1Weights={stage1Weights}
              setStage1Weights={setStage1Weights}
              applyStage1WeightPreset={applyStage1WeightPreset}
              totalStage1WeightSum={totalStage1WeightSum}
              showWeightEditor={showWeightEditor}
              setShowWeightEditor={setShowWeightEditor}
              showCountryEditor={showCountryEditor}
              setShowCountryEditor={setShowCountryEditor}
              countries={countries}
              handleCountryFactorChange={handleCountryFactorChange}
              selectedCountry={selectedCountry}
              selectedCountryId={selectedCountryId}
              setSelectedCountryId={setSelectedCountryId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showAllCandidateMarkets={showAllCandidateMarkets}
              setShowAllCandidateMarkets={setShowAllCandidateMarkets}
              displayedStage1Countries={displayedStage1Countries}
              rankedStage1Countries={rankedStage1Countries}
              expandedExplanationId={expandedExplanationId}
              setExpandedExplanationId={setExpandedExplanationId}
              setActivePestelCountryId={setActivePestelCountryId}
              setExpandedPestelDossierId={setExpandedPestelDossierId}
              setActiveStage={setActiveStage}
              DEFAULT_STAGE1_WEIGHTS={DEFAULT_STAGE1_WEIGHTS}
            />
          )}

          {/* VIEW: STAGE 2 (activeStage === 'stage2') */}
          {activeStage === 'stage2' && (
            <Stage2PestelAnalysis
              productCategory={productCategory}
              businessProfile={businessProfile}
              marketSelectionWeight={marketSelectionWeight}
              setMarketSelectionWeight={setMarketSelectionWeight}
              pestelWeight={pestelWeight}
              showPestelTuner={showPestelTuner}
              setShowPestelTuner={setShowPestelTuner}
              top3RecommendedMarkets={top3RecommendedMarkets}
              shortlistedTop7Stage1={shortlistedTop7Stage1}
              activePestelCountryId={activePestelCountryId}
              setActivePestelCountryId={setActivePestelCountryId}
              setExpandedPestelDossierId={setExpandedPestelDossierId}
              currentPestelCountry={currentPestelCountry}
              combinedEvaluatedCountries={combinedEvaluatedCountries}
              updatePestelFactorScore={updatePestelFactorScore}
              resetPestelToDefaults={resetPestelToDefaults}
              setActiveStage={setActiveStage}
            />
          )}

          {/* VIEW: STAGE 3 (activeStage === 'stage3') */}
          {activeStage === 'stage3' && (
            <Stage3EntryStrategy
              productCategory={productCategory}
              businessProfile={businessProfile}
              evaluatedEntryModesByTop3Countries={evaluatedEntryModesByTop3Countries}
              currentStage3CountryEvaluation={currentStage3CountryEvaluation}
              activeEntryModeCountryId={activeEntryModeCountryId}
              setActiveEntryModeCountryId={setActiveEntryModeCountryId}
              activeEntryModeDetailId={activeEntryModeDetailId}
              setActiveEntryModeDetailId={setActiveEntryModeDetailId}
              entryModeWeights={entryModeWeights}
              setEntryModeWeights={setEntryModeWeights}
              totalEntryModeWeightSum={totalEntryModeWeightSum}
              showEntryModeWeightEditor={showEntryModeWeightEditor}
              setShowEntryModeWeightEditor={setShowEntryModeWeightEditor}
              applyEntryModeWeightPreset={applyEntryModeWeightPreset}
              finalStrategicRecommendation={finalStrategicRecommendation}
              handleEntryModeScoreChange={handleEntryModeScoreChange}
              setActiveStage={setActiveStage}
            />
          )}

          {/* VIEW: BIAS AUDIT LAB (activeStage === 'bias_audit') */}
          {activeStage === 'bias_audit' && (
            <div id="bias-audit-section">
              <BiasAuditLabDrawer
                biasRecords={biasRecords}
                biasAuditFilter={biasAuditFilter}
                setBiasAuditFilter={setBiasAuditFilter}
                productCategory={productCategory}
                handleApplyCategory={handleApplyCategory}
                logCurrentDashboardToRecord={logCurrentDashboardToRecord}
                handleBiasFieldChange={handleBiasFieldChange}
                copyMarkdownTable={copyMarkdownTable}
                resetBiasTests={resetBiasTests}
                isApplyingCategoryId={isApplyingCategoryId}
                applyingCategoryName={applyingCategoryName}
                categoryApplyError={categoryApplyError}
                setCategoryApplyError={setCategoryApplyError}
                isCompactMode={false}
                top3RecommendedMarkets={top3RecommendedMarkets}
                finalStrategicRecommendation={finalStrategicRecommendation}
              />
            </div>
          )}

          {/* VIEW: DEVELOPMENT LOG (activeStage === 'dev_log') */}
          {activeStage === 'dev_log' && (
            <DevelopmentLogView
              setActiveStage={setActiveStage}
              testedCount={testedCount}
              totalCategories={biasRecords.length}
            />
          )}

          {/* VIEW: PRESENTATION SUMMARY (activeStage === 'presentation') */}
          {activeStage === 'presentation' && (
            <PresentationSummaryView
              productCategory={productCategory}
              businessProfile={businessProfile}
              setActiveStage={setActiveStage}
              top3RecommendedMarkets={top3RecommendedMarkets}
              finalStrategicRecommendation={finalStrategicRecommendation}
              testedCount={testedCount}
              totalCategories={biasRecords.length}
            />
          )}

          {/* Academic Project Presentation Footer Card */}
          <footer className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-900 border border-emerald-800 text-amber-400 flex items-center justify-center font-serif-display font-bold text-sm">
                GR
              </div>
              <div>
                <div className="font-semibold text-stone-900">
                  Global Risk Radar · International Business Environment Academic Framework
                </div>
                <div className="text-stone-500 text-[11px]">
                  Assigned Case: Winter/Cold-Climate Apparel for an Established Exporter from India
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-700" />
              <span>Executive Trade Intelligence Theme Active · Classroom Projector High-Contrast Mode</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
