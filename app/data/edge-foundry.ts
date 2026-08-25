export type EdgeMethodDraft = {
  name: string;
  observation: string;
  causalHypothesis: string;
  universe: string;
  marketState: string;
  evidence: string;
  disqualifiers: string;
  trigger: string;
  horizon: string;
  sizeRule: string;
  invalidation: string;
  exitRule: string;
  latencyBudget: string;
  outcomeLabel: string;
  costModel: string;
  baseline: string;
  samplePlan: string;
  holdoutRule: string;
  loggingSchema: string;
  failureMode: string;
  killCondition: string;
  automationBoundary: string;
};

export type EdgeObservation = {
  id: string;
  methodKey: string;
  label: string;
  observedAt: string;
  ruleMatched: boolean;
  decision: "paper" | "skip";
  outcomeR: number | null;
  notes: string;
};

export type EdgeFoundryState = {
  draft: EdgeMethodDraft;
  observations: EdgeObservation[];
  validation: Record<string, string>;
  filterConfig: FilterConfig;
  holdoutAttempt?: { frozenConfig: FilterConfig; revealedAt: string };
  completedAt?: string;
  updatedAt?: string;
};

export type FilterCandidate = {
  id: string;
  split: "build" | "holdout";
  activityFees: number;
  sourceLinked: boolean;
  buyerGrowth: number;
  outcomeR: number;
};

export type FilterConfig = {
  minimumFees: number;
  requireSourceLink: boolean;
  minimumBuyerGrowth: number;
};

export type FilterMetrics = {
  sample: number;
  selected: number;
  winners: number;
  winnersCaught: number;
  falsePositives: number;
  falseNegatives: number;
  precision: number | null;
  recall: number | null;
  expectancyR: number | null;
  baselineR: number | null;
  liftR: number | null;
};

export const edgeDraftFields: { key: keyof EdgeMethodDraft; label: string; prompt: string; group: string }[] = [
  { key: "name", label: "Method name", prompt: "A neutral working name—not a victory claim.", group: "Claim" },
  { key: "observation", label: "Observation", prompt: "What repeated behavior did you notice before knowing the outcome?", group: "Claim" },
  { key: "causalHypothesis", label: "Causal hypothesis", prompt: "Why might this behavior create future price response, and what would falsify that explanation?", group: "Claim" },
  { key: "universe", label: "Universe", prompt: "Exactly which tokens or events are eligible for evaluation?", group: "Selection" },
  { key: "marketState", label: "Required state", prompt: "Launch phase, age, liquidity, regime, or narrative state required.", group: "Selection" },
  { key: "evidence", label: "Required evidence", prompt: "Observable fields that must agree before the setup exists.", group: "Selection" },
  { key: "disqualifiers", label: "Disqualifiers", prompt: "Missing data, ownership, route, liquidity, or behavior that forces a skip.", group: "Selection" },
  { key: "trigger", label: "Trigger", prompt: "The timestampable change that permits an entry—not merely a good-looking coin.", group: "Decision" },
  { key: "horizon", label: "Expected horizon", prompt: "How quickly should the thesis begin working, and for how long?", group: "Decision" },
  { key: "sizeRule", label: "Size and capacity", prompt: "Risk budget, maximum impact, and executable-exit constraint.", group: "Decision" },
  { key: "invalidation", label: "Invalidation", prompt: "The observable event proving the entry thesis no longer holds.", group: "Decision" },
  { key: "exitRule", label: "Exit logic", prompt: "Profit-taking, invalidation, time stop, and failure-state behavior.", group: "Decision" },
  { key: "latencyBudget", label: "Latency budget", prompt: "Maximum acceptable delay for data, scoring, submission, landing, and confirmation.", group: "Decision" },
  { key: "outcomeLabel", label: "Outcome label", prompt: "One forward horizon and one net-of-cost R rule for wins, losses, and pending cases.", group: "Proof" },
  { key: "costModel", label: "Cost model", prompt: "Fees, tips, slippage, failed sends, latency, and adverse selection.", group: "Proof" },
  { key: "baseline", label: "Baseline", prompt: "The simpler rule your idea must beat, such as buying every eligible candidate.", group: "Proof" },
  { key: "samplePlan", label: "Sample plan", prompt: "Target count, collection dates, venue, and regime buckets—declared before results.", group: "Proof" },
  { key: "holdoutRule", label: "Holdout rule", prompt: "Which untouched future window will be opened only after thresholds freeze?", group: "Proof" },
  { key: "loggingSchema", label: "Logging schema", prompt: "Fields saved for candidates, non-trades, decisions, fills, outcomes, and missing data.", group: "Proof" },
  { key: "failureMode", label: "How the test can lie", prompt: "Leakage, survivorship, label drift, wallet attribution, fills, or repeated threshold tuning.", group: "Proof" },
  { key: "killCondition", label: "Kill condition", prompt: "The measured deterioration that disables the method.", group: "Proof" },
  { key: "automationBoundary", label: "Automation boundary", prompt: "What may be observed, alerted, papered, or executed automatically?", group: "Proof" },
];

export const emptyEdgeDraft: EdgeMethodDraft = Object.fromEntries(
  edgeDraftFields.map(({ key }) => [key, ""]),
) as EdgeMethodDraft;

export const defaultFilterConfig: FilterConfig = { minimumFees: 4, requireSourceLink: true, minimumBuyerGrowth: 10 };

export const workedEdgeDraft: EdgeMethodDraft = {
  name: "Same-name candidate race (fictional)",
  observation: "When a fresh narrative creates several same-name contracts, attention sometimes coordinates around one candidate before the others.",
  causalHypothesis: "Authentic provenance plus independent early demand may concentrate later attention faster than chronology or activity alone; failure is no incremental continuation after those fields appear.",
  universe: "Public launches that cross a declared activity threshold within 15 minutes and collide with at least one same-name contract.",
  marketState: "Tradable public launch; exact mint and route known; sufficient quoted exit depth; narrative source less than 30 minutes old.",
  evidence: "Chronology, original-source linkage, independent maker growth, holder clusters, fee activity, buyer response, and current liquidity.",
  disqualifiers: "Unknown route, stale source, concentrated linked supply, missing lookup, no buyers after detection, or modeled exit impact above limit.",
  trigger: "Highest-scoring candidate gains independent buyers for two windows while holding above its post-detection value area.",
  horizon: "Follow-through should appear within three minutes; maximum planned hold is fifteen minutes unless a separately logged setup takes over.",
  sizeRule: "Risk no more than 0.25R; cap entry and modeled exit impact; never scale a paper result linearly into thin liquidity.",
  invalidation: "Independent buyer growth reverses, the source link is disproven, linked supply exceeds the declared cap, or price fails its value-area reclaim within the horizon.",
  exitRule: "Trim into expansion, exit on failed buyer growth or structural invalidation, and use a hard time review at three minutes.",
  latencyBudget: "Timestamp feed arrival, scoring, signing, submission, landing, and confirmation; reject signals older than the tested three-second budget.",
  outcomeLabel: "Net R at the earlier of fifteen minutes, structural invalidation, or completed exit using modeled executable fills and all costs.",
  costModel: "Record quote-to-fill drift, price impact, launchpad/DEX fees, priority fee or tip, failed sends, and exit slippage.",
  baseline: "Compare with selecting the oldest candidate and with paper-buying every eligible collision at the same timestamp.",
  samplePlan: "Collect every eligible collision for four weeks, target at least 100 resolved cases, and report hot, normal, and dry regimes separately.",
  holdoutRule: "Freeze features and thresholds after the first three weeks; evaluate the untouched fourth week once, with no retuning.",
  loggingSchema: "Candidate mint, detection time, feature timestamps, missing fields, score, rule result, decision, quoted/actual fill, costs, exit, and net R.",
  failureMode: "Same-name search may use later social linkage, dead tokens may disappear from the dataset, and paper fills may ignore adverse selection or failed exits.",
  killCondition: "Disable after the rolling net expectancy turns negative, feed fields go stale, or live fills exceed the tested cost envelope.",
  automationBoundary: "Automate discovery, enrichment, scoring, alerts, and paper logging first. Keep execution human-gated until unseen results survive costs.",
};

export const validationChecks = [
  { id: "point-in-time", label: "Point-in-time inputs", detail: "Every feature existed at the recorded decision timestamp; no future labels leaked backward." },
  { id: "non-trades", label: "Non-trades logged", detail: "Skipped candidates are retained so avoided losses and missed winners are both visible." },
  { id: "costs", label: "Net costs modeled", detail: "Fees, impact, tips, failures, and realistic exit friction are included." },
  { id: "baseline", label: "Simple baseline compared", detail: "The method beats a simpler selection rule on the same opportunities." },
  { id: "holdout", label: "Untouched holdout tested", detail: "Thresholds were frozen before evaluating a separate time window." },
  { id: "regimes", label: "Multiple regimes sampled", detail: "Results are separated across hot, normal, and dry conditions." },
  { id: "capacity", label: "Capacity stressed", detail: "The result survives intended size, entry impact, and executable exits." },
  { id: "kill-switch", label: "Kill rule rehearsed", detail: "A concrete deterioration or data failure stops the method automatically or operationally." },
] as const;

export const syntheticFilterCandidates: FilterCandidate[] = [
  { id: "B01", split: "build", activityFees: 0.8, sourceLinked: false, buyerGrowth: 2, outcomeR: -0.45 },
  { id: "B02", split: "build", activityFees: 5.7, sourceLinked: true, buyerGrowth: 18, outcomeR: 2.6 },
  { id: "B03", split: "build", activityFees: 8.9, sourceLinked: false, buyerGrowth: 13, outcomeR: -0.65 },
  { id: "B04", split: "build", activityFees: 3.4, sourceLinked: true, buyerGrowth: 24, outcomeR: 1.4 },
  { id: "B05", split: "build", activityFees: 6.1, sourceLinked: true, buyerGrowth: 7, outcomeR: -0.35 },
  { id: "B06", split: "build", activityFees: 2.2, sourceLinked: false, buyerGrowth: 31, outcomeR: 0.9 },
  { id: "B07", split: "build", activityFees: 11.4, sourceLinked: true, buyerGrowth: 29, outcomeR: 3.8 },
  { id: "B08", split: "build", activityFees: 4.6, sourceLinked: true, buyerGrowth: 11, outcomeR: -0.2 },
  { id: "B09", split: "build", activityFees: 7.2, sourceLinked: false, buyerGrowth: 4, outcomeR: -0.5 },
  { id: "H01", split: "holdout", activityFees: 9.7, sourceLinked: true, buyerGrowth: 16, outcomeR: -0.7 },
  { id: "H02", split: "holdout", activityFees: 4.2, sourceLinked: true, buyerGrowth: 22, outcomeR: 2.1 },
  { id: "H03", split: "holdout", activityFees: 6.8, sourceLinked: false, buyerGrowth: 28, outcomeR: 1.2 },
  { id: "H04", split: "holdout", activityFees: 7.5, sourceLinked: true, buyerGrowth: 9, outcomeR: -0.3 },
  { id: "H05", split: "holdout", activityFees: 12.3, sourceLinked: true, buyerGrowth: 35, outcomeR: 3.2 },
  { id: "H06", split: "holdout", activityFees: 1.6, sourceLinked: false, buyerGrowth: 3, outcomeR: -0.4 },
];

export function candidatePasses(candidate: FilterCandidate, config: FilterConfig) {
  return candidate.activityFees >= config.minimumFees
    && candidate.buyerGrowth >= config.minimumBuyerGrowth
    && (!config.requireSourceLink || candidate.sourceLinked);
}

export function evaluateFilter(candidates: FilterCandidate[], config: FilterConfig): FilterMetrics {
  const selected = candidates.filter((candidate) => candidatePasses(candidate, config));
  const winners = candidates.filter((candidate) => candidate.outcomeR > 0);
  const winnersCaught = selected.filter((candidate) => candidate.outcomeR > 0).length;
  const falsePositives = selected.filter((candidate) => candidate.outcomeR <= 0).length;
  const falseNegatives = candidates.filter((candidate) => !candidatePasses(candidate, config) && candidate.outcomeR > 0).length;
  const expectancyR = selected.length ? selected.reduce((sum, candidate) => sum + candidate.outcomeR, 0) / selected.length : null;
  const baselineR = candidates.length ? candidates.reduce((sum, candidate) => sum + candidate.outcomeR, 0) / candidates.length : null;
  return {
    sample: candidates.length,
    selected: selected.length,
    winners: winners.length,
    winnersCaught,
    falsePositives,
    falseNegatives,
    precision: selected.length ? winnersCaught / selected.length : null,
    recall: winners.length ? winnersCaught / winners.length : null,
    expectancyR,
    baselineR,
    liftR: expectancyR === null || baselineR === null ? null : expectancyR - baselineR,
  };
}

export function specificationScore(draft: EdgeMethodDraft) {
  const completed = edgeDraftFields.filter(({ key }) => draft[key].trim().length >= 12).length;
  return Math.round((completed / edgeDraftFields.length) * 100);
}

export function methodFingerprint(draft: EdgeMethodDraft) {
  const source = edgeDraftFields.map(({ key }) => `${key}:${draft[key].trim()}`).join("|");
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `m-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const clean = (value: unknown, max = 2_000) => typeof value === "string" ? value.slice(0, max) : "";

export function hydrateEdgeFoundryState(value: unknown): EdgeFoundryState {
  if (!isRecord(value)) return { draft: { ...emptyEdgeDraft }, observations: [], validation: {}, filterConfig: { ...defaultFilterConfig } };
  const rawDraft = isRecord(value.draft) ? value.draft : {};
  const draft = Object.fromEntries(edgeDraftFields.map(({ key }) => [key, clean(rawDraft[key])])) as EdgeMethodDraft;
  const observations = Array.isArray(value.observations)
    ? value.observations.slice(-150).flatMap((item): EdgeObservation[] => {
        if (!isRecord(item) || typeof item.id !== "string" || typeof item.label !== "string") return [];
        if (item.decision !== "paper" && item.decision !== "skip") return [];
        if (typeof item.ruleMatched !== "boolean") return [];
        const outcomeR = typeof item.outcomeR === "number" && Number.isFinite(item.outcomeR)
          ? Math.max(-100, Math.min(100, item.outcomeR))
          : null;
        return [{
          id: clean(item.id, 120),
          methodKey: clean(item.methodKey, 32) || methodFingerprint(draft),
          label: clean(item.label, 160),
          observedAt: clean(item.observedAt, 40),
          ruleMatched: item.ruleMatched,
          decision: item.decision,
          outcomeR,
          notes: clean(item.notes, 500),
        }];
      })
    : [];
  const allowedChecks = new Set(validationChecks.map((item) => item.id));
  const validation: Record<string, string> = {};
  if (isRecord(value.validation)) {
    Object.entries(value.validation).forEach(([id, fingerprint]) => {
      if (allowedChecks.has(id as typeof validationChecks[number]["id"]) && typeof fingerprint === "string") validation[id] = clean(fingerprint, 32);
    });
  }
  const rawFilter = isRecord(value.filterConfig) ? value.filterConfig : {};
  const filterConfig: FilterConfig = {
    minimumFees: typeof rawFilter.minimumFees === "number" && Number.isFinite(rawFilter.minimumFees) ? Math.max(0, Math.min(12, rawFilter.minimumFees)) : defaultFilterConfig.minimumFees,
    requireSourceLink: typeof rawFilter.requireSourceLink === "boolean" ? rawFilter.requireSourceLink : defaultFilterConfig.requireSourceLink,
    minimumBuyerGrowth: typeof rawFilter.minimumBuyerGrowth === "number" && Number.isFinite(rawFilter.minimumBuyerGrowth) ? Math.max(0, Math.min(35, rawFilter.minimumBuyerGrowth)) : defaultFilterConfig.minimumBuyerGrowth,
  };
  const rawAttempt = isRecord(value.holdoutAttempt) ? value.holdoutAttempt : null;
  const rawFrozen = rawAttempt && isRecord(rawAttempt.frozenConfig) ? rawAttempt.frozenConfig : null;
  const holdoutAttempt = rawAttempt && rawFrozen && typeof rawAttempt.revealedAt === "string"
    ? {
        frozenConfig: {
          minimumFees: typeof rawFrozen.minimumFees === "number" ? Math.max(0, Math.min(12, rawFrozen.minimumFees)) : filterConfig.minimumFees,
          requireSourceLink: typeof rawFrozen.requireSourceLink === "boolean" ? rawFrozen.requireSourceLink : filterConfig.requireSourceLink,
          minimumBuyerGrowth: typeof rawFrozen.minimumBuyerGrowth === "number" ? Math.max(0, Math.min(35, rawFrozen.minimumBuyerGrowth)) : filterConfig.minimumBuyerGrowth,
        },
        revealedAt: clean(rawAttempt.revealedAt, 40),
      }
    : undefined;
  return {
    draft,
    observations,
    validation,
    filterConfig,
    ...(holdoutAttempt ? { holdoutAttempt } : {}),
    ...(typeof value.completedAt === "string" ? { completedAt: clean(value.completedAt, 40) } : {}),
    ...(typeof value.updatedAt === "string" ? { updatedAt: value.updatedAt } : {}),
  };
}

export function mergeEdgeFoundryState(remote: EdgeFoundryState, local: EdgeFoundryState): EdgeFoundryState {
  const remoteTime = Date.parse(remote.updatedAt ?? "") || 0;
  const localTime = Date.parse(local.updatedAt ?? "") || 0;
  return hydrateEdgeFoundryState(remoteTime > localTime ? remote : local);
}
