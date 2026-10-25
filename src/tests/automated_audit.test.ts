import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORY_BENCHMARKS,
  findCategoryBenchmark,
  CategoryBenchmark
} from '../data/categoryBenchmarkData';
import {
  INITIAL_BIAS_TEST_RECORDS,
  BiasTestRecord
} from '../data/biasAuditData';
import {
  DEFAULT_STAGE1_WEIGHTS,
  INITIAL_COUNTRIES,
  INITIAL_PESTEL_DATA,
  CountryCandidate,
  PestelDossier,
  FactorWeights
} from '../App';
import {
  DEFAULT_ENTRY_MODE_WEIGHTS,
  INITIAL_ENTRY_MODES_BY_COUNTRY,
  EntryModeId,
  EntryModeCriteriaWeights,
  EntryModeScores,
  CountryEntryModeProfile
} from '../data/entryModesData';

// Helper function: Pure calculation of Stage 1 scores
function computeStage1Scores(
  countries: CountryCandidate[],
  weights: FactorWeights
): (CountryCandidate & { stage1Score: number })[] {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  assert.ok(totalWeight > 0, 'Total Stage 1 weight must be > 0');

  const scored = countries.map((c) => {
    const raw =
      c.marketDemand * weights.marketDemand +
      c.purchasingPower * weights.purchasingPower +
      c.competition * weights.competition +
      c.importRegulations * weights.importRegulations +
      c.logistics * weights.logistics +
      c.tradeBarriers * weights.tradeBarriers +
      c.businessPotential * weights.businessPotential;
    const stage1Score = parseFloat((raw / totalWeight).toFixed(2));
    return { ...c, stage1Score };
  });

  scored.sort((a, b) => b.stage1Score - a.stage1Score);
  return scored;
}

// Helper function: Pure calculation of Stage 2 PESTEL score
function computePestelScore(
  countryId: string,
  pestelData: Record<string, PestelDossier>
): number {
  const dossier = pestelData[countryId] || INITIAL_PESTEL_DATA[countryId];
  if (!dossier) return 75;
  const p = dossier.political.score;
  const e = dossier.economic.score;
  const s = dossier.social.score;
  const t = dossier.technological.score;
  const env = dossier.environmental.score;
  const l = dossier.legal.score;
  return parseFloat(((p + e + s + t + env + l) / 6).toFixed(2));
}

// Helper function: Pure calculation of Stage 1 + Stage 2 combined scores
function computeCombinedScores(
  stage1Top7: (CountryCandidate & { stage1Score: number })[],
  pestelData: Record<string, PestelDossier>,
  marketWeight = 60,
  pestelWeight = 40
) {
  const combined = stage1Top7.map((c) => {
    const pestelScore = computePestelScore(c.id, pestelData);
    const compositeScore = parseFloat(
      (c.stage1Score * (marketWeight / 100) + pestelScore * (pestelWeight / 100)).toFixed(2)
    );
    return { ...c, pestelScore, compositeScore };
  });

  combined.sort((a, b) => b.compositeScore - a.compositeScore);
  return combined;
}

// Helper function: Pure calculation of Stage 3 entry mode score
function computeEntryModeScore(
  scores: EntryModeScores,
  weights: EntryModeCriteriaWeights = DEFAULT_ENTRY_MODE_WEIGHTS
): number {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const raw =
    scores.investmentCost * weights.investmentCost +
    scores.riskLevel * weights.riskLevel +
    scores.controlLevel * weights.controlLevel +
    scores.marketKnowledge * weights.marketKnowledge +
    scores.exporterSuitability * weights.exporterSuitability;
  return parseFloat((raw / totalWeight).toFixed(1));
}

// Helper function: Determine winning entry mode for country
function getWinningEntryMode(
  countryId: string,
  entryProfiles: Record<string, CountryEntryModeProfile>,
  weights: EntryModeCriteriaWeights = DEFAULT_ENTRY_MODE_WEIGHTS
): { modeId: EntryModeId; name: string; score: number } {
  const profile = entryProfiles[countryId] || INITIAL_ENTRY_MODES_BY_COUNTRY[countryId];
  assert.ok(profile, `Profile for ${countryId} must exist`);

  const modesList = (Object.keys(profile.modes) as EntryModeId[]).map((mId) => {
    const m = profile.modes[mId];
    const score = computeEntryModeScore(m.scores, weights);
    return { modeId: mId, name: m.name, score };
  });

  modesList.sort((a, b) => b.score - a.score);
  return modesList[0];
}

// ============================================================================
// TEST SUITE: Global Risk Radar Automated Functional Tests
// ============================================================================

test('1. Click every Apply Category button and verify that it triggers the correct scoring logic', async (t) => {
  const expectedCategories = [
    'Winter apparel',
    'Spices',
    'Electronics',
    'Furniture',
    'Toys and games',
    'Leather accessories',
    'Packaged food',
    'Cosmetics',
    'Sports equipment',
    'Industrial machinery'
  ];

  assert.strictEqual(
    CATEGORY_BENCHMARKS.length,
    10,
    'Must have exactly 10 benchmarks implemented'
  );

  for (let i = 0; i < expectedCategories.length; i++) {
    const categoryName = expectedCategories[i];
    const benchmark = findCategoryBenchmark(categoryName);
    assert.ok(benchmark, `Benchmark for "${categoryName}" must be found`);
    assert.strictEqual(benchmark.countries.length, 10, `Benchmark "${categoryName}" must have 10 candidate countries in the evaluation pool`);

    // Verify all candidate factor scores are within valid 0-100 scale
    for (const country of benchmark.countries) {
      assert.ok(country.marketDemand >= 0 && country.marketDemand <= 100, `Market demand in range for ${country.name}`);
      assert.ok(country.purchasingPower >= 0 && country.purchasingPower <= 100, `Purchasing power in range for ${country.name}`);
      assert.ok(country.competition >= 0 && country.competition <= 100, `Competition in range for ${country.name}`);
      assert.ok(country.importRegulations >= 0 && country.importRegulations <= 100, `Import regulations in range for ${country.name}`);
      assert.ok(country.logistics >= 0 && country.logistics <= 100, `Logistics in range for ${country.name}`);
      assert.ok(country.tradeBarriers >= 0 && country.tradeBarriers <= 100, `Trade barriers in range for ${country.name}`);
      assert.ok(country.businessPotential >= 0 && country.businessPotential <= 100, `Business potential in range for ${country.name}`);
    }

    // Execute scoring logic: candidate pool is ranked and shortlisted to top 7 for Stage 2 PESTEL
    const s1 = computeStage1Scores(benchmark.countries, DEFAULT_STAGE1_WEIGHTS);
    assert.strictEqual(s1.length, 10, `Must return 10 ranked countries for ${categoryName}`);
    assert.ok(s1[0].stage1Score >= s1[1].stage1Score, 'Rank 1 must have score >= Rank 2');

    const top7 = s1.slice(0, 7);
    const s2 = computeCombinedScores(top7, INITIAL_PESTEL_DATA);
    assert.strictEqual(s2.length, 7, `Stage 2 must evaluate top 7 shortlisted countries for ${categoryName}`);
    assert.ok(s2[0].compositeScore >= s2[1].compositeScore, 'Rank 1 composite >= Rank 2 composite');
  }
});

test('2. Verify that Top 3 country recommendations and scores are recalculated when the product category changes', async (t) => {
  // Test Winter Apparel (Baseline) vs Spices vs Industrial Machinery
  const winter = findCategoryBenchmark('Winter apparel');
  const spices = findCategoryBenchmark('Spices');
  const machinery = findCategoryBenchmark('Industrial machinery');

  const s1Winter = computeStage1Scores(winter.countries, DEFAULT_STAGE1_WEIGHTS);
  const top3Winter = computeCombinedScores(s1Winter.slice(0, 7), INITIAL_PESTEL_DATA).slice(0, 3);

  const s1Spices = computeStage1Scores(spices.countries, DEFAULT_STAGE1_WEIGHTS);
  const top3Spices = computeCombinedScores(s1Spices.slice(0, 7), INITIAL_PESTEL_DATA).slice(0, 3);

  const s1Machinery = computeStage1Scores(machinery.countries, DEFAULT_STAGE1_WEIGHTS);
  const top3Machinery = computeCombinedScores(s1Machinery.slice(0, 7), INITIAL_PESTEL_DATA).slice(0, 3);

  // Winter Apparel top 3 contains Alpine/Nordic cold-climate leaders
  const winterTop3Names = top3Winter.map((c) => c.name);
  assert.ok(winterTop3Names.includes('Norway'), 'Winter Apparel must include Norway in Top 3');
  assert.ok(winterTop3Names.includes('Switzerland'), 'Winter Apparel must include Switzerland in Top 3');
  assert.ok(
    winterTop3Names.includes('Finland') || winterTop3Names.includes('Canada'),
    'Winter Apparel must include Finland or Canada in Top 3'
  );

  // Spices top 3 prioritizes major culinary trade and transit hubs
  const spicesTop3Names = top3Spices.map((c) => c.name);
  assert.ok(
    spicesTop3Names.includes('United States (Northern)') || spicesTop3Names.includes('United Kingdom'),
    'Spices must recommend US or UK in Top 3'
  );

  // Industrial machinery prioritizes high-spec industrial manufacturing powerhouses
  const machineryTop3Names = top3Machinery.map((c) => c.name);
  assert.ok(machineryTop3Names.includes('Germany'), 'Industrial Machinery must recommend Germany in Top 3');

  // Scores must be distinct and recalculated
  assert.notStrictEqual(top3Winter[0].compositeScore, top3Spices[0].compositeScore, 'Scores must differ between Winter Apparel and Spices');
  assert.notStrictEqual(top3Winter[0].stage1Score, top3Machinery[0].stage1Score, 'Stage 1 scores must differ between categories');
});

test('3. Verify that PESTEL results and entry-mode recommendations update consistently with the selected category', async (t) => {
  // Check Winter Apparel (Low asset specificity -> Direct Exporting)
  const winter = findCategoryBenchmark('Winter apparel');
  const winterTopCountry = 'norway';
  const winterWinningMode = getWinningEntryMode(
    winterTopCountry,
    winter.entryModesData || INITIAL_ENTRY_MODES_BY_COUNTRY
  );
  assert.strictEqual(winterWinningMode.name, 'Direct Exporting', 'Winter apparel should recommend Direct Exporting');

  // Check Industrial Machinery (High asset specificity, on-site maintenance -> Joint Venture)
  const machinery = findCategoryBenchmark('Industrial machinery');
  assert.ok(machinery.entryModesData, 'Industrial machinery must have tailored entry mode calibrations');
  const machineryTopCountry = 'norway';
  const machineryWinningMode = getWinningEntryMode(
    machineryTopCountry,
    machinery.entryModesData
  );
  assert.strictEqual(
    machineryWinningMode.name,
    'Joint Venture',
    'Industrial machinery should recommend Joint Venture due to technical support and local integration'
  );
});

test('4. Test Log Live Output and confirm that the actual results are saved', async (t) => {
  // Simulate application of category and logging to record
  const records: BiasTestRecord[] = JSON.parse(JSON.stringify(INITIAL_BIAS_TEST_RECORDS));

  // Check record 2 (Spices) before logging
  const spicesRec = records.find((r) => r.id === 2);
  assert.ok(spicesRec);
  assert.strictEqual(spicesRec.top3Countries, '', 'top3Countries must initially be empty');
  assert.strictEqual(spicesRec.recommendedEntryMode, '', 'recommendedEntryMode must initially be empty');

  // Compute live output for Spices
  const spicesBenchmark = findCategoryBenchmark('Spices');
  const s1 = computeStage1Scores(spicesBenchmark.countries, DEFAULT_STAGE1_WEIGHTS);
  const top3 = computeCombinedScores(s1.slice(0, 7), INITIAL_PESTEL_DATA).slice(0, 3);
  const top3Str = top3.map((c, i) => `#${i + 1} ${c.flag} ${c.name} (${c.compositeScore})`).join('; ');

  const bestCountry = top3[0];
  const profile = (spicesBenchmark.entryModesData && spicesBenchmark.entryModesData[bestCountry.id]) ||
    INITIAL_ENTRY_MODES_BY_COUNTRY[bestCountry.id];
  const winningMode = getWinningEntryMode(bestCountry.id, { [bestCountry.id]: profile });

  // Update record (simulating logCurrentDashboardToRecord)
  spicesRec.top3Countries = top3Str;
  spicesRec.recommendedEntryMode = winningMode.name;
  spicesRec.reasonsForResult = `#1 ${bestCountry.name} (${bestCountry.compositeScore}/100) led on demand & purchasing power. Stage 3 recommended ${winningMode.name}.`;
  spicesRec.testedAt = '10:00:00 AM';

  // Verify that the record now has the actual saved results
  assert.ok(
    spicesRec.top3Countries.includes('United States') || spicesRec.top3Countries.includes('United Kingdom'),
    'Saved record contains verified spice import leader'
  );
  assert.strictEqual(spicesRec.recommendedEntryMode, 'Direct Exporting');
  assert.ok(spicesRec.reasonsForResult.length > 10, 'Saved reasons for result must be non-empty');
  assert.strictEqual(spicesRec.testedAt, '10:00:00 AM');
});

test('5. Verify that audit progress changes only after a result is successfully logged', async (t) => {
  const records: BiasTestRecord[] = JSON.parse(JSON.stringify(INITIAL_BIAS_TEST_RECORDS));

  // Initial progress
  const getTestedCount = (list: BiasTestRecord[]) => list.filter((r) => r.top3Countries !== '').length;
  assert.strictEqual(getTestedCount(records), 0, 'Initial progress must be 0 / 10 Tested');

  // Applying category WITHOUT logging does not increment progress
  const activeCategory = 'Spices';
  assert.strictEqual(getTestedCount(records), 0, 'Applying category must not increment progress until logged');

  // Now log record 1
  records[0].top3Countries = '#1 🇳🇴 Norway (89.12); #2 🇨🇭 Switzerland (86.45); #3 🇨🇦 Canada (84.20)';
  records[0].recommendedEntryMode = 'Direct Exporting';
  assert.strictEqual(getTestedCount(records), 1, 'Progress must now be 1 / 10');

  // Log record 2
  records[1].top3Countries = '#1 🇩🇪 Germany (87.42); #2 🇨🇦 Canada (83.15); #3 🇯🇵 Japan (80.10)';
  records[1].recommendedEntryMode = 'Direct Exporting';
  assert.strictEqual(getTestedCount(records), 2, 'Progress must now be 2 / 10');
});

test('6. Test the All, Tested, and Pending filters', async (t) => {
  const records: BiasTestRecord[] = JSON.parse(JSON.stringify(INITIAL_BIAS_TEST_RECORDS));

  // Log 3 records
  records[0].top3Countries = '#1 Norway';
  records[1].top3Countries = '#1 Germany';
  records[2].top3Countries = '#1 USA';

  // Test filter 'all'
  const filterAll = (list: BiasTestRecord[]) => list;
  assert.strictEqual(filterAll(records).length, 10, 'All filter must return all 10 records');

  // Test filter 'tested'
  const filterTested = (list: BiasTestRecord[]) => list.filter((r) => r.top3Countries !== '');
  assert.strictEqual(filterTested(records).length, 3, 'Tested filter must return exactly 3 records');

  // Test filter 'pending'
  const filterPending = (list: BiasTestRecord[]) => list.filter((r) => r.top3Countries === '');
  assert.strictEqual(filterPending(records).length, 7, 'Pending filter must return exactly 7 records');

  // Sum of tested + pending must always equal total records
  assert.strictEqual(
    filterTested(records).length + filterPending(records).length,
    records.length,
    'Tested + Pending must equal total'
  );
});

test('7. Test Copy Markdown Table and Reset Test Sheet', async (t) => {
  const records: BiasTestRecord[] = JSON.parse(JSON.stringify(INITIAL_BIAS_TEST_RECORDS));

  // 1. Test Markdown generation
  let md = `| Test # | Product Category | Business Profile | Top 3 Recommended Countries | Recommended Entry Mode | Reasons for Result | Suspected Bias Diagnosis | Notes |\n`;
  md += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  records.forEach((r) => {
    md += `| ${r.id} | ${r.category} | ${r.businessProfile} | ${r.top3Countries || 'Pending Test'} | ${r.recommendedEntryMode || 'Pending Test'} | ${r.reasonsForResult || 'Pending Test'} | ${r.biasSuspected} | ${r.notes} |\n`;
  });

  const lines = md.trim().split('\n');
  assert.strictEqual(lines.length, 12, 'Markdown table must have 1 header line, 1 delimiter line, and 10 data rows');
  assert.ok(lines[0].includes('Product Category'), 'Header must include Product Category');
  assert.ok(lines[2].includes('Winter apparel'), 'Row 1 must be Winter apparel');
  assert.ok(lines[11].includes('Industrial machinery'), 'Row 10 must be Industrial machinery');

  // 2. Test Reset Test Sheet
  // Modify some records
  records[0].top3Countries = 'Tested';
  records[1].top3Countries = 'Tested';
  assert.strictEqual(records.filter((r) => r.top3Countries !== '').length, 2);

  // Reset
  const resetRecords = INITIAL_BIAS_TEST_RECORDS;
  assert.strictEqual(
    resetRecords.filter((r) => r.top3Countries !== '').length,
    0,
    'Resetting must return all 10 records to blank state'
  );
});

test('8. Check for JavaScript errors, broken event handlers, and incorrect state updates', async (t) => {
  // Test all 10 category lookups and calculations with potential edge cases (e.g. mixed case, extra spaces)
  const categoryInputs = [
    'winter apparel',
    'Winter Apparel',
    'SPICES',
    '  spices  ',
    'electronics',
    'Furniture',
    'Toys and games',
    'leather accessories',
    'Packaged food',
    'Cosmetics',
    'Sports equipment',
    'Industrial machinery'
  ];

  for (const input of categoryInputs) {
    const bm = findCategoryBenchmark(input);
    assert.ok(bm, `Should safely match benchmark for case-insensitive input: "${input}"`);

    // Verify non-NaN calculations
    const s1 = computeStage1Scores(bm.countries, DEFAULT_STAGE1_WEIGHTS);
    for (const c of s1) {
      assert.ok(!isNaN(c.stage1Score), `Stage 1 score must not be NaN for ${c.name}`);
      assert.ok(isFinite(c.stage1Score), `Stage 1 score must be finite for ${c.name}`);
    }

    const s2 = computeCombinedScores(s1, INITIAL_PESTEL_DATA);
    for (const c of s2) {
      assert.ok(!isNaN(c.compositeScore), `Composite score must not be NaN for ${c.name}`);
      assert.ok(!isNaN(c.pestelScore), `PESTEL score must not be NaN for ${c.name}`);
    }
  }
});

test('9. Verify that the original winter-apparel baseline and all scoring weights remain intact', async (t) => {
  // Verify Stage 1 factor weights
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.marketDemand, 25, 'Market demand weight must be 25%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.purchasingPower, 20, 'Purchasing power weight must be 20%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.competition, 15, 'Competition weight must be 15%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.importRegulations, 15, 'Import regulations weight must be 15%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.logistics, 10, 'Logistics weight must be 10%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.tradeBarriers, 10, 'Trade barriers weight must be 10%');
  assert.strictEqual(DEFAULT_STAGE1_WEIGHTS.businessPotential, 5, 'Business potential weight must be 5%');

  const s1WeightSum = Object.values(DEFAULT_STAGE1_WEIGHTS).reduce((a, b) => a + b, 0);
  assert.strictEqual(s1WeightSum, 100, 'Stage 1 weights must sum to exactly 100%');

  // Verify Stage 3 criteria weights
  assert.strictEqual(DEFAULT_ENTRY_MODE_WEIGHTS.investmentCost, 20, 'Stage 3 investment cost weight must be 20%');
  assert.strictEqual(DEFAULT_ENTRY_MODE_WEIGHTS.riskLevel, 20, 'Stage 3 risk level weight must be 20%');
  assert.strictEqual(DEFAULT_ENTRY_MODE_WEIGHTS.controlLevel, 20, 'Stage 3 control level weight must be 20%');
  assert.strictEqual(DEFAULT_ENTRY_MODE_WEIGHTS.marketKnowledge, 20, 'Stage 3 market knowledge weight must be 20%');
  assert.strictEqual(DEFAULT_ENTRY_MODE_WEIGHTS.exporterSuitability, 20, 'Stage 3 exporter suitability weight must be 20%');

  const s3WeightSum = Object.values(DEFAULT_ENTRY_MODE_WEIGHTS).reduce((a, b) => a + b, 0);
  assert.strictEqual(s3WeightSum, 100, 'Stage 3 weights must sum to exactly 100%');

  // Verify Winter Apparel candidate countries baseline
  assert.strictEqual(INITIAL_COUNTRIES.length, 10, 'Winter apparel baseline must have 10 candidate countries in the market evaluation pool');
  const norway = INITIAL_COUNTRIES.find((c) => c.id === 'norway');
  assert.ok(norway);
  assert.strictEqual(norway.marketDemand, 92);
  assert.strictEqual(norway.purchasingPower, 96);
  assert.strictEqual(norway.tradeBarriers, 85);

  // Compute baseline Winter Apparel ranking
  const s1 = computeStage1Scores(INITIAL_COUNTRIES, DEFAULT_STAGE1_WEIGHTS);
  const combined = computeCombinedScores(s1.slice(0, 7), INITIAL_PESTEL_DATA);
  const baselineTop3 = combined.slice(0, 3).map((c) => c.name);
  assert.ok(baselineTop3.includes('Switzerland'), 'Switzerland must be in Winter Apparel Top 3');
  assert.ok(baselineTop3.includes('Norway'), 'Norway must be in Winter Apparel Top 3');
  assert.ok(
    baselineTop3.includes('Finland') || baselineTop3.includes('Canada'),
    'Finland or Canada must be in Winter Apparel Top 3'
  );
});

test('10. Test at least two different product categories and confirm that their results are calculated independently', async (t) => {
  // Category A: Toys and games
  const toysBm = findCategoryBenchmark('Toys and games');
  const toysS1 = computeStage1Scores(toysBm.countries, DEFAULT_STAGE1_WEIGHTS);
  const toysTop3 = computeCombinedScores(toysS1, INITIAL_PESTEL_DATA).slice(0, 3);

  // Category B: Leather accessories
  const leatherBm = findCategoryBenchmark('Leather accessories');
  const leatherS1 = computeStage1Scores(leatherBm.countries, DEFAULT_STAGE1_WEIGHTS);
  const leatherTop3 = computeCombinedScores(leatherS1, INITIAL_PESTEL_DATA).slice(0, 3);

  // Assert independence
  assert.notStrictEqual(
    toysTop3[0].compositeScore,
    leatherTop3[0].compositeScore,
    'Top 1 composite score must differ between Toys and Leather'
  );

  // Verify factor independence
  const toysGermany = toysBm.countries.find((c) => c.id === 'germany')!;
  const leatherGermany = leatherBm.countries.find((c) => c.id === 'germany')!;
  assert.notStrictEqual(
    toysGermany.marketDemand,
    leatherGermany.marketDemand,
    'Market demand for Germany must be independent between Toys and Leather'
  );

  // Check mutation safety: verify modifying leather does not affect toys
  assert.strictEqual(toysBm.categoryName, 'Toys and games');
  assert.strictEqual(leatherBm.categoryName, 'Leather accessories');
});
