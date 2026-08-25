export type TrenchLanguageEntry = {
  phrase: string;
  heardAs: string;
  operatorTranslation: string;
  doesNotProve: string;
  source: { label: string; url: string };
};

export const moduleTrenchLanguage: Record<string, TrenchLanguageEntry[]> = {
  "game-map": [
    {
      phrase: "Trenches / trenching / clicking",
      heardAs: "Operating in the real-time, very-young low-cap token market; clicking usually means rapid manual entries and exits.",
      operatorTranslation: "Name the launch universe, age band, venue, actions per hour, holding time, and realized result after costs.",
      doesNotProve: "High activity, bravery, or edge.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/traderpow/status/2087569995312349213" },
    },
    {
      phrase: "PvP / musical chairs",
      heardAs: "Traders are rotating against one another for limited liquidity and later buyers.",
      operatorTranslation: "Measure holding periods, rotation frequency, liquidity fragmentation, slippage, and who supplies the profitable exit.",
      doesNotProve: "That every participant has the same information or that a community will cooperate.",
      source: { label: "Reddit field usage · Oct. 2024", url: "https://www.reddit.com/r/solana/comments/1gepbst/solana_memecoins_todo_list/" },
    },
    {
      phrase: "Printing / we ate / motion",
      heardAs: "Making money or having visible financial momentum.",
      operatorTranslation: "Ask for realized PnL, deposits, transfers, fees, open inventory, losing wallets, and the measurement window.",
      doesNotProve: "That a screenshot shows a repeatable public-trading edge.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/pr6spr/status/2087392470933860803" },
    },
  ],
  "money-math": [
    {
      phrase: "MC / mcap / floor / ATH",
      heardAs: "Displayed market cap, a repeatedly defended zone, and the prior all-time high.",
      operatorTranslation: "State the exact market-cap estimate, timeframe, pool liquidity, actual fill, and repeated level tests.",
      doesNotProve: "Market cap is cash in the pool, or that a claimed floor cannot break.",
      source: { label: "Reddit field usage · Jan. 2025", url: "https://www.reddit.com/r/SolanaMemeCoins/comments/1hvqtw6/shill_me_that_sender/" },
    },
    {
      phrase: "Bag / dead bag / bagholder",
      heardAs: "A held token position; dead bag implies little activity, poor liquidity, or a deep loss.",
      operatorTranslation: "Record remaining quantity, cost basis, liquidity, last meaningful activity, and executable exit value.",
      doesNotProve: "That holding was irrational when the decision was made.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/Ga__ke/status/2091718266684130671" },
    },
    {
      phrase: "Exit liquidity / top-blast",
      heardAs: "Later buyers absorb earlier holders’ sells; top-blast means chasing aggressively after expansion.",
      operatorTranslation: "Trace earlier supply, later buyer flow, entry distance from the prior range, and modeled exit impact.",
      doesNotProve: "Deliberate deception without funding, promotion, and flow evidence.",
      source: { label: "X field usage · Jun. 2026", url: "https://x.com/CryptoCred/status/2063178728364974556" },
    },
  ],
  lifecycle: [
    {
      phrase: "Prebond / bonding / bonded",
      heardAs: "Still on the launch curve, progressing through it, or having reached its completion condition.",
      operatorTranslation: "Read the protocol state, curve progress, confirmation status, and current trading venue.",
      doesNotProve: "That migration is confirmed or post-bond liquidity is safe.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/pr6spr/status/2087392470933860803" },
    },
    {
      phrase: "Graduated / migrated / post-bond",
      heardAs: "The launch phase completed and downstream pool trading began or is expected to begin.",
      operatorTranslation: "Confirm the migration transaction and pool, then recalculate route, depth, fees, holder risk, and capacity.",
      doesNotProve: "That the old setup, size, or invalidation survives the regime change.",
      source: { label: "Reddit field usage · Jan. 2025", url: "https://www.reddit.com/r/pumpfun/comments/1i1auzl/my_strategy_is_simple/" },
    },
    {
      phrase: "Fullclip at bond",
      heardAs: "A wallet or bot unloads most or all of its position around curve completion.",
      operatorTranslation: "Identify seller quantity, relationship, price impact, new-pool depth, and remaining balance.",
      doesNotProve: "That the seller was the dev or that every graduation behaves this way.",
      source: { label: "Reddit field usage · May 2025", url: "https://www.reddit.com/r/solana/comments/1kfr3y7/how_to_avoid_recent_sniper_bots_on_pump/" },
    },
  ],
  terminal: [
    {
      phrase: "Ape / ape in / bid",
      heardAs: "Enter quickly; bid can mean one buy or sustained buy-side support.",
      operatorTranslation: "Write the exact transaction, size, market state, diligence skipped, and invalidation.",
      doesNotProve: "Large size by definition. ‘Ape with size’ adds that claim.",
      source: { label: "X field usage · May 2025", url: "https://x.com/VaderResearch/status/1923291061239046178" },
    },
    {
      phrase: "CA / ticker / freshies",
      heardAs: "The token mint, its non-unique short symbol, and wallets with little visible history.",
      operatorTranslation: "Verify the full CA, then inspect each fresh address’s age, funder, timing, transfers, balance, and exits.",
      doesNotProve: "That a ticker identifies one coin or that a fresh wallet is a new person.",
      source: { label: "Reddit field usage · Aug. 2025", url: "https://www.reddit.com/r/pumpfun/comments/1n074kw/ive_been_a_full_time_trader_mostly_pump_funs_for/" },
    },
    {
      phrase: "Fade / pass",
      heardAs: "Do not take the long thesis; in context it may mean skip, sell, or take the opposite side.",
      operatorTranslation: "Specify the action and the observable reason the candidate failed the filter.",
      doesNotProve: "That the coin later failed, or that skipping was wrong if it later ran.",
      source: { label: "X field usage · May 2025", url: "https://x.com/VaderResearch/status/1923291061239046178" },
    },
  ],
  wallets: [
    {
      phrase: "Dev jeeted / dev out",
      heardAs: "A creator-associated wallet allegedly sold or abandoned the token.",
      operatorTranslation: "Name the labeled address, transaction, amount sold versus transferred, funder links, remaining supply, and fee/control rights.",
      doesNotProve: "That every creator-linked wallet is known. ‘Jeet’ is derogatory and carries ethnic-slur baggage; use ‘early seller’ in analysis.",
      source: { label: "X field usage · Jul. 2026", url: "https://x.com/iruletrenches/status/2081744877725819025" },
    },
    {
      phrase: "Bundled / cabal / insiders",
      heardAs: "Launch-time wallets appear coordinated or are alleged to share privileged positioning.",
      operatorTranslation: "Separate a protocol bundle from vendor-inferred bundled supply; test same-slot timing, funders, transfers, concentration, calls, and exits.",
      doesNotProve: "Common control or insider status from a percentage label alone.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/Bubblemaps/status/2087185325735236037" },
    },
    {
      phrase: "Farm / farmed / organic",
      heardAs: "Repeatedly extract from later traders; organic claims participation was not automated or coordinated.",
      operatorTranslation: "Inspect serial deployers, recycled funders/socials, buyers after promotion, repetitive timing and sizes, maker history, and who sold.",
      doesNotProve: "Intent from one loss—or independence from a diverse-looking wallet count.",
      source: { label: "X field usage · Jun. 2026", url: "https://x.com/shaams/status/2063845471265738947" },
    },
  ],
  narrative: [
    {
      phrase: "Meta / narrative / deriv / vamp",
      heardAs: "A repeated attention theme, its story, a copy/variation, and a competitor siphoning liquidity or attention.",
      operatorTranslation: "Timestamp the source event, count competing CAs, compare creation time, propagation, flows, and novelty saturation.",
      doesNotProve: "That the first deployment wins or that every derivative is dead on arrival.",
      source: { label: "X field usage · Dec. 2025", url: "https://x.com/whatdotcd/status/1996254645652791801" },
    },
    {
      phrase: "OG / canonical CA / CTO",
      heardAs: "Original coin, socially accepted contract, or community takeover after the creator leaves.",
      operatorTranslation: "Separate earliest deployed, officially referenced, and socially dominant contracts; verify what the CTO actually controls.",
      doesNotProve: "That ‘OG’ has one universal meaning or a CTO is independent, decentralized, or safe.",
      source: { label: "Reddit field usage · Jun. 2024", url: "https://www.reddit.com/r/SolanaMemeCoins/comments/1dcjnwb/top_sol_meme_coin_cto/" },
    },
    {
      phrase: "Lore / cult / bag work / coded for a billy",
      heardAs: "Shareable backstory, persistent identity, holder-created promotion, and the meme that a coin is destined for $1B market cap.",
      operatorTranslation: "Measure independent remixes, repeat participation, retention, disclosure, propagation sources, and holder incentives.",
      doesNotProve: "Durable demand. ‘LFG,’ ‘WAGMI,’ and ‘wen moon’ express enthusiasm, not analysis.",
      source: { label: "X field usage · Jul. 2025", url: "https://x.com/stitchdegen/status/1947812303967252653" },
    },
  ],
  tape: [
    {
      phrase: "God candle / green candle",
      heardAs: "An unusually large bullish candle; rising price can itself attract attention.",
      operatorTranslation: "Choose a timeframe and compare body/range with recent bars, volume, makers, depth, and the transactions that produced it.",
      doesNotProve: "Independent demand, continuation, or a safe entry.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/blknoiz06/status/2090182654696030248" },
    },
    {
      phrase: "Wicked out / scam wick / reclaim",
      heardAs: "Price traded beyond a level, retreated within the interval, then may have regained the level.",
      operatorTranslation: "State timeframe, high/low/close, later closes, volume, maker change, and whether acceptance persisted.",
      doesNotProve: "Manipulation, who sold, or that a momentary move back above the level is acceptance.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/rektmando/status/2091048629578396145" },
    },
    {
      phrase: "Cooking / sending / runner / nuked",
      heardAs: "Developing well, rising quickly, showing exceptional continuation, or collapsing sharply.",
      operatorTranslation: "Replace the adjective with percentage move, duration, volume, maker breadth, liquidity, retracement, and realized flow.",
      doesNotProve: "A forward edge. ‘Runner’ is often assigned with hindsight.",
      source: { label: "Reddit field usage · May 2025", url: "https://www.reddit.com/r/SolanaMemeCoins/comments/1kdqskj/im_cookedsmall_rant/" },
    },
  ],
  risk: [
    {
      phrase: "With size / port / full port",
      heardAs: "A position large relative to the account or available liquidity; full port implies nearly all available trading capital.",
      operatorTranslation: "State position as account percentage, risk-to-invalidation, entry impact, and worst modeled exit.",
      doesNotProve: "Conviction, skill, or a sensible fixed SOL amount.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/pr6spr/status/2087392470933860803" },
    },
    {
      phrase: "Roundtrip / fumble / rekt",
      heardAs: "Give back unrealized profit, mishandle an opportunity, or take a severe loss.",
      operatorTranslation: "Compare peak UPNL, realized PnL, planned exits, information available at each timestamp, and transaction costs.",
      doesNotProve: "That the peak could have been sold or that a later winner makes the earlier decision wrong.",
      source: { label: "X field usage · Aug. 2026", url: "https://x.com/shahh/status/2087706921675428152" },
    },
    {
      phrase: "Diamond hands / paper hands / jeet",
      heardAs: "Social praise for holding and shame for exiting.",
      operatorTranslation: "Judge the predeclared thesis, risk, time horizon, and realized outcome—not the community label.",
      doesNotProve: "That holding is brave, selling is weak, or the promoter shares your cost basis and risk.",
      source: { label: "Reddit field usage · Sep. 2021", url: "https://www.reddit.com/r/solana/comments/pjilhv/90_of_these_new_people_here_will_lose_it_all/" },
    },
  ],
  setups: [
    {
      phrase: "Sender / runner / blast",
      heardAs: "A coin expected to accelerate, one that already sustained exceptional continuation, or an aggressive entry.",
      operatorTranslation: "Define the universe, state, trigger, size, magnitude threshold, horizon, invalidation, and exit.",
      doesNotProve: "That the label describes a repeatable setup.",
      source: { label: "X field usage · May 2026", url: "https://x.com/traderpow/status/2055821156809416974" },
    },
    {
      phrase: "Snipe / copy / follow the wallet",
      heardAs: "Enter around a time-sensitive event or react to a tracked address.",
      operatorTranslation: "Name the trigger, observation delay, entry slot, funder relationship, cost-basis gap, liquidity, and exit latency.",
      doesNotProve: "That the tracked wallet bought for the same reason or can be copied at the same economics.",
      source: { label: "X field usage · Feb. 2025", url: "https://x.com/Bubblemaps/status/1891828882367553986" },
    },
  ],
  execution: [
    {
      phrase: "Landed / missed / horrible fill",
      heardAs: "Transaction confirmed near the intended state, failed to enter, or executed much worse than expected.",
      operatorTranslation: "Separate observed quote, signed bounds, send time, slot, confirmation, average fill, fees, impact, and adverse movement.",
      doesNotProve: "That one faster RPC fixes a poor signal or impossible capacity.",
      source: { label: "Solana execution context", url: "https://solana.com/docs/core/transactions/confirmation" },
    },
    {
      phrase: "Bot made me late",
      heardAs: "Automation or competing execution reached the market first.",
      operatorTranslation: "Break latency into data arrival, decision, construction, submission, landing, and confirmation.",
      doesNotProve: "That latency—not selection, slippage, or decision quality—caused the loss.",
      source: { label: "Jito searcher context", url: "https://docs.jito.wtf/lowlatencytxnsend/" },
    },
  ],
  automation: [
    {
      phrase: "Trench bot / dev bot / sniper bot",
      heardAs: "A vague label for monitoring, deployment, construction, landing, copying, or automatic trading.",
      operatorTranslation: "Demand exact inputs, decision rules, actions, keys, failure states, rate limits, and kill switch.",
      doesNotProve: "A strategy, safety, or profitability.",
      source: { label: "X field usage · Feb. 2026", url: "https://x.com/Stupifff/status/2026366391201489239" },
    },
    {
      phrase: "Automate the sauce",
      heardAs: "Turn a discretionary method into faster software.",
      operatorTranslation: "First prove a labeled manual rule survives costs, counterexamples, out-of-sample testing, and guarded paper execution.",
      doesNotProve: "That software creates edge instead of scaling losses.",
      source: { label: "Academy operating rule", url: "https://en.wikipedia.org/wiki/Overfitting" },
    },
  ],
  "vod-capstone": [
    {
      phrase: "He aped the reclaim and jeeted the wick",
      heardAs: "The trader entered after price regained a level and exited during an upper excursion.",
      operatorTranslation: "Timestamp the level, confirming closes/flow, actual entry, size, exit, slippage, and information visible at each decision.",
      doesNotProve: "Why the trader acted, whether it was planned, or whether the outcome was repeatable.",
      source: { label: "X candle-language context · Aug. 2026", url: "https://x.com/rektmando/status/2091048629578396145" },
    },
    {
      phrase: "Easy cook / obvious runner",
      heardAs: "Hindsight compresses a messy decision into a simple success story.",
      operatorTranslation: "Pause before outcome reveal; record the visible state, alternatives, trigger, invalidation, capacity, and skip case.",
      doesNotProve: "That the result was obvious at the decision timestamp.",
      source: { label: "X hindsight-language context · Aug. 2026", url: "https://x.com/Bubblemaps/status/2089307627444662394" },
    },
  ],
};

export const memeQualityDimensions = [
  { label: "One-glance legibility", check: "Can a stranger understand the character, joke, or event without a paragraph?" },
  { label: "Ticker compression", check: "Is it memorable, searchable, pronounceable, and easy to distinguish from collisions?" },
  { label: "Canonicality", check: "Separate original source, earliest CA, officially referenced CA, and socially dominant CA." },
  { label: "Propagation", check: "Are independent accounts remixing it, or is one KOL generating nearly all attention?" },
  { label: "Remix + lore", check: "Does it keep producing fresh formats, backstory, and community-created content?" },
  { label: "Meta position", check: "Is it a first strong expression, a meaningful twist, or the fortieth low-effort deriv?" },
  { label: "Distribution truth", check: "Do funders, clusters, bundles, sniper exits, and executable concentration support the story?" },
  { label: "Regime + capacity", check: "Does the current launch regime support attention, and can your size enter and exit the pool?" },
] as const;
