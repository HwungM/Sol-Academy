# Sol Academy

An interactive, evidence-backed course for learning how Solana memecoin markets work before trying to extract a repeatable process from fast-moving trading VODs.

The academy has a three-day orientation and proof path, followed by optional depth:

- **Day 1 — Market orientation:** Modules 01–04 cover the game map, money math, token lifecycle, and terminal literacy.
- **Day 2 — Decision orientation:** Modules 05–08 cover wallet evidence, narratives, tape reading, and risk. Together, Days 1 and 2 contain 7h35 of lesson material, or roughly 9–10 focused hours with checks and breaks.
- **Day 3 — Performance gate:** A 90–120 minute lab translates concepts across terminals, provides 16 guided practice scenarios, and ends with 16 different exam scenarios. Passing requires at least 85% overall, no domain below 50%, every critical-error scenario correct, and two VOD annotations scoring at least 88% for completeness.
- **Bonus Arsenal:** Modules 09–12 deepen setup families, execution internals, automation architecture, historical replay, and VOD study after the core performance proof.
- **Edge Foundry:** A final six-stage research lab turns a personal observation into a versioned, falsifiable paper method with an untouched holdout, evidence ledger, red-team checks, and a guarded automation boundary.

The product includes:

- 12 sequenced modules split into Day 1, Day 2, and the optional Bonus Arsenal
- a Day 3 terminal lab with 16 practice and 16 unseen exam scenarios—exactly two per Screen, Math, Wallets, Narrative, Tape, Risk, Execution, and VOD domain
- 48 module questions plus an entry diagnostic
- decision drills built around incomplete, adversarial market data
- progressive historical replays that reveal one checkpoint only after the learner locks a Skip, Watch, Paper entry, Add, Trim, or Exit decision with a rationale
- a structured VOD notebook scored across eight dimensions, with evidence grades and explicit fields for state, trigger, size/risk, invalidation, exit plan, and the skipped alternative
- cross-platform translation between terminal labels and the underlying operator questions
- an interactive six-case candlestick lab covering OHLC anatomy, volume, thin-liquidity impulses, failed breakouts, absorption, exhaustion, and bond-event volatility
- real candlestick charts inside the Day 3 Tape cases rather than decorative bars
- learning-based XP, six operator ranks, missions, and mastery achievements
- market-cap, liquidity, price-impact, position-sizing, and expectancy calculators
- historical studies covering the late-2023 through early-2025 Solana cycle and newer 2026 evidence
- a research-backed trench-language layer throughout every module, with public Reddit/X usage translated into observable evidence and explicit “does not prove” warnings
- a searchable glossary covering candle mechanics and current phrases such as trenching, clicking, PvP, prebond, fullclip, dev out, deriv, vamp, god candle, roundtrip, and top-blast
- an interactive Edge Foundry that separates OG/canonical identification from trading edge, measures precision, recall, missed winners, baseline expectancy, lift, and discipline, and preserves evidence by method version across cloud sync
- optional ChatGPT sign-in for private cloud progress across devices, with local fallback and JSON export
- an evidence library linking claims to primary documentation, on-chain research, and clearly labeled secondary reporting
- a commissioned 32-piece editorial image system for modules, drills, history cases, and major workspaces; see [the art direction](docs/art-direction.md)

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You can use the academy without signing in; anonymous progress and notebook entries stay in that browser's local storage. Sign in with ChatGPT to sync a separate private profile across your phone and computers. Existing browser progress merges into your profile the first time you sign in, and a local copy remains available if the network drops.

The app does not connect to a wallet, request a seed phrase, or execute trades. Cloud sync stores only your academy progress and notebook data in the site's built-in database; it does not require Firebase, Supabase, an API key, or another account.

## Verify the release

```bash
npm test
```

The test command creates a production build, checks the rendered product shell, verifies the course corpus and Day 3 scenario balance, enforces the replay action set and VOD annotation contract, rejects private screenshot identifiers, validates every evidence-library URL, and confirms that all mapped editorial assets and social metadata ship correctly.

## Learning model

The curriculum follows a strict progression:

1. Learn enough mechanics and terminal vocabulary to orient yourself on a fast screen.
2. Interpret wallets, holders, developers, snipers, and launch structure without overclaiming identity.
3. Read attention, momentum, liquidity, execution quality, and risk from incomplete evidence.
4. Transfer those concepts to unfamiliar screens and unseen scenarios in the Day 3 performance gate.
5. Reconstruct real VOD decisions without hindsight leakage or invented evidence.
6. Use progressive replay and the Edge Foundry to specify a causal hypothesis, freeze a filter, compare it with a baseline, and log every accepted and rejected opportunity without hindsight leakage.
7. Automate observation, enrichment, alerts, and paper logging first; consider execution only after unseen evidence, realistic costs, capacity, and a predeclared kill condition survive review.

Completing Modules 01–08 earns **Screen Oriented** status. **VOD Literate** is reserved for learners who also clear the Day 3 exam and submit two complete VOD annotations. The labels measure course performance, not profitability or readiness to risk money.

The material distinguishes facts visible on-chain from vendor labels and trader inferences. Historical winners are used to teach decision-making and failure modes, not as hindsight promises.

## Safety

This is educational software, not financial advice. Memecoins are exceptionally risky, thin markets can make displayed gains impossible to realize, and past outliers do not establish a repeatable edge. Never paste a seed phrase or private key into this project—or any trading tool you have not independently audited.
