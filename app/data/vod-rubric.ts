export type VodRubricScore = 0 | 1 | 2;

export type VodAnnotationField =
  | "url"
  | "timestamp"
  | "platform"
  | "tokenState"
  | "action"
  | "observation"
  | "evidenceGrade"
  | "thesis"
  | "trigger"
  | "sizeRisk"
  | "invalidation"
  | "exitPlan"
  | "skippedAlternative";

export type VodRubricDimensionId =
  | "traceability"
  | "state"
  | "action"
  | "evidence"
  | "thesis"
  | "trigger"
  | "risk"
  | "counterfactual";

export type EvidenceGrade =
  | "On-chain verified"
  | "Visible on screen"
  | "Spoken claim"
  | "Analyst inference";

export type VodAnnotation = {
  url: string;
  timestamp: string;
  platform: string;
  tokenState: string;
  action: string;
  observation: string;
  evidenceGrade: EvidenceGrade | string;
  thesis: string;
  trigger: string;
  sizeRisk: string;
  invalidation: string;
  exitPlan: string;
  skippedAlternative: string;
};

export type VodRubricDimension = {
  id: VodRubricDimensionId;
  label: string;
  prompt: string;
  fields: VodAnnotationField[];
  anchors: Record<VodRubricScore, string>;
};

export type VodDimensionResult = {
  id: VodRubricDimensionId;
  label: string;
  score: VodRubricScore;
  maxScore: 2;
  fields: VodAnnotationField[];
};

export type VodCompletenessBand = "Skeleton" | "Developing" | "Review ready" | "Complete";

export type VodCompletenessResult = {
  score: number;
  maxScore: 16;
  percent: number;
  band: VodCompletenessBand;
  dimensions: VodDimensionResult[];
  missingFields: VodAnnotationField[];
  warnings: string[];
  disclaimer: string;
};

export const evidenceGrades: EvidenceGrade[] = [
  "On-chain verified",
  "Visible on screen",
  "Spoken claim",
  "Analyst inference",
];

export const vodRubricDisclaimer =
  "This score measures annotation completeness only. It does not verify that the interpretation is true, predict profitability, or rate the trader's skill.";

export const vodAnnotationRubric: VodRubricDimension[] = [
  {
    id: "traceability",
    label: "Source traceability",
    prompt: "Can another student reopen the exact decision moment?",
    fields: ["url", "timestamp", "platform"],
    anchors: {
      0: "No usable locator: URL, timecode, and platform are absent or invalid.",
      1: "Partial locator: at least one usable source field, but the moment is not fully reproducible.",
      2: "Reproducible locator: valid URL, usable timecode, and named platform or screen.",
    },
  },
  {
    id: "state",
    label: "Token-state reconstruction",
    prompt: "What lifecycle and market state was knowable at that instant?",
    fields: ["tokenState"],
    anchors: {
      0: "No contemporaneous token state.",
      1: "A basic state label is present, but key context is thin.",
      2: "A specific state snapshot covers enough lifecycle, liquidity, flow, or ownership context to reconstruct the screen.",
    },
  },
  {
    id: "action",
    label: "Action precision",
    prompt: "What did the trader actually do?",
    fields: ["action"],
    anchors: {
      0: "No action recorded.",
      1: "Only a generic verb such as buy, sell, or skip.",
      2: "The action includes useful direction, size, tranche, timing, or order context.",
    },
  },
  {
    id: "evidence",
    label: "Observation and evidence grade",
    prompt: "Is visible evidence separated from interpretation?",
    fields: ["observation", "evidenceGrade"],
    anchors: {
      0: "No meaningful observation and no recognized evidence grade.",
      1: "Some observation or grading is present, but the evidence trail is incomplete.",
      2: "A concrete observation is paired with an explicit on-chain, screen, spoken, or inference grade.",
    },
  },
  {
    id: "thesis",
    label: "Causal thesis",
    prompt: "Why might the evidence justify the action?",
    fields: ["thesis"],
    anchors: {
      0: "No thesis.",
      1: "A short claim is present, but the causal link is underdeveloped.",
      2: "A testable hypothesis links the observed state to the action without treating the outcome as proof.",
    },
  },
  {
    id: "trigger",
    label: "Decision trigger",
    prompt: "What changed immediately before action?",
    fields: ["trigger"],
    anchors: {
      0: "No trigger.",
      1: "A generic trigger is named without enough specificity to replay it.",
      2: "A specific, time-local change identifies why the decision happened then rather than earlier or later.",
    },
  },
  {
    id: "risk",
    label: "Sizing and falsification",
    prompt: "How was exposure bounded, and what would make the read wrong?",
    fields: ["sizeRisk", "invalidation"],
    anchors: {
      0: "Neither sizing or loss context nor invalidation is recorded.",
      1: "One side of the risk model is usable; the other is missing or vague.",
      2: "Both position-risk context and a future falsifier are stated without inventing facts the VOD did not reveal.",
    },
  },
  {
    id: "counterfactual",
    label: "Exit plan and alternative",
    prompt: "What was the management plan, and what nearby choice was rejected?",
    fields: ["exitPlan", "skippedAlternative"],
    anchors: {
      0: "Neither an exit plan nor a skipped alternative is recorded.",
      1: "One is usable, or both are only placeholders.",
      2: "A specific management plan and a reasoned skipped alternative make the decision boundary comparable.",
    },
  },
];

export type VodCriticalErrorRule = {
  id: string;
  title: string;
  rule: string;
  handling: string;
  affectedDimensions: VodRubricDimensionId[];
};

export const vodCriticalErrorRules: VodCriticalErrorRule[] = [
  {
    id: "hindsight-leak",
    title: "Future information entered the decision",
    rule: "A later candle, final PnL, later holder data, or later commentary is used as if it were knowable at the annotated timestamp.",
    handling: "Rewrite from the timestamp's information set; until then, score thesis and trigger at zero.",
    affectedDimensions: ["thesis", "trigger"],
  },
  {
    id: "invented-evidence",
    title: "Unseen facts were presented as observations",
    rule: "Motive, wallet ownership, exact size, bundle control, or an off-screen metric is asserted without a visible, spoken, or on-chain basis.",
    handling: "Move the claim to inference or remove it; until then, score evidence at zero.",
    affectedDimensions: ["evidence"],
  },
  {
    id: "identity-ambiguity",
    title: "The subject cannot be identified",
    rule: "The note could refer to a different token, contract, screen, or point in the lifecycle.",
    handling: "Add the missing source and state identifiers; until then, score traceability and state at zero.",
    affectedDimensions: ["traceability", "state"],
  },
  {
    id: "outcome-substitution",
    title: "Profitability replaced reasoning quality",
    rule: "The annotation calls the decision good because price later rose, or bad because price later fell.",
    handling: "Remove the outcome verdict and grade only contemporaneous evidence, reasoning, and process.",
    affectedDimensions: ["evidence", "thesis"],
  },
  {
    id: "fabricated-risk-plan",
    title: "Missing risk controls were filled in",
    rule: "The note attributes a size, stop, invalidation, or exit rule that the screen, audio, or a cited transaction did not establish.",
    handling: "Write 'not disclosed' instead of guessing; score the unsupported risk or plan dimension at zero.",
    affectedDimensions: ["risk", "counterfactual"],
  },
];

const allFields: VodAnnotationField[] = [
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
];

const normalized = (value: unknown) => (typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "");

const wordCount = (value: unknown) => {
  const text = normalized(value);
  return text ? text.split(" ").length : 0;
};

const hasWords = (value: unknown, minimum: number) => wordCount(value) >= minimum;

const isValidVodUrl = (value: unknown) => {
  const text = normalized(value);
  if (!text) return false;
  try {
    const parsed = new URL(text);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

const isValidTimestamp = (value: unknown) => {
  const text = normalized(value);
  if (!/^\d{1,3}:\d{2}(?::\d{2})?$/.test(text)) return false;
  const parts = text.split(":").map(Number);
  return parts.length === 2
    ? parts[1] < 60
    : parts[1] < 60 && parts[2] < 60;
};

const hasRecognizedEvidenceGrade = (value: unknown) => {
  const target = normalized(value).toLowerCase();
  return evidenceGrades.some((grade) => grade.toLowerCase() === target);
};

const dimensionScorers: Record<VodRubricDimensionId, (entry: Partial<VodAnnotation>) => VodRubricScore> = {
  traceability: (entry) => {
    const signals = [isValidVodUrl(entry.url), isValidTimestamp(entry.timestamp), Boolean(normalized(entry.platform))];
    const count = signals.filter(Boolean).length;
    return count === 3 ? 2 : count > 0 ? 1 : 0;
  },
  state: (entry) => (hasWords(entry.tokenState, 12) ? 2 : hasWords(entry.tokenState, 4) ? 1 : 0),
  action: (entry) => (hasWords(entry.action, 4) ? 2 : hasWords(entry.action, 1) ? 1 : 0),
  evidence: (entry) => {
    const observation = wordCount(entry.observation);
    const graded = hasRecognizedEvidenceGrade(entry.evidenceGrade);
    return observation >= 12 && graded ? 2 : observation >= 4 || graded ? 1 : 0;
  },
  thesis: (entry) => (hasWords(entry.thesis, 12) ? 2 : hasWords(entry.thesis, 4) ? 1 : 0),
  trigger: (entry) => (hasWords(entry.trigger, 8) ? 2 : hasWords(entry.trigger, 3) ? 1 : 0),
  risk: (entry) => {
    const completeSize = hasWords(entry.sizeRisk, 5);
    const completeInvalidation = hasWords(entry.invalidation, 6);
    if (completeSize && completeInvalidation) return 2;
    return hasWords(entry.sizeRisk, 2) || hasWords(entry.invalidation, 3) ? 1 : 0;
  },
  counterfactual: (entry) => {
    const completeExit = hasWords(entry.exitPlan, 6);
    const completeAlternative = hasWords(entry.skippedAlternative, 6);
    if (completeExit && completeAlternative) return 2;
    return hasWords(entry.exitPlan, 3) || hasWords(entry.skippedAlternative, 3) ? 1 : 0;
  },
};

const completenessBand = (percent: number): VodCompletenessBand => {
  if (percent >= 88) return "Complete";
  if (percent >= 69) return "Review ready";
  if (percent >= 38) return "Developing";
  return "Skeleton";
};

export function scoreVodAnnotationCompleteness(entry: Partial<VodAnnotation>): VodCompletenessResult {
  const dimensions = vodAnnotationRubric.map<VodDimensionResult>((dimension) => ({
    id: dimension.id,
    label: dimension.label,
    score: dimensionScorers[dimension.id](entry),
    maxScore: 2,
    fields: dimension.fields,
  }));
  const score = dimensions.reduce((total, dimension) => total + dimension.score, 0);
  const percent = Math.round((score / 16) * 100);
  const missingFields = allFields.filter((field) => !normalized(entry[field]));
  const warnings: string[] = [];

  if (normalized(entry.url) && !isValidVodUrl(entry.url)) warnings.push("Use a complete http(s) VOD URL.");
  if (normalized(entry.timestamp) && !isValidTimestamp(entry.timestamp)) warnings.push("Use MM:SS or HH:MM:SS for the timecode.");
  if (normalized(entry.evidenceGrade) && !hasRecognizedEvidenceGrade(entry.evidenceGrade)) warnings.push("Choose one of the four defined evidence grades.");

  return {
    score,
    maxScore: 16,
    percent,
    band: completenessBand(percent),
    dimensions,
    missingFields,
    warnings,
    disclaimer: vodRubricDisclaimer,
  };
}

export type WorkedVodAnnotation = {
  id: "strong" | "flawed";
  label: string;
  annotation: VodAnnotation;
  coachingNotes: string[];
  result: VodCompletenessResult;
};

const strongAnnotation: VodAnnotation = {
  url: "https://example.com/fictional-vods/axiom-session-07",
  timestamp: "01:12:38",
  platform: "Axiom Pulse and token page",
  tokenState: "Seven minutes old and recently migrated near $68K market cap, with rising buy makers, stable liquidity, low displayed bundled supply, and the dev wallet unchanged.",
  action: "Buys an initial 0.6 SOL tranche after the retest.",
  observation: "The chart holds above the migration level while three medium sells are absorbed, unique buyers continue rising, and the trader reopens holder distribution before clicking buy.",
  evidenceGrade: "Visible on screen",
  thesis: "Sustained new-buyer growth plus sell absorption may support another expansion because supply is not immediately returning from the displayed early-wallet group.",
  trigger: "The first higher low closes as buy makers accelerate after the absorbed sells.",
  sizeRisk: "He starts with 0.6 SOL rather than the 2 SOL maximum mentioned aloud.",
  invalidation: "The read fails if price loses the migration shelf while buyer growth stalls and early holders distribute.",
  exitPlan: "He states that he will trim into the prior wick and exit the remainder below the shelf.",
  skippedAlternative: "He skips the older ticker clone because its buyers are declining and its top-holder concentration is visibly higher.",
};

const flawedAnnotation: VodAnnotation = {
  url: "",
  timestamp: "around the pump",
  platform: "Axiom",
  tokenState: "The coin was sending.",
  action: "Aped.",
  observation: "It looked strong and later went up.",
  evidenceGrade: "Unknown",
  thesis: "Whales knew something.",
  trigger: "Green candles appeared.",
  sizeRisk: "Pretty big.",
  invalidation: "",
  exitPlan: "Sell the top.",
  skippedAlternative: "",
};

export const workedVodAnnotations: WorkedVodAnnotation[] = [
  {
    id: "strong",
    label: "Strong: reconstructable, falsifiable, and evidence-graded",
    annotation: strongAnnotation,
    coachingNotes: [
      "Observation and inference are separate.",
      "The trigger explains why the entry happened at this moment.",
      "Sizing, invalidation, exit, and the skipped clone define a real decision boundary.",
      "A full completeness score still does not prove the thesis was correct or the trade was profitable.",
    ],
    result: scoreVodAnnotationCompleteness(strongAnnotation),
  },
  {
    id: "flawed",
    label: "Flawed: hindsight-led and impossible to replay",
    annotation: flawedAnnotation,
    coachingNotes: [
      "The timestamp cannot reopen the moment and the VOD URL is missing.",
      "The observation leaks the later outcome into evidence available at entry.",
      "The thesis asserts hidden knowledge without support.",
      "Risk, invalidation, exit, and the skipped alternative are absent or placeholders.",
    ],
    result: scoreVodAnnotationCompleteness(flawedAnnotation),
  },
];
