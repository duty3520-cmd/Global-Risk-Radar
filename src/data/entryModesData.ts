export type EntryModeId =
  | 'direct_export'
  | 'indirect_export'
  | 'licensing'
  | 'franchising'
  | 'joint_venture'
  | 'wholly_owned_subsidiary';

export interface EntryModeCriteriaWeights {
  investmentCost: number;       // Initial Investment & Cost (Capital efficiency: higher = minimal upfront capital required)
  riskLevel: number;            // Business & Political Risk (Risk mitigation: higher = lower exposure / safer)
  controlLevel: number;         // Level of Control over Operations & Brand (higher = direct oversight & brand protection)
  marketKnowledge: number;      // Access to Local Market Knowledge & Distribution (higher = faster shelf space & buyer ties)
  exporterSuitability: number;  // Suitability for Established Indian Winter-Clothing Exporter (higher = better capability fit)
}

export const DEFAULT_ENTRY_MODE_WEIGHTS: EntryModeCriteriaWeights = {
  investmentCost: 20,
  riskLevel: 20,
  controlLevel: 20,
  marketKnowledge: 20,
  exporterSuitability: 20
};

export interface EntryModeScores {
  investmentCost: number;       // 0 - 100
  riskLevel: number;            // 0 - 100
  controlLevel: number;         // 0 - 100
  marketKnowledge: number;      // 0 - 100
  exporterSuitability: number;  // 0 - 100
}

export interface EntryModeDetail {
  id: EntryModeId;
  name: string;
  category: 'Exporting' | 'Contractual' | 'Investment (FDI)';
  shortDescription: string;
  scores: EntryModeScores;
  keyAdvantage: string;
  primaryRisk: string;
  countrySpecificRationale: string;
  whyAlternativesScoredLower: string;
}

export interface CountryEntryModeProfile {
  countryId: string;
  countryName: string;
  flag: string;
  recommendedModeId: EntryModeId;
  strategicSummary: string;
  modes: Record<EntryModeId, EntryModeDetail>;
}

export const ENTRY_MODE_CRITERIA_INFO: Record<
  keyof EntryModeCriteriaWeights,
  { label: string; description: string; highMeaning: string; lowMeaning: string }
> = {
  investmentCost: {
    label: 'Initial Investment & Cost',
    description: 'Upfront capital expenditure required for legal setup, physical facilities, and initial operating pipeline.',
    highMeaning: 'High score (80–100) = Minimal upfront capital burden, highly cost-efficient.',
    lowMeaning: 'Low score (0–40) = Substantial capital lock-in in foreign assets and high fixed overhead.'
  },
  riskLevel: {
    label: 'Business & Political Risk',
    description: 'Degree of downside risk mitigation regarding non-payment, political shifts, and unsold seasonal inventory.',
    highMeaning: 'High score (80–100) = Shielded via export credit insurance (ECGC), LCs, or shared exposure.',
    lowMeaning: 'Low score (0–40) = 100% absorption of market volatility, off-season stock obsolescence, and lease liabilities.'
  },
  controlLevel: {
    label: 'Level of Control over Operations & Brand',
    description: 'Direct authority over wholesale pricing, technical garment specifications, brand positioning, and channel selection.',
    highMeaning: 'High score (80–100) = Direct brand oversight, contract terms enforcement, and quality assurance.',
    lowMeaning: 'Low score (0–40) = Intermediary or licensee dictates pricing, merchandising, and end-customer experience.'
  },
  marketKnowledge: {
    label: 'Access to Market Knowledge & Distribution',
    description: 'Speed and depth of gaining access to specialized cold-weather retail shelf space and local buyer networks.',
    highMeaning: 'High score (80–100) = Instant turnkey distribution across established regional outdoor store networks.',
    lowMeaning: 'Low score (0–40) = Steep cold-start learning curve with zero preexisting distribution channels.'
  },
  exporterSuitability: {
    label: 'Suitability for Established Indian Exporter',
    description: 'Strategic alignment with an Indian manufacturer possessing scaled production facilities, export documentation expertise, and DGFT incentives.',
    highMeaning: 'High score (80–100) = Maximizes Indian plant capacity, captures export incentives, and avoids foreign retail liabilities.',
    lowMeaning: 'Low score (0–40) = Contradicts manufacturing business model (e.g. licensing out production or running costly foreign retail).'
  }
};

export const INITIAL_ENTRY_MODES_BY_COUNTRY: Record<string, CountryEntryModeProfile> = {
  norway: {
    countryId: 'norway',
    countryName: 'Norway',
    flag: '🇳🇴',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting via specialized Nordic sports distributors (e.g., XXL, Intersport Norge) is the optimal entry pathway. It leverages 0% tariffs under the 2024 India-EFTA TEPA while avoiding exorbitant Norwegian retail staffing and leasing overhead.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Supplying containerized winter apparel directly to established Norwegian outdoor retail chains and specialist distributors.',
        scores: {
          investmentCost: 86,
          riskLevel: 88,
          controlLevel: 82,
          marketKnowledge: 88,
          exporterSuitability: 96
        },
        keyAdvantage: 'Bypasses domestic middlemen, exploits 0% duty under India-EFTA TEPA, and utilizes existing Indian factory lines.',
        primaryRisk: 'Consolidated Norwegian retail buying power (XXL/Sport 1) exerting price pressure on seasonal replenishment.',
        countrySpecificRationale:
          'Norway has a highly consolidated sporting goods market where 3 major chains command over 65% of winter apparel sales. Direct supply contracts secured on FOB/CIF terms with Irrevocable Letters of Credit give the Indian exporter maximum volume with zero Norwegian physical overhead.',
        whyAlternativesScoredLower:
          'Wholly Owned Subsidiary scored lower (53.4) due to Norway having Europe\'s highest retail hourly wages and steep commercial leases. Indirect Exporting scored lower (65.2) because intermediaries capture 20% margin while severing buyer relationships. Franchising and Licensing score poorly because Norwegian consumers trust technical multi-brand retailers rather than monobrand apparel franchises.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling goods to Indian export trading houses or international commission agents who handle Norwegian distribution.',
        scores: {
          investmentCost: 95,
          riskLevel: 84,
          controlLevel: 30,
          marketKnowledge: 52,
          exporterSuitability: 58
        },
        keyAdvantage: 'Zero overseas operational involvement and zero direct foreign exchange exposure.',
        primaryRisk: 'Total loss of brand identity; trading house can switch to lower-cost Bangladesh/Vietnam mills overnight.',
        countrySpecificRationale:
          'While capital-safe, selling via Indian trading merchants forfeits direct relationships with lucrative Nordic buyers and sacrifices 15–22% gross margin, which is unsuitable for an established exporter with full shipping capabilities.',
        whyAlternativesScoredLower:
          'Scored lower than Direct Exporting because an established exporter already has in-house customs clearance, EDI, and banking facilities, rendering domestic trading intermediaries an unnecessary cost drag.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Contractually licensing thermal apparel patterns and technical specifications to Norwegian or Scandinavian manufacturers for a royalty.',
        scores: {
          investmentCost: 82,
          riskLevel: 68,
          controlLevel: 48,
          marketKnowledge: 64,
          exporterSuitability: 50
        },
        keyAdvantage: 'Low capital requirement; generates passive 4–7% royalty revenue without shipping bulky insulated garments.',
        primaryRisk: 'Brand dilution and high risk of licensee defaulting or reverse-engineering technical seam-sealing techniques.',
        countrySpecificRationale:
          'Norway has almost negligible domestic garment manufacturing capacity due to high labor costs; local Norwegian brands (e.g., Helly Hansen, Norrøna) manufacture in Asia rather than in Norway, making in-country licensing functionally illogical.',
        whyAlternativesScoredLower:
          'Scored significantly lower because it denies the Indian exporter production volume for its own Indian mills, which defeats the company\'s core business model.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Partnering with Norwegian franchisees to open dedicated brand flagship boutiques across Oslo, Bergen, and ski resorts.',
        scores: {
          investmentCost: 62,
          riskLevel: 62,
          controlLevel: 70,
          marketKnowledge: 68,
          exporterSuitability: 38
        },
        keyAdvantage: 'Franchisee finances store fit-outs while adhering to standardized corporate merchandising.',
        primaryRisk: 'Brutal summer seasonality leaving monobrand winter clothing stores cash-flow negative for 5–6 months per year.',
        countrySpecificRationale:
          'Norwegian cold-weather apparel retail is heavily concentrated in multi-brand outdoor emporiums. Standalone monobrand retail franchises face prohibitive retail square-meter leases in central Oslo and severe off-season slumps.',
        whyAlternativesScoredLower:
          'Scored lowest among contractual modes because the business profile is an apparel exporter/manufacturer, not a consumer franchise retail brand.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Establishing a 50:50 co-owned corporate entity with an established Norwegian outdoor distributor or sporting brand.',
        scores: {
          investmentCost: 52,
          riskLevel: 68,
          controlLevel: 74,
          marketKnowledge: 90,
          exporterSuitability: 70
        },
        keyAdvantage: 'Instant access to partner\'s regional warehousing, logistics networks, and established retail buyer agreements.',
        primaryRisk: 'Governance deadlock, potential cultural conflict in operational management, and complex cross-border profit repatriation.',
        countrySpecificRationale:
          'A Joint Venture offers strong market knowledge, but Norwegian corporate law imposes rigorous co-determination rules and significant capital adequacy standards. Negotiating and managing a 50:50 venture adds governance friction that direct distributor contracts avoid.',
        whyAlternativesScoredLower:
          'Direct Export achieves approximately 90% of the distribution benefits of a JV without the heavy legal fees, capital lock-in, and cross-border equity entanglements.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating an AS (Aksjeselskap) in Norway with local sales executives, dedicated warehouse facilities, and direct customer billing.',
        scores: {
          investmentCost: 28,
          riskLevel: 44,
          controlLevel: 98,
          marketKnowledge: 60,
          exporterSuitability: 42
        },
        keyAdvantage: 'Absolute 100% control over pricing, brand positioning, customer service, and full retention of operating profits.',
        primaryRisk: 'Extremely high operational break-even threshold due to Norwegian labor regulations, social charges, and high office/logistics rents.',
        countrySpecificRationale:
          'Setting up a wholly owned foreign subsidiary in Norway requires significant upfront capital (€250k–€500k minimum working capital) and exposes the Indian exporter to high fixed overheads in a relatively small market of 5.5 million inhabitants.',
        whyAlternativesScoredLower:
          'FDI is disproportionate for initial market entry. It forces an Indian manufacturing firm to become a foreign retail/logistics operator in one of the world\'s most expensive operating environments.'
      }
    }
  },
  switzerland: {
    countryId: 'switzerland',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting via selective agency agreements with premium Swiss outdoor retailers (e.g., Transa, Ochsner Sport) is the winning mode, maximizing luxury margins under the India-EFTA TEPA 0% tariff regime.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct contractual export shipments to premium Swiss sporting distributors and department store buying groups (Manor, PKZ).',
        scores: {
          investmentCost: 85,
          riskLevel: 90,
          controlLevel: 80,
          marketKnowledge: 86,
          exporterSuitability: 95
        },
        keyAdvantage: 'Zero import tariff under India-EFTA TEPA; highest per-unit FOB realizations in continental Europe.',
        primaryRisk: 'Demanding Swiss quality inspection and strict Swiss Alpine safety certification tolerances.',
        countrySpecificRationale:
          'Switzerland boasts the highest purchasing power in Europe ($98k GDP per capita). Partnering directly with high-end Swiss distributors allows Indian exporters to sell technical performance outerwear at premium price points without paying Swiss corporate overhead.',
        whyAlternativesScoredLower:
          'Swiss corporate registration, legal compliance, and commercial rental costs (Zurich/Geneva) make Wholly Owned Subsidiaries prohibitively expensive (54.8). Indirect exporting sacrifices the lucrative premium margin that Swiss retailers are willing to pay for direct factory relationships.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to European trading houses in Germany or the Netherlands who re-export into Switzerland.',
        scores: {
          investmentCost: 94,
          riskLevel: 86,
          controlLevel: 32,
          marketKnowledge: 54,
          exporterSuitability: 57
        },
        keyAdvantage: 'Trader handles non-EU Swiss customs clearance and currency conversion into Swiss Francs (CHF).',
        primaryRisk: 'Erosion of premium Swiss price realization through multi-tier distributor markups.',
        countrySpecificRationale:
          'Swiss buyers place immense value on direct relationships with audited manufacturing mills. Handing production to a general European trader strips the Indian company of its Swiss customer relationships.',
        whyAlternativesScoredLower:
          'Direct Exporting achieves far superior export realizations while utilizing the India-EFTA trade agreement that the trader might not properly claim.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing thermal membrane construction rights to Swiss alpine sporting gear houses.',
        scores: {
          investmentCost: 80,
          riskLevel: 70,
          controlLevel: 50,
          marketKnowledge: 66,
          exporterSuitability: 52
        },
        keyAdvantage: 'Leverages Swiss technical brand prestige without incurring international transit costs.',
        primaryRisk: 'Swiss technical standards are proprietary; local brands rarely license foreign apparel designs.',
        countrySpecificRationale:
          'Swiss outerwear brands pride themselves on in-house R&D and proprietary fabric technologies (e.g., Schoeller). They seek reliable manufacturing contract partners in India rather than licensing third-party designs.',
        whyAlternativesScoredLower:
          'Contractual licensing has low demand in the Swiss textile market, where Swiss firms outsource manufacturing rather than licensing in.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Establishing franchised winter sportswear outlets in Swiss ski resort towns like Zermatt and St. Moritz.',
        scores: {
          investmentCost: 58,
          riskLevel: 58,
          controlLevel: 72,
          marketKnowledge: 66,
          exporterSuitability: 36
        },
        keyAdvantage: 'High prestige positioning in world-famous alpine tourism centers.',
        primaryRisk: 'Astronomical alpine commercial rents and severe off-season footfall collapse from May to September.',
        countrySpecificRationale:
          'Ski resort leases in Switzerland command some of the highest square-meter rates globally. Independent franchisees are unwilling to absorb these costs for an unproven Indian brand.',
        whyAlternativesScoredLower:
          'Monobrand retail franchising is economically unviable in Swiss alpine towns compared to selling through multi-brand outdoor chains like Transa.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-investing with a Swiss outdoor brand or distributor into a joint marketing and fulfillment vehicle in Basel/Zurich.',
        scores: {
          investmentCost: 50,
          riskLevel: 72,
          controlLevel: 75,
          marketKnowledge: 88,
          exporterSuitability: 72
        },
        keyAdvantage: 'Combines Swiss alpine market credibility and local retail access with Indian low-cost technical manufacturing.',
        primaryRisk: 'High Swiss legal structuring costs and potential partner friction regarding margin division.',
        countrySpecificRationale:
          'A joint venture can provide deep access to Swiss and neighboring Austrian/German ski markets, but establishing a Swiss AG entity involves high capital deposits (CHF 100k minimum capital) and complex fiduciary administration.',
        whyAlternativesScoredLower:
          'Scored 71.4 vs 87.2 for Direct Exporting. Direct Export achieves equivalent distribution penetration without committing substantial equity capital.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Swiss GmbH or AG to operate local sales offices, direct B2B showrooms, and Swiss customs clearance.',
        scores: {
          investmentCost: 30,
          riskLevel: 48,
          controlLevel: 98,
          marketKnowledge: 62,
          exporterSuitability: 44
        },
        keyAdvantage: 'Local Swiss entity status enhances trust with conservative Swiss enterprise and retail buyers.',
        primaryRisk: 'High ongoing Swiss administrative, legal, audit, and payroll tax compliance expenditures.',
        countrySpecificRationale:
          'While having a Swiss AG grants high prestige, annual operating expenses for a Swiss commercial office typically exceed CHF 250,000 before a single garment is sold.',
        whyAlternativesScoredLower:
          'For initial market entry, the high fixed overhead poses an unjustified financial drain compared to a direct commercial supply contract.'
      }
    }
  },
  canada: {
    countryId: 'canada',
    countryName: 'Canada',
    flag: '🇨🇦',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting via large-scale private label and branded supply agreements with Canadian national retail giants (Canadian Tire, Mark\'s, Sporting Life) provides massive container volume tailored to Indian factory capacity.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Bulk sea-container supply directly to major Canadian retail distribution centers in Vancouver, Toronto, and Montreal.',
        scores: {
          investmentCost: 88,
          riskLevel: 86,
          controlLevel: 80,
          marketKnowledge: 86,
          exporterSuitability: 96
        },
        keyAdvantage: 'Massive order volumes for insulated parkas and thermals perfectly matching Indian plant scale.',
        primaryRisk: 'Canada Border Services Agency (CBSA) customs duties (approx. 16–18% MFN on apparel without FTA).',
        countrySpecificRationale:
          'Canada has harsh, non-negotiable 6-month sub-zero winters across all provinces, generating high, stable demand for heavy-duty winter coats. Major Canadian department store conglomerates look for large-scale, dependable overseas manufacturers capable of 50,000+ unit runs.',
        whyAlternativesScoredLower:
          'A Wholly Owned Subsidiary (56.2) incurs unnecessary capital lock-in across vast geographical distances. Indirect exporting (64.6) forfeits the direct buyer relationships necessary to secure multi-year private label apparel contracts with Canadian retail chains.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Supplying North American buying houses in New York or Toronto who consolidate winterwear for Canadian regional retailers.',
        scores: {
          investmentCost: 96,
          riskLevel: 82,
          controlLevel: 28,
          marketKnowledge: 50,
          exporterSuitability: 58
        },
        keyAdvantage: 'Minimal sales overhead; buying agent handles Canadian import documentation and customs brokerage.',
        primaryRisk: 'Zero direct visibility into retailer SKU reorder velocity; high risk of contract reallocation.',
        countrySpecificRationale:
          'Canadian retail buying is highly centralized; working through an intermediary unnecessarily gives away 12–20% of FOB margin that an established Indian exporter could keep by dealing directly with Canadian procurement teams.',
        whyAlternativesScoredLower:
          'Established Indian exporters already possess the compliance auditing (WRAP, BSCI) required by Canadian retail groups to establish direct B2B vendor accounts.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing technical winter garment designs to Canadian regional workwear manufacturers.',
        scores: {
          investmentCost: 84,
          riskLevel: 66,
          controlLevel: 46,
          marketKnowledge: 62,
          exporterSuitability: 48
        },
        keyAdvantage: 'Bypasses Canadian import tariffs and cross-Pacific container transit times.',
        primaryRisk: 'Canadian domestic cut-and-sew manufacturing is small and focused primarily on ultra-luxury down parkas (e.g. Canada Goose).',
        countrySpecificRationale:
          'Canada imports over 90% of its apparel from Asia. Domestic Canadian garment manufacturing is too small to license mass-market winter outerwear production.',
        whyAlternativesScoredLower:
          'Canadian companies seek offshore production partners in India, not intellectual property licenses to manufacture within Canada.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Developing franchised outerwear retail stores across Canadian shopping malls from Calgary to Montreal.',
        scores: {
          investmentCost: 60,
          riskLevel: 60,
          controlLevel: 68,
          marketKnowledge: 66,
          exporterSuitability: 38
        },
        keyAdvantage: 'Expands brand presence in cold Canadian urban centers using local franchisee investment.',
        primaryRisk: 'Intense competition from established Canadian chains (Mark\'s, Sport Chek, Atmosphere, MEC).',
        countrySpecificRationale:
          'Canadian commercial mall rents are high, and the retail landscape is heavily dominated by multi-brand outdoor chains. Building an independent franchised retail network requires immense brand marketing that an Indian manufacturer cannot justify.',
        whyAlternativesScoredLower:
          'Franchising has a low exporter suitability score (38) because it diverts resources away from factory manufacturing into retail store management.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Forming a strategic partnership with a Canadian outdoor distributor or regional winter workwear brand.',
        scores: {
          investmentCost: 54,
          riskLevel: 66,
          controlLevel: 72,
          marketKnowledge: 88,
          exporterSuitability: 70
        },
        keyAdvantage: 'Rapid entry into Canadian industrial, mining, and outdoor workwear distribution channels.',
        primaryRisk: 'Shared control issues and legal complexities under Canadian federal and provincial corporate law.',
        countrySpecificRationale:
          'A Joint Venture with a Canadian distributor can provide immediate access to specialized commercial accounts (oil & gas winter workwear in Alberta, forestry in BC). However, structuring equity ventures across 9.5 hours of time zone difference is cumbersome.',
        whyAlternativesScoredLower:
          'Direct Export contracts achieve identical retail distribution without requiring equity dilution or cross-border joint board meetings.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Canadian subsidiary (Federal or Ontario corporation) with local warehousing and logistics in Brampton/Mississauga.',
        scores: {
          investmentCost: 32,
          riskLevel: 46,
          controlLevel: 96,
          marketKnowledge: 62,
          exporterSuitability: 45
        },
        keyAdvantage: 'Local stockholding enables next-day replenishment for Canadian e-commerce and retail partners.',
        primaryRisk: 'High fixed inventory carrying costs and Canadian warehouse leasing commitments during warm months.',
        countrySpecificRationale:
          'Setting up a Canadian subsidiary requires significant working capital and introduces local corporate taxation, payroll taxes, and unsold seasonal inventory liabilities.',
        whyAlternativesScoredLower:
          'Direct container exporting to the buyer\'s own distribution centers transfers the inventory holding risk to the buyer, which is far safer for the exporter.'
      }
    }
  },
  japan: {
    countryId: 'japan',
    countryName: 'Japan',
    flag: '🇯🇵',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting supported by the India-Japan CEPA (preferential 0% tariffs) and partnerships with Japanese trading/apparel conglomerates (sogo shosha or specialized trading companies) offers maximum scalability.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct OEM/ODM export contracts to Japanese apparel brands and outdoor chains under India-Japan CEPA.',
        scores: {
          investmentCost: 84,
          riskLevel: 88,
          controlLevel: 80,
          marketKnowledge: 84,
          exporterSuitability: 95
        },
        keyAdvantage: 'Full duty-free preference under India-Japan CEPA; fast maritime transit from JNPT to Tokyo/Yokohama (16–20 days).',
        primaryRisk: 'Japanese quality standards (JIS) are zero-defect; strict needle-detection and stitch-tension requirements.',
        countrySpecificRationale:
          'Japan\'s outdoor ski culture (Hokkaido powder snow) drives strong demand for technical outerwear. Established Indian mills with JIS-compliant quality control can secure long-term seasonal production contracts directly with major Japanese retail groups.',
        whyAlternativesScoredLower:
          'FDI in Tokyo (Wholly Owned Subsidiary: 52.6) is notoriously expensive and legally demanding. Joint Ventures with Japanese firms often suffer from cultural and consensus-driven decision bottlenecks (nemawashi).'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to Japanese-focused Indian export houses in Mumbai/Delhi.',
        scores: { investmentCost: 94, riskLevel: 84, controlLevel: 28, marketKnowledge: 52, exporterSuitability: 56 },
        keyAdvantage: 'Handles complex Japanese language communication and customs documentation.',
        primaryRisk: 'Intermediary captures substantial margin in a price-sensitive market.',
        countrySpecificRationale: 'Japanese buyers require direct technical communication with mill engineers for sample approvals, which indirect trading houses disrupt.',
        whyAlternativesScoredLower: 'Direct technical dialogue is essential for Japanese winter garment specifications.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing proprietary fabric treatments to Japanese textile converters.',
        scores: { investmentCost: 78, riskLevel: 68, controlLevel: 46, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Bypasses Japanese retail channel gatekeepers.',
        primaryRisk: 'Japan already leads global synthetic fiber innovation (Toray, Teijin), making reverse licensing difficult.',
        countrySpecificRationale: 'Japanese textile giants possess superior domestic fabric IP, seeking cut-and-sew manufacturing scale in India rather than foreign IP.',
        whyAlternativesScoredLower: 'Japanese firms want Indian manufacturing execution, not foreign garment licenses.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Franchising branded winterwear shops in Tokyo (Shibuya, Ginza) and Sapporo.',
        scores: { investmentCost: 56, riskLevel: 58, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 34 },
        keyAdvantage: 'High visibility in world-class Asian retail fashion districts.',
        primaryRisk: 'Extreme commercial rental rates and saturated domestic retail landscape (Uniqlo, Workman, Montbell).',
        countrySpecificRationale: 'The Japanese apparel retail market is dominated by domestic powerhouses; entering via standalone franchises is virtually impossible.',
        whyAlternativesScoredLower: 'Monobrand apparel franchising in Japan has a high failure rate for foreign unknown labels.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Forming a joint enterprise with a Japanese trading firm (e.g. Itochu, Marubeni textile division).',
        scores: { investmentCost: 52, riskLevel: 70, controlLevel: 72, marketKnowledge: 90, exporterSuitability: 72 },
        keyAdvantage: 'Partner provides turnkey access to national Japanese department stores and supply chains.',
        primaryRisk: 'Lengthy consensus-building timelines and complex Japanese corporate governance.',
        countrySpecificRationale: 'A joint venture with a Japanese trading house is a viable second-best option, but requires extensive corporate alignment and legal commitments.',
        whyAlternativesScoredLower: 'Direct supply contracts with Japanese buyers achieve similar volume without shared equity complexity.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Kabushiki Kaisha (KK) in Japan with local Japanese leadership.',
        scores: { investmentCost: 28, riskLevel: 44, controlLevel: 96, marketKnowledge: 58, exporterSuitability: 40 },
        keyAdvantage: 'Complete corporate independence and direct access to Japanese corporate clients.',
        primaryRisk: 'High fixed salary overhead and rigid Japanese labor law restrictions.',
        countrySpecificRationale: 'Setting up a subsidiary in Japan involves substantial incorporation costs and cultural hurdles for an overseas Indian manufacturer.',
        whyAlternativesScoredLower: 'Unnecessary capital outlay when Japanese apparel brands regularly import via direct FOB shipping.'
      }
    }
  },
  'united-states': {
    countryId: 'united-states',
    countryName: 'United States',
    flag: '🇺🇸',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting via vendor partnerships with national US department store chains, outdoor retailers (REI, Bass Pro), and major DTC e-commerce brands offers massive volume throughput.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Bulk container shipments directly to US retailer distribution hubs in New Jersey, California, and Chicago.',
        scores: { investmentCost: 86, riskLevel: 84, controlLevel: 82, marketKnowledge: 84, exporterSuitability: 96 },
        keyAdvantage: 'Vast consumer market scale; multi-million dollar single purchase orders for winter outerwear.',
        primaryRisk: 'US MFN garment tariffs (15–28%) and demanding vendor compliance chargeback penalties.',
        countrySpecificRationale: 'The US is the world\'s largest single-country consumer market for winter apparel. Established Indian exporters routinely handle US customs and shipping logistics directly.',
        whyAlternativesScoredLower: 'FDI in the US (56.4) incurs massive legal and logistics overhead; indirect exporting loses 15% margin on massive volume.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to US apparel buying houses in Mumbai or New York.',
        scores: { investmentCost: 95, riskLevel: 82, controlLevel: 28, marketKnowledge: 52, exporterSuitability: 58 },
        keyAdvantage: 'Intermediary assumes US chargeback and logistics risks.',
        primaryRisk: 'Middleman squeezes FOB price to the bare minimum.',
        countrySpecificRationale: 'US retail volumes are large enough that working through intermediaries costs hundreds of thousands of dollars in lost margins.',
        whyAlternativesScoredLower: 'Established exporters have the scale to deal directly with US buying teams.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing brand designs to US regional outerwear distributors.',
        scores: { investmentCost: 82, riskLevel: 66, controlLevel: 46, marketKnowledge: 62, exporterSuitability: 48 },
        keyAdvantage: 'Eliminates shipping and US customs tariffs.',
        primaryRisk: 'US licensee will outsource manufacturing to lowest-cost Asian mills, bypassing the Indian exporter.',
        countrySpecificRationale: 'US licensees outsource to Vietnam or Bangladesh; this does not keep the Indian exporter\'s factory running.',
        whyAlternativesScoredLower: 'Fails to utilize the Indian exporter\'s manufacturing infrastructure.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Franchising outdoor lifestyle stores in US metro malls and mountain resort towns.',
        scores: { investmentCost: 58, riskLevel: 58, controlLevel: 70, marketKnowledge: 64, exporterSuitability: 36 },
        keyAdvantage: 'Expands brand footprint using third-party franchisee capital.',
        primaryRisk: 'US Federal Trade Commission (FTC) franchise disclosure rules and intense retail competition.',
        countrySpecificRationale: 'US apparel retail is saturated with established brands (Columbia, North Face, Patagonia); independent franchises are uncompetitive.',
        whyAlternativesScoredLower: 'Franchising is mismatched with an established B2B garment manufacturer.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-venturing with a US outdoor brand or private-label distributor.',
        scores: { investmentCost: 52, riskLevel: 68, controlLevel: 72, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Combines US marketing strength with Indian factory production.',
        primaryRisk: 'Complex US corporate taxation and partner disputes.',
        countrySpecificRationale: 'A joint venture can provide valuable distribution access, but US commercial litigation risks make it complex.',
        whyAlternativesScoredLower: 'Direct vendor contracts provide the same volume without equity entanglements.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Establishing a Delaware C-Corp with a 3PL fulfillment warehouse in the US.',
        scores: { investmentCost: 32, riskLevel: 48, controlLevel: 98, marketKnowledge: 62, exporterSuitability: 46 },
        keyAdvantage: 'Enables domestic US billing and rapid fulfillment for e-commerce.',
        primaryRisk: 'Substantial upfront capital requirement and US state sales tax compliance.',
        countrySpecificRationale: 'A US subsidiary is viable for long-term expansion, but for market entry, direct exporting is far more capital-efficient.',
        whyAlternativesScoredLower: 'Capital expenditure is excessive for initial market penetration.'
      }
    }
  },
  germany: {
    countryId: 'germany',
    countryName: 'Germany',
    flag: '🇩🇪',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting through German sporting buying cooperatives (Intersport Deutschland, Sport 2000) leverages direct ocean container routes to Hamburg and Bremerhaven.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct sea container deliveries to central German logistics hubs.',
        scores: { investmentCost: 86, riskLevel: 88, controlLevel: 80, marketKnowledge: 86, exporterSuitability: 96 },
        keyAdvantage: 'Direct maritime connectivity from JNPT to Hamburg; serves as gateway to EU winter markets.',
        primaryRisk: 'Strict EU REACH chemical compliance and German Supply Chain Due Diligence Act (LkSG).',
        countrySpecificRationale: 'Germany is Europe\'s largest apparel market with highly structured buying cooperatives. Direct supply contracts yield substantial volume.',
        whyAlternativesScoredLower: 'Wholly owned subsidiaries in Germany require strict compliance with German labor laws and high social charges.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to European trading houses based in Rotterdam or Frankfurt.',
        scores: { investmentCost: 94, riskLevel: 84, controlLevel: 30, marketKnowledge: 52, exporterSuitability: 58 },
        keyAdvantage: 'Trader manages EU customs and VAT registration.',
        primaryRisk: 'Loss of direct relationship with major German retail cooperatives.',
        countrySpecificRationale: 'German buyers demand direct factory auditing; intermediaries hinder transparency.',
        whyAlternativesScoredLower: 'Direct exporting satisfies German corporate auditing requirements much better.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing winterwear designs to German outdoor brands (e.g. Jack Wolfskin).',
        scores: { investmentCost: 80, riskLevel: 68, controlLevel: 48, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Generates royalties with zero shipping overhead.',
        primaryRisk: 'German outdoor brands have extensive Asian sourcing networks and don\'t need design licensing.',
        countrySpecificRationale: 'German brands design in Germany and manufacture in Asia; they want manufacturing capacity, not licenses.',
        whyAlternativesScoredLower: 'Contradicts the Indian exporter\'s manufacturing model.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Franchising mono-brand retail stores in Munich, Frankfurt, and Berlin.',
        scores: { investmentCost: 58, riskLevel: 60, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 36 },
        keyAdvantage: 'Consumer brand recognition in wealthy German urban centers.',
        primaryRisk: 'High German commercial city-center rents and employee termination restrictions.',
        countrySpecificRationale: 'German retail is dominated by multi-brand outdoor stores; standalone winter franchises are economically risky.',
        whyAlternativesScoredLower: 'Retail franchising has high overhead and low suitability for an apparel manufacturer.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-venturing with a German outdoor distributor or wholesale group.',
        scores: { investmentCost: 52, riskLevel: 70, controlLevel: 74, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Turnkey access to German, Austrian, and Swiss (DACH) retail channels.',
        primaryRisk: 'Rigid German corporate governance (GmbH) and legal co-determination.',
        countrySpecificRationale: 'A German JV provides strong pan-European distribution, but involves significant legal setup costs.',
        whyAlternativesScoredLower: 'Direct export achieves strong retail distribution without shared equity encumbrances.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a German GmbH with dedicated warehouse facilities.',
        scores: { investmentCost: 30, riskLevel: 46, controlLevel: 98, marketKnowledge: 60, exporterSuitability: 44 },
        keyAdvantage: 'Local GmbH status inspires confidence among risk-averse German procurement managers.',
        primaryRisk: 'High fixed German corporate and employment taxation.',
        countrySpecificRationale: 'A German GmbH is capital-intensive for initial market entry compared to direct container shipping.',
        whyAlternativesScoredLower: 'Direct Export delivers superior return on capital for initial market testing.'
      }
    }
  },
  'united-kingdom': {
    countryId: 'united-kingdom',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting to British retail chains (Mountain Warehouse, Go Outdoors, Marks & Spencer) leverages long-standing Indo-British textile trade corridors and the potential India-UK FTA.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct sea container shipments to Felixstowe/Southampton for British retail distribution.',
        scores: { investmentCost: 86, riskLevel: 86, controlLevel: 80, marketKnowledge: 86, exporterSuitability: 96 },
        keyAdvantage: 'Deep cultural and trade familiarity between Indian textile mills and UK retail buyers.',
        primaryRisk: 'Pound Sterling volatility and post-Brexit UK customs regulatory divergence.',
        countrySpecificRationale: 'The UK has a massive outdoor recreation market. Major UK retailers have established buying offices in India and regularly place direct factory orders.',
        whyAlternativesScoredLower: 'A UK subsidiary (55.4) incurs high London/Midlands commercial overhead; indirect exporting surrenders established direct trade ties.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling through London-based textile commission agents.',
        scores: { investmentCost: 95, riskLevel: 82, controlLevel: 30, marketKnowledge: 52, exporterSuitability: 58 },
        keyAdvantage: 'Agent handles UKCA regulatory compliance and buyer liaison.',
        primaryRisk: 'Agent controls customer pricing and accounts.',
        countrySpecificRationale: 'UK retailers prefer direct vendor partnerships to ensure compliance with modern slavery and ethical trade audits.',
        whyAlternativesScoredLower: 'Direct export establishes long-term supply chain transparency demanded by UK buyers.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing outerwear trademarks to UK fashion retailers.',
        scores: { investmentCost: 80, riskLevel: 68, controlLevel: 46, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Royalty generation without UK import tariff exposure.',
        primaryRisk: 'UK retailers look for cheap Asian manufacturing, not brand licenses.',
        countrySpecificRationale: 'UK apparel manufacturing is minimal; UK companies need Indian factories to produce their apparel.',
        whyAlternativesScoredLower: 'Licensing does not utilize Indian factory capacity.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Opening franchised winter apparel shops on UK high streets.',
        scores: { investmentCost: 58, riskLevel: 58, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 36 },
        keyAdvantage: 'High street brand visibility.',
        primaryRisk: 'High UK business rates and ongoing distress in traditional brick-and-mortar retail.',
        countrySpecificRationale: 'UK high streets are struggling with high property taxes; opening physical franchises carries immense risk.',
        whyAlternativesScoredLower: 'UK retail franchising faces unfavorable macro trends compared to e-commerce and wholesale supply.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-venturing with a UK outdoor distributor or e-commerce specialist.',
        scores: { investmentCost: 52, riskLevel: 70, controlLevel: 74, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Shared UK warehousing and direct e-commerce fulfillment capabilities.',
        primaryRisk: 'Cross-border governance friction and post-Brexit VAT administration.',
        countrySpecificRationale: 'A joint venture can provide reliable UK distribution, but direct wholesale supply achieves similar volume with zero equity risk.',
        whyAlternativesScoredLower: 'Direct contracts avoid the legal complexities of cross-border UK joint ventures.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a UK Ltd company with local sales and customer service staff.',
        scores: { investmentCost: 32, riskLevel: 48, controlLevel: 98, marketKnowledge: 60, exporterSuitability: 44 },
        keyAdvantage: 'UK domestic trading status facilitates local government and institutional contracts.',
        primaryRisk: 'Ongoing UK administrative and commercial rental expenditures.',
        countrySpecificRationale: 'A UK Ltd is straightforward to incorporate, but maintaining local staff and warehouse inventory represents high upfront cost.',
        whyAlternativesScoredLower: 'Direct container export is much more cost-effective for initial market entry.'
      }
    }
  },
  sweden: {
    countryId: 'sweden',
    countryName: 'Sweden',
    flag: '🇸🇪',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting to Swedish sporting and outdoor chains (Stadium, Intersport Sverige, Naturkompaniet) emphasizes eco-certified technical outerwear under direct supply contracts.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct supply contracts to Swedish national retail groups meeting Nordic Swan eco-standards.',
        scores: { investmentCost: 86, riskLevel: 88, controlLevel: 80, marketKnowledge: 86, exporterSuitability: 96 },
        keyAdvantage: 'High demand for technical recycled outerwear with direct container shipments to Gothenburg.',
        primaryRisk: 'Rigorous Swedish sustainability and recycled material certification requirements.',
        countrySpecificRationale: 'Swedish outdoor culture (friluftsliv) creates year-round demand for functional winter outerwear. Direct relationships with Swedish retail buyers allow Indian exporters to showcase OEKO-TEX and GRS certifications.',
        whyAlternativesScoredLower: 'FDI in Stockholm (Wholly Owned Subsidiary: 52.8) entails high social charges and office costs.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Supplying via Nordic trading houses based in Denmark or Sweden.',
        scores: { investmentCost: 94, riskLevel: 84, controlLevel: 30, marketKnowledge: 52, exporterSuitability: 58 },
        keyAdvantage: 'Intermediary handles Scandinavian language labels and logistics.',
        primaryRisk: 'Middleman margin deduction in a competitive market.',
        countrySpecificRationale: 'Swedish buyers value direct factory contact to verify ethical manufacturing and environmental compliance.',
        whyAlternativesScoredLower: 'Direct exporting satisfies Swedish supply chain transparency expectations.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing functional apparel designs to Swedish outdoor brands.',
        scores: { investmentCost: 80, riskLevel: 68, controlLevel: 48, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Zero shipping or cross-border logistics overhead.',
        primaryRisk: 'Sweden is home to world-renowned design brands (Fjällräven, Peak Performance) that do not license foreign designs.',
        countrySpecificRationale: 'Swedish brands are design leaders; they seek offshore contract manufacturing, not foreign design licenses.',
        whyAlternativesScoredLower: 'Mismatched with the Swedish market reality.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Franchising monobrand winter clothing stores in Stockholm and Gothenburg.',
        scores: { investmentCost: 58, riskLevel: 60, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 36 },
        keyAdvantage: 'High brand visibility in affluent Nordic shopping malls.',
        primaryRisk: 'High Swedish commercial rents and strong local brand loyalty.',
        countrySpecificRationale: 'Swedish consumers are brand-conscious and loyal to heritage Nordic labels; unproven monobrand stores struggle.',
        whyAlternativesScoredLower: 'Franchising is ill-suited to an apparel manufacturing exporter.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-investing with a Swedish outdoor distributor or e-commerce platform.',
        scores: { investmentCost: 52, riskLevel: 70, controlLevel: 74, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Turnkey access to pan-Nordic warehousing and distribution.',
        primaryRisk: 'Swedish corporate governance and employee co-determination standards.',
        countrySpecificRationale: 'A Swedish JV offers strong Nordic coverage, but direct wholesale supply achieves similar scale without legal encumbrances.',
        whyAlternativesScoredLower: 'Direct contracts avoid equity entanglements in a foreign jurisdiction.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Swedish AB (Aktiebolag) with local sales staff.',
        scores: { investmentCost: 28, riskLevel: 46, controlLevel: 98, marketKnowledge: 60, exporterSuitability: 42 },
        keyAdvantage: 'Direct Swedish corporate identity and customer billing.',
        primaryRisk: 'High Swedish payroll taxes and employment protection laws.',
        countrySpecificRationale: 'Operating an AB in Sweden is expensive and disproportionate for an initial market entry.',
        whyAlternativesScoredLower: 'Direct export is far more capital-efficient.'
      }
    }
  },
  'south-korea': {
    countryId: 'south-korea',
    countryName: 'South Korea',
    flag: '🇰🇷',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting under the India-Korea CEPA enables rapid supply of fashionable technical winter outerwear to Seoul\'s fast-moving retail and e-commerce giants.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct shipments under India-Korea CEPA to South Korean fashion and outdoor retail brands.',
        scores: { investmentCost: 85, riskLevel: 86, controlLevel: 80, marketKnowledge: 84, exporterSuitability: 95 },
        keyAdvantage: 'Preferential tariffs under India-Korea CEPA; booming South Korean outdoor hiking and ski apparel culture.',
        primaryRisk: 'Rapidly shifting fashion cycles and intense domestic retail competition.',
        countrySpecificRationale: 'South Korea has cold winters (-10°C to -15°C) and the world\'s highest per-capita expenditure on outdoor apparel. Direct supply contracts with Korean brands offer high volume.',
        whyAlternativesScoredLower: 'Wholly Owned Subsidiaries in Seoul (53.2) face fierce retail competition and high lease costs.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to Korean trading companies (chaebol trading arms).',
        scores: { investmentCost: 94, riskLevel: 84, controlLevel: 28, marketKnowledge: 52, exporterSuitability: 56 },
        keyAdvantage: 'Handles Korean language, customs, and domestic distribution.',
        primaryRisk: 'Trading house exercises strong price leverage.',
        countrySpecificRationale: 'Large Korean trading firms take significant margin cuts and favor long-established relationships.',
        whyAlternativesScoredLower: 'Direct export captures better margin for the Indian exporter.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing thermal tech to Korean sportswear firms.',
        scores: { investmentCost: 80, riskLevel: 68, controlLevel: 46, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Low capital expenditure; generates royalty income.',
        primaryRisk: 'South Korea has world-class synthetic textile manufacturing and develops its own thermal technologies.',
        countrySpecificRationale: 'Korean firms seek cut-and-sew manufacturing partners in India, not foreign garment licenses.',
        whyAlternativesScoredLower: 'Contradicts the Indian exporter\'s core manufacturing strength.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Franchising branded retail boutiques in Gangnam and Myeongdong.',
        scores: { investmentCost: 56, riskLevel: 58, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 34 },
        keyAdvantage: 'High prestige positioning in trend-setting Asian fashion districts.',
        primaryRisk: 'Extremely high Seoul retail rents and fast product obsolescence.',
        countrySpecificRationale: 'Entering the competitive Korean retail market with an unproven foreign brand franchise carries immense financial risk.',
        whyAlternativesScoredLower: 'Franchising has very low suitability for a B2B garment manufacturer.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-venturing with a Korean outdoor lifestyle distributor.',
        scores: { investmentCost: 52, riskLevel: 70, controlLevel: 72, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Turnkey access to Korean department stores and online platforms (Coupang, Musinsa).',
        primaryRisk: 'Potential cultural and managerial misalignment in cross-border operations.',
        countrySpecificRationale: 'A Korean JV can provide rapid market access, but requires significant legal and capital commitments.',
        whyAlternativesScoredLower: 'Direct supply contracts achieve similar volume with zero equity risk.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Yuhan Hoesa in Seoul with local Korean sales executives.',
        scores: { investmentCost: 28, riskLevel: 46, controlLevel: 96, marketKnowledge: 60, exporterSuitability: 42 },
        keyAdvantage: 'Direct corporate presence in dynamic Asian fashion capital.',
        primaryRisk: 'High fixed commercial lease and payroll expenditures.',
        countrySpecificRationale: 'A Korean subsidiary is capital-heavy for initial market entry compared to direct FOB shipping.',
        whyAlternativesScoredLower: 'Direct export delivers superior return on invested capital.'
      }
    }
  },
  finland: {
    countryId: 'finland',
    countryName: 'Finland',
    flag: '🇫🇮',
    recommendedModeId: 'direct_export',
    strategicSummary:
      'Direct Exporting to Finnish outdoor and workwear retail groups (Intersport Finland, Kesko, Tokmanni) capitalizes on prolonged sub-arctic winter demand with zero administrative corruption.',
    modes: {
      direct_export: {
        id: 'direct_export',
        name: 'Direct Exporting',
        category: 'Exporting',
        shortDescription: 'Direct sea container deliveries via Helsinki/Vuosaari to Finnish retail buying groups.',
        scores: { investmentCost: 86, riskLevel: 90, controlLevel: 80, marketKnowledge: 86, exporterSuitability: 96 },
        keyAdvantage: 'Sub-arctic cold necessity creates 6 months of steady demand; transparent, corruption-free trade environment.',
        primaryRisk: 'Relatively small population (5.5M) limits massive bulk single-order scale.',
        countrySpecificRationale: 'Finland has the longest sub-zero winter duration in the EU. Partnering directly with Finnish retail groups (Kesko/S Group) provides secure, predictable winter garment orders.',
        whyAlternativesScoredLower: 'Wholly Owned Subsidiaries (52.4) are unviable due to small market scale; indirect exporting sacrifices margins needlessly.'
      },
      indirect_export: {
        id: 'indirect_export',
        name: 'Indirect Exporting',
        category: 'Exporting',
        shortDescription: 'Selling to Nordic commission traders in Helsinki or Stockholm.',
        scores: { investmentCost: 94, riskLevel: 84, controlLevel: 30, marketKnowledge: 52, exporterSuitability: 58 },
        keyAdvantage: 'Trader handles Baltic shipping logistics and ice-class transport.',
        primaryRisk: 'Intermediary captures 18–22% of margin in a small market.',
        countrySpecificRationale: 'Finnish retail is highly concentrated in two major buying groups (Kesko and S Group); working through a middleman adds unnecessary cost.',
        whyAlternativesScoredLower: 'Direct contact with Kesko/S Group buyers is straightforward and far more profitable.'
      },
      licensing: {
        id: 'licensing',
        name: 'Licensing',
        category: 'Contractual',
        shortDescription: 'Licensing technical designs to Finnish children\'s winterwear brands (e.g. Reima).',
        scores: { investmentCost: 80, riskLevel: 68, controlLevel: 48, marketKnowledge: 64, exporterSuitability: 50 },
        keyAdvantage: 'Zero physical logistics across the Baltic Sea.',
        primaryRisk: 'Finnish brands already have long-established Asian manufacturing supply chains.',
        countrySpecificRationale: 'Finnish brands design locally and manufacture in Asia; they want manufacturing capacity in India, not design licenses.',
        whyAlternativesScoredLower: 'Does not keep the Indian exporter\'s manufacturing lines running.'
      },
      franchising: {
        id: 'franchising',
        name: 'Franchising',
        category: 'Contractual',
        shortDescription: 'Opening franchised winter apparel stores in Helsinki and Tampere.',
        scores: { investmentCost: 58, riskLevel: 60, controlLevel: 70, marketKnowledge: 66, exporterSuitability: 36 },
        keyAdvantage: 'Direct brand presence in capital region.',
        primaryRisk: 'Small population base and high retail labor costs.',
        countrySpecificRationale: 'Standalone monobrand winter clothing stores in Finland face difficult economics due to the small urban population.',
        whyAlternativesScoredLower: 'Monobrand retail franchising has very low viability in Finland.'
      },
      joint_venture: {
        id: 'joint_venture',
        name: 'Joint Venture',
        category: 'Investment (FDI)',
        shortDescription: 'Co-investing with a Finnish outdoor sporting goods distributor.',
        scores: { investmentCost: 52, riskLevel: 72, controlLevel: 74, marketKnowledge: 88, exporterSuitability: 70 },
        keyAdvantage: 'Turnkey access to Finnish sports and workwear retail networks.',
        primaryRisk: 'High structuring costs for a relatively small consumer market.',
        countrySpecificRationale: 'A Finnish JV offers reliable distribution, but direct wholesale supply achieves similar volume with zero equity risk.',
        whyAlternativesScoredLower: 'Direct export contracts avoid equity entanglements in a small market.'
      },
      wholly_owned_subsidiary: {
        id: 'wholly_owned_subsidiary',
        name: 'Wholly Owned Subsidiary (FDI)',
        category: 'Investment (FDI)',
        shortDescription: 'Incorporating a Finnish Oy (Osakeyhtiö) with local sales staff in Helsinki.',
        scores: { investmentCost: 28, riskLevel: 46, controlLevel: 98, marketKnowledge: 60, exporterSuitability: 42 },
        keyAdvantage: 'Direct corporate identity in the European Union.',
        primaryRisk: 'High fixed commercial and employment costs relative to market size.',
        countrySpecificRationale: 'Establishing a subsidiary in Finland is capital-inefficient for a market of 5.5 million people.',
        whyAlternativesScoredLower: 'Direct export delivers far superior return on invested capital.'
      }
    }
  }
};
