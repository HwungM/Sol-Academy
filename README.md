# Sol Academy

An interactive, evidence-backed course for learning how Solana memecoin markets work before trying to extract a repeatable process from fast-moving trading VODs.

The academy has a three-day orientation and proof path, followed by optional depth:

- **Day 1 — Market orientation:** Modules 01–04 cover the game map, money math, token lifecycle, and terminal literacy.
- **Day 2 — Decision orientation:** Modules 05–08 cover wallet evidence, narratives, tape reading, and risk. Together, Days 1 and 2 contain 7h35 of lesson material, or roughly 9–10 focused hours with checks and breaks.
- **Day 3 — Performance gate:** A 90–120 minute lab translates concepts across terminals, provides 16 guided practice scenarios, and ends with 16 different exam scenarios. Passing requires at least 85% overall, no domain below 50%, every critical-error scenario correct, and two VOD annotations scoring at least 88% for completeness.
- **Bonus Arsenal:** Modules 09–12 deepen setup families, execution internals, automation architecture, historical replay, and VOD study after the core performance proof.

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
- local progress and VOD notes with JSON export
- an evidence library linking claims to primary documentation, on-chain research, and clearly labeled secondary reporting
- a commissioned 32-piece editorial image system for modules, drills, history cases, and major workspaces; see [the art direction](docs/art-direction.md)

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Progress and notebook entries stay in your browser's local storage. The app does not connect to a wallet, request a seed phrase, execute trades, or send your study data to a server.

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
6. Use progressive replay and a journal to form, test, and quantify a manual setup before considering automation.

Completing Modules 01–08 earns **Screen Oriented** status. **VOD Literate** is reserved for learners who also clear the Day 3 exam and submit two complete VOD annotations. The labels measure course performance, not profitability or readiness to risk money.

The material distinguishes facts visible on-chain from vendor labels and trader inferences. Historical winners are used to teach decision-making and failure modes, not as hindsight promises.

## Safety

This is educational software, not financial advice. Memecoins are exceptionally risky, thin markets can make displayed gains impossible to realize, and past outliers do not establish a repeatable edge. Never paste a seed phrase or private key into this project—or any trading tool you have not independently audited.
