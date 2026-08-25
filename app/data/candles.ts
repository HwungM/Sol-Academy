export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type CandleScenario = {
  id: string;
  code: string;
  title: string;
  lesson: string;
  interval: string;
  state: string;
  candles: Candle[];
  level?: { value: number; label: string };
  metrics: { label: string; value: string; tone?: "good" | "bad" | "neutral" }[];
  prompt: string;
  choices: string[];
  answer: number;
  debrief: string;
  trenchPhrase: string;
  evidenceTranslation: string;
  nextCheck: string;
};

export const candleScenarios: CandleScenario[] = [
  {
    id: "anatomy",
    code: "01",
    title: "Read one interval correctly",
    lesson: "A candle compresses every trade inside one time bucket into open, high, low, and close. It does not identify the buyer, seller, or motive.",
    interval: "5s",
    state: "OHLC anatomy",
    candles: [
      { time: "00:00", open: 42, high: 46, low: 40, close: 44, volume: 18 },
      { time: "00:05", open: 44, high: 48, low: 43, close: 47, volume: 25 },
      { time: "00:10", open: 47, high: 49, low: 42, close: 43, volume: 39 },
      { time: "00:15", open: 43, high: 51, low: 42, close: 49, volume: 51 },
      { time: "00:20", open: 49, high: 58, low: 47, close: 53, volume: 72 },
      { time: "00:25", open: 53, high: 55, low: 48, close: 50, volume: 44 },
      { time: "00:30", open: 50, high: 56, low: 49, close: 55, volume: 57 },
      { time: "00:35", open: 55, high: 59, low: 53, close: 57, volume: 41 },
    ],
    metrics: [
      { label: "Interval", value: "5 seconds" },
      { label: "Selected bar", value: "Click a candle" },
      { label: "Body", value: "Open ↔ close" },
      { label: "Wick", value: "High / low excursion" },
    ],
    prompt: "A candle closes green with a long upper wick. What can the candle prove by itself?",
    choices: [
      "The dev sold the top",
      "Price traded above the body and retreated before the interval closed",
      "Every buyer was independent",
      "The next candle must be red",
    ],
    answer: 1,
    debrief: "The shape records path, not identity or intent. Open the transaction feed and wallet evidence before naming who caused it.",
    trenchPhrase: "Big wick—dev jeeted.",
    evidenceTranslation: "Price traded to an interval high and closed lower. The seller and wallet relationship are still unknown.",
    nextCheck: "Inspect the trades inside the interval, then test whether the level is reclaimed or rejected again.",
  },
  {
    id: "thin-impulse",
    code: "02",
    title: "One order can paint a god candle",
    lesson: "A large body measures price expansion, not demand quality. In a thin pool, one order can travel through a wide price range.",
    interval: "1s",
    state: "Thin-liquidity impulse",
    candles: [
      { time: "19:21:01", open: 18, high: 19, low: 17, close: 18.5, volume: 8 },
      { time: "19:21:02", open: 18.5, high: 19.2, low: 18, close: 18.8, volume: 7 },
      { time: "19:21:03", open: 18.8, high: 20, low: 18.4, close: 19.4, volume: 10 },
      { time: "19:21:04", open: 19.4, high: 20.2, low: 19, close: 19.8, volume: 9 },
      { time: "19:21:05", open: 19.8, high: 41, low: 19.7, close: 38, volume: 98 },
      { time: "19:21:06", open: 38, high: 39, low: 31, close: 33, volume: 31 },
      { time: "19:21:07", open: 33, high: 34, low: 29, close: 30, volume: 22 },
      { time: "19:21:08", open: 30, high: 31, low: 28, close: 29, volume: 15 },
      { time: "19:21:09", open: 29, high: 30, low: 27, close: 28.5, volume: 11 },
    ],
    metrics: [
      { label: "Liquidity", value: "$7.5K", tone: "bad" },
      { label: "Impulse source", value: "1 × 7 SOL buy", tone: "bad" },
      { label: "Makers", value: "214 → 216" },
      { label: "Follow-through", value: "Absent", tone: "bad" },
    ],
    prompt: "What is the disciplined first read of the vertical green candle?",
    choices: [
      "Organic demand has been confirmed",
      "One order moved thin liquidity; continuation is unproven",
      "The token is now safe to size up",
      "Market cap increased by the cash shown on the candle",
    ],
    answer: 1,
    debrief: "The transaction feed explains the bar: one buyer created most of the move while maker count barely changed. Speed without breadth is fragile.",
    trenchPhrase: "God candle—this is sending.",
    evidenceTranslation: "One interval expanded sharply. In this case one 7 SOL order caused most of it and independent participation did not accelerate.",
    nextCheck: "Require new makers, repeated independent buys, and price holding above the impulse origin before upgrading the read.",
  },
  {
    id: "failed-breakout",
    code: "03",
    title: "Separate a wick from acceptance",
    lesson: "Trading above a level is not the same as staying above it. A failed breakout returns to the prior range and cannot reclaim on the declared horizon.",
    interval: "5s",
    state: "Breakout failure",
    level: { value: 64, label: "Prior range high" },
    candles: [
      { time: "09:32:00", open: 52, high: 55, low: 50, close: 54, volume: 19 },
      { time: "09:32:05", open: 54, high: 58, low: 53, close: 57, volume: 24 },
      { time: "09:32:10", open: 57, high: 61, low: 55, close: 60, volume: 29 },
      { time: "09:32:15", open: 60, high: 64, low: 58, close: 62, volume: 33 },
      { time: "09:32:20", open: 62, high: 76, low: 61, close: 66, volume: 79 },
      { time: "09:32:25", open: 66, high: 68, low: 59, close: 61, volume: 62 },
      { time: "09:32:30", open: 61, high: 64, low: 57, close: 59, volume: 44 },
      { time: "09:32:35", open: 59, high: 63, low: 56, close: 61, volume: 37 },
      { time: "09:32:40", open: 61, high: 63, low: 54, close: 56, volume: 46 },
    ],
    metrics: [
      { label: "Range high", value: "$64K MC" },
      { label: "Wick high", value: "$76K MC" },
      { label: "Reclaim attempts", value: "2 failed", tone: "bad" },
      { label: "New buyers", value: "Declining", tone: "bad" },
    ],
    prompt: "If the setup required acceptance above the range high, what changed?",
    choices: [
      "Nothing; a wick counts as acceptance",
      "The breakout thesis weakened or invalidated on its stated horizon",
      "The lower price automatically improves the trade",
      "The chart proves coordinated manipulation",
    ],
    answer: 1,
    debrief: "The observable sequence is excursion, return, and failed reclaim. That is enough to act on a predeclared invalidation without inventing a villain.",
    trenchPhrase: "Wicked out, then nuked.",
    evidenceTranslation: "Price traded above the range, closed back inside it, and two reclaim attempts failed while new demand declined.",
    nextCheck: "Compare the result with the original time stop. Do not quietly widen the thesis after entry.",
  },
  {
    id: "absorption",
    code: "04",
    title: "Read response to a whale sell",
    lesson: "Order size matters, but price response matters too. When a large sell is absorbed and price quickly reclaims, buyers may be willing—follow-through is still required.",
    interval: "5s",
    state: "Sell absorption",
    level: { value: 54, label: "Pre-sell level" },
    candles: [
      { time: "12:09:00", open: 46, high: 49, low: 45, close: 48, volume: 16 },
      { time: "12:09:05", open: 48, high: 52, low: 47, close: 51, volume: 21 },
      { time: "12:09:10", open: 51, high: 55, low: 50, close: 54, volume: 27 },
      { time: "12:09:15", open: 54, high: 55, low: 43, close: 49, volume: 94 },
      { time: "12:09:20", open: 49, high: 53, low: 47, close: 52, volume: 65 },
      { time: "12:09:25", open: 52, high: 56, low: 51, close: 55, volume: 52 },
      { time: "12:09:30", open: 55, high: 59, low: 54, close: 58, volume: 46 },
      { time: "12:09:35", open: 58, high: 61, low: 56, close: 60, volume: 41 },
      { time: "12:09:40", open: 60, high: 62, low: 58, close: 59, volume: 33 },
    ],
    metrics: [
      { label: "Large sell", value: "4.0 SOL" },
      { label: "Initial dip", value: "−6%" },
      { label: "Reclaim", value: "40 seconds", tone: "good" },
      { label: "Absorbers", value: "5 unrelated wallets", tone: "good" },
    ],
    prompt: "What can you responsibly say after the reclaim?",
    choices: [
      "Continuation is guaranteed",
      "The sell was absorbed; the continuation hypothesis earned a test",
      "The seller made a mistake",
      "Every green candle is now a buy signal",
    ],
    answer: 1,
    debrief: "The dip, buyer independence, and reclaim support an absorption hypothesis. The next question is whether demand persists after the event.",
    trenchPhrase: "Whale fullclipped and the chart ate it.",
    evidenceTranslation: "A large holder sold; the price impact was brief, five unrelated wallets bought the supply, and price reclaimed the pre-sell level.",
    nextCheck: "Watch whether makers and volume persist after the reclaim or immediately decay.",
  },
  {
    id: "effort-result",
    code: "05",
    title: "Spot effort without result",
    lesson: "More buy volume should normally create progress. When each push travels less while early holders sell into highs, demand may be meeting distribution.",
    interval: "15s",
    state: "Possible exhaustion",
    candles: [
      { time: "14:10:00", open: 32, high: 39, low: 31, close: 38, volume: 25 },
      { time: "14:10:15", open: 38, high: 48, low: 37, close: 46, volume: 38 },
      { time: "14:10:30", open: 46, high: 57, low: 44, close: 54, volume: 52 },
      { time: "14:10:45", open: 54, high: 63, low: 50, close: 59, volume: 68 },
      { time: "14:11:00", open: 59, high: 66, low: 55, close: 61, volume: 82 },
      { time: "14:11:15", open: 61, high: 67, low: 56, close: 60, volume: 94 },
      { time: "14:11:30", open: 60, high: 65, low: 53, close: 57, volume: 88 },
      { time: "14:11:45", open: 57, high: 62, low: 49, close: 52, volume: 79 },
      { time: "14:12:00", open: 52, high: 57, low: 45, close: 47, volume: 70 },
    ],
    metrics: [
      { label: "Buy volume", value: "Rising" },
      { label: "Price progress", value: "Shrinking", tone: "bad" },
      { label: "Early holders", value: "Selling highs", tone: "bad" },
      { label: "Makers", value: "Flat" },
    ],
    prompt: "Which hypothesis deserves testing before another entry?",
    choices: [
      "Guaranteed breakout",
      "Exhaustion or distribution is absorbing increasingly expensive demand",
      "Liquidity must be deeper because volume rose",
      "The earliest contract changed",
    ],
    answer: 1,
    debrief: "Volume is effort; movement is result. Rising effort with diminishing result is a warning, especially when identifiable early holders distribute.",
    trenchPhrase: "Still cooking—look at that volume.",
    evidenceTranslation: "Not necessarily. Volume increased, but upward progress shrank, makers stayed flat, and early holders repeatedly sold into the highs.",
    nextCheck: "Require either clean acceptance above the highs or a reset with renewed independent demand.",
  },
  {
    id: "bond-fullclip",
    code: "06",
    title: "Survive the graduation regime change",
    lesson: "Curve completion can change venue, depth, participants, and transaction behavior. The candle after bonding belongs to a new market state.",
    interval: "1s",
    state: "Bond → migration volatility",
    level: { value: 58, label: "Bond threshold" },
    candles: [
      { time: "15:45:01", open: 42, high: 46, low: 41, close: 45, volume: 24 },
      { time: "15:45:02", open: 45, high: 50, low: 44, close: 49, volume: 31 },
      { time: "15:45:03", open: 49, high: 54, low: 48, close: 53, volume: 42 },
      { time: "15:45:04", open: 53, high: 59, low: 52, close: 58, volume: 61 },
      { time: "15:45:05", open: 58, high: 70, low: 57, close: 67, volume: 105 },
      { time: "15:45:06", open: 67, high: 69, low: 39, close: 44, volume: 134 },
      { time: "15:45:07", open: 44, high: 51, low: 37, close: 48, volume: 91 },
      { time: "15:45:08", open: 48, high: 54, low: 43, close: 46, volume: 62 },
      { time: "15:45:09", open: 46, high: 49, low: 41, close: 43, volume: 48 },
    ],
    metrics: [
      { label: "Curve", value: "Complete" },
      { label: "Migration", value: "Confirmed" },
      { label: "Early cluster sell", value: "8.2 SOL", tone: "bad" },
      { label: "Worst modeled exit", value: "−43%", tone: "bad" },
    ],
    prompt: "What is the key operator lesson at the bond event?",
    choices: [
      "Graduation removes liquidity risk",
      "Re-check venue state, holders, capacity, and exit assumptions before treating it as the same setup",
      "The first post-bond candle predicts the day",
      "Every early seller is the dev",
    ],
    answer: 1,
    debrief: "The regime changed. A launch-time thesis, size, route, and invalidation cannot be carried into the migrated pool without recalculation.",
    trenchPhrase: "Bots fullclipped at bond and nuked it.",
    evidenceTranslation: "After confirmed migration, an early-wallet cluster sold 8.2 SOL into limited depth and the modeled exit deteriorated sharply.",
    nextCheck: "Separate creator-linked wallets from unrelated early traders, then rebuild the position-capacity model for the new pool.",
  },
];
