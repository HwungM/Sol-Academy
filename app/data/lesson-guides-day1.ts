import type { LessonGuide } from "./lesson-guide-types";

export const day1LessonGuides: Record<string, LessonGuide> = {
  "game-map:0": {
    plainEnglish:
      "Two screenshots can both show SOL earned while describing completely different jobs. First ask how the SOL entered the wallet: from buying and selling in a public market, from fees paid by other traders, from selling a tool or service, or from access ordinary traders did not have. Only the first is evidence of a public trading method you might be able to study and repeat.",
    terms: [
      { term: "PnL", meaning: "Profit and loss: money gained or lost after comparing what went in with what came out." },
      { term: "Public-market trading", meaning: "Buying from a venue open to the public and later selling back into a public venue." },
      { term: "Creator revenue", meaning: "Fees or other income earned because other people trade a token the creator launched." },
      { term: "Infrastructure", meaning: "Tools such as terminals, data, relays, or referrals that earn from other traders' activity." },
      { term: "Privileged flow", meaning: "Supply, information, or timing that was unavailable to ordinary public buyers." },
    ],
    walkthrough: {
      title: "Follow the SOL before judging the screenshot",
      steps: [
        "A public trader buys fictional $SPARK for 2 SOL and later sells it for 3 SOL: that is +1 SOL gross trading PnL.",
        "The $SPARK creator receives 0.4 SOL in turnover fees: real income, but not profit from the public trade above.",
        "A terminal operator earns 0.3 SOL from subscriptions: also real income, but it tests a software business rather than a token setup.",
        "A wallet receives a 20 SOL transfer and ends at 23 SOL: the transfer is capital, so the visible balance alone does not prove +23 SOL of profit.",
      ],
    },
    checkpoint: {
      prompt: "A wallet starts empty, receives 20 SOL, trades $SPARK, and ends with 23 SOL. What can you responsibly claim, and what still needs checking?",
      answer:
        "You can say its net assets increased by 3 SOL before accounting for withdrawals, unsold tokens, and omitted costs. You cannot call the 23 SOL balance trading profit, and you still need the complete deposits, withdrawals, positions, and fee history.",
    },
  },

  "game-map:1": {
    plainEnglish:
      "Rare giant winners can exist while the typical attempt still loses. Screenshots usually select the survivor and hide all the failed launches, wallets, or months that supplied the risk. Start with the full number of attempts, then separate money actually locked in by selling from the displayed value of tokens still held.",
    terms: [
      { term: "Right tail", meaning: "The small number of unusually large winners at the far end of the results." },
      { term: "Survivorship bias", meaning: "Studying visible winners while missing the many attempts that failed or disappeared." },
      { term: "Base rate", meaning: "How often an outcome occurs in the full starting population before special filters are applied." },
      { term: "Realized PnL", meaning: "Profit or loss locked in through completed sales and wallet flows." },
      { term: "Unrealized PnL", meaning: "An estimate based on the current displayed value of a position that has not been fully sold." },
    ],
    walkthrough: {
      title: "Put the winner back into its denominator",
      steps: [
        "Using the lesson's dated 98.7% estimate, 10,000 launches would leave about 130 graduates and about 9,870 non-graduates.",
        "Graduation is only a lifecycle milestone; those 130 tokens are not automatically profitable trades.",
        "Suppose one of 20 strategy wallets earns +200 SOL while the other 19 lose 10 SOL each. The combined result is only +10 SOL before costs.",
        "A screenshot of only the +200 SOL wallet is genuine but still hides 95% of the trials and almost all of the risk.",
      ],
    },
    checkpoint: {
      prompt: "Why does one verified +200 SOL wallet not establish that its strategy has positive expectancy?",
      answer:
        "The result has no denominator. You need every wallet and attempt produced by the same rules, including losses, transfers, open positions, and costs. One rare winner can coexist with a losing strategy.",
    },
  },

  "game-map:2": {
    plainEnglish:
      "Study history that resembles the workflow you are trying to understand. The late-2023 through January-2025 period is useful because rapid launchpads, curves, wallet labels, and specialized transaction delivery shaped the screens seen in modern replays. It teaches the workflow's lineage, not today's exact fees or venue rules, which must still be checked live.",
    terms: [
      { term: "Regime", meaning: "A period with a particular mix of activity, liquidity, competition, and participant behavior." },
      { term: "Launchpad", meaning: "A system that creates a token and opens its initial market under preset rules." },
      { term: "Bonding curve", meaning: "A program that changes a token's price by formula as people buy or sell." },
      { term: "Notional volume", meaning: "The summed value of trades; the same capital can be counted again when it trades repeatedly." },
    ],
    walkthrough: {
      title: "Use broad history without turning it into a buy signal",
      steps: [
        "A 2021 replay can teach how attention spreads from a popular meme into related tokens.",
        "A 2024 replay is more useful for learning a curve-to-migration terminal workflow and the speed of automated competition.",
        "Even if the whole meme sector trades billions in a day, fictional $SPARK may have only 50 SOL of relevant depth.",
        "Before acting, verify $SPARK's live venue, state, fees, and route instead of copying a historical interface label.",
      ],
    },
    checkpoint: {
      prompt: "Explain why high sector volume and a useful 2024 replay still do not tell you whether a $SPARK trade is executable today.",
      answer:
        "Sector volume describes broad trading, not $SPARK's available depth. The replay teaches a similar workflow, but protocols, fees, migration venues, and routes can change, so the live contract state and pool must decide today's execution.",
    },
  },

  "game-map:3": {
    plainEnglish:
      "Your first skill is being able to say what the screen shows, what it does not show, and what would prove you wrong. An edge comes later, after the same clearly written rule produces useful results across many recorded attempts after costs. Speed and automation only help once the rule is understandable and testable.",
    terms: [
      { term: "VOD", meaning: "A recorded video or stream replay that can be paused at the original decision point." },
      { term: "Thesis", meaning: "A specific explanation for why the trade might work from the information available now." },
      { term: "Counter-explanation", meaning: "A different cause that could produce the same visible pattern." },
      { term: "Invalidation", meaning: "Observable evidence that says the thesis is wrong and the planned trade should be exited or skipped." },
      { term: "Edge", meaning: "A repeatable decision rule with evidence of positive results after costs, not merely a strong feeling." },
    ],
    walkthrough: {
      title: "Pause one fictional $SPARK replay",
      steps: [
        "Observation: $SPARK has just migrated, buyer count is rising, and a large sell did not keep price down.",
        "Missing information: the apparent buyers may share a funder, and the low-cost early holders may still be waiting to sell.",
        "Thesis: if demand is broad, new buyers should continue and later sells should be absorbed. Counter-explanation: linked wallets may be manufacturing that activity.",
        "Invalidation: funding checks reveal one controller, buyer growth stops, or the recovered price immediately fails.",
        "Plan: cap the possible loss, account for price impact, and define the exit and time limit before submitting anything.",
      ],
    },
    checkpoint: {
      prompt: "Why is '$SPARK looks strong' not a usable thesis? Rewrite it as evidence, a counter-explanation, and an invalidation.",
      answer:
        "'Looks strong' cannot be tested. A usable version is: several apparently unrelated buyers absorbed a large sell; they may instead be linked; the idea is invalid if common funding appears or price and buyer growth fail after the recovery.",
    },
  },

  "money-math:0": {
    plainEnglish:
      "SOL is Solana's native asset: it can be what you spend to buy a token and what you spend on network fees. A token's displayed market cap multiplies its latest small-unit price across circulating supply; it is not a wallet of cash waiting for sellers. Liquidity tells you far more about how much can actually trade near that price.",
    terms: [
      { term: "Quote asset", meaning: "The asset used to state and pay a price, such as SOL for a $SPARK purchase." },
      { term: "Marginal price", meaning: "The current price quoted for the next small amount, not a guaranteed price for the whole supply." },
      { term: "Circulating supply", meaning: "Tokens currently counted as available in the market-cap calculation." },
      { term: "FDV", meaning: "Fully diluted valuation: current marginal price multiplied by the chosen maximum or fully issued supply." },
      { term: "Liquidity", meaning: "Assets or order depth available to complete trades; it determines how strongly an order moves the price." },
    ],
    walkthrough: {
      title: "Price fictional $SPARK from units to executable value",
      steps: [
        "Assume 1 SOL is $150 and one $SPARK is quoted at 0.00001 SOL, so the displayed dollar price is $0.0015.",
        "With 100,000,000 circulating tokens, market cap is 1,000 SOL, or $150,000.",
        "With 1,000,000,000 fully diluted tokens, FDV is 10,000 SOL, or $1,500,000.",
        "Suppose the relevant pool has only 50 SOL on its quote side. The $150,000 market cap did not create $150,000 of exit cash.",
        "A large sale changes the pool while it executes, so later units receive a worse price than the first units.",
      ],
    },
    checkpoint: {
      prompt: "If $SPARK's marginal price doubles, why can a holder still receive much less than a 2x wallet return when selling?",
      answer:
        "The doubled price applies only near the current margin. A real sale consumes limited liquidity and moves the price downward, while fees and route costs reduce the proceeds further.",
    },
  },

  "money-math:1": {
    plainEnglish:
      "A constant-product pool holds two reserves and keeps their product approximately constant. Buying $SPARK adds SOL and removes $SPARK, so the remaining token reserve becomes scarcer and the price rises during your own order. That is why a large order receives a worse average price than the small price shown before it starts.",
    terms: [
      { term: "AMM", meaning: "Automated market maker: a program that quotes trades from a formula and its current reserves." },
      { term: "Reserve", meaning: "The amount of each asset the AMM currently uses for pricing and swaps." },
      { term: "Invariant", meaning: "The relationship the formula preserves; in this model, SOL reserve times token reserve equals k." },
      { term: "Spot price", meaning: "The marginal reserve ratio before or after a trade, not the average price of a large order." },
      { term: "Average fill", meaning: "Total quote asset spent divided by the tokens actually received." },
    ],
    walkthrough: {
      title: "A 10 SOL buy changes the fictional $SPARK pool",
      steps: [
        "Ignore fees. Start with 100 SOL and 100,000 $SPARK, so k is 10,000,000 and the starting spot price is 0.001 SOL per $SPARK.",
        "Add a 10 SOL buy. The new SOL reserve is 110, so the formula leaves 10,000,000 / 110 = about 90,909 $SPARK.",
        "The buyer receives about 100,000 - 90,909 = 9,091 $SPARK, not 10,000.",
        "Average fill is 10 / 9,091 = about 0.0011 SOL, 10% above the starting spot price.",
        "The ending spot is 110 / 90,909 = about 0.00121 SOL, 21% above the starting spot because the pool now has more SOL and fewer tokens.",
      ],
    },
    checkpoint: {
      prompt: "Why does the 10 SOL buyer receive about 9,091 $SPARK instead of 10,000, and why does the next buyer see a higher price?",
      answer:
        "Each part of the order removes tokens and adds SOL, changing the reserves while the order executes. Later parts therefore buy from a scarcer token reserve, and the next buyer starts from the new 110 SOL and roughly 90,909-token state.",
    },
  },

  "money-math:2": {
    plainEnglish:
      "Price impact happens because your planned order is large relative to the available liquidity; it is already reflected in a fresh quote for that size. Slippage happens when the market changes after that quote but before your transaction lands. Slippage tolerance is only the worst change you authorize—it does not deepen the pool or make validators process you faster.",
    terms: [
      { term: "Price impact", meaning: "The price movement caused by the size of your own order against available liquidity." },
      { term: "Quote", meaning: "An estimate of input, output, route, and fees using a particular recent market state." },
      { term: "Slippage", meaning: "The difference caused when actual execution state is worse than the state used for the quote." },
      { term: "Slippage tolerance", meaning: "The maximum adverse quote-to-execution change you permit before the transaction must fail." },
      { term: "Minimum output", meaning: "The fewest tokens the transaction is allowed to receive under its economic bound." },
    ],
    walkthrough: {
      title: "Separate $SPARK impact from state change",
      steps: [
        "A fresh quote says 1 SOL will receive 1,000 $SPARK. That amount already includes the impact of this 1 SOL order.",
        "At 3% tolerance, the transaction sets a minimum output of 970 $SPARK.",
        "Another buyer lands first, so the same order would now receive only 950 $SPARK.",
        "The 970 minimum makes it fail. At 6% tolerance the minimum would be 940, so it could fill at 950—but the pool did not become deeper or faster.",
      ],
    },
    checkpoint: {
      prompt: "What should you change when your own $SPARK order has excessive impact, and why is wider slippage tolerance not the fix?",
      answer:
        "Reduce the order, wait for more depth, or use a genuinely deeper route. Wider tolerance only permits a worse quote-to-fill change; it does not reduce the reserve movement caused by the order itself.",
    },
  },

  "money-math:3": {
    plainEnglish:
      "Judge a trade from actual wallet flows, not the percentage shown on a chart. Count what was spent, what every partial sale returned, and every fee, tip, failed attempt, or remaining position. Judge a strategy by the probability-weighted average of all wins and losses after those costs, not by win rate alone.",
    terms: [
      { term: "Gross return", meaning: "Proceeds or chart gain before all trading and execution costs are removed." },
      { term: "Net PnL", meaning: "Actual proceeds minus capital spent and every relevant cost." },
      { term: "Partial exit", meaning: "Selling only part of a position, leaving the rest still exposed to price changes." },
      { term: "Expectancy", meaning: "The long-run probability-weighted average result per attempt after costs." },
      { term: "R", meaning: "The amount planned to be lost if the trade is invalidated; it is a risk unit, not the position size." },
    ],
    walkthrough: {
      title: "Reconcile one $SPARK trade and one setup",
      steps: [
        "Buying $SPARK sends 2.00 SOL to the trade and 0.04 SOL to entry fees and delivery costs.",
        "Several partial exits return a total of 2.70 SOL.",
        "Exit costs total 0.03 SOL and one failed attempt costs another 0.01 SOL.",
        "Net PnL is 2.70 - 2.00 - 0.04 - 0.03 - 0.01 = +0.62 SOL.",
        "A setup that wins 35% at +3R, loses 65% at -1R, and averages 0.10R of costs has expectancy 0.35 x 3 - 0.65 x 1 - 0.10 = +0.30R per trade.",
      ],
    },
    checkpoint: {
      prompt: "How can the 35%-win setup above be profitable, and what would make that conclusion incomplete?",
      answer:
        "Its less-frequent winners are three times the planned loss, producing +0.30R expectancy after stated costs. The conclusion is incomplete without a sufficiently large, representative sample and costs that include failed and partial executions.",
    },
  },

  "lifecycle:0": {
    plainEnglish:
      "A token moves through distinct on-chain states. It receives a unique mint, trades first under the launch system's rules, reaches that system's completion condition, and then may migrate into a shared-liquidity AMM pool. A terminal may call both completion and migration 'graduation,' but the pool is not available until the migration transaction is confirmed.",
    terms: [
      { term: "Mint", meaning: "The token's unique on-chain address and identity; a name or ticker is not enough." },
      { term: "Program state", meaning: "On-chain data that records the market's current rules and lifecycle status." },
      { term: "Bonding curve", meaning: "The launch program's formula-based initial market for token buys and sells." },
      { term: "Migration", meaning: "The on-chain process that moves or establishes assets in the designated post-curve pool." },
      { term: "AMM pool", meaning: "The shared token and quote-asset reserves used for formula-based post-migration trading." },
    ],
    walkthrough: {
      title: "Follow fictional $SPARK across its state changes",
      steps: [
        "12:00: the $SPARK mint and curve state are created; traders must identify it by mint, not ticker.",
        "12:01-12:06: buys and sells use the launch curve rather than a post-migration pool.",
        "12:06: the preset threshold is reached and the curve state becomes complete.",
        "12:06:00-12:06:08: migration can still be pending, so a post-migration route may not yet exist.",
        "12:06:08: the migration transaction confirms and the live route switches to the designated AMM pool.",
      ],
    },
    checkpoint: {
      prompt: "A terminal says $SPARK is 100% complete, but no pool address or migration signature is confirmed. What state can you assert, and what can you not assert?",
      answer:
        "You can assert that the curve met its completion condition. You cannot yet assert that migration finished or that an AMM route is live; those require the confirmed migration state and pool.",
    },
  },

  "lifecycle:1": {
    plainEnglish:
      "New Creations, Final Stretch, and Migrated are three different trading situations, not just three filters. Very new tokens offer the earliest entry but almost no evidence and the highest failure rate. Near completion there is more observed activity but also more cheap early supply; after migration there may be deeper liquidity, while those early holders can sell into new buyers.",
    terms: [
      { term: "New Creations", meaning: "Tokens recently created and still early in their launch-curve market." },
      { term: "Final Stretch", meaning: "Tokens whose curve is close to its preset completion condition." },
      { term: "Migrated", meaning: "Tokens with a confirmed post-curve pool where trading now continues." },
      { term: "Distribution wave", meaning: "Early holders selling low-cost supply into later demand." },
    ],
    walkthrough: {
      title: "The same $SPARK token, three different questions",
      steps: [
        "At 45 seconds old and 12% curve progress, $SPARK has little history; ask who created and funded the first buyers.",
        "At 95% progress, ask whether many apparently separate buyers are finishing the curve or one controller is creating most of the progress.",
        "After a migration signature and pool address appear, ask whether new depth and buyer growth can absorb sales from early low-cost holders.",
      ],
    },
    checkpoint: {
      prompt: "Why does $SPARK reaching Final Stretch give you more evidence than New Creation status but still not prove healthy post-migration demand?",
      answer:
        "More trades and progress now exist to inspect, but they may come from linked wallets, and early holders still have cheap supply to sell. Only confirmed migration followed by sustained, apparently broad demand and sell absorption addresses the next regime's question.",
    },
  },

  "lifecycle:2": {
    plainEnglish:
      "A launchpad is a rule system, so the same-looking token can behave differently on another venue. For every launch, fill in the same translation sheet: what you spend, how price changes, what finishes the initial market, where trading goes next, what fees apply, who has control, and who can remove later liquidity.",
    terms: [
      { term: "Venue adapter", meaning: "A translation sheet that maps one launch system's exact rules into the questions your method needs answered." },
      { term: "Authority", meaning: "An address allowed to perform a privileged action, such as changing configured behavior when the program permits it." },
      { term: "LP position", meaning: "A liquidity-provider claim that can control or withdraw a share of pool reserves." },
      { term: "Migration target", meaning: "The program and pool type where trading is intended to continue after completion." },
      { term: "Token extension", meaning: "Optional token-program behavior that can alter transfers, fees, or control and must be inspected directly." },
    ],
    walkthrough: {
      title: "Compare two clearly hypothetical $SPARK launches",
      steps: [
        "Venue A quotes $SPARK in SOL on a fixed curve, completes after a stated threshold, and migrates to a named AMM.",
        "Venue B quotes a same-named token in USDC through an auction and sends later trading to a different pool type.",
        "Venue A's initial LP position is locked; on Venue B an operator-controlled LP position can be withdrawn. Their future exit depth therefore has different risk.",
        "Before comparing either setup, record live formula, threshold, fees, authorities, token behavior, migration target, and LP control from their actual accounts.",
      ],
    },
    checkpoint: {
      prompt: "Two $SPARK tokens show the same market cap on different launchpads. Explain why one entry and exit rule cannot safely be copied to both.",
      answer:
        "Their quote assets, pricing formulas, completion thresholds, fees, migration destinations, authorities, and removable liquidity can differ. Those rules change both the fill and the ways the trade can fail, regardless of equal displayed market cap.",
    },
  },

  "lifecycle:3": {
    plainEnglish:
      "A useful metric depends on what the token is doing right now. At creation, look for identity and control links; near completion, ask who is causing the progress; after migration, ask whether available liquidity and new demand can absorb sellers. Timing is an observation, not proof of manipulation—several plausible causes must be tested against wallet and transaction evidence.",
    terms: [
      { term: "Common funder", meaning: "A source wallet that supplied capital to several wallets, creating a visible link between them." },
      { term: "Progress speed", meaning: "How quickly activity moves the curve toward its completion condition." },
      { term: "Depth", meaning: "The liquidity available across progressively worse prices for a trade." },
      { term: "Absorption", meaning: "Selling occurs, but enough buying follows or meets it that price and usable depth hold or recover." },
      { term: "Distribution", meaning: "Existing holders reduce positions by selling supply to later buyers." },
    ],
    walkthrough: {
      title: "Change the $SPARK question when its state changes",
      steps: [
        "Creation: 20 early $SPARK wallets look separate, but one address funded all 20. The wallet count does not establish 20 independent buyers.",
        "Final Stretch: one wallet moves curve progress from 70% to 95%. Fast progress alone does not establish broad demand.",
        "Migrated: a 5 SOL sell lands, then ten apparently unrelated buyers totaling 6 SOL restore price while pool depth remains. That is observable absorption.",
        "Check whether those ten wallets share funding, transfer tokens together, repeat synchronized behavior, or exit to one destination before calling the demand independent.",
      ],
    },
    checkpoint: {
      prompt: "Eight wallets buy $SPARK in the same block. What is the observation, what are two possible explanations, and what evidence would raise confidence in coordination?",
      answer:
        "The observation is only same-block timing. Explanations include ordinary automated buyers or coordinated control. Common funding, repeated synchronized buys across launches, token transfers between the wallets, and common exit destinations would strengthen the coordination hypothesis.",
    },
  },

  "terminal:0": {
    plainEnglish:
      "Read identity and market state before reading the chart. A ticker can be copied, while the mint identifies the exact token; state tells you which market rules are active; and the live route tells you which programs and reserves your trade will actually use. Also ask where each displayed number came from and how recently it updated.",
    terms: [
      { term: "CA / mint", meaning: "The exact token address used as its identity; names and tickers are not unique." },
      { term: "Token program", meaning: "The on-chain program that defines the token account and transfer behavior." },
      { term: "Venue", meaning: "The launch curve, AMM, or other market where the token currently trades." },
      { term: "Route", meaning: "The sequence of programs and pools a proposed swap will pass through." },
      { term: "Data lineage", meaning: "Where a metric came from, how it was calculated, and when it last updated." },
    ],
    walkthrough: {
      title: "Say the fictional $SPARK screen aloud",
      steps: [
        "Identity: the screen says $SPARK, but verify the displayed fictional mint rather than trusting the ticker.",
        "State: it is six minutes old and the launch curve reports 78% progress, so it is not yet migrated.",
        "Units: the quote asset is SOL, which tells you how price and trade size are expressed.",
        "Route: the quote goes directly through the curve program; no post-migration pool should be assumed yet.",
        "Freshness: trades update live, while the holder estimate refreshes every 30 seconds, so the two metrics do not describe the exact same instant.",
      ],
    },
    checkpoint: {
      prompt: "Two terminals show a token named $SPARK with similar charts. What must you verify before treating them as the same market, and why?",
      answer:
        "Verify mint, token program, venue, lifecycle state, quote asset, and live route. A copied ticker can point to another token, and different states or routes use different liquidity, fees, and execution rules even when charts look alike.",
    },
  },

  "terminal:1": {
    plainEnglish:
      "Transactions, volume, makers, and holders answer different questions. One wallet can trade many times, one controller can operate many wallets, and a buyer can later sell everything. Always record the interface's counting rule and time window before comparing the numbers.",
    terms: [
      { term: "Transaction / swap count", meaning: "The interface's count of signatures or trade actions; terminals may define this differently." },
      { term: "Volume", meaning: "The sum of trade notional during a stated window, counting repeated buys and sells." },
      { term: "Maker", meaning: "Usually a distinct wallet that traded during the selected window, not necessarily a distinct human." },
      { term: "Holder", meaning: "A token account or owner with a remaining balance under the interface's exclusions and grouping rules." },
      { term: "Retention", meaning: "Whether a buyer continues to hold tokens after the observed purchase." },
    ],
    walkthrough: {
      title: "Count five minutes of fictional $SPARK activity",
      steps: [
        "Wallet A buys 1 SOL twice and later sells 0.5 SOL: three swaps and 2.5 SOL of volume.",
        "Wallet B buys 2 SOL once: one swap and 2 SOL of volume.",
        "Together the interface may show four swaps, 4.5 SOL volume, and two makers for that five-minute window.",
        "Holder count depends on their remaining balances and the interface definition; neither two makers nor four swaps proves two independent humans.",
      ],
    },
    checkpoint: {
      prompt: "Wallet A makes three 1-SOL $SPARK swaps and Wallet B makes one 2-SOL swap. Explain the likely transaction, volume, and maker counts, and why none tells you holder or human count.",
      answer:
        "Under a swap-counting interface that is four swaps, 5 SOL of volume, and two makers. A maker can later hold nothing, holder rules use balances and exclusions, and one person or controller can operate both wallets.",
    },
  },

  "terminal:2": {
    plainEnglish:
      "Ownership labels are screening clues, not verdicts. A terminal can only label addresses and patterns it knows, so a low visible creator balance can coexist with a large linked cluster. For every percentage, learn its denominator and classifier, then inspect the underlying wallets, funding, acquisition method, cost, remaining balance, and exits.",
    terms: [
      { term: "Dev %", meaning: "Supply currently attributed to the creator-labeled address set, not guaranteed total team control." },
      { term: "Top-holder concentration", meaning: "Supply held by the largest listed accounts before adjusting for pools, programs, and linked wallets." },
      { term: "Sniper %", meaning: "Supply classified as acquired very early under a platform-specific time window and rule." },
      { term: "Launch bundle %", meaning: "Supply a platform groups through launch-time transaction or wallet patterns; it is not automatically a technical Jito bundle." },
      { term: "Cluster-adjusted ownership", meaning: "Concentration after combining wallets with evidence of common funding or control and excluding non-owner accounts." },
    ],
    walkthrough: {
      title: "Turn a neat $SPARK percentage into an ownership question",
      steps: [
        "The labeled $SPARK dev wallet holds 1%, which looks small on the summary card.",
        "Four fresh wallets hold 4% each and all received SOL from the same source, creating a visible 17% cluster including the dev wallet.",
        "A pool account also appears among top holders with 20%; it supplies trading liquidity and should not be treated as a 20% person without inspecting the account type.",
        "Next inspect how the cluster acquired tokens, its estimated cost, what it still holds, and whether proceeds converge on a common destination.",
      ],
    },
    checkpoint: {
      prompt: "$SPARK shows 1% dev ownership, but four 4% wallets share the dev's funder. What can the screen establish, and what must you investigate before claiming team control?",
      answer:
        "It establishes a visible 17% funding-linked cluster, not proven identity or control. Check token transfers, signing and timing patterns, repeated co-action, acquisition cost, current balances, and common exits before strengthening the attribution.",
    },
  },

  "terminal:3": {
    plainEnglish:
      "Chart overlays summarize incomplete records. A wallet marker shows where an address acted, not why; average cost depends on which buys, transfers, sales, and routes the terminal can observe. Read the candle beside the raw trade feed so one large order is not mistaken for broad market behavior.",
    terms: [
      { term: "Candle", meaning: "The open, high, low, and close prices summarized for one time interval." },
      { term: "Wick", meaning: "The part of a candle showing an extreme price reached before the interval closed elsewhere." },
      { term: "Wallet marker", meaning: "A chart annotation showing that a labeled address bought or sold near that point." },
      { term: "Average buy", meaning: "A platform's estimate of average purchase price for its selected wallet set and observed trades." },
      { term: "Cost basis", meaning: "The economic cost assigned to held tokens, which becomes uncertain when transfers or missing routes are involved." },
    ],
    walkthrough: {
      title: "Reconcile a $SPARK overlay with transactions",
      steps: [
        "A wallet buys 1,000 $SPARK for 1 SOL, an observed purchase price of 0.001 SOL each.",
        "It then receives another 1,000 $SPARK by transfer at an unknown economic cost.",
        "An overlay that divides only the known 1 SOL spend by 2,000 tokens displays 0.0005 SOL, but the true basis of the transferred tokens remains unknown.",
        "Later one 5 SOL sale creates a down wick; ten apparently separate wallets buy 6 SOL total and price recovers, which is visible absorption.",
        "Funding checks may still show those buyers are linked, so the feed supports recovery but does not by itself prove organic demand.",
      ],
    },
    checkpoint: {
      prompt: "A $SPARK candle wicks down and quickly recovers. Why does that not prove broad demand, and what would you inspect in the feed?",
      answer:
        "One sell and one linked buyer could create the same candle. Inspect order sizes, number of buying wallets, their funding links, timing, retained balances, and whether usable depth remains after the recovery.",
    },
  },
};
