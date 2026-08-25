import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Sol Academy product shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sol Academy/);
  assert.match(html, /Command center/);
  assert.match(html, />LOCAL</);
  assert.match(html, /Loading your academy/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);

  const academySource = await readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8");
  assert.match(academySource, /Read the market/);
  assert.match(academySource, /DECISION STACK/);
  assert.match(academySource, /reference-workspace/);
});

test("ships the complete course corpus without private screenshot material", async () => {
  const [course, labs, app, styles, page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/data/course.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/labs.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const moduleBlock = course.slice(course.indexOf("export const modules"), course.indexOf("export const diagnosticQuestions"));
  assert.equal((moduleBlock.match(/\n\s+number:\s\d+,/g) ?? []).length, 12);
  assert.equal((moduleBlock.match(/track:\s"Weekend Core"/g) ?? []).length, 8);
  assert.equal((moduleBlock.match(/track:\s"Bonus Arsenal"/g) ?? []).length, 4);
  assert.equal((moduleBlock.match(/weekendDay:\s1/g) ?? []).length, 4);
  assert.equal((moduleBlock.match(/weekendDay:\s2/g) ?? []).length, 4);
  assert.ok((moduleBlock.match(/\n\s+quiz:\s\[/g) ?? []).length >= 12);
  assert.ok((labs.match(/\{ term:/g) ?? []).length >= 80);

  const drillBlock = labs.slice(labs.indexOf("export const drills"), labs.indexOf("export const historicalCases"));
  assert.ok((drillBlock.match(/\n\s+id:\s"/g) ?? []).length >= 6);
  const historyBlock = labs.slice(labs.indexOf("export const historicalCases"));
  assert.ok((historyBlock.match(/\n\s+id:\s"/g) ?? []).length >= 9);

  assert.match(app, /localStorage\.setItem\("sol-academy-progress-v1"/);
  assert.match(app, /function VodNotebook/);
  assert.match(app, /function Calculators/);
  assert.match(app, /function getOperatorStats/);
  assert.match(app, /TRAINING RANK/);
  assert.match(app, /SIMULATION ONLINE/);
  assert.match(app, /MODULE CLEAR/);
  assert.match(app, /CORE PATH/);
  assert.match(app, /BONUS ARSENAL/);
  assert.match(app, /VOD LITERATE/);
  assert.match(app, /Observe.*Define.*Journal.*Test.*Alert.*Automate/s);
  assert.match(app, /<Quiz key=\{module\.id\}/);
  assert.match(app, /function hydrateProgress/);
  assert.match(app, /CURRENT DRILL VALUE/);
  assert.match(app, /Math\.max\(current\.diagnosticScore \?\? 0, score\)/);
  assert.match(styles, /@keyframes routeEnter/);
  assert.match(styles, /@keyframes detailEnter/);
  assert.match(styles, /\.module-list/);
  assert.match(styles, /\.reference-workspace/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(page, /<AcademyApp \/>/);
  assert.match(layout, /Sol Academy/);
  assert.match(layout, /Instrument_Sans/);
  assert.match(layout, /IBM_Plex_Mono/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const publicSurface = `${course}\n${labs}\n${app}`;
  assert.doesNotMatch(publicSurface, /codex-clipboard|AppData\\Local\\Temp/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});

test("ships the Day 3 performance curriculum and evidence rubric", async () => {
  const [readiness, readinessLab, replay, rubric, app] = await Promise.all([
    readFile(new URL("../app/data/readiness.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ReadinessLab.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ProgressiveReplay.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/vod-rubric.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8"),
  ]);

  const expectedDomains = ["Screen", "Math", "Wallets", "Narrative", "Tape", "Risk", "Execution", "VOD"];
  const domainDeclaration = readiness.match(/export const readinessDomains\s*=\s*\[([^\]]+)]\s*as const/);
  assert.ok(domainDeclaration, "the readiness-domain declaration should remain machine-checkable");
  const declaredDomains = [...domainDeclaration[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(declaredDomains, expectedDomains);

  const practiceStart = readiness.indexOf("export const practiceScenarios");
  const examStart = readiness.indexOf("export const examScenarios");
  assert.ok(practiceStart >= 0 && examStart > practiceStart, "both readiness banks should be exported");

  const parseScenarios = (source) =>
    [...source.matchAll(/scenario\(\s*"([^"]+)",\s*"([^"]+)"/g)].map(([, id, domain]) => ({ id, domain }));
  const practice = parseScenarios(readiness.slice(practiceStart, examStart));
  const exam = parseScenarios(readiness.slice(examStart));

  for (const [label, bank] of [["practice", practice], ["exam", exam]]) {
    assert.equal(bank.length, 16, `the ${label} bank should contain exactly 16 scenarios`);
    assert.equal(new Set(bank.map(({ id }) => id)).size, 16, `${label} scenario ids must be unique`);
    for (const domain of expectedDomains) {
      assert.equal(
        bank.filter((scenario) => scenario.domain === domain).length,
        2,
        `the ${label} bank should contain exactly two ${domain} scenarios`,
      );
    }
  }
  assert.equal(
    practice.filter(({ id }) => exam.some((scenario) => scenario.id === id)).length,
    0,
    "the unseen exam must not reuse practice scenario ids",
  );

  const actionDeclaration = replay.match(/const replayActions\s*=\s*\[([^\]]+)]\s*as const/);
  assert.ok(actionDeclaration, "progressive replay actions should remain explicit");
  assert.deepEqual(
    [...actionDeclaration[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    ["Skip", "Watch", "Paper entry", "Add", "Trim", "Exit"],
  );
  assert.match(replay, /minimumRationaleLength\s*=\s*12/);
  assert.match(replay, /completedCheckpoints\s*\+\s*1/);
  assert.match(replay, /Evidence review unlocked/);

  assert.match(readinessLab, /const allAnswered = answeredCount === examScenarios\.length/);
  assert.match(readinessLab, /readinessDomains\.every\(\(domain\) => domainScores\[domain\] >= 50\)/);
  assert.match(readinessLab, /\.filter\(\(scenario\) => scenario\.criticalError\)/);
  assert.match(
    readinessLab,
    /passed: score >= 85 && domainFloorClear && criticalClear/,
    "passing must require the score target, the per-domain floor, and a clean critical set",
  );

  const dimensionStart = rubric.indexOf("export const vodAnnotationRubric");
  const criticalErrorStart = rubric.indexOf("export const vodCriticalErrorRules");
  assert.ok(dimensionStart >= 0 && criticalErrorStart > dimensionStart, "the VOD rubric should be exported");
  const dimensionIds = [...rubric.slice(dimensionStart, criticalErrorStart).matchAll(/\bid:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(dimensionIds, [
    "traceability",
    "state",
    "action",
    "evidence",
    "thesis",
    "trigger",
    "risk",
    "counterfactual",
  ]);

  const fieldDeclaration = rubric.match(/export type VodAnnotationField\s*=([\s\S]*?);/);
  assert.ok(fieldDeclaration, "structured VOD annotation fields should remain explicit");
  assert.deepEqual(
    [...fieldDeclaration[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    [
      "url",
      "timestamp",
      "platform",
      "tokenState",
      "action",
      "observation",
      "evidenceGrade",
      "thesis",
      "trigger",
      "sizeRisk",
      "invalidation",
      "exitPlan",
      "skippedAlternative",
    ],
  );
  assert.match(rubric, /percent >= 88/);

  assert.match(app, /view: "readiness", label: "Day 3 readiness"/);
  assert.match(app, /const examCleared = Boolean\(progress\.readinessPassedAt\)/);
  assert.match(app, /scoreVodAnnotationCompleteness\(entry\)\.percent >= 88/);
  assert.match(app, /const vodLiterate = coreReady && examCleared && qualityVodNotes >= 2/);
  assert.match(app, /SCREEN ORIENTED/);
  assert.match(app, /VOD LITERATE/);
  assert.match(app, /Math\.min\(\(progress\.readinessExamBest \?\? 0\) \/ 85, 1\)/);
});

test("ships interactive candlestick literacy and evidence-translated trench language", async () => {
  const [candles, candleLab, slang, labs, readiness, readinessLab, app] = await Promise.all([
    readFile(new URL("../app/data/candles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/CandleLab.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/slang.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/labs.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/readiness.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ReadinessLab.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8"),
  ]);

  const scenarioIds = [...candles.matchAll(/^\s+id:\s*"([^"]+)",/gm)].map((match) => match[1]);
  assert.deepEqual(scenarioIds, ["anatomy", "thin-impulse", "failed-breakout", "absorption", "effort-result", "bond-fullclip"]);

  const candleRows = [...candles.matchAll(/\{\s*time:\s*"[^"]+",\s*open:\s*([0-9.]+),\s*high:\s*([0-9.]+),\s*low:\s*([0-9.]+),\s*close:\s*([0-9.]+),\s*volume:\s*([0-9.]+)\s*\}/g)];
  assert.ok(candleRows.length >= 50, "the candle bank should contain enough bars to show complete sequences");
  for (const [, openText, highText, lowText, closeText, volumeText] of candleRows) {
    const [open, high, low, close, volume] = [openText, highText, lowText, closeText, volumeText].map(Number);
    assert.ok(high >= Math.max(open, close), "each high must contain the candle body");
    assert.ok(low <= Math.min(open, close), "each low must contain the candle body");
    assert.ok(volume >= 0, "candle volume cannot be negative");
  }

  assert.match(candleLab, /open .* high .* low .* close .* volume/is);
  assert.match(candleLab, /aria-label=\{onSelect \? label/);
  assert.match(candleLab, /TRENCH → EVIDENCE/);
  assert.match(candleLab, /Six fast simulations/);
  assert.match(app, /type LabTab = "calculators" \| "candles" \| "history" \| "vod"/);
  assert.match(app, /module\.id === "tape" && <CandlePrimer/);
  assert.match(app, /tab === "candles" && <CandleLab/);

  assert.equal((readiness.match(/chartId:\s*"/g) ?? []).length, 5);
  for (const id of ["absorption", "effort-result", "thin-impulse", "failed-breakout"]) {
    assert.match(readiness, new RegExp(`chartId: "${id}"`));
  }
  assert.match(readinessLab, /<CandleChart scenario=\{chart\} compact showVolume/);

  for (const term of ["Candle", "Candle body", "OHLC", "Timeframe", "Volume bar", "Ape", "Bag", "PvP", "Roundtrip", "Runner", "Top-blast"]) {
    assert.match(labs, new RegExp(`term: "${term}"`), `the glossary should define ${term}`);
  }
  assert.ok((slang.match(/\bphrase:\s*"/g) ?? []).length >= 28, "the contextual language layer should cover the full curriculum");
  assert.ok((slang.match(/\boperatorTranslation:\s*"/g) ?? []).length >= 28);
  assert.ok((slang.match(/\bdoesNotProve:\s*"/g) ?? []).length >= 28);
  for (const coreModule of ["game-map", "money-math", "lifecycle", "terminal", "wallets", "narrative", "tape", "risk"]) {
    assert.match(slang, new RegExp(`(?:"${coreModule}"|${coreModule}): \\[`), `${coreModule} should receive contextual language`);
  }
});

test("all source-library links are valid absolute URLs", async () => {
  const course = await readFile(new URL("../app/data/course.ts", import.meta.url), "utf8");
  const sourceBlock = course.slice(course.indexOf("export const sources"), course.indexOf("export const sourceMap"));
  const urls = [...sourceBlock.matchAll(/url:\s"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(urls.length >= 35);
  for (const url of urls) {
    const parsed = new URL(url);
    assert.match(parsed.protocol, /^https?:$/);
  }
});

test("ships optimized RGBA achievement artwork", async () => {
  const names = ["vod-literate", "market-mechanic", "wallet-cartographer", "risk-first", "tape-analyst"];
  const app = await readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8");

  for (const name of names) {
    assert.match(app, new RegExp(`/achievements/${name}\\.png`));
    const png = await readFile(new URL(`../public/achievements/${name}.png`, import.meta.url));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(png.readUInt32BE(16), 320);
    assert.equal(png.readUInt32BE(20), 320);
    assert.equal(png[25], 6, `${name} must use RGBA PNG color type`);
    assert.ok(png.length < 200_000, `${name} should stay optimized for the achievement rack`);
  }
});

test("all mapped editorial art assets exist", async () => {
  const expectedCounts = {
    modules: 12,
    drills: 6,
    history: 9,
    sections: 5,
  };
  const manifest = await readFile(new URL("../app/data/art.ts", import.meta.url), "utf8");
  const mappings = [...manifest.matchAll(/:\s*asset\("([^"]+)",\s*"([^"]+)"\s*,/g)].map(
    ([, category, id]) => ({ category, id }),
  );

  assert.equal(mappings.length, 32, "the art manifest should map exactly 32 assets");
  assert.equal(new Set(mappings.map(({ category, id }) => `${category}/${id}`)).size, 32, "art mappings must be unique");

  for (const [category, expectedCount] of Object.entries(expectedCounts)) {
    const actualCount = mappings.filter((mapping) => mapping.category === category).length;
    assert.equal(actualCount, expectedCount, `${category} should map ${expectedCount} assets`);
  }

  assert.deepEqual(
    [...new Set(mappings.map(({ category }) => category))].sort(),
    Object.keys(expectedCounts).sort(),
    "the manifest should contain only the expected art categories",
  );

  await Promise.all(
    mappings.map(async ({ category, id }) => {
      const assetUrl = new URL(`../public/art/${category}/${id}.webp`, import.meta.url);
      await assert.doesNotReject(access(assetUrl), `missing mapped art asset: /art/${category}/${id}.webp`);
    }),
  );
});

test("ships a correctly sized social preview card", async () => {
  const [layout, png] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(layout, /url: "\/og\.png"/);
  assert.match(layout, /width: 1200/);
  assert.match(layout, /height: 630/);
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
