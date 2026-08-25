# Sol Academy

An interactive, evidence-backed course for learning how Solana memecoin markets actually work before trying to extract strategy from fast-moving trading VODs.

The academy now has two clear layers:

- **2-Day Core Path:** Modules 01–08 contain 7h35 of lesson material, or roughly 9–10 focused hours with checks and breaks. Complete Day 1 and Day 2 whenever they fit your schedule; this is the minimum path to understanding a fast memecoin VOD.
- **Bonus Arsenal:** Modules 09–12 add setup families, execution internals, automation architecture, historical replay, and a full VOD capstone.

The product includes:

- 12 sequenced modules split into the 2-Day Core Path and optional Bonus Arsenal
- 48 graded questions plus an entry diagnostic
- decision drills built around incomplete, adversarial market data
- learning-based XP, six operator ranks, missions, and mastery achievements
- market-cap, liquidity, price-impact, position-sizing, and expectancy calculators
- historical tape studies covering the late-2023 through early-2025 Solana cycle and newer 2026 evidence
- a searchable trench-language glossary
- a local VOD observation notebook with JSON export
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

The test command creates a production build, checks the rendered product shell, verifies the complete course corpus, rejects private screenshot identifiers, validates every evidence-library URL, and confirms that all mapped editorial assets and social metadata ship correctly.

## Learning model

The curriculum follows a strict progression:

1. Read the market and token lifecycle.
2. Interpret wallets, holders, developers, snipers, and launch structure without overclaiming identity.
3. Read attention, momentum, liquidity, and execution quality.
4. Build a repeatable observation and review process.
5. Quantify a manual edge before considering automation.

The material distinguishes facts visible on-chain from vendor labels and trader inferences. Historical winners are used to teach decision-making and failure modes, not as hindsight promises.

## Safety

This is educational software, not financial advice. Memecoins are exceptionally risky, thin markets can make displayed gains impossible to realize, and past outliers do not establish a repeatable edge. Never paste a seed phrase or private key into this project—or any trading tool you have not independently audited.
