export interface BiasTestRecord {
  id: number;
  category: string;
  expectedArchetype: string;
  businessProfile: string;
  top3Countries: string;
  recommendedEntryMode: string;
  reasonsForResult: string;
  biasSuspected:
    | 'Undetermined (Test Pending)'
    | 'Geographic / Climate-Proxy Bias'
    | 'Entry Mode Invariance Bias'
    | 'Market Scale Distortion'
    | 'Bilateral Treaty Conflation'
    | 'No Evident Bias Detected';
  notes: string;
  testedAt?: string;
}

export interface BiasTypeInfo {
  name: string;
  tag: string;
  description: string;
  howToIdentify: string;
  warningSymptom: string;
  correctionStrategy: string;
}

export const BIAS_EVALUATION_CRITERIA: BiasTypeInfo[] = [
  {
    name: 'Climate-Proxy & Geographic Invariance Bias',
    tag: 'Geographic Bias',
    description:
      'Occurs when the decision engine repeatedly recommends cold-weather Nordic or Alpine nations regardless of whether the product has any functional or cultural relationship to cold climates.',
    howToIdentify:
      'Check if Norway, Switzerland, or Canada appear in the Top 3 for non-climate categories like Spices, Electronics, Toys, or Cosmetics without verified local demand superiority.',
    warningSymptom:
      '>7 of the 10 categories recommend the exact same 3 countries because Stage 1 demand was operationalized around sub-zero temperature duration.',
    correctionStrategy:
      'Decouple the Market Demand factor: substitute winter snowfall metrics with category-specific global trade import volumes (ITC Trade Map) or per-capita culinary/tech consumption indices.'
  },
  {
    name: 'Entry Mode Invariance Bias (Channel Inflexibility)',
    tag: 'Mode Bias',
    description:
      'Occurs when Direct Exporting wins in every single category, ignoring product-specific asset specificity, capital intensity, or after-sales servicing requirements.',
    howToIdentify:
      'Evaluate whether high-touch, complex products (like Industrial Machinery) or brand-intensive goods (like Cosmetics) still yield Direct Exporting instead of Joint Ventures or Subsidiaries.',
    warningSymptom:
      'Direct Exporting wins 10 out of 10 tests because the model weights excessively penalize initial foreign capital investment and political risk.',
    correctionStrategy:
      'Dynamically adjust Stage 3 criteria weights based on product type: increase weight on "Control Level" and "Access to Local Market Knowledge" for goods requiring on-site maintenance or brand protection.'
  },
  {
    name: 'Market Population Disregard Bias (Scale Distortion)',
    tag: 'Scale Bias',
    description:
      'Occurs when small, affluent nations (e.g. Norway: 5.5M, Switzerland: 8.9M) consistently outrank massive consumer economies (e.g. US: 335M, Germany: 84M) for volume-dependent goods.',
    howToIdentify:
      'For mass-market, fast-moving items like Toys & Games, Packaged Food, or Furniture, check if the model favors high per-capita GDP while ignoring tiny total addressable market size.',
    warningSymptom:
      'Total addressable volume is eclipsed by purchasing power index, causing micro-populations to monopolize top rankings.',
    correctionStrategy:
      'Introduce an explicit "Market Size & Demographic Volume" sub-factor (minimum 15% weight) to normalize purchasing power by total consumable population.'
  },
  {
    name: 'Bilateral Treaty Conflation Bias',
    tag: 'Treaty Bias',
    description:
      'Occurs when preferential Free Trade Agreements (e.g. 2024 India-EFTA TEPA) artificially inflate rankings for products where tariffs are already negligible or where non-tariff barriers dominate.',
    howToIdentify:
      'Verify if EFTA countries are favored for agricultural/food categories where sanitary and phytosanitary (SPS) quotas or stringent veterinary standards represent far higher hurdles than tariffs.',
    warningSymptom:
      'A 0% duty under TEPA gives a 10–15 point boost even when non-tariff regulatory certification costs render market access economically unviable for an Indian SME.',
    correctionStrategy:
      'De-weight trade barriers for categories where MFN applied tariffs are already low (<3%), and elevate the Legal/Regulatory hurdle score in Stage 2.'
  }
];

export const INITIAL_BIAS_TEST_RECORDS: BiasTestRecord[] = [
  {
    id: 1,
    category: 'Winter apparel',
    expectedArchetype: 'Cold-Climate Necessity (Baseline Control)',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'Control Baseline: Assigned course project category. Cold weather indicators should legitimately favor sub-zero nations.'
  },
  {
    id: 2,
    category: 'Spices',
    expectedArchetype: 'Agricultural Culinary Commodity',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'Non-climate commodity. Test if model erroneously favors Norway/Switzerland over high-volume spice importers (US, Germany, UK).'
  },
  {
    id: 3,
    category: 'Electronics',
    expectedArchetype: 'Technology Hardware & Components',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'High-tech goods requiring tech infrastructure, digital literacy, and IP protection rather than sub-zero cold.'
  },
  {
    id: 4,
    category: 'Furniture',
    expectedArchetype: 'Bulky Consumer Durable',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'Freight-sensitive consumer durable. High ocean shipping volume per cubic meter tests logistics weight sensitivity.'
  },
  {
    id: 5,
    category: 'Toys and games',
    expectedArchetype: 'Demographic Consumer Good',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'Child demographic-driven. Check if aging Nordic populations are favored over larger youthful populations.'
  },
  {
    id: 6,
    category: 'Leather accessories',
    expectedArchetype: 'Traditional Indian Export Strength',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'High-margin luxury and functional leather. Tests whether tariff preference outweighs intense domestic European brand competition.'
  },
  {
    id: 7,
    category: 'Packaged food',
    expectedArchetype: 'Perishable Consumable / Shelf-Life Dependent',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'Strict sanitary & phytosanitary (SPS) compliance. Tests whether food labeling and shelf-life restrictions alter legal scores.'
  },
  {
    id: 8,
    category: 'Cosmetics',
    expectedArchetype: 'Brand-Intensive FMCG / Personal Care',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'High marketing spend required. Tests if entry mode shifts towards Joint Venture or Licensing to leverage local beauty channels.'
  },
  {
    id: 9,
    category: 'Sports equipment',
    expectedArchetype: 'Active Recreation / Athleisure Gear',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'General sports (cricket, field sports, fitness). Tests if model distinguishes general athletic equipment from winter sports.'
  },
  {
    id: 10,
    category: 'Industrial machinery',
    expectedArchetype: 'B2B Capital Goods with After-Sales Servicing',
    businessProfile: 'Established Exporter from India',
    top3Countries: '',
    recommendedEntryMode: '',
    reasonsForResult: '',
    biasSuspected: 'Undetermined (Test Pending)',
    notes: 'High asset specificity. Requires local installation, spare parts depots, and technical warranty support.'
  }
];
