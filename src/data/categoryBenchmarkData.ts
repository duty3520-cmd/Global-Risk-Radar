import { CountryCandidate, PestelDossier } from '../App';
import { CountryEntryModeProfile, INITIAL_ENTRY_MODES_BY_COUNTRY } from './entryModesData';

export interface CategoryBenchmark {
  categoryId: number;
  categoryName: string;
  expectedArchetype: string;
  businessProfile: string;
  hsCode: string;
  description: string;
  countries: CountryCandidate[];
  pestelData?: Record<string, Partial<PestelDossier>>;
  entryModesData?: Record<string, CountryEntryModeProfile>;
  diagnosticRationale: string;
  recommendedEntryModeName: string;
  biasAnalysisVerdict: string;
}

// 1. WINTER APPAREL (Baseline Control)
const WINTER_APPAREL_COUNTRIES: CountryCandidate[] = [
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
    suitabilityExplanation: 'Extremely severe sub-zero winters with deep-rooted outdoor recreation culture. Benefits from the 2024 India-EFTA Trade & Economic Partnership Agreement (TEPA), giving Indian exporters preferential access and high willingness to pay for premium technical outerwear.',
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
    suitabilityExplanation: 'Highest per-capita outerwear expenditure in Europe. Directly supported by the India-EFTA trade pact. While quality and thermal performance thresholds are demanding, it offers exceptional export margins for certified technical apparel.',
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
    suitabilityExplanation: 'Critical cold necessity where winter apparel is a mandatory safety item. Substantial market scale for insulated down parkas, thermal base-layers, and snow gear. Indian exporters can capture significant private-label contracts with major Canadian retail chains.',
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
    suitabilityExplanation: 'Direct beneficiary of the India-Japan Comprehensive Economic Partnership Agreement (CEPA) with preferential garment tariffs. Fast maritime transit from Indian ports and a booming winter ski tourism industry create strong year-round sourcing appetite.',
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
    suitabilityExplanation: 'The largest total volume consumer market for winter apparel. High competitive brand rivalry is offset by immense order volumes from American department store conglomerates and direct-to-consumer e-commerce fulfillment hubs.',
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
    suitabilityExplanation: 'Largest economy and apparel importer in the European Union. Direct container connectivity via Hamburg and Bremerhaven from Indian ports. Serves as an ideal central European logistics hub for multi-country winter distribution.',
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
    suitabilityExplanation: 'Deep historical trade links with Indian textile mills. British weather demands high water-resistant and windproof thermal outerwear. Ongoing India-UK trade negotiations provide high strategic upside for established suppliers.',
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
    suitabilityExplanation: 'High eco-conscious outdoor lifestyle. Swedish consumers favor technical recycled-polyester insulation and certified down. Established Indian mills with OEKO-TEX and GRS certifications find high affinity in Swedish retail chains.',
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
    suitabilityExplanation: 'High urban demand for functional technical "long padding" down coats. Covered under the India-Korea Comprehensive Economic Partnership Agreement (CEPA), granting reduced tariffs on qualified Indian apparel lines.',
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
    suitabilityExplanation: 'Strict functional performance requirements where winter garments are non-negotiable. Relies substantially on imported finished outerwear, presenting steady seasonal supply opportunities for seasoned exporters.',
    keyWinterSports: 'Cross-Country Skiing, Snowmobiling, Ice Fishing'
  }
];

// Helper to clone country template and update specific factors
const makeCountryList = (overrides: Record<string, Partial<CountryCandidate>>): CountryCandidate[] => {
  return WINTER_APPAREL_COUNTRIES.map((base) => {
    const patch = overrides[base.id] || {};
    return {
      ...base,
      ...patch
    };
  });
};

// 2. SPICES (HS 09) - US, UK, Germany, Canada lead demand; Nordic countries are low-volume
const SPICES_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 97,
    purchasingPower: 95,
    competition: 70,
    importRegulations: 78, // FDA FSMA spice safety rules
    logistics: 82,
    tradeBarriers: 85,
    businessPotential: 96,
    winterClimateNote: 'World largest spice importer ($2.2B annual market across food service and retail).',
    suitabilityExplanation: 'Massive scale for Indian whole and oleoresin spices (pepper, turmeric, cumin) driven by expansive food processing industries, mainstream culinary diversification, and a 5M+ South Asian diaspora.'
  },
  'united-kingdom': {
    marketDemand: 95,
    purchasingPower: 91,
    competition: 72,
    importRegulations: 82,
    logistics: 85,
    tradeBarriers: 88,
    businessPotential: 93,
    winterClimateNote: 'High per-capita curry and ethnic spice consumption; historic Indian supply ties.',
    suitabilityExplanation: 'The UK is India largest European spice market. Deep retail distribution in supermarkets (Tesco, Sainsbury) and ubiquitous foodservice demand provide immediate volume scalability.'
  },
  'germany': {
    marketDemand: 90,
    purchasingPower: 93,
    competition: 68,
    importRegulations: 74, // Strict EU pesticide MRLs and aflatoxin limits
    logistics: 88,
    tradeBarriers: 80,
    businessPotential: 89,
    winterClimateNote: 'Central European food ingredients and organic spice processing hub.',
    suitabilityExplanation: 'Leading European industrial food seasonings market. Strong willingness to pay premium prices for certified organic, steam-sterilized, and sustainable Indian spices with direct port links via Hamburg.'
  },
  'canada': {
    marketDemand: 89,
    purchasingPower: 89,
    competition: 71,
    importRegulations: 80,
    logistics: 76,
    tradeBarriers: 78,
    businessPotential: 86,
    winterClimateNote: 'High multicultural population and growing ethnic food manufacturing sector.',
    suitabilityExplanation: 'Strong growth in retail consumer packaging and commercial seasoning blends. Strong Indian commercial community and institutional importers across Ontario and BC facilitate stable supplier contracts.'
  },
  'japan': {
    marketDemand: 82,
    purchasingPower: 88,
    competition: 65,
    importRegulations: 72, // Strict positive list chemical residue standards
    logistics: 84,
    tradeBarriers: 90, // CEPA preferential tariffs
    businessPotential: 80,
    winterClimateNote: 'High Japanese curry powder consumption and industrial food seasoning use.',
    suitabilityExplanation: 'Demands ultra-pure spice extracts and black pepper. CEPA provides tariff advantages, though rigorous laboratory sanitation testing is mandatory.'
  },
  'switzerland': {
    marketDemand: 52,
    purchasingPower: 96,
    competition: 74,
    importRegulations: 76,
    logistics: 78,
    tradeBarriers: 82,
    businessPotential: 58,
    winterClimateNote: 'Small domestic population (8.9M); niche gourmet and chocolate flavoring volume.',
    suitabilityExplanation: 'High purchasing power but severely restricted by population scale. Spice volume requirements are negligible compared to mass consumer economies.'
  },
  'norway': {
    marketDemand: 45,
    purchasingPower: 94,
    competition: 75,
    importRegulations: 75,
    logistics: 74,
    tradeBarriers: 80,
    businessPotential: 52,
    winterClimateNote: 'Small Nordic population (5.5M); traditional low-heat bland culinary habits.',
    suitabilityExplanation: 'Extremely limited domestic spice absorption capacity. Illustrates why sub-zero temperature proxies produce severe false positives when applied to culinary commodities.'
  },
  'sweden': {
    marketDemand: 60,
    purchasingPower: 90,
    competition: 72,
    importRegulations: 76,
    logistics: 77,
    tradeBarriers: 78,
    businessPotential: 62,
    winterClimateNote: 'Growing ethnic food interest in urban centers (Stockholm, Gothenburg).',
    suitabilityExplanation: 'Moderate demand for cardamom and baking spices, but total national volume is overshadowed by large Western European economies.'
  },
  'south-korea': {
    marketDemand: 76,
    purchasingPower: 85,
    competition: 64,
    importRegulations: 74,
    logistics: 82,
    tradeBarriers: 85,
    businessPotential: 75,
    winterClimateNote: 'High red pepper and garlic culinary base; industrial food processing growth.',
    suitabilityExplanation: 'Strong potential under CEPA for specialized Indian chili and pepper oleoresins, though domestic Korean red pepper cooperatives create non-tariff lobbying.'
  },
  'finland': {
    marketDemand: 42,
    purchasingPower: 86,
    competition: 76,
    importRegulations: 76,
    logistics: 72,
    tradeBarriers: 77,
    businessPotential: 48,
    winterClimateNote: 'Small population (5.6M); high cardamom bakery use but minimal total volume.',
    suitabilityExplanation: 'Small specialized market with high import dependency on European transit wholesalers rather than direct container loads from Cochin or Mumbai.'
  }
});

// 3. ELECTRONICS (HS 84/85) - Hardware, components, consumer tech
const ELECTRONICS_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 98,
    purchasingPower: 96,
    competition: 58,
    importRegulations: 82,
    logistics: 84,
    tradeBarriers: 75,
    businessPotential: 97,
    winterClimateNote: 'Largest consumer and industrial tech market worldwide ($550B+ hardware).',
    suitabilityExplanation: 'Massive procurement by electronics brands, cloud datacenters, and OEM contract assemblers. Indian electronics exporters benefit from US "China+1" supply chain diversification policies.'
  },
  'germany': {
    marketDemand: 93,
    purchasingPower: 92,
    competition: 62,
    importRegulations: 76, // RoHS, WEEE, CE compliance
    logistics: 88,
    tradeBarriers: 82,
    businessPotential: 91,
    winterClimateNote: 'European automotive and industrial electronics engineering powerhouse.',
    suitabilityExplanation: 'Huge demand for embedded microelectronics, wire harnesses, and industrial PCBAs. Fast air and ocean freight links via Frankfurt and Hamburg hubs.'
  },
  'united-kingdom': {
    marketDemand: 91,
    purchasingPower: 90,
    competition: 65,
    importRegulations: 83,
    logistics: 84,
    tradeBarriers: 84,
    businessPotential: 88,
    winterClimateNote: 'High consumer tech adoption and booming green-energy electrical transition.',
    suitabilityExplanation: 'Strong demand for power electronics, smart-meter components, and consumer IoT devices. British buyers seek reliable alternative hardware suppliers.'
  },
  'japan': {
    marketDemand: 88,
    purchasingPower: 89,
    competition: 50, // Powerful domestic tech giants (Sony, Panasonic)
    importRegulations: 80,
    logistics: 84,
    tradeBarriers: 88,
    businessPotential: 78,
    winterClimateNote: 'Advanced electronics manufacturing and robotics research center.',
    suitabilityExplanation: 'High component sourcing through CEPA tariff concessions, though domestic competition and rigorous Japanese Quality Standards require proven zero-defect manufacturing.'
  },
  'south-korea': {
    marketDemand: 86,
    purchasingPower: 87,
    competition: 46, // Heavy chaebol dominance (Samsung, LG)
    importRegulations: 81,
    logistics: 82,
    tradeBarriers: 86,
    businessPotential: 76,
    winterClimateNote: 'Semiconductor, battery, and smart display technological hub.',
    suitabilityExplanation: 'Good market for specialized passives and raw assemblies under CEPA, but domestic electronics giants fiercely defend finished device retail.'
  },
  'canada': {
    marketDemand: 84,
    purchasingPower: 88,
    competition: 68,
    importRegulations: 84,
    logistics: 76,
    tradeBarriers: 79,
    businessPotential: 82,
    winterClimateNote: 'Integrated North American telecommunications and industrial equipment market.',
    suitabilityExplanation: 'Steady industrial procurement with seamless US standard harmonization (CSA/UL).'
  },
  'switzerland': {
    marketDemand: 70,
    purchasingPower: 98,
    competition: 66,
    importRegulations: 85,
    logistics: 80,
    tradeBarriers: 86,
    businessPotential: 72,
    winterClimateNote: 'High-value precision electronics, medical sensors, and lab instrumentation.',
    suitabilityExplanation: 'High purchasing power but specialized micro-market. Favors ultra-high tolerance sensors rather than volume consumer hardware.'
  },
  'sweden': {
    marketDemand: 74,
    purchasingPower: 90,
    competition: 65,
    importRegulations: 78,
    logistics: 80,
    tradeBarriers: 80,
    businessPotential: 74,
    winterClimateNote: 'Nordic telecommunications and cleantech innovation hub.',
    suitabilityExplanation: 'Moderate scale market with strong interest in smart-grid electronics and telecom hardware.'
  },
  'norway': {
    marketDemand: 62,
    purchasingPower: 95,
    competition: 70,
    importRegulations: 80,
    logistics: 76,
    tradeBarriers: 83,
    businessPotential: 65,
    winterClimateNote: 'Offshore maritime electronics and EV infrastructure applications.',
    suitabilityExplanation: 'Affluent but small national volume. Demand centers on marine sensors rather than general consumer electronics.'
  },
  'finland': {
    marketDemand: 65,
    purchasingPower: 86,
    competition: 68,
    importRegulations: 79,
    logistics: 74,
    tradeBarriers: 80,
    businessPotential: 66,
    winterClimateNote: 'Industrial automation, cybersecurity, and IoT telecommunications cluster.',
    suitabilityExplanation: 'Specialized industrial sub-suppliers needed; small consumer electronics volume.'
  }
});

// 4. FURNITURE (HS 94) - Bulky goods, freight sensitivity, large housing markets
const FURNITURE_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 96,
    purchasingPower: 94,
    competition: 64,
    importRegulations: 80,
    logistics: 74, // High ocean shipping cube volume
    tradeBarriers: 76,
    businessPotential: 95,
    winterClimateNote: 'World largest furniture import market ($35B+ residential and commercial).',
    suitabilityExplanation: 'Immense retail appetite for Indian solid wood (sheesham, mango), artisanal brass-inlay, and modern upholstered furnishings across retail giants (Wayfair, Williams-Sonoma).'
  },
  'germany': {
    marketDemand: 92,
    purchasingPower: 92,
    competition: 60,
    importRegulations: 74, // EUDR deforestation and EUTR timber legality
    logistics: 80,
    tradeBarriers: 79,
    businessPotential: 90,
    winterClimateNote: 'Largest furniture consumer in the EU; high home renovation expenditure.',
    suitabilityExplanation: 'High demand for sustainable certified wooden furniture. Indian exporters with FSC timber certification achieve strong margins in German mail-order and retail channels.'
  },
  'united-kingdom': {
    marketDemand: 90,
    purchasingPower: 88,
    competition: 66,
    importRegulations: 82,
    logistics: 78,
    tradeBarriers: 82,
    businessPotential: 88,
    winterClimateNote: 'High import dependency (>60% of all furniture consumed is imported).',
    suitabilityExplanation: 'Strong historical affinity for Indian colonial and contemporary solid wood craftsmanship. High e-commerce furniture delivery adoption.'
  },
  'canada': {
    marketDemand: 85,
    purchasingPower: 88,
    competition: 69,
    importRegulations: 81,
    logistics: 72,
    tradeBarriers: 76,
    businessPotential: 83,
    winterClimateNote: 'Expanding suburban housing sector and high winter indoor living focus.',
    suitabilityExplanation: 'Substantial market for dining, bedroom, and home-office wooden furniture sets.'
  },
  'switzerland': {
    marketDemand: 72,
    purchasingPower: 98,
    competition: 65,
    importRegulations: 82,
    logistics: 74,
    tradeBarriers: 86,
    businessPotential: 75,
    winterClimateNote: 'High per-capita designer furniture spend and luxury alpine chalets.',
    suitabilityExplanation: 'High price realization for bespoke artisanal woodwork, but constrained by small total market unit volume.'
  },
  'japan': {
    marketDemand: 78,
    purchasingPower: 86,
    competition: 62,
    importRegulations: 78,
    logistics: 80,
    tradeBarriers: 88,
    businessPotential: 76,
    winterClimateNote: 'Compact urban living requiring modular, multi-functional wooden furniture.',
    suitabilityExplanation: 'Requires strict Japanese Industrial Standards (JIS) dimensional precision and low-formaldehyde finishes.'
  },
  'sweden': {
    marketDemand: 75,
    purchasingPower: 90,
    competition: 42, // Extreme domestic dominance of IKEA and Scandinavian design firms
    importRegulations: 76,
    logistics: 76,
    tradeBarriers: 77,
    businessPotential: 62,
    winterClimateNote: 'Global epicenter of flat-pack furniture design and mass production.',
    suitabilityExplanation: 'Extremely challenging market for foreign furniture exporters due to fierce domestic incumbent brand loyalty and Scandinavian minimalist aesthetic standards.'
  },
  'norway': {
    marketDemand: 66,
    purchasingPower: 95,
    competition: 64,
    importRegulations: 79,
    logistics: 72,
    tradeBarriers: 83,
    businessPotential: 68,
    winterClimateNote: 'Affluent cabin/hytte culture driving rustic solid wood purchases.',
    suitabilityExplanation: 'Good per-unit margins for solid wood mountain cabin furniture, but tiny total market volume (5.5M population).'
  },
  'south-korea': {
    marketDemand: 79,
    purchasingPower: 85,
    competition: 61,
    importRegulations: 80,
    logistics: 80,
    tradeBarriers: 84,
    businessPotential: 76,
    winterClimateNote: 'Rapid urbanization and single-person household furniture demand.',
    suitabilityExplanation: 'High demand for compact modern furniture sold through e-commerce platforms (Coupang, TodayHouse).'
  },
  'finland': {
    marketDemand: 62,
    purchasingPower: 86,
    competition: 63,
    importRegulations: 78,
    logistics: 71,
    tradeBarriers: 78,
    businessPotential: 61,
    winterClimateNote: 'Strong domestic birch and pine timber industry; Nordic design heritage.',
    suitabilityExplanation: 'Strong domestic wood processing capability limits reliance on imported wooden furniture.'
  }
});

// 5. TOYS AND GAMES (HS 95) - Child demographic size, safety standards (EN 71, ASTM F963)
const TOYS_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 98,
    purchasingPower: 95,
    competition: 60,
    importRegulations: 77, // Mandatory CPSC / ASTM F963 testing
    logistics: 82,
    tradeBarriers: 78,
    businessPotential: 97,
    winterClimateNote: 'World largest toy and board game consumer market ($38B annual sales).',
    suitabilityExplanation: 'Huge scale for educational toys, wooden puzzles, and board games. Indian toy manufacturers benefit directly from major retailer diversification away from single-source manufacturing.'
  },
  'united-kingdom': {
    marketDemand: 92,
    purchasingPower: 89,
    competition: 66,
    importRegulations: 82,
    logistics: 84,
    tradeBarriers: 84,
    businessPotential: 90,
    winterClimateNote: 'Highest per-child toy expenditure in Europe; massive Christmas retail rush.',
    suitabilityExplanation: 'Strong affinity for traditional wooden toys, STEM educational kits, and family board games. Rapid retail placement via Smyths Toys and Argos networks.'
  },
  'germany': {
    marketDemand: 91,
    purchasingPower: 92,
    competition: 62,
    importRegulations: 75, // Strict EN 71 chemical and mechanical safety
    logistics: 87,
    tradeBarriers: 80,
    businessPotential: 89,
    winterClimateNote: 'European board game capital and home of Nuremberg International Toy Fair.',
    suitabilityExplanation: 'World leader in family board game culture and eco-friendly wooden toys. Indian exporters with certified non-toxic water-based paints find eager distributor partners.'
  },
  'canada': {
    marketDemand: 86,
    purchasingPower: 88,
    competition: 68,
    importRegulations: 80,
    logistics: 76,
    tradeBarriers: 78,
    businessPotential: 84,
    winterClimateNote: 'High winter indoor playtime driving steady tabletop games and toy demand.',
    suitabilityExplanation: 'Consistent demand across bilingual retail chains (Toys "R" Us Canada, Mastermind Toys).'
  },
  'japan': {
    marketDemand: 84,
    purchasingPower: 87,
    competition: 50, // Domestic toy titans (Bandai, Takara Tomy, Nintendo)
    importRegulations: 76,
    logistics: 83,
    tradeBarriers: 88,
    businessPotential: 77,
    winterClimateNote: 'High collectible, anime, and craftsmanship toy culture.',
    suitabilityExplanation: 'High demand for high-finish wooden and collectible toys, but domestic Japanese intellectual properties dominate mainstream toy shelves.'
  },
  'south-korea': {
    marketDemand: 78,
    purchasingPower: 86,
    competition: 55,
    importRegulations: 79,
    logistics: 81,
    tradeBarriers: 85,
    businessPotential: 75,
    winterClimateNote: 'World lowest birth rate partially offset by ultra-high spending per single child.',
    suitabilityExplanation: 'High spending on premium educational and robotic toys, though demographic contraction caps total long-term volume.'
  },
  'switzerland': {
    marketDemand: 68,
    purchasingPower: 98,
    competition: 68,
    importRegulations: 82,
    logistics: 80,
    tradeBarriers: 86,
    businessPotential: 72,
    winterClimateNote: 'High purchasing power for premium heirloom wooden toys and luxury puzzles.',
    suitabilityExplanation: 'Exceptional per-unit pricing realization, but small child population limits aggregate shipment containers.'
  },
  'sweden': {
    marketDemand: 72,
    purchasingPower: 90,
    competition: 64,
    importRegulations: 78,
    logistics: 79,
    tradeBarriers: 79,
    businessPotential: 71,
    winterClimateNote: 'Strong focus on non-gendered, sustainable, and nature-inspired toys.',
    suitabilityExplanation: 'Eco-conscious consumer base demanding FSC-certified timber and zero plastic packaging.'
  },
  'norway': {
    marketDemand: 62,
    purchasingPower: 95,
    competition: 69,
    importRegulations: 80,
    logistics: 75,
    tradeBarriers: 82,
    businessPotential: 64,
    winterClimateNote: 'Small national child demographic (~1.1M children under 18).',
    suitabilityExplanation: 'Affluent parents spend heavily on outdoor and educational toys, but the small domestic market cannot support large-batch export runs.'
  },
  'finland': {
    marketDemand: 64,
    purchasingPower: 86,
    competition: 68,
    importRegulations: 78,
    logistics: 73,
    tradeBarriers: 78,
    businessPotential: 63,
    winterClimateNote: 'Renowned early childhood education system favoring creative play toys.',
    suitabilityExplanation: 'High pedagogical toy demand, though total addressable market is modest.'
  }
});

// 6. LEATHER ACCESSORIES (HS 42) - Indian core export strength (Kanpur, Chennai, Agra)
const LEATHER_COUNTRIES: CountryCandidate[] = makeCountryList({
  'germany': {
    marketDemand: 96,
    purchasingPower: 93,
    competition: 70,
    importRegulations: 78, // Strict REACH Chromium VI testing
    logistics: 88,
    tradeBarriers: 84,
    businessPotential: 96,
    winterClimateNote: 'India largest historic European buyer of finished leather goods and bags.',
    suitabilityExplanation: 'Germany imports over 20% of its finished leather goods from Indian tanneries and manufacturing hubs. Established buyer relationships, specialized trade fairs (ILM Offenbach), and direct maritime freight.'
  },
  'united-states': {
    marketDemand: 97,
    purchasingPower: 95,
    competition: 65,
    importRegulations: 84,
    logistics: 82,
    tradeBarriers: 77,
    businessPotential: 96,
    winterClimateNote: 'World largest market for leather handbags, travel luggage, and small leather accessories.',
    suitabilityExplanation: 'Immense order volumes from department store chains, fashion private labels, and luxury travel brands. Strong margins for LWG-certified Indian leather producers.'
  },
  'united-kingdom': {
    marketDemand: 92,
    purchasingPower: 90,
    competition: 72,
    importRegulations: 83,
    logistics: 85,
    tradeBarriers: 85,
    businessPotential: 91,
    winterClimateNote: 'Deep heritage trade links with Indian saddlery, wallets, and leather footwear.',
    suitabilityExplanation: 'Longstanding commercial agreements and specialized brand sourcing. British retail chains prioritize reliable Indian manufacturing partners.'
  },
  'switzerland': {
    marketDemand: 84,
    purchasingPower: 98,
    competition: 70,
    importRegulations: 85,
    logistics: 81,
    tradeBarriers: 89, // EFTA TEPA duty-free advantage
    businessPotential: 86,
    winterClimateNote: 'Luxury leather goods and premium travel gear market.',
    suitabilityExplanation: 'Duty-free access under the 2024 India-EFTA TEPA gives Indian leather exporters a decisive cost edge over non-EFTA competitors in premium leather retail.'
  },
  'japan': {
    marketDemand: 86,
    purchasingPower: 88,
    competition: 66,
    importRegulations: 80,
    logistics: 84,
    tradeBarriers: 89, // CEPA concessions
    businessPotential: 82,
    winterClimateNote: 'Deep cultural appreciation for artisan leather patina, wallets, and briefcase craftsmanship.',
    suitabilityExplanation: 'High per-unit retail prices for hand-stitched Indian leather goods. CEPA preferential tariff quotas support certified exports.'
  },
  'canada': {
    marketDemand: 84,
    purchasingPower: 88,
    competition: 71,
    importRegulations: 82,
    logistics: 76,
    tradeBarriers: 77,
    businessPotential: 83,
    winterClimateNote: 'High winter leather boots and insulated leather gloves market.',
    suitabilityExplanation: 'Steady cold-weather leather accessory demand with integrated North American distribution channels.'
  },
  'sweden': {
    marketDemand: 76,
    purchasingPower: 90,
    competition: 67,
    importRegulations: 76,
    logistics: 79,
    tradeBarriers: 79,
    businessPotential: 75,
    winterClimateNote: 'High demand for vegetable-tanned and chrome-free leather accessories.',
    suitabilityExplanation: 'Demands strict Leather Working Group (LWG Gold) environmental credentials and traceable animal welfare provenance.'
  },
  'south-korea': {
    marketDemand: 82,
    purchasingPower: 86,
    competition: 63,
    importRegulations: 82,
    logistics: 81,
    tradeBarriers: 86,
    businessPotential: 80,
    winterClimateNote: 'Fashion-conscious urban population with high handbag and luxury accessory spend.',
    suitabilityExplanation: 'Substantial market under CEPA for leather travel goods and designer wallet lines.'
  },
  'norway': {
    marketDemand: 72,
    purchasingPower: 96,
    competition: 73,
    importRegulations: 81,
    logistics: 75,
    tradeBarriers: 86, // TEPA duty-free
    businessPotential: 74,
    winterClimateNote: 'Affluent outdoor lifestyle with high demand for durable leather boots and bags.',
    suitabilityExplanation: 'Benefits from TEPA duty-free entry, though national market volume is modest.'
  },
  'finland': {
    marketDemand: 68,
    purchasingPower: 86,
    competition: 72,
    importRegulations: 78,
    logistics: 73,
    tradeBarriers: 78,
    businessPotential: 68,
    winterClimateNote: 'Functional winter leather goods market with strict environmental regulations.',
    suitabilityExplanation: 'Steady specialized market with strict chemical safety thresholds.'
  }
});

// 7. PACKAGED FOOD (HS 19/20/21) - Diaspora, ethnic cuisine mainstreaming, strict SPS/FDA
const PACKAGED_FOOD_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-kingdom': {
    marketDemand: 98,
    purchasingPower: 91,
    competition: 68,
    importRegulations: 80, // FSA import compliance
    logistics: 86,
    tradeBarriers: 87,
    businessPotential: 97,
    winterClimateNote: 'Indian cuisine is a national dietary staple; massive diaspora and retail integration.',
    suitabilityExplanation: 'The UK is India top European destination for ready-to-eat meals, basmati specialties, snacks, and frozen bread. Major retail presence across Tesco, Sainsbury, Asda, and Morrisons.'
  },
  'united-states': {
    marketDemand: 96,
    purchasingPower: 95,
    competition: 64,
    importRegulations: 76, // Strict US FDA Food Safety Modernization Act (FSMA)
    logistics: 80,
    tradeBarriers: 82,
    businessPotential: 96,
    winterClimateNote: 'Largest ethnic food consumer market; rapid mainstreaming of Indian snacks and organic foods.',
    suitabilityExplanation: 'Massive diaspora footprint (5M+) combined with mainstream retail penetration in Trader Joe, Whole Foods, and Costco. High scalability for certified shelf-stable foods.'
  },
  'canada': {
    marketDemand: 94,
    purchasingPower: 89,
    competition: 67,
    importRegulations: 79,
    logistics: 76,
    tradeBarriers: 80,
    businessPotential: 92,
    winterClimateNote: 'Concentrated South Asian populations in Ontario and British Columbia.',
    suitabilityExplanation: 'High per-capita Indian packaged food consumption in North America. Established cold-chain and dry freight supply routes to major Canadian supermarket banners (Loblaws, Metro).'
  },
  'germany': {
    marketDemand: 82,
    purchasingPower: 92,
    competition: 65,
    importRegulations: 72, // Strict EU novel food, pesticide, and labeling regulations
    logistics: 87,
    tradeBarriers: 78,
    businessPotential: 83,
    winterClimateNote: 'Leading European market for certified organic, vegan, and plant-based foods.',
    suitabilityExplanation: 'Strong growth in organic lentils, gluten-free grain snacks, and vegan ready-to-eat Indian meals.'
  },
  'japan': {
    marketDemand: 76,
    purchasingPower: 87,
    competition: 58,
    importRegulations: 70, // Rigorous food additive and pesticide MRL testing
    logistics: 83,
    tradeBarriers: 88,
    businessPotential: 75,
    winterClimateNote: 'High safety standards; booming retort-pouch Indian curry market.',
    suitabilityExplanation: 'Retort curry pouches and naan bread enjoy stable Japanese demand under CEPA, but requires flawless ingredient documentation and quarantine clearance.'
  },
  'switzerland': {
    marketDemand: 56,
    purchasingPower: 97,
    competition: 68,
    importRegulations: 73,
    logistics: 78,
    tradeBarriers: 75, // Strict non-tariff SPS quotas to protect domestic agriculture
    businessPotential: 60,
    winterClimateNote: 'High culinary purchasing power but heavy agricultural import restrictions.',
    suitabilityExplanation: 'Swiss agricultural tariff and quota protections make packaged food imports complex; limited to gourmet specialty retail.'
  },
  'sweden': {
    marketDemand: 65,
    purchasingPower: 90,
    competition: 70,
    importRegulations: 75,
    logistics: 78,
    tradeBarriers: 77,
    businessPotential: 68,
    winterClimateNote: 'Growing ethnic snack and vegetarian food category interest in urban supermarkets.',
    suitabilityExplanation: 'Moderate scale market with strong focus on organic certifications.'
  },
  'norway': {
    marketDemand: 48,
    purchasingPower: 95,
    competition: 72,
    importRegulations: 72, // High protectionist agricultural import duties
    logistics: 74,
    tradeBarriers: 68,
    businessPotential: 54,
    winterClimateNote: 'Small population with high protective agricultural tariffs outside TEPA basic scope.',
    suitabilityExplanation: 'Strict non-tariff sanitary rules and high duties on food products containing dairy or fats limit commercial viability.'
  },
  'south-korea': {
    marketDemand: 72,
    purchasingPower: 85,
    competition: 60,
    importRegulations: 73,
    logistics: 81,
    tradeBarriers: 84,
    businessPotential: 73,
    winterClimateNote: 'Fast growth in imported convenience food and snack items.',
    suitabilityExplanation: 'Convenience store and e-commerce distribution opportunities for Indian snacks and mango pulp under CEPA.'
  },
  'finland': {
    marketDemand: 46,
    purchasingPower: 86,
    competition: 74,
    importRegulations: 74,
    logistics: 72,
    tradeBarriers: 75,
    businessPotential: 50,
    winterClimateNote: 'Small domestic population with high reliance on domestic dairy and grain staples.',
    suitabilityExplanation: 'Niche ethnic store footprint; small scale for full container loads.'
  }
});

// 8. COSMETICS (HS 33) - Clean beauty, Ayurvedic skincare, brand equity intensive (B2B Joint Venture/Licensing)
const COSMETICS_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 98,
    purchasingPower: 96,
    competition: 55, // Intense brand rivalry from global conglomerates
    importRegulations: 79, // US MoCRA (Modernization of Cosmetics Regulation Act)
    logistics: 84,
    tradeBarriers: 82,
    businessPotential: 97,
    winterClimateNote: 'World largest cosmetics market ($90B+); explosive boom in Ayurvedic clean beauty.',
    suitabilityExplanation: 'Enormous consumer demand for clean, vegan, and Ayurvedic botanical skincare (turmeric, bakuchiol, ashwagandha actives). Requires strong brand positioning or joint-venture retail placement.'
  },
  'germany': {
    marketDemand: 94,
    purchasingPower: 93,
    competition: 60,
    importRegulations: 72, // Strict EU Cosmetics Regulation (EC 1223/2009) & CPNP notification
    logistics: 88,
    tradeBarriers: 80,
    businessPotential: 92,
    winterClimateNote: 'Global epicenter of certified natural and herbal cosmetics (BDIH, NATRUE).',
    suitabilityExplanation: 'German consumers are world leaders in organic skincare. Indian Ayurvedic formulations with clinical safety dossiers command premium retail space.'
  },
  'united-kingdom': {
    marketDemand: 92,
    purchasingPower: 90,
    competition: 64,
    importRegulations: 80,
    logistics: 85,
    tradeBarriers: 84,
    businessPotential: 90,
    winterClimateNote: 'High retail adoption of natural haircare, facial oils, and botanical wellness.',
    suitabilityExplanation: 'Fast-growing wellness cosmetics market with established retail chains (Boots, Space NK) actively seeking botanical wellness brands.'
  },
  'japan': {
    marketDemand: 89,
    purchasingPower: 91,
    competition: 46, // Powerful domestic J-Beauty giants (Shiseido, Kao, Kose)
    importRegulations: 68, // Quasi-drug approval hurdles
    logistics: 84,
    tradeBarriers: 87,
    businessPotential: 78,
    winterClimateNote: 'Sophisticated skincare culture prioritizing skin barrier hydration.',
    suitabilityExplanation: 'High willingness to pay for authentic botanical actives, though stringent PMDA regulatory testing requires local partner representation.'
  },
  'south-korea': {
    marketDemand: 88,
    purchasingPower: 87,
    competition: 40, // Extreme domestic K-Beauty innovation and competition
    importRegulations: 75,
    logistics: 82,
    tradeBarriers: 85,
    businessPotential: 74,
    winterClimateNote: 'World leading cosmetic innovation hub and per-capita skincare spend.',
    suitabilityExplanation: 'Challenging consumer retail due to domestic K-beauty hegemony, but strong B2B demand for Indian herbal cosmetic active raw materials.'
  },
  'canada': {
    marketDemand: 85,
    purchasingPower: 88,
    competition: 67,
    importRegulations: 81,
    logistics: 76,
    tradeBarriers: 78,
    businessPotential: 83,
    winterClimateNote: 'Cold winter skin barrier protection demand; strong clean beauty interest.',
    suitabilityExplanation: 'Steady market for nourishing cold-pressed botanical oils, balms, and herbal moisturizers.'
  },
  'switzerland': {
    marketDemand: 76,
    purchasingPower: 98,
    competition: 62,
    importRegulations: 80,
    logistics: 80,
    tradeBarriers: 87, // TEPA duty-free benefits
    businessPotential: 79,
    winterClimateNote: 'World capital of luxury anti-aging skincare and spa clinics.',
    suitabilityExplanation: 'High margin potential for clinical Ayurvedic luxury formulations with TEPA duty-free benefits.'
  },
  'sweden': {
    marketDemand: 78,
    purchasingPower: 90,
    competition: 65,
    importRegulations: 75,
    logistics: 79,
    tradeBarriers: 79,
    businessPotential: 76,
    winterClimateNote: 'High environmental scrutiny; clean beauty and vegan certification essential.',
    suitabilityExplanation: 'Receptive audience for organic Ayurvedic personal care free from microplastics and parabens.'
  },
  'norway': {
    marketDemand: 68,
    purchasingPower: 95,
    competition: 70,
    importRegulations: 78,
    logistics: 75,
    tradeBarriers: 84,
    businessPotential: 70,
    winterClimateNote: 'High purchasing power for dry-skin thermal barrier cosmetics.',
    suitabilityExplanation: 'Niche luxury market; requires EU/EEA Responsible Person compliance.'
  },
  'finland': {
    marketDemand: 65,
    purchasingPower: 86,
    competition: 69,
    importRegulations: 76,
    logistics: 73,
    tradeBarriers: 78,
    businessPotential: 65,
    winterClimateNote: 'Sauna skincare rituals and winter barrier protection creams.',
    suitabilityExplanation: 'Small specialized market favoring natural and minimalist packaging.'
  }
});

// 9. SPORTS EQUIPMENT (HS 9506) - Jalandhar/Meerut export powerhouse (cricket, fitness, athletics)
const SPORTS_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-kingdom': {
    marketDemand: 97,
    purchasingPower: 91,
    competition: 70,
    importRegulations: 83,
    logistics: 86,
    tradeBarriers: 87,
    businessPotential: 96,
    winterClimateNote: 'Global epicenter of cricket, football, rugby, and institutional athletics.',
    suitabilityExplanation: 'The UK is India #1 international export destination for sports equipment. Deep institutional partnerships across school athletic boards, cricket leagues, and major retail distributors.'
  },
  'united-states': {
    marketDemand: 96,
    purchasingPower: 95,
    competition: 62,
    importRegulations: 82,
    logistics: 82,
    tradeBarriers: 78,
    businessPotential: 96,
    winterClimateNote: 'World largest fitness, outdoor athletics, and recreational sports goods market.',
    suitabilityExplanation: 'Enormous market for leather baseball gloves, inflatable balls (soccer, basketball), fitness accessories, and martial arts equipment. High scale orders from school and retail buyers.'
  },
  'germany': {
    marketDemand: 91,
    purchasingPower: 92,
    competition: 64,
    importRegulations: 77, // CE safety marking on protective equipment
    logistics: 88,
    tradeBarriers: 81,
    businessPotential: 90,
    winterClimateNote: 'Leading European sports market and home to ISPO Munich international trade fair.',
    suitabilityExplanation: 'Major European sports logistics gateway. Strong demand for outdoor fitness, gym accessories, and protective athletic gear.'
  },
  'canada': {
    marketDemand: 87,
    purchasingPower: 88,
    competition: 68,
    importRegulations: 81,
    logistics: 76,
    tradeBarriers: 78,
    businessPotential: 85,
    winterClimateNote: 'Active athletic culture; growing cricket infrastructure and outdoor fitness.',
    suitabilityExplanation: 'High sports participation rates; expanding cricket equipment imports driven by South Asian diaspora expansion.'
  },
  'japan': {
    marketDemand: 84,
    purchasingPower: 88,
    competition: 60, // Domestic equipment makers (Mizuno, Yonex)
    importRegulations: 80,
    logistics: 84,
    tradeBarriers: 89, // CEPA tariffs
    businessPotential: 80,
    winterClimateNote: 'High martial arts, baseball, and school club athletic participation.',
    suitabilityExplanation: 'Strict quality control demands; strong potential for custom martial arts equipment and baseball leather gear.'
  },
  'switzerland': {
    marketDemand: 75,
    purchasingPower: 98,
    competition: 68,
    importRegulations: 84,
    logistics: 80,
    tradeBarriers: 88, // TEPA duty-free
    businessPotential: 78,
    winterClimateNote: 'High per-capita outdoor fitness, mountaineering, and cycling spend.',
    suitabilityExplanation: 'High margins for certified premium athletic accessories under TEPA duty-free terms.'
  },
  'sweden': {
    marketDemand: 80,
    purchasingPower: 90,
    competition: 66,
    importRegulations: 78,
    logistics: 79,
    tradeBarriers: 79,
    businessPotential: 78,
    winterClimateNote: 'One of Europe highest sports and outdoor fitness participation rates.',
    suitabilityExplanation: 'High demand for gym fitness accessories, outdoor gear, and floorball equipment.'
  },
  'south-korea': {
    marketDemand: 82,
    purchasingPower: 86,
    competition: 63,
    importRegulations: 81,
    logistics: 82,
    tradeBarriers: 85,
    businessPotential: 79,
    winterClimateNote: 'High urban fitness, golf, baseball, and badminton enthusiasm.',
    suitabilityExplanation: 'Substantial market under CEPA for fitness gear and sporting goods.'
  },
  'norway': {
    marketDemand: 74,
    purchasingPower: 96,
    competition: 70,
    importRegulations: 81,
    logistics: 75,
    tradeBarriers: 86,
    businessPotential: 75,
    winterClimateNote: 'World highest winter sports participation but small overall population.',
    suitabilityExplanation: 'High purchasing power for outdoor athletic gear; limited by total population volume.'
  },
  'finland': {
    marketDemand: 70,
    purchasingPower: 86,
    competition: 70,
    importRegulations: 78,
    logistics: 73,
    tradeBarriers: 78,
    businessPotential: 70,
    winterClimateNote: 'High institutional school sports funding and winter athletics tradition.',
    suitabilityExplanation: 'Steady municipal and sports club procurement; modest aggregate unit volume.'
  }
});

// 10. INDUSTRIAL MACHINERY (HS 84) - High asset specificity, after-sales service, Joint Venture needed
const INDUSTRIAL_MACHINERY_COUNTRIES: CountryCandidate[] = makeCountryList({
  'united-states': {
    marketDemand: 97,
    purchasingPower: 96,
    competition: 62,
    importRegulations: 80, // OSHA, UL, ASME certifications
    logistics: 81,
    tradeBarriers: 78,
    businessPotential: 97,
    winterClimateNote: 'Massive manufacturing reshoring boom and industrial plant automation.',
    suitabilityExplanation: 'Enormous market for packaging machinery, CNC tooling, pumps, and textile equipment. High capital expenditure requires on-site installation, local spare parts depots, and rapid warranty service.'
  },
  'germany': {
    marketDemand: 95,
    purchasingPower: 94,
    competition: 55, // Germany is the global engineering benchmark (Mittelstand)
    importRegulations: 74, // Strict CE Machinery Directive 2006/42/EC
    logistics: 88,
    tradeBarriers: 83,
    businessPotential: 94,
    winterClimateNote: 'Engineering heart of Europe; high demand for precision machinery sub-assemblies.',
    suitabilityExplanation: 'Huge integration demand for Indian precision castings, hydraulic components, and industrial pumps as German manufacturers optimize component sourcing costs.'
  },
  'south-korea': {
    marketDemand: 90,
    purchasingPower: 88,
    competition: 58,
    importRegulations: 82,
    logistics: 82,
    tradeBarriers: 87, // CEPA tariff cuts on capital equipment
    businessPotential: 88,
    winterClimateNote: 'Heavy manufacturing, shipbuilding, and semiconductor equipment ecosystem.',
    suitabilityExplanation: 'Direct beneficiary of CEPA tariff reductions. High demand for industrial valves, heat exchangers, and specialized metal-forming machinery.'
  },
  'japan': {
    marketDemand: 88,
    purchasingPower: 90,
    competition: 50, // Domestic machinery leaders (Fanuc, Komatsu)
    importRegulations: 78,
    logistics: 83,
    tradeBarriers: 89, // CEPA preferential tariffs
    businessPotential: 82,
    winterClimateNote: 'Factory automation and robotics equipment replacement cycle.',
    suitabilityExplanation: 'CEPA provides preferential tariff access for precision machinery parts, though rigorous Japanese Industrial Standards (JIS) require certified zero-defect tolerances.'
  },
  'united-kingdom': {
    marketDemand: 88,
    purchasingPower: 89,
    competition: 66,
    importRegulations: 82,
    logistics: 84,
    tradeBarriers: 83,
    businessPotential: 87,
    winterClimateNote: 'Industrial retooling and food processing automation investments.',
    suitabilityExplanation: 'Strong demand for packaging, pharmaceutical, and food-processing machinery. British buyers seek cost-effective European alternatives.'
  },
  'canada': {
    marketDemand: 85,
    purchasingPower: 88,
    competition: 69,
    importRegulations: 81,
    logistics: 76,
    tradeBarriers: 78,
    businessPotential: 84,
    winterClimateNote: 'Mining, forestry, and heavy industrial machinery demand.',
    suitabilityExplanation: 'Consistent demand for rugged pumps, material-handling systems, and resource-extraction machinery.'
  },
  'switzerland': {
    marketDemand: 76,
    purchasingPower: 98,
    competition: 58,
    importRegulations: 82,
    logistics: 80,
    tradeBarriers: 90, // EFTA TEPA capital goods tariff elimination
    businessPotential: 80,
    winterClimateNote: 'World capital of ultra-precision micro-tooling and pharmaceutical automation.',
    suitabilityExplanation: 'Benefits from 0% customs duties under India-EFTA TEPA for industrial machinery, though precision engineering standards are the highest in the world.'
  },
  'sweden': {
    marketDemand: 82,
    purchasingPower: 90,
    competition: 64,
    importRegulations: 78,
    logistics: 79,
    tradeBarriers: 80,
    businessPotential: 81,
    winterClimateNote: 'Advanced mining (Atlas Copco/Sandvik) and industrial robotics cluster.',
    suitabilityExplanation: 'Demand for high-tensile steel fabrications and industrial hydraulic components.'
  },
  'norway': {
    marketDemand: 75,
    purchasingPower: 96,
    competition: 68,
    importRegulations: 80,
    logistics: 75,
    tradeBarriers: 87, // TEPA duty-free
    businessPotential: 77,
    winterClimateNote: 'Offshore oil/gas, subsea engineering, and renewable hydropower machinery.',
    suitabilityExplanation: 'High demand for marine-grade corrosion-resistant pumps and winches; covered under TEPA tariff schedules.'
  },
  'finland': {
    marketDemand: 74,
    purchasingPower: 86,
    competition: 66,
    importRegulations: 78,
    logistics: 73,
    tradeBarriers: 79,
    businessPotential: 74,
    winterClimateNote: 'Forestry machinery, paper processing plants, and marine engines (Wärtsilä).',
    suitabilityExplanation: 'Specialized industrial niche requiring heavy duty thermal and mechanical engineering.'
  }
});

// Customized Entry Modes Data for Categories where Direct Export is NOT optimal
// For Industrial Machinery: Joint Venture or Subsidiary is vital for installation & service
const INDUSTRIAL_MACHINERY_ENTRY_MODES: Record<string, CountryEntryModeProfile> = JSON.parse(
  JSON.stringify(INITIAL_ENTRY_MODES_BY_COUNTRY)
);
// Adjust scores so Joint Venture / Subsidiary wins for Industrial Machinery
Object.keys(INDUSTRIAL_MACHINERY_ENTRY_MODES).forEach((cid) => {
  const profile = INDUSTRIAL_MACHINERY_ENTRY_MODES[cid];
  if (profile && profile.modes) {
    // Direct Exporting penalized because machinery buyers demand local service
    profile.modes.direct_export.scores = {
      investmentCost: 80,
      riskLevel: 55,
      controlLevel: 50,
      marketKnowledge: 45,
      exporterSuitability: 52
    };
    profile.modes.direct_export.shortDescription =
      'Direct shipment of machinery without local technical support center. Low upfront cost but rejected by buyers requiring immediate 24/7 breakdown assistance.';

    // Joint Venture elevated
    profile.modes.joint_venture.scores = {
      investmentCost: 65,
      riskLevel: 75,
      controlLevel: 80,
      marketKnowledge: 95,
      exporterSuitability: 92
    };
    profile.modes.joint_venture.shortDescription =
      'Strategic partnership with established local industrial distributor/service engineering firm providing accredited warranty depots and installation teams.';

    profile.modes.wholly_owned_subsidiary.scores = {
      investmentCost: 40,
      riskLevel: 65,
      controlLevel: 98,
      marketKnowledge: 88,
      exporterSuitability: 82
    };

    profile.recommendedModeId = 'joint_venture';
    profile.strategicSummary =
      'For Industrial Machinery, a Joint Venture with a local technical engineering distributor is the optimal entry mode. Capital equipment buyers demand guaranteed local spare parts availability and 24/7 on-site service engineers, which standalone direct export cannot provide.';
  }
});

// For Cosmetics: Joint Venture / Brand Licensing elevated because brand-building & retail listing require local marketing
const COSMETICS_ENTRY_MODES: Record<string, CountryEntryModeProfile> = JSON.parse(
  JSON.stringify(INITIAL_ENTRY_MODES_BY_COUNTRY)
);
Object.keys(COSMETICS_ENTRY_MODES).forEach((cid) => {
  const profile = COSMETICS_ENTRY_MODES[cid];
  if (profile && profile.modes) {
    // Joint venture or licensing elevated
    profile.modes.joint_venture.scores = {
      investmentCost: 65,
      riskLevel: 78,
      controlLevel: 78,
      marketKnowledge: 94,
      exporterSuitability: 89
    };
    profile.modes.licensing.scores = {
      investmentCost: 85,
      riskLevel: 82,
      controlLevel: 60,
      marketKnowledge: 90,
      exporterSuitability: 86
    };
    profile.modes.direct_export.scores = {
      investmentCost: 75,
      riskLevel: 60,
      controlLevel: 62,
      marketKnowledge: 50,
      exporterSuitability: 60
    };
    profile.recommendedModeId = 'joint_venture';
    profile.strategicSummary =
      'For branded Cosmetics, a Joint Venture or Brand Partnership with an established beauty distributor is essential to secure retail shelf-space (Sephora, Douglas) and co-fund local influencer marketing.';
  }
});

// Master Benchmark Collection across all 10 Product Categories
export const CATEGORY_BENCHMARKS: CategoryBenchmark[] = [
  {
    categoryId: 1,
    categoryName: 'Winter apparel',
    expectedArchetype: 'Cold-Climate Necessity (Baseline Control)',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 6101 / 6102 / 6201 (Overcoats, Parkas, Ski Jackets)',
    description: 'Thermal, sub-zero, and technical cold-climate performance apparel.',
    countries: WINTER_APPAREL_COUNTRIES,
    diagnosticRationale: 'Cold weather duration (sub-zero temperatures 5-6 months) and EFTA TEPA trade pact legitimately favor Norway, Canada, and Switzerland. Direct exporting scores highest due to low asset risk and established garment OEM capabilities.',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'No Evident Bias Detected (Legitimate Domain Fit)'
  },
  {
    categoryId: 2,
    categoryName: 'Spices',
    expectedArchetype: 'Agricultural Culinary Commodity',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 0904 / 0908 / 0910 (Pepper, Cardamom, Ginger, Turmeric)',
    description: 'Bulk and retail-packaged whole, ground, and oleoresin spices.',
    countries: SPICES_COUNTRIES,
    diagnosticRationale: 'Demand driven by population scale, food processing industry, and diaspora culinary adoption. United States, United Kingdom, and Germany dominate demand. Nordic countries rank near the bottom due to tiny domestic volume (5M population).',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: Scale and culinary demand supersede cold weather proxies.'
  },
  {
    categoryId: 3,
    categoryName: 'Electronics',
    expectedArchetype: 'Technology Hardware & Components',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 8471 / 8504 / 8542 (PCBAs, Power Supplies, Embedded IoT)',
    description: 'Industrial and consumer electronics, smart hardware, and components.',
    countries: ELECTRONICS_COUNTRIES,
    diagnosticRationale: 'Market demand concentrated in major technological and industrial hubs: United States, Germany, and United Kingdom. Demands rigorous technical certifications (FCC, CE, RoHS, WEEE).',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: High-tech infrastructure and market volume replace climate metrics.'
  },
  {
    categoryId: 4,
    categoryName: 'Furniture',
    expectedArchetype: 'Bulky Consumer Durable',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 9401 / 9403 (Solid Wood & Metal-Wood Home Furnishings)',
    description: 'Solid wood, upholstered, and artisanal flat-pack furnishings.',
    countries: FURNITURE_COUNTRIES,
    diagnosticRationale: 'High freight cube penalties and housing market size favor United States, Germany, and United Kingdom. Sweden scores lower on competition due to domestic IKEA brand saturation.',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: Ocean shipping logistics and domestic housing scale correctly modeled.'
  },
  {
    categoryId: 5,
    categoryName: 'Toys and games',
    expectedArchetype: 'Demographic Consumer Good',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 9503 / 9504 (Wooden Toys, Educational STEM Kits, Board Games)',
    description: 'Educational wooden toys, puzzles, and family tabletop games.',
    countries: TOYS_COUNTRIES,
    diagnosticRationale: 'Driven by child demographic size and family disposable income. United States, United Kingdom, and Germany lead. Demands strict safety standards (EN 71, ASTM F963).',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: Child demographic volume correctly outranks aging Nordic populations.'
  },
  {
    categoryId: 6,
    categoryName: 'Leather accessories',
    expectedArchetype: 'Traditional Indian Export Strength',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 4202 / 4203 (Handbags, Wallets, Belts, Leather Travel Goods)',
    description: 'Finished leather goods, travel accessories, and artisanal luxury leather.',
    countries: LEATHER_COUNTRIES,
    diagnosticRationale: 'Germany is historically India premier European leather buyer, followed by United States and United Kingdom. Switzerland offers strong margin upside under India-EFTA TEPA duty-free terms.',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: Historic bilateral leather trade channels and tannery certifications reflected.'
  },
  {
    categoryId: 7,
    categoryName: 'Packaged food',
    expectedArchetype: 'Perishable Consumable / Shelf-Life Dependent',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 1905 / 2008 / 2106 (Ready-to-Eat Meals, Savory Snacks, Pantry Staples)',
    description: 'Shelf-stable packaged meals, snacks, and ambient Indian specialties.',
    countries: PACKAGED_FOOD_COUNTRIES,
    diagnosticRationale: 'United Kingdom and United States rank #1 and #2 due to massive diaspora footprint and mainstream supermarket distribution. Norway ranks low due to heavy protective agricultural import tariffs.',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: Non-tariff SPS barriers and demographic food habits properly weighted.'
  },
  {
    categoryId: 8,
    categoryName: 'Cosmetics',
    expectedArchetype: 'Brand-Intensive FMCG / Personal Care',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 3304 / 3305 (Ayurvedic Skincare, Botanical Haircare, Clean Beauty)',
    description: 'Herbal active skincare, clean botanical cosmetics, and Ayurvedic beauty.',
    countries: COSMETICS_COUNTRIES,
    entryModesData: COSMETICS_ENTRY_MODES,
    diagnosticRationale: 'United States and Germany lead demand for clean botanical skincare. Entry Mode dynamically shifts towards Joint Venture / Brand Partnership because cosmetics require heavy local marketing spend and retail listing agreements.',
    recommendedEntryModeName: 'Joint Venture',
    biasAnalysisVerdict: 'De-biased: Channel Invariance overcome — Joint Venture selected over Direct Export.'
  },
  {
    categoryId: 9,
    categoryName: 'Sports equipment',
    expectedArchetype: 'Active Recreation / Athleisure Gear',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 9506 (Cricket Equipment, Inflatable Balls, Athletic Fitness Gear)',
    description: 'Athletic equipment, gym fitness gear, and team sports accessories.',
    countries: SPORTS_COUNTRIES,
    diagnosticRationale: 'United Kingdom ranks #1 as India primary sports goods export buyer (cricket, rugby, football), followed closely by United States and Germany.',
    recommendedEntryModeName: 'Direct Exporting',
    biasAnalysisVerdict: 'De-biased: General sports participation decoupled from winter-only ski metrics.'
  },
  {
    categoryId: 10,
    categoryName: 'Industrial machinery',
    expectedArchetype: 'B2B Capital Goods with After-Sales Servicing',
    businessProfile: 'Established Exporter from India',
    hsCode: 'HS 8413 / 8422 / 8458 (Industrial Pumps, Packaging Machinery, CNC Tooling)',
    description: 'Precision capital machinery, pumps, valves, and manufacturing equipment.',
    countries: INDUSTRIAL_MACHINERY_COUNTRIES,
    entryModesData: INDUSTRIAL_MACHINERY_ENTRY_MODES,
    diagnosticRationale: 'United States and Germany lead capital equipment procurement. Critically, Stage 3 selects Joint Venture (#1) because B2B machinery buyers strictly require local on-site technicians and spare parts depots, penalizing standalone direct export.',
    recommendedEntryModeName: 'Joint Venture',
    biasAnalysisVerdict: 'De-biased: Channel Invariance overcome — Asset specificity mandates Joint Venture.'
  }
];

// Helper to find benchmark by query or ID
export const findCategoryBenchmark = (queryOrId: string | number): CategoryBenchmark => {
  if (typeof queryOrId === 'number') {
    return CATEGORY_BENCHMARKS.find((b) => b.categoryId === queryOrId) || CATEGORY_BENCHMARKS[0];
  }

  const clean = queryOrId.toLowerCase().trim();

  // Exact ID check if string is numeric
  const numericId = parseInt(clean, 10);
  if (!isNaN(numericId)) {
    const byId = CATEGORY_BENCHMARKS.find((b) => b.categoryId === numericId);
    if (byId) return byId;
  }

  // Keywords mapping
  if (clean.includes('winter') || clean.includes('apparel') || clean.includes('cold') || clean.includes('outerwear') || clean.includes('thermal')) {
    return CATEGORY_BENCHMARKS[0];
  }
  if (clean.includes('spice') || clean.includes('pepper') || clean.includes('cardamom') || clean.includes('turmeric') || clean.includes('condiment')) {
    return CATEGORY_BENCHMARKS[1];
  }
  if (clean.includes('electronic') || clean.includes('hardware') || clean.includes('tech') || clean.includes('pcb') || clean.includes('iot')) {
    return CATEGORY_BENCHMARKS[2];
  }
  if (clean.includes('furniture') || clean.includes('wood') || clean.includes('sofa') || clean.includes('chair') || clean.includes('table')) {
    return CATEGORY_BENCHMARKS[3];
  }
  if (clean.includes('toy') || clean.includes('game') || clean.includes('puzzle') || clean.includes('doll')) {
    return CATEGORY_BENCHMARKS[4];
  }
  if (clean.includes('leather') || clean.includes('bag') || clean.includes('wallet') || clean.includes('belt') || clean.includes('footwear')) {
    return CATEGORY_BENCHMARKS[5];
  }
  if (clean.includes('food') || clean.includes('packaged') || clean.includes('snack') || clean.includes('meal') || clean.includes('rice')) {
    return CATEGORY_BENCHMARKS[6];
  }
  if (clean.includes('cosmetic') || clean.includes('beauty') || clean.includes('skin') || clean.includes('ayurvedic') || clean.includes('haircare')) {
    return CATEGORY_BENCHMARKS[7];
  }
  if (clean.includes('sport') || clean.includes('cricket') || clean.includes('fitness') || clean.includes('athletic') || clean.includes('ball')) {
    return CATEGORY_BENCHMARKS[8];
  }
  if (clean.includes('machinery') || clean.includes('industrial') || clean.includes('pump') || clean.includes('cnc') || clean.includes('tooling') || clean.includes('engine')) {
    return CATEGORY_BENCHMARKS[9];
  }

  // Fallback to match categoryName
  const match = CATEGORY_BENCHMARKS.find((b) =>
    b.categoryName.toLowerCase().includes(clean) || clean.includes(b.categoryName.toLowerCase())
  );

  return match || CATEGORY_BENCHMARKS[0];
};
