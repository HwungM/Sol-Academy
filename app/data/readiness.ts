export const readinessDomains = ["Screen", "Math", "Wallets", "Narrative", "Tape", "Risk", "Execution", "VOD"] as const;
export type ReadinessDomain = (typeof readinessDomains)[number];

export type TerminalSnapshot = {
  chartId?: string;
  state?: string;
  age?: string;
  marketCap?: string;
  liquidity?: string;
  volume?: string;
  makers?: string;
  buySell?: string;
  dev?: string;
  top10?: string;
  snipers?: string;
  bundle?: string;
  proTraders?: string;
};

export type ReadinessScenario = {
  id: string;
  domain: ReadinessDomain;
  title: string;
  context: string;
  snapshot?: TerminalSnapshot;
  prompt: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
  criticalError?: boolean;
};

export type PlatformTranslation = {
  concept: string;
  axiom: string;
  bullx: string;
  operatorQuestion: string;
};

export const platformTranslations: PlatformTranslation[] = [
  { concept: "Launch discovery", axiom: "Pulse: New Creations / Final Stretch / Migrated", bullx: "Pump Vision / launchpad feeds", operatorQuestion: "Which lifecycle state is this feed showing, and what evidence matters in that state?" },
  { concept: "Original-contract race", axiom: "Similar Tokens + OG Mode", bullx: "Search, creation history, linked socials", operatorQuestion: "Is this merely oldest, authentically linked, or where independent attention has coordinated?" },
  { concept: "Early allocation", axiom: "Sniper %, Bundle %, Bundle Checker", bullx: "Sniper Panel, insider and bot labels", operatorQuestion: "Who still owns the low-cost supply, how were they funded, and what can the detector actually prove?" },
  { concept: "Holder control", axiom: "Top holders, dev %, holder drill-down", bullx: "Holders + Bubble Maps", operatorQuestion: "What is cluster-adjusted concentration after pools, transfers, and common funders?" },
  { concept: "Wallet behavior", axiom: "Trader Scan + Wallet Tracker", bullx: "Top Traders + Wallet Tracking", operatorQuestion: "Did the wallet buy, receive, transfer, add, distribute, or fully exit—and is its horizon copyable?" },
  { concept: "Narrative feed", axiom: "Tweet Monitor + Pulse preview", bullx: "Social links and external monitors", operatorQuestion: "What is the catalyst timestamp, which candidate CAs exist, and is attention still expanding?" },
  { concept: "Order flow", axiom: "TradingView chart, markers, transaction feed", bullx: "Chart + Trades + display overlays", operatorQuestion: "How did price respond relative to depth, and was the flow independent or concentrated?" },
  { concept: "Execution", axiom: "Instant Trade, hotkeys, limit and migration actions", bullx: "Presets, limit/DCA orders, Auto Sell", operatorQuestion: "What economic bound, fee route, size, confirmation state, and exit rule does the click represent?" },
];

export const setupBridge = [
  { name: "Fresh public launch", universe: "Newly created public tokens", evidence: "Exact CA, creator/funder graph, independent early demand, narrative", trigger: "State-specific demand appears without unacceptable control", invalidation: "Linked supply distributes or independent demand fails to arrive" },
  { name: "Final stretch / migration", universe: "Curves approaching completion", evidence: "Completion speed, ownership, real buyers, destination route", trigger: "Survival demand persists into confirmed migration", invalidation: "Progress is manufactured, migration stalls, or first distribution overwhelms depth" },
  { name: "Post-migration momentum", universe: "Recently migrated liquid pools", evidence: "Maker growth, accepted higher prices, sell absorption, early-holder behavior", trigger: "Continuation survives a defined pullback or large sell", invalidation: "Reclaim fails, makers decay, or low-cost supply controls the tape" },
  { name: "Wallet-confirmed thesis", universe: "A defined setup receiving a tracked-wallet signal", evidence: "Wallet archetype, entry regime, funding, actual buy, alert delay", trigger: "The wallet adds information to an existing thesis", invalidation: "Transfer masquerades as buy, horizon is stale, or wallet begins distributing" },
];

export const executionChecklist = [
  "Confirm the exact CA, route, lifecycle state, and wallet before touching a preset.",
  "Define intended size, plausible loss, exit capacity, and maximum economic slippage.",
  "Treat priority fee, Jito/bribe routing, slippage, and compute as different controls.",
  "Know whether the action is market, limit, migration, DCA, partial exit, or automated sell.",
  "A returned signature is pending state—not proof of a position.",
  "Reconcile confirmation, balances, partial fills, expiry, and duplicate-submit risk.",
  "Log the actual fill and costs; disable execution when data, state, or judgment is stale.",
];

const scenario = (
  id: string,
  domain: ReadinessDomain,
  title: string,
  context: string,
  prompt: string,
  options: [string, string, string, string],
  answer: number,
  explanation: string,
  snapshot?: TerminalSnapshot,
  criticalError = false,
): ReadinessScenario => ({ id, domain, title, context, prompt, options, answer, explanation, snapshot, criticalError });

export const practiceScenarios: ReadinessScenario[] = [
  scenario("p-screen-1", "Screen", "The attractive row", "Pulse shows a newly migrated token with unusually high activity.", "What should the row cause you to do?", ["Buy because every visible metric is green", "Open the exact token and verify identity, ownership, flow quality, and route", "Raise slippage before checking the token", "Treat maker count as unique humans"], 1, "A scanner creates an investigation queue. It does not complete the decision.", { state: "Migrated 2m ago", age: "11m", marketCap: "$74K", liquidity: "$18K", volume: "$310K", makers: "1,420", buySell: "1.61", dev: "0.7%", top10: "17%", snipers: "8%", bundle: "4%" }),
  scenario("p-screen-2", "Screen", "Same ticker, different market", "Search returns three tokens using the same name and symbol.", "Which field establishes which market you are viewing?", ["The logo", "The market-cap rank", "The exact mint/CA plus live route", "The oldest social account"], 2, "Names and tickers are reusable. Identity begins with the exact mint and route.", { state: "Final Stretch", age: "18m", marketCap: "$51K", liquidity: "Curve", volume: "$96K", makers: "530" }, true),
  scenario("p-math-1", "Math", "Displayed double", "A chart moves from $40K to $80K market cap after your buy.", "Why can wallet return remain below 2×?", ["Market cap is unrelated to price", "Impact, slippage, fees, partials, and a different average exit", "Token supply must have doubled", "A limit order removes all execution costs"], 1, "Displayed market cap is a marginal quote; the wallet experiences actual fills and costs.", { state: "Post-migration", marketCap: "$80K", liquidity: "$14K", volume: "$210K" }),
  scenario("p-math-2", "Math", "Capacity mismatch", "A 1 SOL paper entry had 4% modeled impact. A friend proposes the same setup with 10 SOL.", "What must be recalculated first?", ["Only the win rate", "Entry and exit impact against current reserves", "The ticker length", "The number of chart candles"], 1, "Size changes pool state and may erase the setup's expectancy.", { marketCap: "$36K", liquidity: "$9K" }),
  scenario("p-wallet-1", "Wallets", "Eight neat holders", "Eight top-20 wallets were funded directly by one address shortly before launch and repeatedly co-fire.", "What is the defensible conclusion?", ["Eight independent community members", "The same named person owns all eight", "A likely related cluster with high confidence, subject to shared-infrastructure alternatives", "The tokens are burned"], 2, "Repeated direct funding and coordinated behavior support a cluster, not real-world identity.", { dev: "0.8%", top10: "16%", snipers: "5%", bundle: "2%" }),
  scenario("p-wallet-2", "Wallets", "Profitable alert", "A tracked wallet buys fresh launches, holds for 18 seconds on average, and your alert arrives 12 seconds later.", "How should the signal initially be used?", ["Immediate copy buy", "Context for a separately defined setup", "Proof the wallet is an insider", "Reason to use maximum size"], 1, "The horizon is likely mostly consumed before you can react; classify and measure incremental value.", { state: "New Creation", age: "34s", proTraders: "3" }),
  scenario("p-narrative-1", "Narrative", "Oldest versus chosen", "The oldest contract has 12 holders and no activity. A later contract is linked by the original post and has 1,100 independent makers.", "Which statement is strongest?", ["Oldest must win", "Later must win", "Chronology favors the oldest; current coordination favors the later contract", "Both are automatically safe"], 2, "OG chronology and market coordination are separate attributes.", { age: "3m", marketCap: "$92K", makers: "1,100", top10: "19%" }),
  scenario("p-narrative-2", "Narrative", "Catalyst half-life", "A viral news event is already six hours old and candidate-token maker growth has declined for three consecutive windows.", "What is the primary question now?", ["Whether the logo can be improved", "Whether additional independent attention still exists on your trade horizon", "Whether the oldest CA has fewer decimals", "Whether slippage can restart the narrative"], 1, "Narrative expectancy depends on future attention, not the event's past popularity.", { state: "Migrated", age: "5h", volume: "$1.8M", makers: "2,400 → 2,060" }),
  scenario("p-tape-1", "Tape", "Sell absorbed", "A 4 SOL sell causes a brief 6% dip; price reclaims within 40 seconds while makers rise and five unrelated wallets absorb supply.", "What is the disciplined read?", ["Guaranteed continuation", "Possible absorption with follow-through still required", "Certain wash trading", "The sell did not happen"], 1, "Response to flow supports an absorption hypothesis, not certainty.", { chartId: "absorption", liquidity: "$24K", volume: "$440K", makers: "690 → 770", buySell: "1.28" }),
  scenario("p-tape-2", "Tape", "Effort without result", "Buy volume increases, but each push makes less upward progress and early holders sell into every high.", "Which hypothesis deserves testing?", ["Exhaustion or distribution", "Guaranteed breakout", "Deeper liquidity by definition", "A new OG contract"], 0, "More effort with less result can signal supply absorbing demand.", { chartId: "effort-result", marketCap: "$180K", liquidity: "$37K", volume: "$620K", makers: "Flat", buySell: "1.52" }),
  scenario("p-risk-1", "Risk", "Stop is not insurance", "A thin token gaps through the intended stop while a sell transaction fails once.", "Which sizing input was missing?", ["Only the displayed stop distance", "Gap, exit-liquidity, failure, and fee scenarios", "The holder count color", "The final wick high"], 1, "Plausible loss includes the actual failure path, not an ideal stop fill.", { marketCap: "$31K", liquidity: "$6K" }, true),
  scenario("p-risk-2", "Risk", "High win rate", "A setup wins 9 times for +0.15R and loses once for -3R before costs.", "What is the approximate expectancy?", ["+1.35R", "-1.65R before costs", "+0.15R", "Cannot be negative above 80% win rate"], 1, "Nine wins total +1.35R; one loss produces -3R, leaving -1.65R.", undefined, true),
  scenario("p-execution-1", "Execution", "Signature limbo", "The terminal displays a signature, status is unknown, balance is unchanged, and the blockhash is nearing expiry.", "What is your position state?", ["Confirmed long", "Failed with certainty", "Pending and requiring reconciliation", "Safe to submit the same buy again"], 2, "An RPC send response is not confirmation; resubmission can double exposure.", undefined, true),
  scenario("p-execution-2", "Execution", "Three knobs", "A trade fails its minimum-output check during contention.", "Which setting directly relaxes that economic bound?", ["Priority fee", "Jito tip", "Slippage/minimum output", "Compute-unit price"], 2, "Slippage changes acceptable output; fees and tips address inclusion competition.", { state: "Migrating", age: "9m" }),
  scenario("p-vod-1", "VOD", "Observation or story", "A trader buys after maker acceleration. No wallet relationship is shown or mentioned.", "Which note is defensible?", ["The trader knew the dev", "The trader bought after visible maker acceleration", "The token was guaranteed to continue", "The buy proves organic demand"], 1, "Record the visible timing; hidden relationships would be unsupported inference.", { makers: "420 → 610", buySell: "1.44" }),
  scenario("p-vod-2", "VOD", "Exit below the wick", "Entry overlay is near $6K, exit is near $9.2K, and the later wick reaches $13K.", "What can the screenshot establish?", ["The exit was bad", "Approximate overlay levels, not exact fills or decision quality", "The trader sold the exact top", "The setup had no risk"], 1, "A screenshot is incomplete accounting and the later top is not an entry-time decision criterion.", { chartId: "anatomy", marketCap: "$9.2K", liquidity: "$3.4K" }),
];

export const examScenarios: ReadinessScenario[] = [
  scenario("e-screen-1", "Screen", "Window mismatch", "The row shows $280K volume and 900 makers, but the interface windows are not visible.", "What blocks direct comparison with another row?", ["Market caps differ", "The definitions and time windows may differ", "One ticker is longer", "Maker count is always lifetime"], 1, "A number without its window and denominator is not comparable.", { state: "Migrated", age: "14m", marketCap: "$110K", liquidity: "$26K", volume: "$280K", makers: "900" }),
  scenario("e-screen-2", "Screen", "Green dashboard", "Every headline metric looks favorable, but the exact route and CA are obscured in the clip.", "What is the correct exam decision?", ["Paper buy", "Increase size because evidence agrees", "Insufficient identity—no decision until CA and route are verified", "Use the ticker to infer the pool"], 2, "Identity is a hard prerequisite; attractive downstream metrics cannot repair it.", { state: "Unknown", marketCap: "$63K", liquidity: "$15K", makers: "1,030", buySell: "1.58" }, true),
  scenario("e-math-1", "Math", "Net R", "Five trades produce +3R, -1R, -1R, +0.5R, and -0.5R. Total costs are 0.4R.", "What is net performance?", ["+1.0R", "+0.6R", "+1.4R", "-0.4R"], 1, "Gross is +1R; subtracting 0.4R leaves +0.6R."),
  scenario("e-math-2", "Math", "Same market cap", "Token A and B both show $100K market cap. A has $8K relevant depth; B has $42K.", "For the same order size, what is most likely?", ["Identical impact", "A has lower impact", "B has lower impact, all else equal", "Market cap determines the fill exactly"], 2, "Relevant depth, not equal displayed market cap, primarily drives impact.", { marketCap: "$100K", liquidity: "A $8K / B $42K" }),
  scenario("e-wallet-1", "Wallets", "Received, not bought", "A top holder received tokens from another wallet and has no swap transaction.", "How should the holder be labeled?", ["Profitable buyer", "Recipient with unknown cost/relationship until traced", "Confirmed dev", "Sniper by definition"], 1, "Transfers and buys have different economic meaning.", { top10: "21%", dev: "1.1%" }),
  scenario("e-wallet-2", "Wallets", "Shared exchange funder", "Five wallets withdrew from the same exchange hot wallet on different days and otherwise never co-fire.", "What confidence supports common control?", ["High", "Moderate", "Low; shared infrastructure is a strong alternative", "Certain"], 2, "A common exchange source is weak attribution evidence without repeated independent edges.", undefined, true),
  scenario("e-narrative-1", "Narrative", "Promoter timing", "A promoter posts only after price and maker count already surge.", "What does this timing weaken?", ["The CA identity", "The claim that the promoter caused the initial discovery", "The existence of liquidity", "The token supply"], 1, "The post may amplify later attention but cannot explain activity that preceded it."),
  scenario("e-narrative-2", "Narrative", "Four candidate CAs", "The oldest is dormant; the officially linked token is active; a third has higher MC but a 48% linked cluster.", "Which shortcut is invalid?", ["Compare provenance and active demand", "Treat highest market cap as automatically canonical and safe", "Inspect cluster control", "Timestamp the original link"], 1, "Market cap alone does not resolve authenticity, coordination, or control.", { marketCap: "A $4K / B $80K / C $140K", makers: "B 980 / C 430", top10: "C 52%" }),
  scenario("e-tape-1", "Tape", "Thin vertical candle", "One 7 SOL buy creates most of a vertical candle in a shallow pool while maker count stays flat.", "What is the best interpretation?", ["Independent demand accelerated", "One order moved thin liquidity; continuation is unproven", "The dev sold", "The pool became deeper"], 1, "Source and independence of flow matter more than candle shape.", { chartId: "thin-impulse", liquidity: "$7.5K", volume: "$88K", makers: "214 → 216", buySell: "2.1" }),
  scenario("e-tape-2", "Tape", "Failed reclaim", "After a breakout wick, price re-enters the range, the next two attempts fail, and new buyers decline.", "Which predeclared response is most defensible?", ["The breakout thesis is weakening or invalid", "Add because price is lower", "Ignore the time horizon", "Call every seller a jeet"], 0, "Failure to regain acceptance plus declining new demand is behavioral invalidation.", { chartId: "failed-breakout", makers: "740 → 610", buySell: "0.91" }),
  scenario("e-risk-1", "Risk", "No valid size", "Your maximum loss is 0.1 SOL, but even the smallest practical order can plausibly lose 0.18 SOL after gap and exit impact.", "What is the valid size?", ["The smallest preset", "Half the smallest preset", "No trade", "Increase the daily loss limit"], 2, "If executable minimum risk exceeds the budget, the setup has no valid size.", { liquidity: "$4.2K" }, true),
  scenario("e-risk-2", "Risk", "Outlier dependence", "A strategy earns 18 SOL; one trade contributes 17 SOL across 120 attempts.", "What must the report emphasize?", ["Only total PnL", "Outlier dependence and results without the single trade", "The best ticker", "That future returns will match"], 1, "Scalability and repeatability cannot be judged from an outlier-dominated total."),
  scenario("e-execution-1", "Execution", "Duplicate submit", "The first transaction remains unknown and the terminal's quick-buy button is active.", "What must happen before clicking again?", ["Raise slippage", "Reconcile signature status, expiry, and balances", "Change the token name", "Assume the first failed"], 1, "Unknown state must be resolved or explicitly expired before avoiding double exposure.", undefined, true),
  scenario("e-execution-2", "Execution", "Fee escalation", "Landing probability improves with a larger tip, but expected setup profit is only 0.006 SOL.", "What is the correct optimization target?", ["Land at any cost", "Net expectancy after total fees and failure probability", "Highest possible priority setting", "Zero confirmation checks"], 1, "Faster inclusion is not useful when its cost consumes the edge."),
  scenario("e-vod-1", "VOD", "Spoken versus visible", "The trader says ‘dev is out,’ but no transfer, sale, or holder panel is visible.", "How should the note be graded?", ["On-chain verified", "Visible on screen", "Spoken claim requiring verification", "Certain identity attribution"], 2, "The statement is evidence of what was said, not proof of the on-chain fact.", { dev: "Panel hidden" }, true),
  scenario("e-vod-2", "VOD", "What was skipped", "A clip shows three tokens scanned, one bought, and the other two dismissed without explanation.", "What is the highest-value follow-up?", ["Record only the winning token", "Reconstruct visible differences and mark any reason as inference unless spoken", "Assume the other two were scams", "Use final charts to justify the choice"], 1, "Adjacent skips reveal selection, but unspoken motives must remain inference.", { state: "Three Final Stretch rows" }),
];
