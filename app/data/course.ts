export type SourceCategory =
  | "Protocol"
  | "Execution"
  | "Market data"
  | "Investigation"
  | "Research"
  | "Safety"
  | "VOD";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  category: SourceCategory;
  note: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LessonSection = {
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
  formula?: string;
  example?: string;
  warning?: string;
  sources?: string[];
};

export type Module = {
  id: string;
  number: number;
  track: "Weekend Core" | "Bonus Arsenal";
  weekendDay?: 1 | 2;
  phase: "Foundation" | "Operator" | "Systems";
  title: string;
  shortTitle: string;
  kicker: string;
  duration: string;
  difficulty: "Start here" | "Core" | "Advanced";
  outcome: string;
  prerequisites: string[];
  sections: LessonSection[];
  takeaways: string[];
  quiz: Question[];
};

export type GlossaryTerm = {
  term: string;
  aliases?: string;
  category: string;
  definition: string;
  nuance?: string;
};

export type Drill = {
  id: string;
  title: string;
  label: string;
  setup: string;
  chat?: string;
  metrics: { label: string; value: string; tone?: "good" | "bad" | "neutral" }[];
  prompt: string;
  choices: string[];
  answer: number;
  debrief: string[];
  skill: string;
};

export type HistoricalCase = {
  id: string;
  name: string;
  period: string;
  archetype: string;
  thesis: string;
  sequence: { when: string; event: string }[];
  knowable: string[];
  hindsightTrap: string;
  drill: string;
  sources: string[];
};

export const researchCutoff = "August 24, 2026";
export const passScore = 75;

export const sources: Source[] = [
  {
    id: "pump-curve",
    title: "The Pump.fun bonding curve",
    publisher: "Pump.fun",
    date: "Accessed Aug. 24, 2026",
    url: "https://pump.fun/docs/bonding-curve",
    category: "Protocol",
    note: "Consumer-level curve, price-impact, graduation, and canonical-pool explanation.",
  },
  {
    id: "pump-fees",
    title: "Fees",
    publisher: "Pump.fun",
    date: "Updated May 20, 2026",
    url: "https://pump.fun/docs/fees",
    category: "Protocol",
    note: "Current creation, graduation, bonding-curve, creator, protocol, and LP fees.",
  },
  {
    id: "pump-program",
    title: "Pump Program README",
    publisher: "Pump.fun public docs",
    date: "Live documentation",
    url: "https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_PROGRAM_README.md",
    category: "Protocol",
    note: "Program-level curve state and the important distinction between completion and migration.",
  },
  {
    id: "pump-create",
    title: "Coin creation instructions",
    publisher: "Pump.fun public docs",
    date: "Live documentation",
    url: "https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COIN_CREATION.md",
    category: "Protocol",
    note: "Modern create_v2 behavior and documented same-transaction creator buying.",
  },
  {
    id: "pumpswap",
    title: "PumpSwap Program README",
    publisher: "Pump.fun public docs",
    date: "Live documentation",
    url: "https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_SWAP_README.md",
    category: "Protocol",
    note: "Pool state, constant-product quoting, LP operations, and live configuration caveats.",
  },
  {
    id: "raydium-launchlab",
    title: "LaunchLab bonding curve",
    publisher: "Raydium",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.raydium.io/products/launchlab/bonding-curve",
    category: "Protocol",
    note: "Evidence that launchpad curves and migration targets are not universal.",
  },
  {
    id: "solana-fees",
    title: "Transaction fee structure",
    publisher: "Solana",
    date: "Accessed Aug. 24, 2026",
    url: "https://solana.com/docs/core/fees/fee-structure",
    category: "Execution",
    note: "Base fees, priority fees, requested compute units, and failure costs.",
  },
  {
    id: "solana-compute",
    title: "Compute budget",
    publisher: "Solana",
    date: "Accessed Aug. 24, 2026",
    url: "https://solana.com/docs/core/fees/compute-budget",
    category: "Execution",
    note: "Compute-unit limits, pricing, simulation, and version caveats.",
  },
  {
    id: "solana-send",
    title: "sendTransaction RPC method",
    publisher: "Solana",
    date: "Accessed Aug. 24, 2026",
    url: "https://solana.com/docs/rpc/http/sendtransaction",
    category: "Execution",
    note: "RPC acceptance does not guarantee processing or confirmation.",
  },
  {
    id: "solana-simulate",
    title: "simulateTransaction RPC method",
    publisher: "Solana",
    date: "Accessed Aug. 24, 2026",
    url: "https://solana.com/docs/rpc/http/simulatetransaction",
    category: "Execution",
    note: "Preflight and compute-estimation mechanics.",
  },
  {
    id: "solana-json",
    title: "Transaction JSON structures",
    publisher: "Solana",
    date: "Accessed Aug. 24, 2026",
    url: "https://solana.com/docs/rpc/json-structures",
    category: "Protocol",
    note: "The raw evidence behind wallet graphs: keys, instructions, balances, and logs.",
  },
  {
    id: "jito",
    title: "Low-latency transaction send and bundles",
    publisher: "Jito Labs",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.jito.wtf/lowlatencytxnsend/",
    category: "Execution",
    note: "Atomic bundles, auction tips, landing caveats, and direct-send behavior.",
  },
  {
    id: "helius-sender",
    title: "Sender: ultra-low-latency transaction submission",
    publisher: "Helius",
    date: "Accessed Aug. 24, 2026",
    url: "https://www.helius.dev/docs/sending-transactions/sender",
    category: "Execution",
    note: "A current example of dual-path professional transaction delivery.",
  },
  {
    id: "axiom-pulse",
    title: "Pulse",
    publisher: "Axiom",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.axiom.trade/axiom/finding-tokens/pulse",
    category: "Protocol",
    note: "Terminal vocabulary for New Creations, Final Stretch, and Migrated. Some venue wording is historically stale.",
  },
  {
    id: "uniswap-impact",
    title: "Price impact vs. price slippage",
    publisher: "Uniswap Labs",
    date: "Updated Feb. 11, 2025",
    url: "https://support.uniswap.org/hc/en-us/articles/8643794102669-Price-Impact-vs-Price-Slippage",
    category: "Protocol",
    note: "Clean definitions for two concepts that trading interfaces often blur.",
  },
  {
    id: "uniswap-v2",
    title: "Uniswap v2 core whitepaper",
    publisher: "Uniswap",
    date: "March 2020",
    url: "https://docs.uniswap.org/whitepaper.pdf",
    category: "Research",
    note: "Primary constant-product AMM math used for the academy’s toy simulator.",
  },
  {
    id: "pine",
    title: "Exit Liquidity Machines: Dissecting Pump.fun Farming",
    publisher: "Pine Analytics",
    date: "April 21, 2025",
    url: "https://pineanalytics.substack.com/p/exit-liquidity-machines",
    category: "Investigation",
    note: "A high-confidence, directly funded subset of industrial same-block sniping; not a prevalence estimate for all insiders.",
  },
  {
    id: "coingecko-state",
    title: "State of Memecoins Report 2025",
    publisher: "CoinGecko Research",
    date: "Updated May 2, 2026",
    url: "https://www.coingecko.com/research/publications/state-of-memecoins-2025",
    category: "Market data",
    note: "Sector-cycle chronology and aggregate market-cap/volume estimates.",
  },
  {
    id: "coingecko-q1",
    title: "2024 Q1 Crypto Industry Report",
    publisher: "CoinGecko Research",
    date: "April 2024",
    url: "https://assets.coingecko.com/reports/2024/CoinGecko-2024-Q1-Report.pdf",
    category: "Market data",
    note: "Contemporaneous evidence for the early Solana memecoin expansion.",
  },
  {
    id: "syndica-2024",
    title: "Deep Dive: Solana DeFi, August 2024",
    publisher: "Syndica",
    date: "September 2024",
    url: "https://blog.syndica.io/content/files/2024/09/Deep-Dive---Solana-DeFi-August-2024-1.pdf",
    category: "Market data",
    note: "Historical launch and graduation base rates under 2024 mechanics.",
  },
  {
    id: "memetrans",
    title: "MemeTrans: A Dataset for Detecting High-Risk Memecoin Launches on Solana",
    publisher: "Hu, Tekin, Xu & Liu",
    date: "Feb. 13, 2026 preprint",
    url: "https://arxiv.org/abs/2602.13480",
    category: "Research",
    note: "40K+ migrated launches and 122 feature families; useful evidence that serious filtering is multivariate.",
  },
  {
    id: "chainalysis",
    title: "Crypto Market Manipulation 2025",
    publisher: "Chainalysis",
    date: "Corrected Feb. 13, 2025",
    url: "https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/",
    category: "Investigation",
    note: "Behavioral heuristics, controller-wallet scale, and the critical warning that patterns do not prove intent.",
  },
  {
    id: "sec-memes",
    title: "Staff Statement on Meme Coins",
    publisher: "SEC Division of Corporation Finance",
    date: "Feb. 27, 2025",
    url: "https://www.sec.gov/newsroom/speeches-statements/staff-statement-meme-coins",
    category: "Safety",
    note: "U.S. staff view, speculative-risk description, and explicit no-legal-force disclaimer.",
  },
  {
    id: "owasp-opsec",
    title: "Web3 operational security",
    publisher: "OWASP",
    date: "Accessed Aug. 24, 2026",
    url: "https://scs.owasp.org/handbooks/11-opsec-in-web3/part2-web3-specific-considerations/",
    category: "Safety",
    note: "Hot/cold wallet separation and practical blast-radius controls.",
  },
  {
    id: "kick-hotted",
    title: "hotted public videos",
    publisher: "Kick",
    date: "Accessed Aug. 24, 2026",
    url: "https://kick.com/hotted/videos",
    category: "VOD",
    note: "Public practice tape. Availability is verifiable; income claims are not certified by the academy.",
  },
  {
    id: "kick-vod-policy",
    title: "KICK VODs (stream replays)",
    publisher: "Kick Help Center",
    date: "Updated May 21, 2026",
    url: "https://help.kick.com/en/articles/7112432-kick-vods-stream-replays",
    category: "VOD",
    note: "Explains the rolling retention window and replay limits; preserve URLs and timestamped notes promptly.",
  },
  {
    id: "axiom-faq",
    title: "FAQ: Bundle Checker",
    publisher: "Axiom",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.axiom.trade/faqs",
    category: "Protocol",
    note: "First-party warning that bundle detection can create false positives and misses and does not prove team ownership.",
  },
  {
    id: "axiom-og",
    title: "Similar Tokens and OG Mode",
    publisher: "Axiom",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.axiom.trade/axiom/finding-tokens/similar-tokens",
    category: "Protocol",
    note: "Axiom feature for surfacing older similar tokens; not proof of social or market canonicity.",
  },
  {
    id: "axiom-trader-scan",
    title: "Trader Scan",
    publisher: "Axiom",
    date: "Accessed Aug. 24, 2026",
    url: "https://docs.axiom.trade/trader-scan",
    category: "Protocol",
    note: "Documents bought, sold, balance, realized PnL, and holding-time fields while leaving some custom chart overlays undefined.",
  },
  {
    id: "bonk-paper",
    title: "BONK Paper",
    publisher: "BONK contributors",
    date: "Official project paper",
    url: "https://bonkcoin.com/BONK-Paper.pdf",
    category: "Market data",
    note: "Stated supply distribution and vesting for a pre-Pump community-airdrop model; stated allocation is not proof of independent control.",
  },
  {
    id: "binance-bome",
    title: "Binance Will List BOOK OF MEME (BOME)",
    publisher: "Binance",
    date: "March 16, 2024",
    url: "https://www.binance.com/en/support/announcement/bca0f355cf004367b90d7e48fee3470c",
    category: "Market data",
    note: "Timestampable access catalyst two days after BOME’s March 14 launch; not proof the listing caused the preceding move.",
  },
  {
    id: "k33-ai-memes",
    title: "AI Memecoins: Next Gen Memes or Next Grift?",
    publisher: "K33 Research",
    date: "Oct. 22, 2024",
    url: "https://k33.com/research/articles/ai-memecoins-next-gen-memes-or-next-grift",
    category: "Research",
    note: "Contemporaneous account of GOAT and the distinction between token deployer and AI-agent promoter.",
  },
  {
    id: "coingecko-fartcoin",
    title: "What Is Fartcoin?",
    publisher: "CoinGecko",
    date: "Updated Feb. 6, 2025",
    url: "https://www.coingecko.com/learn/what-is-fartcoin-ai-memecoin-crypto",
    category: "Market data",
    note: "Narrative-lineage and chronology source for an adjacent AI-meme rotation case.",
  },
  {
    id: "pnut-dlnews",
    title: "PNUT trader makes millions off squirrel memecoin",
    publisher: "DL News",
    date: "Nov. 14, 2024",
    url: "https://www.dlnews.com/articles/markets/pnut-trader-makes-millions-off-squirrel-memecoin/",
    category: "Investigation",
    note: "Transaction-based creator-sale chronology and an extreme survivor; not a base-rate estimate.",
  },
  {
    id: "binance-pnut",
    title: "Binance Will List PNUT",
    publisher: "Binance",
    date: "Nov. 11, 2024",
    url: "https://www.binance.com/en/support/announcement/d16d96c136154680a6373225d592bca1",
    category: "Market data",
    note: "Exact listing timestamp for a point-in-time narrative replay.",
  },
  {
    id: "trump-whitepaper",
    title: "Official TRUMP project white paper",
    publisher: "Project disclosure hosted by Kraken",
    date: "January 2025",
    url: "https://assets-cms.kraken.com/files/51n36hrp/facade/49e77605d42a5f61ccaaaf74f14d2d25da399ab1.pdf",
    category: "Market data",
    note: "Stated one-billion supply, initial public float, affiliated tranches, cliffs, and vesting.",
  },
  {
    id: "trump-post",
    title: "Official TRUMP announcement",
    publisher: "Donald Trump on Truth Social",
    date: "Jan. 18, 2025 02:00 UTC",
    url: "https://truthsocial.com/@realDonaldTrump/posts/113846888132979151?embed=true",
    category: "Market data",
    note: "Primary timestamp for authentication of the officially announced token; authenticity does not remove supply or liquidity risk.",
  },
  {
    id: "bubblemaps-trump",
    title: "First-second TRUMP buyer analysis",
    publisher: "Bubblemaps",
    date: "February 2025",
    url: "https://x.com/bubblemaps/status/1891828882367553986",
    category: "Investigation",
    note: "On-chain timing, fee, distribution, and outcome analysis. Entity attribution and insider status remained inferential and disputed.",
  },
  {
    id: "nansen-libra",
    title: "LIBRA: The Aftermath",
    publisher: "Nansen Research",
    date: "February 2025",
    url: "https://research.nansen.ai/articles/libra-the-aftermath",
    category: "Investigation",
    note: "Minute-level event chronology and a clearly defined realized-PnL cohort; the denominator must travel with the headline.",
  },
  {
    id: "coingecko-q1-2025",
    title: "2025 Q1 Crypto Industry Report",
    publisher: "CoinGecko Research",
    date: "April 2025",
    url: "https://assets.coingecko.com/reports/2025/CoinGecko-2025-Q1-Crypto-Industry-Report.pdf",
    category: "Market data",
    note: "Pump.fun launch/graduation cooldown after the early-2025 frenzy; temporal order is not single-cause proof.",
  },
  {
    id: "coingecko-lifespan",
    title: "What Is the Average Lifespan of Pump.fun Tokens?",
    publisher: "CoinGecko Research",
    date: "Updated June 23, 2026",
    url: "https://www.coingecko.com/research/publications/average-lifespan-of-pumpfun-tokens",
    category: "Market data",
    note: "Large bonding-curve last-trade dataset. ‘Last Pump trade’ does not necessarily mean no trading on any post-migration venue.",
  },
  {
    id: "coingecko-profitability",
    title: "Are Pump.fun Traders Making a Comeback?",
    publisher: "CoinGecko Research",
    date: "Updated May 7, 2026",
    url: "https://www.coingecko.com/research/publications/pump-fun-traders-are-making-a-comeback",
    category: "Market data",
    note: "Realized-positive wallet shares. Wallets are not people; bots, wallet farms, unrealized bags, and accounting choices remain.",
  },
  {
    id: "pump-success-paper",
    title: "Predicting the Success of New Crypto-Tokens: The Pump.fun Case",
    publisher: "Marino, Naviglio, Tarantelli & Lillo",
    date: "Feb. 16, 2026 preprint",
    url: "https://arxiv.org/pdf/2602.14860",
    category: "Research",
    note: "Transparent September–October 2025 sample with a 0.63% graduation estimate and carefully defined statistical ‘dump’ label.",
  },
];

export const sourceMap = Object.fromEntries(sources.map((source) => [source.id, source]));

const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
): Question => ({ id, prompt, options, answer, explanation });

export const modules: Module[] = [
  {
    id: "game-map",
    number: 1,
    track: "Weekend Core",
    weekendDay: 1,
    phase: "Foundation",
    title: "The game map & the base rate",
    shortTitle: "Game map",
    kicker: "Know which business you are actually watching.",
    duration: "45 min",
    difficulty: "Start here",
    outcome: "Separate public trading skill from creator revenue, infrastructure, privileged flow, and extraction—and judge PnL claims intelligently.",
    prerequisites: [],
    sections: [
      {
        eyebrow: "The map",
        title: "“Memecoin trading” hides different money machines",
        body: [
          "A fresh-launch sniper, a migration trader, a narrative trader, a creator earning turnover fees, a terminal operator, and a deployer-funded wallet farm may all post SOL-denominated PnL. Their production functions are not comparable.",
          "Before studying any trader, identify the category. Public-market PnL means buying from a public venue and later selling. Creator revenue monetizes turnover. Infrastructure monetizes other people’s activity. Privileged or coordinated launch flow may look like trading while carrying an informational advantage retail cannot copy.",
        ],
        bullets: [
          "Public setups: launch, migration, momentum, narrative/OG, wallet-confirmation.",
          "Operator businesses: creator fees, distribution, terminals, relays, analytics, referrals.",
          "Non-copyable or suspect edges: hidden team supply, deployer-funded buyers, manufactured volume, undisclosed coordination.",
        ],
        sources: ["pump-fees", "pine"],
      },
      {
        eyebrow: "The denominator",
        title: "The right tail is real; survivorship is stronger",
        body: [
          "The correct reaction to a 200-SOL screenshot is neither worship nor automatic disbelief. Reconcile it. Ask what period, how many wallets, whether positions were transferred in, whether results are realized, what costs are omitted, how much capital was exposed, and how concentrated the month was in a few outliers.",
          "Historical launch data shows why filtering dominates discovery. Under August 2024 mechanics, roughly 98.7% of Pump.fun launches in Syndica’s view failed to graduate. That is historical—not a 2026 forecast—but it establishes the adversarial base rate that shaped modern terminal behavior.",
        ],
        example: "A wallet showing +500 SOL can still have negative strategy expectancy if 520 SOL was transferred in, the result excludes failed wallets, or one insider allocation is mislabeled as a buy.",
        sources: ["syndica-2024", "pine", "coingecko-state"],
      },
      {
        eyebrow: "Regime",
        title: "Study 2024–January 2025 before you study 2021",
        body: [
          "The 2021 DOGE/SHIB season teaches attention and derivative rotation. The modern Solana workflow—instant launchpads, bonding curves, one-click terminals, wallet labels, bundles, and professional transaction delivery—formed from late 2023 through early 2025.",
          "CoinGecko estimates the meme sector peaked at $88.0B in October 2021 and later at $150.6B in December 2024. It also estimates daily average sector volume grew from $1.1B in 2023 to $9.7B in 2024. Aggregate data is context, not a buy signal.",
        ],
        warning: "Do not call a new bull market from launch count, one green week, or a friend’s projection. Define the regime with independent measures and update it.",
        sources: ["coingecko-state", "coingecko-q1"],
      },
      {
        eyebrow: "Core-path contract",
        title: "Literacy first, your own edge second",
        body: [
          "After the two-day Core Path you should be able to pause a VOD and describe the visible opportunity, missing information, thesis, invalidation, size logic, transaction risk, and exit logic. You do not need to predict every candle or copy the trader's exact method.",
          "The method design space is enormous because an edge can live in the universe you scan, information you collect, state you wait for, evidence you require, trigger you act on, size you deploy, or exit you use. Profitable edges are not automatic: every combination must survive evidence, costs, and changing market regimes. Your first goal is legibility; your second is a journaled manual edge; automation is a later multiplier.",
        ],
        bullets: [
          "Explain the market state without using ‘looks good.’",
          "Name the evidence and the counter-explanation.",
          "State where you are wrong before entry.",
          "Turn one repeated observation into entry, skip, invalidation, exit, and sizing rules.",
        ],
        formula: "observe → define → journal → test → alert → guarded automation",
      },
    ],
    takeaways: [
      "Interrogate the production function behind PnL.",
      "Use 2024–January 2025 as the main historical tape.",
      "Your first target is screen literacy, not speed.",
      "Bots multiply a defined, measured method; they do not invent one.",
    ],
    quiz: [
      q("gm1", "Which question best begins an evaluation of a ‘500 SOL/day’ claim?", ["Which bot do I buy?", "Which production function generated it?", "What ticker was traded?", "Was the candle green?"], 1, "The category—public trading, creator fees, infrastructure, transfers, or coordinated operations—determines whether the result is comparable or copyable."),
      q("gm2", "Why is the 2024–January 2025 period more useful than 2021 for terminal study?", ["DOGE did not exist in 2021", "Solana had no fees in 2024", "The modern launchpad/terminal/wallet-label workflow matured then", "Every 2024 token was profitable"], 2, "The operational surface you will see in current VODs is much closer to 2024 than to the 2021 dog-coin cycle."),
      q("gm3", "A historical 98.7% failure-to-graduate estimate should be used as…", ["A permanent 2026 law", "A reason to buy every graduate", "Historical base-rate context with dated mechanics", "Proof every launch is a scam"], 2, "Mechanics and denominators change. The estimate is valuable precisely when kept in its historical scope."),
      q("gm4", "Which result is directly copyable?", ["A deployer-funded same-block allocation", "A creator-fee stream", "A public setup with observable entry and exit rules", "A transferred-in token balance"], 2, "A public setup can be studied and tested; the others depend on a different role or misstate trading performance."),
    ],
  },
  {
    id: "money-math",
    number: 2,
    track: "Weekend Core",
    weekendDay: 1,
    phase: "Foundation",
    title: "SOL, token math & executable value",
    shortTitle: "Money math",
    kicker: "A displayed market cap is not a pile of money.",
    duration: "75 min",
    difficulty: "Core",
    outcome: "Calculate market cap, average fill, price impact, slippage, net PnL, capacity, and expectancy without fooling yourself.",
    prerequisites: ["game-map"],
    sections: [
      {
        eyebrow: "Identity and units",
        title: "Price, supply, market cap, FDV, liquidity",
        body: [
          "Token price is a quote for a marginal unit. Market cap is price multiplied by circulating supply; FDV uses the chosen fully diluted supply. Neither tells you how many SOL can exit near that quote.",
          "Liquidity describes the reserves or depth available for trades. In an AMM, your order changes those reserves. Two tokens at the same $100K market cap can have radically different executable capacity.",
        ],
        formula: "market cap = marginal token price × circulating token supply",
        warning: "Names and tickers are not unique. Do all math against the exact mint/contract address (CA), token program, and live pool or curve.",
        sources: ["pump-curve", "pumpswap"],
      },
      {
        eyebrow: "Curve math",
        title: "Why your own order moves the price",
        body: [
          "A constant-product AMM maintains an invariant, commonly written x × y = k. Add quote asset to one reserve and remove tokens from the other: the ending spot price is worse for the next buyer, while your own average execution sits between the starting and ending prices.",
          "Pump’s curve uses virtual reserves, so the academy’s x·y simulator is a teaching model—not an exact Pump quote engine. The intuition is the edge: size relative to effective reserves determines impact.",
        ],
        formula: "tokens out ≈ y − k / (x + effective buy); average price = quote spent / tokens received",
        example: "A 1 SOL buy can be tolerable while a 10 SOL buy destroys the setup. ‘I could sneak 10 SOL in’ is a capacity hypothesis to measure, not confidence to imitate.",
        sources: ["uniswap-v2", "pump-curve", "pump-program"],
      },
      {
        eyebrow: "Two separate costs",
        title: "Price impact is not slippage",
        body: [
          "Price impact is the movement your own order causes against the pool or curve. Slippage is the difference between the quote you expected and the state that exists when execution occurs. A competing buy between quote and landing creates slippage even if your intended size never changed.",
          "Raising slippage tolerance does not make liquidity deeper and does not make a transaction faster. It only relaxes the worst economic fill you permit, which can reduce bound-related failures while increasing adverse-fill exposure.",
        ],
        sources: ["uniswap-impact", "pump-create", "pumpswap"],
      },
      {
        eyebrow: "Accounting",
        title: "The honest PnL equation",
        body: [
          "Gross chart return is not wallet return. Use actual tokens received, actual SOL returned, creator/protocol/terminal fees, base and priority fees, Jito tips, failed transactions, token-account costs or recoveries, partial exits, and SOL/USD movement when reporting dollars.",
          "Expectancy is measured across a setup, not inferred from win rate. A 35% win-rate system can be profitable with sufficiently larger winners; a 90% win-rate system can implode when its rare losses are enormous.",
        ],
        formula: "EV/trade = P(win) × average win − P(loss) × average loss − average total costs",
        example: "Four −1R losses and one +6R win produce +2R before costs. Four tiny wins and one −10R loss can look brilliant until it breaks.",
        sources: ["solana-fees", "pump-fees"],
      },
    ],
    takeaways: [
      "Market cap is a marginal-price calculation, not exit liquidity.",
      "Size is part of the setup because size changes the fill.",
      "Price impact and slippage require different fixes.",
      "Journal actual wallet flows and every execution cost.",
    ],
    quiz: [
      q("mm1", "A coin’s displayed market cap doubles. Why might your wallet return be less than 2×?", ["Token supply disappears", "Entry/exit impact, fees, partial fills, and state changes", "Market cap is always fake", "SOL transactions are free"], 1, "You trade through reserves, not at a frictionless displayed price."),
      q("mm2", "What does increasing slippage tolerance directly change?", ["Pool depth", "Validator priority", "The worst execution bound you permit", "The token supply"], 2, "Slippage tolerance is an economic bound, not speed or liquidity."),
      q("mm3", "Two coins have the same market cap. Which can safely absorb the larger order?", ["The one with the funnier ticker", "The older one", "The one with greater relevant depth after accounting for the route", "They are identical"], 2, "Capacity comes from executable depth and route state, not displayed market cap."),
      q("mm4", "Which is the correct expectancy framing?", ["Win rate alone", "Average winner alone", "Probability-weighted wins and losses minus costs", "Best trade divided by number of days"], 2, "Expectancy needs the full outcome distribution and costs."),
    ],
  },
  {
    id: "lifecycle",
    number: 3,
    track: "Weekend Core",
    weekendDay: 1,
    phase: "Foundation",
    title: "The token lifecycle & trading regimes",
    shortTitle: "Lifecycle",
    kicker: "Creation, curve, completion, migration, pool—different games.",
    duration: "65 min",
    difficulty: "Core",
    outcome: "Name the exact lifecycle state, know which data matters in it, and avoid applying stale 2024 venue rules to a 2026 token.",
    prerequisites: ["money-math"],
    sections: [
      {
        eyebrow: "The generic path",
        title: "Idea → mint → initial market → completion → migration → AMM",
        body: [
          "A launch starts with an exact mint and program state, not a ticker. On Pump, the initial market is a virtual-reserve bonding curve. When its completion condition is met, program state marks the curve complete; migration moves assets into the canonical pool where AMM trading continues.",
          "Consumer language often compresses completion and migration into ‘graduation.’ For technical observation, keep them separate until the migration transaction is confirmed.",
        ],
        formula: "created → curve trading → complete/bonded → migration confirmed → post-migration pool",
        sources: ["pump-program", "pump-curve", "pumpswap"],
      },
      {
        eyebrow: "Three terminal regimes",
        title: "New Creations, Final Stretch, Migrated",
        body: [
          "Axiom’s Pulse segmentation makes the specialization visible. New Creations offers the most optionality and noise. Final Stretch asks whether real demand is finishing the curve. Migrated asks whether deeper-liquidity price discovery survives the first distribution wave.",
          "Axiom’s public documentation still references migration to Raydium, reflecting older workflow language. Current Pump consumer documentation points to PumpSwap. Treat terminal labels as interface vocabulary and verify the live program/venue.",
        ],
        sources: ["axiom-pulse", "pump-curve"],
      },
      {
        eyebrow: "Venue adapter",
        title: "Do not memorize one launchpad as universal law",
        body: [
          "Raydium LaunchLab also uses virtual-reserve curves but supports configurable parameters and migration targets. Other launch systems may use whitelists, auctions, presales, different quote assets, or different fee and LP rules.",
          "Your durable skill is reading the adapter: quote asset, curve formula, completion condition, migration target, authorities, fees, LP ownership, and whether later liquidity can be deposited or withdrawn.",
        ],
        bullets: [
          "Verify token program and extensions.",
          "Read live curve/pool/config accounts.",
          "Date-stamp fee and migration assumptions.",
          "Separate initial migrated LP from later LP positions.",
        ],
        sources: ["raydium-launchlab", "pumpswap", "pump-create"],
      },
      {
        eyebrow: "Regime-specific questions",
        title: "The data changes meaning across the lifecycle",
        body: [
          "At creation, creator/funder links, same-window buyers, duplicate contracts, and buyer independence dominate. Near completion, progress speed and distribution matter. After migration, sustained maker growth, depth, large-sell absorption, and whether early low-cost supply is distributing become more informative.",
          "A graduation is a survival milestone, not proof of organic demand. A coordinated group can manufacture progress specifically to reach deeper exit liquidity.",
        ],
        warning: "Same-block creator buying is a documented legitimate workflow. Timing is an observation; manipulation requires corroborating funding, control, behavior, and exit evidence.",
        sources: ["pump-create", "pine"],
      },
    ],
    takeaways: [
      "Always name the exact lifecycle state before analyzing a coin.",
      "Completion and confirmed migration can be separate technical events.",
      "Terminal venue labels can lag protocol changes.",
      "Apply state-specific evidence, not one universal checklist.",
    ],
    quiz: [
      q("lc1", "Why keep curve completion and migration confirmation separate?", ["They always occur days apart", "Program state exposes distinct transitions and a migration can still be pending", "Migration is off-chain", "A ticker changes at migration"], 1, "Consumer UX may compress them, but execution and observation need exact state."),
      q("lc2", "What is the safest interpretation of ‘graduated’?", ["Guaranteed organic demand", "A survival/liquidity event requiring further analysis", "No holder can sell", "The dev is verified"], 1, "Graduation narrows the universe but does not validate ownership or future flow."),
      q("lc3", "An Axiom page says Raydium while current Pump docs say PumpSwap. What should you do?", ["Assume all UIs are wrong", "Use the older wording forever", "Verify the live token’s program state and venue", "Avoid all migrated tokens"], 2, "Version-aware verification beats memorized labels."),
      q("lc4", "Same-block creator buying proves…", ["A rug", "Nothing beyond timing without corroboration", "A profitable strategy", "A Jito bundle"], 1, "Pump documents a legitimate same-transaction workflow, so timing alone is not enough."),
    ],
  },
  {
    id: "terminal",
    number: 4,
    track: "Weekend Core",
    weekendDay: 1,
    phase: "Foundation",
    title: "Terminal literacy without dashboard superstition",
    shortTitle: "Terminal literacy",
    kicker: "Every metric is a prompt for the next question.",
    duration: "75 min",
    difficulty: "Core",
    outcome: "Read an Axiom-style screen at speed while knowing what each metric can and cannot establish.",
    prerequisites: ["lifecycle"],
    sections: [
      {
        eyebrow: "The first scan",
        title: "Identity, state, age, route",
        body: [
          "Start with CA/mint, token program, venue, lifecycle state, quote asset, age, and live route. A familiar name is not identity. A chart is not proof you are on the intended contract.",
          "Then ask whether the number you are reading is real-time, delayed, estimated, or label-derived. Terminal speed is useful only when you understand the data lineage.",
        ],
        sources: ["pump-create", "solana-json", "axiom-pulse"],
      },
      {
        eyebrow: "Activity",
        title: "Transactions, volume, makers, holders",
        body: [
          "Transactions count actions. Volume sums notional. Makers usually approximates unique active wallets over a window. Holders count token accounts or owners according to the interface. These are related but not interchangeable.",
          "One controller can generate many transactions and can operate many wallets. A rising maker count is stronger when funding sources, sizes, timing, and retention look independent.",
        ],
        example: "1,000 transactions from 12 linked wallets is different from 500 transactions spread across 350 independently funded wallets—even if the volume is identical.",
        sources: ["chainalysis", "solana-json"],
      },
      {
        eyebrow: "Ownership labels",
        title: "Dev %, top holders, sniper %, bundle %",
        body: [
          "Dev % is only the visible creator-linked balance the terminal knows. Top-holder concentration must be adjusted for pools, program accounts, exchanges, burns, and linked wallets. Sniper % describes early allocation under the platform’s classifier; it is not a moral verdict. Bundle % usually refers to launch-time grouping—not a technical Jito bundle.",
          "The professional habit is to click through. Who funded the wallets? Are they still holding? At what cost basis? Did they receive tokens or buy them? Have they taken profit? Do they co-fire across launches?",
        ],
        warning: "A neat low dev percentage can be manufactured by distributing supply. Cluster-adjusted ownership is the real question.",
        sources: ["pine", "jito", "solana-json", "axiom-faq"],
      },
      {
        eyebrow: "Chart overlays",
        title: "Average buy, cost basis, markers, and candles",
        body: [
          "Wallet markers answer who acted where; they do not explain why. ‘Average cost basis’ depends on which wallet set and which accounting method the overlay uses. A current average can be distorted by transfers, partial exits, or unobserved routes.",
          "Read candles with the transaction feed: did the wick come from one order? Did sells get absorbed by many new buyers? Is volume expanding while price makes less progress? Is a quiet chart actually illiquid?",
        ],
        bullets: [
          "Metric → definition → denominator → time window → raw evidence.",
          "Treat every label as a hypothesis until raw transactions agree.",
          "The best terminal user knows when to leave the terminal for the explorer.",
        ],
      },
    ],
    takeaways: [
      "CA and state come before chart interpretation.",
      "Transactions, volume, makers, and holders use different denominators.",
      "Ownership labels require cluster and cost-basis follow-up.",
      "A dashboard label is a lead, not ground truth.",
    ],
    quiz: [
      q("tm1", "Which statement about makers is safest?", ["Each maker is a unique human", "Makers generally approximates unique active wallets under an interface definition", "Makers equals holders", "More makers guarantees organic demand"], 1, "Wallets are not humans, and definitions/windows vary."),
      q("tm2", "A low visible dev % proves…", ["The launch is fair", "The team owns nothing", "Only that the labeled address holds little under the interface’s current attribution", "There are no clusters"], 2, "Linked or unlabeled wallets can change the ownership picture completely."),
      q("tm3", "What should follow a high sniper percentage?", ["Automatic buy", "Automatic rejection", "Who the early wallets are, their links, cost bases, and current positions", "Increase slippage"], 2, "The percentage is a screening prompt, not a universal verdict."),
      q("tm4", "Which term is commonly overloaded?", ["Mint", "Bundle", "Signature", "Slot"], 1, "Technical Jito transaction bundles and launch-time bundled supply are different concepts."),
    ],
  },
  {
    id: "wallets",
    number: 5,
    track: "Weekend Core",
    weekendDay: 2,
    phase: "Operator",
    title: "Wallet forensics & evidence graphs",
    shortTitle: "Wallet forensics",
    kicker: "Observe edges. Score hypotheses. Never pretend an address is a person.",
    duration: "85 min",
    difficulty: "Core",
    outcome: "Trace funders, devs, early buyers, transfers, clusters, and exits while keeping attribution confidence honest.",
    prerequisites: ["terminal"],
    sections: [
      {
        eyebrow: "Wallet anatomy",
        title: "Deployer, creator, funder, operational wallet, holder",
        body: [
          "A deployer submits creation. A fee/creator authority may be another address. A funder supplies SOL. Operational wallets buy, sell, or transfer. Recipient wallets may hold inventory without ever buying. One entity can play several roles; one service can fund many unrelated users.",
          "Build a role timeline instead of attaching one permanent label. A wallet can be an early buyer on one launch and a router or fee recipient in another.",
        ],
        sources: ["solana-json", "pump-create"],
      },
      {
        eyebrow: "Graph discipline",
        title: "Observation is not attribution",
        body: [
          "Raw Solana data can prove A transferred SOL to B, B signed a buy, C received tokens, and D sold. It cannot by itself prove the same human controls all four. Exchanges, relayers, terminals, payroll, faucets, and market infrastructure create innocent shared edges.",
          "Use confidence levels. Direct pre-launch funding plus repeated co-firing plus synchronized exits across many launches is stronger than one common exchange withdrawal.",
        ],
        formula: "confidence = independent corroborating edges − plausible shared-infrastructure explanations",
        example: "High confidence: direct funder → five fresh buyers, repeated across 30 launches, coordinated exits. Low confidence: five wallets withdrew from the same exchange hot wallet once.",
        sources: ["pine", "solana-json"],
      },
      {
        eyebrow: "Supply",
        title: "Cluster-adjusted concentration",
        body: [
          "Remove known pools/program accounts from naive holder lists, then reconnect addresses through funding, transfers, repeated timing, and behavioral similarity. Ten 2% wallets under one controller are a 20% exposure, not ten independent 2% risks.",
          "Cost basis matters as much as balance. A 7% cluster bought at the bottom can exert more immediate pressure than a 12% community treasury with a transparent mandate and no market sell path.",
        ],
        bullets: [
          "Balance: what can sell?",
          "Cost basis: how much cushion exists?",
          "Behavior: how has the cluster exited before?",
          "Funding: what relationship is observable?",
          "Counterfactual: what would make the cluster inference wrong?",
        ],
      },
      {
        eyebrow: "Wallet intelligence",
        title: "Archetypes beat one giant ‘smart money’ list",
        body: [
          "Classify wallets by repeatable behavior: launch sniper, migration specialist, momentum trader, deployer, funder, KOL, router, market maker, serial farmer, or long-horizon holder. Measure realized PnL, sample size, holding time, entry regime, size, drawdown, outlier dependence, and transfers.",
          "A launch sniper’s buy may be stale seconds later. A migration specialist’s entry can remain informative for minutes. Time horizon is part of the signal, and some profitable wallets are uncopyable because the public alert is their exit liquidity.",
        ],
        warning: "Never auto-copy a public ‘smart money’ label before explaining why that wallet is early and whether its horizon survives your latency.",
        sources: ["axiom-trader-scan", "solana-json"],
      },
    ],
    takeaways: [
      "Addresses are roles and evidence—not automatically identities.",
      "Multiple independent edges make a cluster hypothesis stronger.",
      "Adjust supply for linked ownership and cost basis.",
      "Classify wallets by setup and horizon before following them.",
    ],
    quiz: [
      q("wf1", "What can a direct SOL transfer prove?", ["Shared human ownership", "A transfer relationship between addresses", "Insider trading", "A future sell"], 1, "Identity and intent require corroboration."),
      q("wf2", "Which cluster inference is strongest?", ["Two wallets use the same exchange", "Fresh wallets share direct pre-launch funding, co-fire repeatedly, and synchronize exits", "Two wallets buy the same popular coin", "Both wallets have low balances"], 1, "Several independent, repeated edges reduce alternative explanations."),
      q("wf3", "Why can a profitable wallet be dangerous to copy?", ["All profitable wallets are fake", "Its advantage/horizon may be gone by the public alert", "Solana blocks copying", "PnL is always unrealized"], 1, "Latency, role, and transfer accounting determine copyability."),
      q("wf4", "What improves a top-holder analysis most?", ["Ignoring pools", "Cluster adjustment and cost basis", "Sorting by username", "Using ticker instead of CA"], 1, "Control and exit incentives matter more than a raw list."),
    ],
  },
  {
    id: "narrative",
    number: 6,
    track: "Weekend Core",
    weekendDay: 2,
    phase: "Operator",
    title: "Narrative, metas & the OG problem",
    shortTitle: "Narrative & OG",
    kicker: "Attention coordinates on a contract, not just a meme.",
    duration: "70 min",
    difficulty: "Core",
    outcome: "Map a catalyst to competing contracts, evaluate provenance and active coordination, and avoid equating oldest with winner.",
    prerequisites: ["wallets"],
    sections: [
      {
        eyebrow: "Attention market",
        title: "Why would more people care after you?",
        body: [
          "A narrative trade is a forecast of future coordinated attention. The strongest memes are legible in one sentence, visually remixable, emotionally charged, timely, and connected to an audience larger than crypto.",
          "A ‘meta’ forms when one success gives traders a reusable category—animals, politics, AI, legacy internet culture—and capital rotates into originals, derivatives, and cheaper substitutes.",
        ],
        sources: ["coingecko-state", "coingecko-q1"],
      },
      {
        eyebrow: "Contract race",
        title: "Catalyst → candidate CAs → coordination",
        body: [
          "When an event goes viral, several tokens may reuse its name and ticker. Your process is to timestamp the catalyst, enumerate exact mint addresses, order creation times, examine holder/creator history, and identify where active social attention and liquidity are converging.",
          "The oldest contract can have provenance and still be abandoned, compromised, illiquid, or controlled. A later contract can become canonical. ‘OG’ is an attribute—not a guarantee.",
        ],
        formula: "canonical odds ≈ provenance × active attention × distribution quality × liquidity × coordination",
        warning: "‘To OG a coin’ is not standardized public language. Ask the speaker whether they mean finding, launching, backing, or promoting the earliest CA.",
        sources: ["axiom-og"],
      },
      {
        eyebrow: "Originality",
        title: "First, best, and chosen are different",
        body: [
          "First asks chronology. Best asks subjective meme quality. Chosen asks where the market has coordinated. A dead 2022 contract can be first; a clean 2026 launch can be chosen; neither fact alone tells you the trade’s expected value.",
          "Use outside-in evidence: original post or news event, timestamped social spread, contract creation order, independent holders, active meme production, and whether promoters arrived before or after the price move.",
        ],
        bullets: [
          "Provenance: what came first and why?",
          "Activity: where is genuine creation and conversation happening?",
          "Distribution: who can end the story with one sell?",
          "Persistence: will the catalyst still matter on your trade horizon?",
        ],
      },
      {
        eyebrow: "Anti-hindsight",
        title: "Reconstruct what was knowable then",
        body: [
          "Historical winners look obvious after listings, celebrity posts, and billion-dollar charts. Replay only evidence available at each timestamp. Include competing contracts and failed derivatives from the same meta.",
          "A good replay log separates discovery, confirmation, crowd consensus, and saturation. The profitable entry often occurs between confirmation and saturation—not necessarily at contract creation.",
        ],
        example: "Instead of ‘PNUT went to $1B,’ ask: when did the real-world story go viral, which CAs existed then, when did independent attention converge, and what risks remained at each stage?",
      },
    ],
    takeaways: [
      "Narrative trading forecasts additional attention, not abstract quality.",
      "Enumerate competing CAs and verify creation order.",
      "Oldest, best, and market-chosen can be different contracts.",
      "Replay the information set available at the time.",
    ],
    quiz: [
      q("no1", "What does ‘OG contract’ most reliably describe?", ["Guaranteed official contract", "Earliest associated deployment under a defined search", "Largest market cap", "Safest holder distribution"], 1, "Earliest deployment is chronology, not endorsement."),
      q("no2", "Which question best tests a narrative?", ["Is the logo blue?", "Why will additional independent people care after entry?", "Did one influencer buy?", "Can the ticker be reused?"], 1, "Future independent attention is the economic thesis."),
      q("no3", "A later CA has more active attention than the oldest CA. What follows?", ["The later CA must win", "The oldest must win", "Chronology and current coordination must both be scored", "Buy both automatically"], 2, "No single attribute determines canonical coordination."),
      q("no4", "How do you reduce hindsight bias in a case study?", ["Use the final chart", "Hide failed contracts", "Reveal only information available at each timestamp", "Start after the listing"], 2, "A point-in-time replay tests the actual decision."),
    ],
  },
  {
    id: "tape",
    number: 7,
    track: "Weekend Core",
    weekendDay: 2,
    phase: "Operator",
    title: "Tape, momentum & crowd behavior",
    shortTitle: "Tape & momentum",
    kicker: "Read response to flow, not just candle color.",
    duration: "80 min",
    difficulty: "Core",
    outcome: "Interpret acceleration, absorption, failed breakouts, distribution, liquidity gaps, and momentum decay with transaction context.",
    prerequisites: ["narrative"],
    sections: [
      {
        eyebrow: "Response",
        title: "The same order means different things in different depth",
        body: [
          "Tape reading asks how price responds to aggressive buying and selling. A large sell that barely moves price can indicate absorption by willing buyers. A small sell that collapses price can reveal shallow depth or vanished bids. Neither observation proves what happens next.",
          "Normalize flow by liquidity and recent activity. Raw volume without depth, unique makers, and direction is incomplete.",
        ],
        sources: ["uniswap-impact", "pumpswap"],
      },
      {
        eyebrow: "Momentum",
        title: "Acceleration, continuation, exhaustion",
        body: [
          "Healthy continuation often combines new makers, sustained buy flow, higher accepted prices, and pullbacks that hold above prior value. Exhaustion can show rising volume with less price progress, repeated failed highs, shrinking new-buyer count, or insiders distributing into strength.",
          "A vertical candle is not automatically strength. It can be a thin pool, one large order, or coordinated wallets. Check the transaction feed and who supplied the move.",
        ],
        bullets: [
          "Acceleration: more independent demand per unit time.",
          "Absorption: aggressive orders meet opposing liquidity without proportional movement.",
          "Acceptance: price spends time/volume above a level rather than merely wicking through it.",
          "Exhaustion: effort increases while result decreases.",
        ],
      },
      {
        eyebrow: "Breakouts",
        title: "Wick, reclaim, hold, fail",
        body: [
          "A wick proves that price traded beyond the candle body and closed away from that extreme; rejection is the hypothesis, not an identity claim or guaranteed reversal. A reclaim matters when price returns through a level with follow-through. A breakout is stronger when it holds on retest and maker growth continues; it is weaker when the move depends on one wallet and immediately falls back into the range.",
          "Your job is not to label patterns after the fact. Write the expected response before the event: ‘If buyers are real, this sell should be absorbed and the prior high should hold within two minutes.’",
        ],
        example: "Entry near 6K, wick to 13K, exit around 9.2K can be excellent execution if the thesis was short-horizon momentum. Missing the top is not an error; violating the setup is.",
      },
      {
        eyebrow: "Context stack",
        title: "Chart + feed + wallets + narrative",
        body: [
          "No candle can tell you whether a dev moved supply, a bundle cluster distributed, or a news catalyst died. Combine chart response with raw trades, holder changes, funding alerts, and attention data.",
          "The best live note is conditional: observation, interpretation, counter-explanation, and invalidation. This prevents every green candle from becoming ‘organic’ and every red candle from becoming ‘rug.’",
        ],
        formula: "observation → hypothesis → counter-explanation → falsifiable next event",
      },
    ],
    takeaways: [
      "Read price response relative to depth and flow.",
      "Volume with diminishing progress can signal exhaustion.",
      "A wick records an intrainterval excursion; rejection needs lower-timeframe flow and follow-through.",
      "Write the expected next response before it occurs.",
    ],
    quiz: [
      q("tp1", "A large sell lands and price barely moves while makers keep growing. The best interpretation is…", ["Guaranteed pump", "Possible absorption that needs follow-through", "Guaranteed rug", "No information"], 1, "Absorption is a useful hypothesis, not a certainty."),
      q("tp2", "Rising volume with less upward price progress can indicate…", ["Automatic strength", "Potential distribution or exhaustion", "More liquidity by definition", "A confirmed OG"], 1, "More effort for less result deserves investigation."),
      q("tp3", "Why inspect the transaction feed behind a vertical candle?", ["Candles are illegal", "The move may come from one thin-liquidity order or coordinated wallets", "Volume never matters", "To change the CA"], 1, "Source and independence of flow determine what the candle means."),
      q("tp4", "Which is a falsifiable tape note?", ["This feels bullish", "If demand is real, the sell should be absorbed and the prior high reclaimed within two minutes", "The meme is funny", "Green candle good"], 1, "It defines an observable next event and a time horizon."),
    ],
  },
  {
    id: "risk",
    number: 8,
    track: "Weekend Core",
    weekendDay: 2,
    phase: "Operator",
    title: "Risk, sizing & strategy expectancy",
    shortTitle: "Risk & sizing",
    kicker: "Survive long enough to learn what your edge actually is.",
    duration: "80 min",
    difficulty: "Core",
    outcome: "Define risk in SOL, size around invalidation and liquidity, analyze expectancy, drawdown, capacity, and outlier dependence.",
    prerequisites: ["tape"],
    sections: [
      {
        eyebrow: "Risk unit",
        title: "Position size is not risk",
        body: [
          "Risk is the plausible loss when the setup fails, including slippage, gap risk, sell failure, and fees. A 1 SOL position with a reliable 10% exit may risk less than a 0.3 SOL position whose liquidity can vanish—but in memecoins, planned stops are not guaranteed fills.",
          "Start with a maximum SOL loss per attempt, then check whether the required position can enter and exit without changing the setup. If not, the trade has no valid size for you.",
        ],
        formula: "theoretical size = allowed SOL loss ÷ invalidation fraction; executable size ≤ liquidity capacity",
        warning: "A stop price is a scenario, not insurance. Size for discontinuous loss, failed transactions, and disappearing liquidity.",
      },
      {
        eyebrow: "Distribution",
        title: "Win rate is one coordinate",
        body: [
          "Record average win, average loss, median, tail loss, holding time, fees, and maximum adverse excursion. A setup that wins frequently but occasionally cannot sell may have negative expectancy despite a beautiful dashboard win rate.",
          "Use R-multiples to compare setups: one R is the amount you accepted losing before entry. Then test whether live losses actually respect the planned R.",
        ],
        formula: "expectancy in R = win rate × avg win R − loss rate × avg loss R − cost R",
      },
      {
        eyebrow: "Portfolio path",
        title: "Drawdown and risk of ruin",
        body: [
          "Positive expectancy does not prevent losing streaks. If five ordinary losses would make you abandon the process or force you to reduce at the worst time, size is too large.",
          "Do not set daily profit quotas that force trades. Use session loss limits, maximum concurrent exposure, setup limits, and a stop condition for degraded execution or emotional state.",
        ],
        bullets: [
          "Max loss per trade and per session.",
          "Max exposure to one token, cluster, narrative, and venue.",
          "No averaging down unless it is an explicitly tested setup.",
          "Kill the session after rule violations, not after missing a move.",
        ],
      },
      {
        eyebrow: "Capacity",
        title: "A profitable setup can be too small for the target",
        body: [
          "Capacity is how much capital a setup can absorb before your own entry, exit, and visibility degrade the edge. Tiny launch trades can show enormous percentages and still support little net SOL.",
          "Analyze results by setup and size bucket. If edge disappears above 1 SOL, a projection based on 10 SOL clips is fiction. If 80% of profits came from one trade, report that dependency explicitly.",
        ],
        example: "‘I make 2R per trade’ is incomplete without deployable size, frequency, correlation, cost, and drawdown.",
      },
    ],
    takeaways: [
      "Define allowed SOL loss before computing position size.",
      "Liquidity and gap risk cap executable size.",
      "Expectancy needs the full distribution and costs.",
      "Capacity and outlier dependence determine scalability.",
    ],
    quiz: [
      q("rs1", "What is the best definition of trade risk?", ["Position size", "Planned stop distance only", "Plausible loss under failure, execution, and liquidity scenarios", "Market cap"], 2, "Stops can slip or fail; risk includes the actual failure path."),
      q("rs2", "A 90% win-rate setup can lose money when…", ["SOL has decimals", "Rare losses are much larger than wins and costs", "It trades migrated tokens", "It uses a journal"], 1, "Win rate does not encode payoff asymmetry."),
      q("rs3", "What is capacity?", ["Wallet balance", "How much a setup can absorb before size degrades its edge", "Holder count", "A Jito tip"], 1, "Capacity connects percentage returns to deployable SOL."),
      q("rs4", "Why avoid a mandatory daily profit target?", ["Profit is bad", "It can force low-quality trades when opportunity is absent", "Every day has the same setups", "Fees are fixed"], 1, "Opportunity is variable; risk controls should govern the session."),
    ],
  },
  {
    id: "setups",
    number: 9,
    track: "Bonus Arsenal",
    phase: "Operator",
    title: "Four setup families—not a finite menu",
    shortTitle: "Setup families",
    kicker: "One setup, one horizon, one invalidation.",
    duration: "75 min",
    difficulty: "Core",
    outcome: "Use four public setup families as examples, then recombine universe, state, evidence, trigger, risk, and exit into a method you can test yourself.",
    prerequisites: ["risk"],
    sections: [
      {
        eyebrow: "Setup 1",
        title: "Fresh public launch: highest noise, shortest half-life",
        body: [
          "The thesis is not ‘new coin.’ It is that a public launch has unusually strong independent demand, acceptable creator/funder evidence, a legible narrative, and enough capacity for your tiny size before the information decays.",
          "Invalidation can be immediate dev-linked distribution, stalled independent makers, a stronger competing CA, or failure to move within the setup’s seconds-to-minutes horizon.",
        ],
        warning: "Speed magnifies selection. Buying every launch faster is a faster route to the base rate.",
      },
      {
        eyebrow: "Setup 2",
        title: "Final stretch and migration",
        body: [
          "The curve has already passed a partial survival test. Study progress speed, maker diversity, cluster behavior, attention, and whether completion is being pushed by a few wallets. Confirm the actual migration state and venue.",
          "Post-migration, watch whether early low-cost supply is absorbed, depth stabilizes, and makers continue after the first novelty burst. Engineered completion can exist specifically to unlock deeper exit liquidity.",
        ],
        sources: ["axiom-pulse", "pump-program", "pine"],
      },
      {
        eyebrow: "Setup 3",
        title: "Post-migration momentum",
        body: [
          "This setup gives up block-zero price in exchange for more information. The thesis needs sustained flow, broader holders, resilient depth, a live narrative, and a clear response level.",
          "The invalidation is not merely a red candle. It is loss of the behavior that justified continuation: failed reclaim, maker decay, unabsorbed cluster sell, broken catalyst, or deteriorating route/liquidity.",
        ],
      },
      {
        eyebrow: "Setup 4",
        title: "Wallet-confirmation—not blind copy trading",
        body: [
          "A tracked wallet can confirm a thesis when its archetype, horizon, entry regime, and current behavior match the token. It cannot replace the thesis. Determine whether the wallet bought, received, or internally transferred tokens and whether your alert delay leaves any edge.",
          "The best beginner workflow is often wallet alert → human context check → paper decision. Keep the wallet out of the entry rule until you can quantify its incremental value.",
        ],
        sources: ["solana-json", "solana-send"],
      },
    ],
    takeaways: [
      "Fresh-launch optionality comes with the worst base rate.",
      "Migration is a liquidity event, not a safety certificate.",
      "Momentum setups require behavioral invalidation.",
      "Wallet activity confirms context; it does not create a thesis.",
    ],
    quiz: [
      q("st1", "What is a valid fresh-launch thesis?", ["It is new", "Independent demand + acceptable ownership evidence + narrative + capacity", "The ticker is short", "Sniper % is zero"], 1, "Newness alone is the noisy universe, not an edge."),
      q("st2", "Why can final-stretch trading be cleaner than block zero?", ["Graduates cannot fail", "The token has passed part of a demand/survival filter", "Fees vanish", "Dev wallets disappear"], 1, "More evidence exists, though manipulation and failure remain possible."),
      q("st3", "A wallet alert should initially function as…", ["An automatic buy", "A context signal for a defined setup", "Proof of insider information", "A sell-only command"], 1, "Classify and measure its incremental value first."),
      q("st4", "What makes a momentum invalidation useful?", ["It is ‘red candle’", "It names the behavior and time horizon that should persist", "It changes after entry", "It depends only on PnL"], 1, "Behavioral invalidation links the exit to the original thesis."),
    ],
  },
  {
    id: "execution",
    number: 10,
    track: "Bonus Arsenal",
    phase: "Systems",
    title: "Execution: from signal to confirmed position",
    shortTitle: "Execution",
    kicker: "Seeing the trade, landing the trade, and confirming the trade are separate.",
    duration: "80 min",
    difficulty: "Advanced",
    outcome: "Explain transaction construction, economic bounds, compute, priority fees, Jito tips, RPC acceptance, confirmation, expiry, and failure reconciliation.",
    prerequisites: ["setups"],
    sections: [
      {
        eyebrow: "State machine",
        title: "Quote → build → simulate → sign → submit → observe → confirm",
        body: [
          "A transaction signature returned by an RPC means the node accepted the signed bytes for forwarding. It does not guarantee landing, success, or finality. Your system must observe status, detect blockhash expiry, and reconcile wallet balances.",
          "Fast paths may skip preflight. That removes one delay and one diagnostic layer; it does not make an invalid transaction valid. Keep a reliable build path and an emergency exit path tested before live use.",
        ],
        sources: ["solana-send", "solana-simulate"],
      },
      {
        eyebrow: "Three knobs",
        title: "Slippage bound, priority fee, Jito tip",
        body: [
          "Slippage/min-out protects the economic result. The Solana priority fee competes in the validator scheduler. A Jito tip competes in the block-engine auction. They are neither interchangeable nor guarantees.",
          "More fee can improve inclusion probability while making a negative-EV trade worse. Fee logic belongs inside expectancy and should adapt to the contended accounts and value of landing.",
        ],
        formula: "economic bound ≠ scheduler priority ≠ block-engine tip",
        sources: ["solana-fees", "jito", "helius-sender"],
      },
      {
        eyebrow: "Compute and failure",
        title: "Requested compute can cost money you never use",
        body: [
          "For legacy/v0 transactions, priority cost uses requested compute-unit limit, not actual consumption. Simulate, estimate, and add a measured margin instead of requesting the maximum by habit. Fees can be charged even when execution fails.",
          "Version changes matter: Solana’s upcoming v1 transaction fee configuration differs from legacy/v0. A robust operator reads current docs and versions every assumption.",
        ],
        sources: ["solana-fees", "solana-compute"],
      },
      {
        eyebrow: "Data and latency",
        title: "A fast feed without reconciliation is a fast liar",
        body: [
          "Polling, WebSockets, Geyser/gRPC, and low-level block feeds trade simplicity for latency and operational burden. Streams disconnect; events duplicate; forks and schema changes occur. Historical RPC backfill and commitment upgrades repair the story.",
          "Measure signal-to-decision, decision-to-send, send-to-land, failure rate, slippage, tips, and fill quality. Milliseconds matter only after selection has positive expectancy.",
        ],
        bullets: [
          "Persist a cursor or last processed slot.",
          "Deduplicate events and reconnect with backfill.",
          "Track processed, confirmed, and finalized states deliberately.",
          "Never mark a position open from a send response alone.",
        ],
      },
    ],
    takeaways: [
      "Submission is not landing; landing is not finality.",
      "Economic bounds, priority fees, and tips solve different problems.",
      "Compute limits and failed transactions affect net expectancy.",
      "Latency systems need gap repair and confirmation reconciliation.",
    ],
    quiz: [
      q("ex1", "An RPC returns a signature. What is proven?", ["The trade succeeded", "The RPC accepted the signed transaction for submission", "The trade finalized", "The tokens are in the wallet"], 1, "Observe and reconcile before changing position state."),
      q("ex2", "Which knob directly changes your minimum acceptable output?", ["Priority fee", "Jito tip", "Slippage/min-out bound", "Compute-unit price"], 2, "It is the economic protection layer."),
      q("ex3", "Why simulate compute usage?", ["To choose the ticker", "To avoid over-requesting compute and diagnose failure", "To create holders", "To change liquidity"], 1, "Requested limits affect priority cost in legacy/v0."),
      q("ex4", "What makes a low-latency stream production-worthy?", ["It never disconnects", "Reconnection, deduplication, backfill, and commitment upgrades", "A higher slippage setting", "More browser tabs"], 1, "Reliability completes latency."),
    ],
  },
  {
    id: "automation",
    number: 11,
    track: "Bonus Arsenal",
    phase: "Systems",
    title: "Bots, automation & defensible architecture",
    shortTitle: "Automation",
    kicker: "Automate an edge you can name, measure, and stop.",
    duration: "85 min",
    difficulty: "Advanced",
    outcome: "Classify bot types, design a legitimate research-to-execution stack, and impose guardrails before any automated transaction.",
    prerequisites: ["execution"],
    sections: [
      {
        eyebrow: "Language",
        title: "‘Dev bot’ and ‘whitelist bot’ are not standard products",
        body: [
          "A dev bot may mean deployment automation, a dev-wallet monitor, launch orchestration, volume automation, or a social/news monitor. A whitelist bot may mean project-side allowlist administration, user-side opportunity alerts, task grinding, or bypass tooling.",
          "Ask for the exact input, output, authority, and transaction behavior. The first two whitelist meanings can be ordinary operations; bypass and sybil tooling may violate rules or law and are outside this academy.",
        ],
        warning: "Ambiguous slang can conceal a completely different business model. Translate every bot into data source → decision → action → beneficiary.",
      },
      {
        eyebrow: "Build order",
        title: "Observer before executor",
        body: [
          "The highest-leverage first automations usually collect and enrich evidence: wallet/funder alerts, new-launch enrichment, migration watchers, and narrative/competing-CA monitors. They make a human analyst faster without outsourcing judgment.",
          "Only automate entry after a setup has a defined universe, label, rule, replay sample, paper results, cost model, and kill condition. Faster code scales whatever expectancy already exists.",
        ],
        formula: "manual rule → labeled journal → replay/backtest → alert → guarded execution → optimization",
        sources: ["memetrans", "solana-json"],
      },
      {
        eyebrow: "Architecture",
        title: "Ingest, state, decide, execute, reconcile",
        body: [
          "A serious system separates event ingestion, normalized token/wallet state, feature computation, strategy scoring, risk checks, transaction construction, submission routes, confirmation, and immutable logs. The strategy should not know a private key; a narrow signer enforces limits.",
          "Model confidence and missing data. If the feed is stale, the funder lookup fails, or the confirmation service is behind, the safe action is no trade—not a default buy.",
        ],
        bullets: [
          "Data plane: HTTP backfill + stream + parser + cache.",
          "Decision plane: features + setup rule + risk/capacity gates.",
          "Execution plane: builder + fee policy + signer + route.",
          "Control plane: confirmation + position state + logs + kill switch.",
        ],
      },
      {
        eyebrow: "Security boundary",
        title: "This academy never stores a seed phrase",
        body: [
          "Client-side HTML and localStorage are appropriate for course progress and notes—not secrets. Use paper mode first. Later systems should use a dedicated low-balance hot wallet, strict spend/position caps, a manual enable, allowlisted programs, audit logs, and reserve funds kept cold.",
          "Industrial farming research belongs in the defensive-analysis curriculum. The academy explains how to detect deceptive ownership and fake flow; it does not implement it.",
        ],
        sources: ["owasp-opsec", "pine", "chainalysis"],
      },
    ],
    takeaways: [
      "Translate ambiguous bot names into inputs, actions, and beneficiaries.",
      "Alerts and enrichment are the best first automations.",
      "Separate data, decision, execution, and control planes.",
      "Secrets never belong in the course app, browser storage, or Git.",
    ],
    quiz: [
      q("au1", "What is the best first bot for a beginner with no measured setup?", ["Auto-buy every launch", "A wallet/funder alert and enrichment tool", "A wash-volume bot", "A whitelist bypass bot"], 1, "Observation automation accelerates learning without automating undefined risk."),
      q("au2", "Which sequence is defensible?", ["Code → trade → invent thesis", "Manual rule → labeled data → replay → alert → guarded execution", "Buy bot → higher slippage → profit", "Copy wallet → hide losses"], 1, "Automation should follow measured decision rules."),
      q("au3", "Where should a seed phrase be stored in this academy?", ["localStorage", "A TypeScript constant", "GitHub Secrets", "Nowhere—the academy never accepts one"], 3, "The course app has no signing responsibility."),
      q("au4", "A feed lookup fails during an automated decision. The safe default is…", ["Buy smaller", "Use yesterday’s value", "No trade and log the missing dependency", "Increase the Jito tip"], 2, "Missing evidence invalidates the decision path."),
    ],
  },
  {
    id: "vod-capstone",
    number: 12,
    track: "Bonus Arsenal",
    phase: "Systems",
    title: "Historical replay, VOD study & capstone",
    shortTitle: "VOD capstone",
    kicker: "Extract decisions—not entertainment—from public tape.",
    duration: "2–4 hr lab",
    difficulty: "Advanced",
    outcome: "Run a point-in-time replay, annotate a public VOD, reconstruct a setup, and produce a falsifiable playbook without copying income claims.",
    prerequisites: ["automation"],
    sections: [
      {
        eyebrow: "Replay",
        title: "Freeze the information set",
        body: [
          "Choose a historical winner and at least two failed controls from the same period. Reveal events in timestamp order: catalyst, candidate contracts, early ownership, curve progress, migration, major posts, listings, distribution, and failure or continuation.",
          "At each checkpoint choose skip, watch, paper entry, add, trim, or exit—then lock the answer before revealing the next event. The final chart is never visible during the decision.",
        ],
        sources: ["coingecko-state", "coingecko-q1", "syndica-2024"],
      },
      {
        eyebrow: "VOD protocol",
        title: "Observe what the trader saw and what they ignored",
        body: [
          "For every entry, record universe, trigger, missing checks, size, fee/slippage context, expected horizon, management, exit, and outcome. For every non-trade, record why it was rejected. Skips are often the highest-value part of a VOD.",
          "Separate spoken explanation from your inference. ‘He bought after maker acceleration’ is observation; ‘he knew the dev’ is an unsupported story unless evidence appears.",
        ],
        bullets: [
          "Context: market regime, active meta, terminal tab, token state.",
          "Selection: why this coin instead of the adjacent ten?",
          "Execution: visible cost basis, size, fill, priority/tip settings if shown.",
          "Management: adds, partials, time stop, behavior after large sells.",
          "Counterfactual: what would have made the same action wrong?",
        ],
        sources: ["kick-hotted", "kick-vod-policy", "axiom-pulse", "axiom-faq"],
      },
      {
        eyebrow: "Screenshot reconstruction",
        title: "Two anonymized field notes",
        body: [
          "Field note A shows an average cost near 32K market cap, an exit marker around 72.8K, a wick above 110K, and a top-holder average buy near 92.7K. ‘A bit more than 2×’ is directionally plausible for a small clip, but exact PnL requires fills, partials, price impact, and fees. A claim that 10 SOL could fit below 40K is a capacity claim to simulate.",
          "Field note B shows average cost near 5.99K, an exit around 9.24K, and a wick near 13K. Exiting below the wick can be fully correct. The question is whether the exit followed the setup’s invalidation or merely emotion after seeing unrealized profit.",
        ],
        warning: "The raw Discord screenshots are intentionally excluded from this public repository. Private identities and messages are not course assets.",
      },
      {
        eyebrow: "Capstone",
        title: "Write one setup you could hand to a skeptical operator",
        body: [
          "Define universe, required data, disqualifiers, trigger, size/capacity rule, expected horizon, invalidation, exit logic, cost model, logging schema, sample requirement, and automation boundary. Include one way the backtest can lie.",
          "The capstone passes when another person can label the same historical opportunities with reasonable consistency—and when the rule includes ‘no trade’ states.",
        ],
        formula: "edge = selection × timing × sizing × execution × exit × repeatability",
      },
    ],
    takeaways: [
      "Point-in-time replay removes the final-chart cheat code.",
      "Study skips and adjacent alternatives, not just winning entries.",
      "Separate observation, trader explanation, and your inference.",
      "A real playbook is falsifiable and includes no-trade states.",
    ],
    quiz: [
      q("vc1", "What is the best control for a historical winner replay?", ["Another famous winner", "Failed contemporaneous tokens from the same narrative/regime", "The final chart", "A guru’s recap"], 1, "Controls reduce hindsight and survivor selection."),
      q("vc2", "Which VOD note is an observation?", ["He has insider information", "He bought after maker acceleration on Final Stretch", "The dev is trustworthy", "This will 10×"], 1, "It describes visible timing without inventing motive."),
      q("vc3", "Why log non-trades?", ["To inflate sample size", "To identify the selection rule and missed/avoided outcomes", "Because every skip loses money", "To avoid recording fees"], 1, "The skip rule is part of edge and protects against cherry-picking."),
      q("vc4", "A capstone rule without a no-trade state is…", ["More profitable", "Incomplete because every candidate becomes a forced trade", "A Jito bundle", "Ready to automate"], 1, "Disqualifiers and missing-data states are essential."),
    ],
  },
];

export const diagnosticQuestions: Question[] = [
  q("d1", "A 1 SOL buy works at $30K market cap. Can 10 SOL use the same expected return?", ["Yes, market cap scales linearly", "Not without measuring reserves, impact, and exit capacity", "Yes if slippage is 100%", "Only on Tuesdays"], 1, "Size changes AMM state and may destroy the edge."),
  q("d2", "A returned transaction signature means…", ["Finalized trade", "The RPC accepted the bytes for submission", "Guaranteed fill", "Zero fees"], 1, "You still need observation, confirmation, and reconciliation."),
  q("d3", "Eight top wallets share one direct funder and repeated synchronized exits. Treat them as…", ["Eight independent holders", "A likely cluster with confidence caveats", "A DEX", "Burned supply"], 1, "Multiple corroborating edges support a common-control hypothesis."),
  q("d4", "Which item is not the same as a Jito tip?", ["Priority fee", "A payment in Jito’s auction", "A transaction cost", "A landing input"], 0, "Priority fees and tips compete in different mechanisms."),
  q("d5", "The oldest CA for a meme is automatically the winner.", ["True", "False"], 1, "Provenance matters, but active coordination, distribution, and liquidity can converge elsewhere."),
  q("d6", "A large sell barely moves price and new makers keep arriving. This is…", ["Possible absorption requiring confirmation", "Guaranteed 10×", "Proof of fake volume", "No longer risky"], 0, "Read the next response and the source of flow."),
  q("d7", "What should be automated first?", ["A rule you cannot explain", "Evidence collection for a manual process", "Seed phrase storage", "Every new launch"], 1, "Alerts and enrichment give leverage while preserving judgment."),
  q("d8", "What does a low visible dev percentage prove?", ["Fair launch", "Only the labeled balance under current attribution", "No linked wallets", "No future sell"], 1, "Cluster-adjusted ownership can differ."),
  q("d9", "Which period is the closest modern Solana VOD laboratory?", ["2013", "2021 only", "Late 2023 through January 2025", "No historical period"], 2, "That period formed the current launchpad/terminal workflow."),
  q("d10", "A 70 ms bot that buys every new token has…", ["A guaranteed edge", "Fast execution but undefined selection expectancy", "No fees", "A canonical CA detector"], 1, "Speed multiplies the rule it executes."),
];
