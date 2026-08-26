import type { LessonGuide } from "./lesson-guide-types";

export const day2LessonGuides: Record<string, LessonGuide> = {
  "wallets:0": {
    plainEnglish:
      "A wallet address is not a permanent job title and is not automatically a person. Give each address a role only for the action you can see: one address may fund a launch, another may create the token, another may trade it, and another may simply receive tokens. Separating those roles prevents a low visible dev balance from hiding where control or sellable supply may actually sit.",
    terms: [
      {
        term: "Deployer",
        meaning: "The address that signed the token-creation instruction.",
      },
      {
        term: "Creator or fee authority",
        meaning: "The address recorded by the live program state for creator-related rights or fee routing; it may differ from the deployer.",
      },
      {
        term: "Funder",
        meaning: "An address that supplied SOL or another asset to a wallet used in the activity.",
      },
      {
        term: "Operational wallet",
        meaning: "An address used to sign buys, sells, or transfers.",
      },
      {
        term: "Holder",
        meaning: "An address with a token balance; holding does not prove that the address bought the tokens.",
      },
    ],
    walkthrough: {
      title: "Fictional $SPARK role map",
      steps: [
        "Wallet F sends 2 SOL to wallet D before $SPARK is created, so F is an observed funder of D.",
        "Wallet D signs the $SPARK creation transaction, so D is the deployer for that event.",
        "Wallet B signs a public $SPARK buy, then transfers the tokens to wallet H.",
        "The evidence supports buyer B and recipient/holder H. It does not yet show that F, D, B, and H have one owner.",
      ],
    },
    checkpoint: {
      prompt:
        "Wallet H holds 4% of fictional $SPARK but has no buy transaction. Explain the safest role label for H and what additional evidence would be needed before calling H a team wallet.",
      answer:
        "H is currently a recipient and holder, not a proven buyer or team wallet. A learner should ask who transferred the tokens, how H was funded, whether the same relationships repeat, and whether H acts in coordination with creator-linked wallets before making a control claim.",
    },
  },

  "wallets:1": {
    plainEnglish:
      "The chain records actions between addresses, but it usually does not reveal the real person behind each key or that person's intent. Treat every relationship as one piece of evidence, then ask whether an ordinary service such as an exchange, bridge, router, or payroll wallet could explain it. Confidence should rise only when different kinds of evidence repeat and point in the same direction.",
    terms: [
      {
        term: "Observed edge",
        meaning: "One recorded relationship in a wallet graph, such as a SOL transfer, token transfer, shared authority, or repeated trade timing.",
      },
      {
        term: "Attribution",
        meaning: "A claim about the real entity controlling an address; this requires more support than observing a transaction.",
      },
      {
        term: "Co-firing",
        meaning: "The same wallets repeatedly trading within the same short window across multiple launches.",
      },
      {
        term: "Corroboration",
        meaning: "A separate kind of evidence that supports the same hypothesis rather than merely repeating the first fact.",
      },
    ],
    walkthrough: {
      title: "From Axiom lead to on-chain evidence",
      steps: [
        "Open a fictional $SPARK buyer from an Axiom holder or transaction row and copy its exact address.",
        "In an explorer, inspect the wallet's early SOL funding transaction and the signature for its $SPARK buy.",
        "Repeat the check for the suspected companion wallets and compare funding sources, timing, token transfers, and exits across other launches.",
        "Record both the cluster hypothesis and an innocent alternative. One common exchange withdrawal is weak; direct pre-launch funding plus repeated co-firing and synchronized exits is much stronger.",
      ],
    },
    checkpoint: {
      prompt:
        "Five wallets bought fictional $SPARK and all previously withdrew from the same exchange hot wallet. Explain why that fact alone is weak attribution evidence and name two observations that would materially strengthen a common-control hypothesis.",
      answer:
        "An exchange hot wallet serves many unrelated customers, so the shared source has a strong innocent explanation. Direct funding from one private wallet, repeated co-firing across launches, token transfers between the wallets, or synchronized exits would provide different and stronger corroborating edges.",
    },
  },

  "wallets:2": {
    plainEnglish:
      "A raw holder list can split one controller's supply across many addresses and can include pool or program accounts that are not ordinary sellers. First identify accounts that serve market infrastructure, then group ordinary wallets only when the evidence supports a relationship. Add the supported group balances together and also ask what those tokens cost, because a low-cost group can sell far below the current quote and remain profitable.",
    terms: [
      {
        term: "Cluster",
        meaning: "A group of wallets hypothesized to be related through funding, transfers, repeated timing, or behavior.",
      },
      {
        term: "Pool vault",
        meaning: "A program-controlled account holding pool reserves for traders, not the discretionary inventory of one ordinary holder.",
      },
      {
        term: "Cluster-adjusted share",
        meaning: "The combined balance of supported cluster members divided by the relevant circulating supply.",
      },
      {
        term: "Cost basis",
        meaning: "The acquisition cost of a position under a stated accounting method.",
      },
    ],
    walkthrough: {
      title: "Fictional $SPARK concentration calculation",
      steps: [
        "Axiom's $SPARK holder list shows wallets A, B, C, and D holding 5%, 4%, 3%, and 2% of supply.",
        "An explorer check separates the verified liquidity vault from these four ordinary wallets and shows that all four received direct pre-launch funding from F.",
        "The four also repeat their timing across prior launches, so the working cluster share is 5% + 4% + 3% + 2% = 14%.",
        "Record 14% as a supported cluster-risk estimate, not proof of a named owner, and compare its entry cost and current remaining balance before judging sell pressure.",
      ],
    },
    checkpoint: {
      prompt:
        "Four supported fictional $SPARK cluster wallets hold 6%, 3%, 2%, and 1%. Explain the adjusted exposure and why a very low cost basis changes the immediate risk even though no individual wallet exceeds 6%.",
      answer:
        "The supported cluster exposure is 12%. A low cost basis gives the group a large profit cushion, so it may sell below the current market quote and still profit; the combined control and exit incentive matter more than the largest single row.",
    },
  },

  "wallets:3": {
    plainEnglish:
      "Do not treat every historically profitable wallet as the same signal. Classify what the wallet repeatedly does, how long its trades last, and whether your alert arrives early enough to participate in the same setup. A router or market maker may appear in transactions without expressing a simple bullish view, while a fast launch sniper may already be preparing to exit when the public alert appears.",
    terms: [
      {
        term: "Wallet archetype",
        meaning: "A category based on repeatable wallet behavior, such as launch sniping, migration trading, momentum trading, or routing.",
      },
      {
        term: "Realized PnL",
        meaning: "Profit or loss from closed flows under a stated accounting method, excluding unsold mark-to-market gains.",
      },
      {
        term: "Holding time",
        meaning: "The elapsed time between acquiring and disposing of a position.",
      },
      {
        term: "Drawdown",
        meaning: "The decline from a wallet or strategy equity peak to a later low.",
      },
      {
        term: "Outlier dependence",
        meaning: "How much of the reported result came from one or a few exceptional trades.",
      },
    ],
    walkthrough: {
      title: "Is a fictional $SPARK wallet copyable?",
      steps: [
        "Trader Scan shows wallet S often buys within two seconds of creation and has positive realized PnL.",
        "Its comparable trades have a short holding time, and in $SPARK it starts selling at 00:18.",
        "Your public alert arrives at 00:12, leaving only six seconds before S begins its usual exit behavior.",
        "The history may be genuine, but the signal is not safely copyable at your latency; follower buys may become demand into which S sells.",
      ],
    },
    checkpoint: {
      prompt:
        "A fictional $SPARK sniper is profitable and usually holds for 15 seconds, while your alert-to-fill delay is 12 seconds. Explain why profitability alone does not justify copying it and what comparison matters most.",
      answer:
        "The wallet's informational and execution advantage may be nearly over by the time you fill. Compare its typical entry-to-exit horizon with your full observation, decision, submission, and landing delay, then verify that transfers and a few outliers are not creating the reported PnL.",
    },
  },

  "narrative:0": {
    plainEnglish:
      "A narrative trade is a bet that more people will focus on the same idea and the same exact token after you enter. Attention affects price only when it becomes net buying relative to available liquidity; reposts alone do not move a pool. A successful story can also create a meta, causing traders to rotate into copies and lower-priced alternatives, so the story does not identify the winning contract by itself.",
    terms: [
      {
        term: "Catalyst",
        meaning: "An event such as news, a viral post, or a listing that can create or redirect attention.",
      },
      {
        term: "Coordinated attention",
        meaning: "Many participants focusing on the same idea or contract during the same period, without necessarily implying secret coordination.",
      },
      {
        term: "Meta",
        meaning: "A reusable category attracting attention, such as an animal, political, or AI theme.",
      },
      {
        term: "Derivative",
        meaning: "A later token or meme that copies or adapts an earlier story, character, name, or ticker.",
      },
      {
        term: "Net buying",
        meaning: "Buying demand remaining after opposing sells, measured over a declared window.",
      },
    ],
    walkthrough: {
      title: "Fictional $SPARK attention chain",
      steps: [
        "A widely shared science post creates a sudden 'spark' theme, and six tokens reuse the name or image.",
        "Similar Tokens or OG Mode helps enumerate exact candidate addresses; it does not select a winner.",
        "Pulse, the transaction feed, liquidity, makers, and social links show where attention is becoming actual trade activity.",
        "The trade thesis exists only if additional demand is likely to arrive before the chosen holding horizon ends, and it still needs liquidity and ownership checks.",
      ],
    },
    checkpoint: {
      prompt:
        "Fictional $SPARK receives one million social views but its pool shows almost no new makers or net buying. Explain why the narrative has not yet become a price thesis.",
      answer:
        "Attention has not yet converted into additional demand for that exact address. The learner should look for sustained new participation and executable buying relative to liquidity, while considering that attention may be coordinating on a different candidate contract.",
    },
  },

  "narrative:1": {
    plainEnglish:
      "A viral name or ticker can produce several contracts, so begin with the external event and build a candidate list of exact addresses. Here, canonical means the contract the market is currently treating as the main tradable version; it does not mean oldest, official, safe, or guaranteed to win. Compare chronology with current attention, cluster-adjusted ownership, and liquidity rather than letting one label decide.",
    terms: [
      {
        term: "Candidate CA",
        meaning: "One exact mint address being considered for the narrative; names and tickers are not unique.",
      },
      {
        term: "Provenance",
        meaning: "Evidence about origin, chronology, and authentic linkage to the catalyst.",
      },
      {
        term: "Canonical",
        meaning: "The contract currently receiving the market's main coordination, not a permanent or safety-guaranteed status.",
      },
      {
        term: "Cluster-adjusted distribution",
        meaning: "Supply concentration after supported wallet relationships and infrastructure accounts are considered.",
      },
      {
        term: "Executable liquidity",
        meaning: "The depth actually available for entering and exiting near the quoted price.",
      },
    ],
    walkthrough: {
      title: "Fictional three-CA $SPARK race",
      steps: [
        "At 10:00, the outside event goes viral. Use Similar Tokens or OG Mode to enumerate CA-A, CA-B, and CA-C, then verify each creation transaction.",
        "CA-A is eight months old but has six holders and no usable liquidity, making it the chronological first under this search but currently inactive.",
        "CA-B launches at 10:03; by 10:20 it has 400 makers, usable depth, and the strongest authentic social linkage.",
        "CA-C launches at 10:05 and has activity, but one supported wallet cluster controls 44% of supply.",
        "At 10:20, B is the strongest current candidate, A remains first, and C carries concentration risk. Recheck because coordination can move.",
      ],
    },
    checkpoint: {
      prompt:
        "In the fictional $SPARK race, explain why CA-A can be the OG while CA-B is the current canonical candidate, and name one fact that could still invalidate the case for B.",
      answer:
        "A is the earliest address found under the defined search, while B currently has stronger authentic linkage, activity, and usable liquidity. B can still fail if attention migrates, its ownership proves concentrated, liquidity disappears, the social link is false, or current buyers stop arriving.",
    },
  },

  "narrative:2": {
    plainEnglish:
      "First, best, and chosen answer different questions. First is an on-chain timestamp; best is a subjective judgment about the meme; chosen is an observation about where trade flow, usable liquidity, and active social production are concentrating at a stated time. Start from the outside event and work toward contracts so a token's own marketing does not define the search for you.",
    terms: [
      {
        term: "Chronology",
        meaning: "The verified order in which candidate contracts or relevant events appeared.",
      },
      {
        term: "Meme quality",
        meaning: "A subjective view of how clear, memorable, or remixable the idea is; it is not on-chain evidence.",
      },
      {
        term: "Chosen contract",
        meaning: "The candidate receiving the strongest current market coordination under stated measures and a stated time.",
      },
      {
        term: "Outside-in check",
        meaning: "Starting with the independent event or original source, then mapping toward candidate contracts.",
      },
    ],
    checkpoint: {
      prompt:
        "A beautifully designed fictional $SPARK token is newer than the earliest contract, but nearly all sustained trade flow and social creation are on a third address. Explain which token is first, which may be 'best,' and which is currently chosen without turning any label into a buy signal.",
      answer:
        "The earliest verified address is first, the beautifully designed token may be the learner's subjective best, and the third address is currently chosen under the stated activity measures. None is automatically a good trade because distribution, liquidity, persistence, entry price, and future demand still determine expected value.",
    },
  },

  "narrative:3": {
    plainEnglish:
      "A replay is fair only when each decision uses information that was available at that moment. Today's holder balances, labels, final chart, and famous outcome must not leak backward into the earlier choice. Define what would count as discovery, confirmation, consensus, and saturation before revealing the next timestamp.",
    terms: [
      {
        term: "Information set",
        meaning: "Everything a trader could reasonably know at the exact decision timestamp.",
      },
      {
        term: "Discovery",
        meaning: "The moment the event or candidate contract first enters the trader's process.",
      },
      {
        term: "Confirmation",
        meaning: "The moment predeclared supporting conditions become observable.",
      },
      {
        term: "Consensus",
        meaning: "A stage where most observed attention and flow have concentrated on one candidate.",
      },
      {
        term: "Saturation",
        meaning: "A stage where additional attention or volume produces less new-maker or price progress.",
      },
    ],
    walkthrough: {
      title: "Freeze a fictional $SPARK replay",
      steps: [
        "At each timestamp, reveal only the catalyst posts, candidate addresses, lifecycle state, liquidity, makers, and wallet evidence then available.",
        "Write the action, the reason, the counter-explanation, and the invalidation before advancing the chart.",
        "Use block times and archived screenshots or VOD frames; do not substitute today's Axiom holder labels or balances for past state.",
        "After the final reveal, grade the process against the frozen information, not against whether $SPARK eventually won or failed.",
      ],
    },
    checkpoint: {
      prompt:
        "During a fictional $SPARK replay, you learn at the end that one candidate reached a major listing. Explain why using that fact to justify an earlier entry is hindsight bias and what the earlier decision record should contain instead.",
      answer:
        "The later listing was not in the earlier information set, so it could not support the original decision. The record should contain only the then-visible catalyst, candidate CAs, state, liquidity, maker and wallet evidence, plus the action, counter-explanation, and predeclared invalidation.",
    },
  },

  "tape:0": {
    plainEnglish:
      "Tape reading compares each trade with the market depth available when it occurred and then watches the response. In an AMM, a deep pool alone can make a large sell produce a small dip, so that observation is not automatically buyer absorption. Absorption becomes plausible only after accounting for expected pool impact and seeing follow-up demand restore or hold price while supply continues to arrive.",
    terms: [
      {
        term: "Tape",
        meaning: "The ordered sequence of trades together with the resulting price and volume response.",
      },
      {
        term: "Aggressive order",
        meaning: "A swap that executes immediately against the current curve or pool state.",
      },
      {
        term: "Depth",
        meaning: "The reserves or routed liquidity available near the current price.",
      },
      {
        term: "Absorption",
        meaning: "A hypothesis that opposing demand is taking in aggressive supply without proportional lasting price damage.",
      },
      {
        term: "Follow-through",
        meaning: "Later trades and price behavior that continue to support the first interpretation.",
      },
    ],
    walkthrough: {
      title: "Deep pool or fictional $SPARK absorption?",
      steps: [
        "A 4 SOL $SPARK sell lands. First compare that size with the live pool or route and estimate the move depth alone should cause.",
        "If the small dip is ordinary for that depth and no new buyers appear, describe deep liquidity, not buyer absorption.",
        "If repeated sells arrive, several not-obviously-linked wallets buy, and price quickly reclaims and holds the pre-sell area, absorption becomes a supported hypothesis.",
        "Keep the conclusion conditional: define the next hold or failure that would confirm or weaken it.",
      ],
    },
    checkpoint: {
      prompt:
        "A large fictional $SPARK sell moves price only 2%, but no follow-up buys appear. Explain why 'buyers absorbed it' is premature and what evidence would distinguish deep liquidity from active absorption.",
      answer:
        "The pool may simply be deep enough that the sell's mechanical impact is small. Active absorption needs additional evidence such as continued supply being met by new buys, a reclaim or hold beyond the depth-expected response, and participation that is not obviously one linked wallet.",
    },
  },

  "tape:1": {
    plainEnglish:
      "Momentum is not just a green candle; it is the relationship between new demand, traded volume, and price progress over time. Continuation becomes more credible when new makers arrive and pullbacks remain above prior trading areas. Exhaustion becomes possible when more buying effort produces less upward result because available demand is weakening or early supply is selling into it.",
    terms: [
      {
        term: "Acceleration",
        meaning: "An increase in demand or participation per unit of time, measured over declared windows.",
      },
      {
        term: "Acceptance",
        meaning: "Price and volume remaining beyond a level instead of only touching it briefly.",
      },
      {
        term: "Exhaustion",
        meaning: "A condition where additional trading effort creates progressively less price progress.",
      },
      {
        term: "Distribution",
        meaning: "Early or concentrated holders selling supply to later buyers over time.",
      },
    ],
    walkthrough: {
      title: "Two fictional $SPARK momentum sequences",
      steps: [
        "Continuation case: across three one-minute windows, new makers rise 20 to 36 to 51, buy flow rises 4 to 7 to 9 SOL, and each pullback holds above the prior range.",
        "Exhaustion case: volume rises 8 to 12 to 16 SOL while upward progress falls from 18% to 6% to 1%.",
        "In the exhaustion case, new makers flatten and early low-cost wallets repeatedly sell into the highs, explaining why extra effort creates less result.",
        "Treat both reads as hypotheses and write the next expected hold, reclaim, or failure before acting.",
      ],
    },
    checkpoint: {
      prompt:
        "Fictional $SPARK volume rises each minute, but price gains shrink, maker growth stalls, and early low-cost wallets sell into each high. Explain the exhaustion hypothesis and why it is not yet a guaranteed reversal.",
      answer:
        "More trading effort is producing less upward result because new demand may be meeting distribution. It is not a guaranteed reversal because buyers could later absorb the supply; the learner still needs a falsifiable next event such as failure to hold a level or renewed maker growth and acceptance.",
    },
  },

  "tape:2": {
    plainEnglish:
      "A wick only records that price traded beyond the candle body and returned before that interval closed. A breakout becomes more credible when price gets beyond a prior level, survives a later test, and continues to attract participation. A failed breakout returns to the old range and cannot regain the level within the time horizon you declared before the trade.",
    terms: [
      {
        term: "Level",
        meaning: "A prior price or market-cap area where trading repeatedly changed direction or paused.",
      },
      {
        term: "Breakout",
        meaning: "Price moving beyond a previously defended or accepted range.",
      },
      {
        term: "Wick",
        meaning: "The part of a candle showing an interval high or low beyond its open-to-close body.",
      },
      {
        term: "Reclaim",
        meaning: "Price returning through a level after falling back below it.",
      },
      {
        term: "Retest",
        meaning: "A later return to the breakout area that checks whether price can remain on the new side.",
      },
    ],
    walkthrough: {
      title: "Fictional $SPARK wick, reclaim, and failure",
      steps: [
        "On a one-minute chart, $SPARK crosses a $10K market-cap level, trades to $13K, and closes at $9.8K. That is an excursion, not a held breakout.",
        "The next candle regains $10K while several wallets buy, creating a reclaim hypothesis.",
        "If price remains above $10K when tested again, the breakout is holding; if it returns to the old range and cannot regain $10K in the declared window, it failed.",
        "Inspect the transaction feed because one wallet can create the wick, and remember that the same trades can look different on five-second and one-minute candles.",
      ],
    },
    checkpoint: {
      prompt:
        "Fictional $SPARK trades above $10K, wicks to $13K, and closes at $9.7K. Explain what the candle proves, what it does not prove, and what sequence would support a genuine reclaim.",
      answer:
        "It proves that trades reached $13K during the interval and closed back below $10K. It does not prove a particular seller, guaranteed rejection, or reversal. A reclaim needs price to move back above $10K with follow-through, remain there on a retest, and show supporting trade participation within the declared horizon.",
    },
  },

  "tape:3": {
    plainEnglish:
      "Each data view answers a different question. The chart shows the price result, the transaction feed shows the swaps that produced it, wallet analysis shows observable control, cost, and supply relationships, and narrative analysis asks why more demand might arrive. A useful live note combines all four and states what observable event would prove the interpretation wrong.",
    terms: [
      {
        term: "Observation",
        meaning: "A neutral description of what the screen or chain records, without assigning motive.",
      },
      {
        term: "Hypothesis",
        meaning: "A testable interpretation of why the observation occurred.",
      },
      {
        term: "Counter-explanation",
        meaning: "A different plausible cause that could produce the same observation.",
      },
      {
        term: "Invalidation",
        meaning: "A predeclared observable event showing that the trade thesis no longer holds.",
      },
      {
        term: "Falsifiable",
        meaning: "Written so a later observation can clearly show the claim was wrong.",
      },
    ],
    walkthrough: {
      title: "Build a fictional $SPARK tape stack",
      steps: [
        "Observation: one 7 SOL buy lifts $SPARK market cap 25%, but the maker count barely changes.",
        "Hypothesis: momentum is accelerating. Counter-explanation: one wallet in a thin pool painted most of the candle.",
        "Wallet and feed check: identify the buyer, route, pool depth, later buys, holder changes, and whether the address has linked companions.",
        "Next test: within two minutes several not-obviously-linked buyers must appear and price must hold above the prior range. A fall back into the range, especially while the first buyer sells, invalidates the momentum read.",
      ],
    },
    checkpoint: {
      prompt:
        "Write the reasoning behind why a fictional $SPARK token transfer from a creator-linked wallet is not yet proof of a market sale, and name the chart/feed event that would establish selling.",
      answer:
        "A token transfer proves custody moved between addresses but does not show that tokens were exchanged against the market. A swap instruction or routed trade with corresponding token and SOL balance changes establishes selling; the chart and feed should then show the executed trade and its price response.",
    },
  },

  "risk:0": {
    plainEnglish:
      "Position size is the amount placed in a trade; risk is the SOL you can plausibly lose when the thesis fails. Decide the maximum loss first, define a realistic failure exit including slippage, fees, gaps, and possible sell failure, and only then calculate size. The final size must also be small enough to enter and exit without your own order destroying the setup.",
    terms: [
      {
        term: "Allowed loss",
        meaning: "The maximum SOL amount the plan permits losing on one attempt.",
      },
      {
        term: "Invalidation fraction",
        meaning: "The fraction of entry value plausibly lost when the thesis fails, such as 0.25 for a 25% loss.",
      },
      {
        term: "Theoretical size",
        meaning: "Allowed SOL loss divided by the invalidation fraction before applying liquidity limits.",
      },
      {
        term: "Executable size",
        meaning: "The smaller size that remains after route depth, impact, and realistic exit capacity are considered.",
      },
      {
        term: "Gap risk",
        meaning: "The chance price jumps past the planned exit before that exit can fill.",
      },
    ],
    walkthrough: {
      title: "Size a fictional $SPARK attempt",
      steps: [
        "A 10 SOL bankroll uses a 0.5% per-attempt limit, so allowed loss is 10 x 0.005 = 0.05 SOL.",
        "The $SPARK thesis fails at a realistically executable 25% loss, so theoretical size is 0.05 / 0.25 = 0.20 SOL.",
        "A route and full-exit stress check shows only 0.12 SOL can exit within acceptable impact, so executable size is capped at 0.12 SOL.",
        "If a credible failure path is a total loss, the 0.05 SOL risk limit permits at most a 0.05 SOL position regardless of the planned stop.",
      ],
    },
    checkpoint: {
      prompt:
        "You allow a 0.06 SOL loss on fictional $SPARK, estimate a realistic 30% failure loss, and measure only 0.15 SOL of executable capacity. Calculate the theoretical and final sizes, then explain why the stop price is not insurance.",
      answer:
        "The theoretical size is 0.06 / 0.30 = 0.20 SOL, but capacity caps the final size at 0.15 SOL. The stop is only a planned trigger because price can gap, liquidity can disappear, or the sell transaction can fail, so severe failure scenarios still need to fit the allowed loss.",
    },
  },

  "risk:1": {
    plainEnglish:
      "Win rate counts how often a setup wins but says nothing about the size of its wins, ordinary losses, rare disasters, or costs. Convert each result into R, where one R is the SOL amount accepted as risk before entry, and calculate the probability-weighted average. Use actual wallet flows because a planned one-R loss can become a larger live loss when execution fails.",
    terms: [
      {
        term: "R-multiple",
        meaning: "A trade's result divided by the amount defined as one unit of risk before entry.",
      },
      {
        term: "Expectancy",
        meaning: "The average outcome per trade implied by win frequency, payoff size, loss size, and costs.",
      },
      {
        term: "Tail loss",
        meaning: "An uncommon loss much larger than the setup's ordinary loss.",
      },
      {
        term: "Maximum adverse excursion",
        meaning: "The worst unrealized movement against a position while it was open.",
      },
      {
        term: "Cost R",
        meaning: "Average fees and execution costs divided by the planned one-R SOL amount.",
      },
    ],
    walkthrough: {
      title: "Why a fictional $SPARK setup loses at 90% wins",
      steps: [
        "Nine of ten comparable trades win an average of +0.2R, contributing 0.9 x 0.2 = +0.18R per trade.",
        "One of ten loses an average of 3R, contributing 0.1 x 3 = 0.30R of loss per trade.",
        "Average fees and execution costs add another 0.10R per trade.",
        "Expectancy is 0.18 - 0.30 - 0.10 = -0.22R per trade despite the 90% win rate.",
      ],
    },
    checkpoint: {
      prompt:
        "A fictional $SPARK setup wins 80% of trades at +0.5R, loses 20% at -2R, and costs 0.1R per trade. Calculate expectancy and explain what the answer says that win rate hides.",
      answer:
        "Expectancy is 0.8 x 0.5 - 0.2 x 2 - 0.1 = -0.1R per trade. The high win rate hides that the less frequent losses plus costs are large enough to outweigh the winners.",
    },
  },

  "risk:2": {
    plainEnglish:
      "A strategy can have positive average expectancy and still suffer long losing streaks. Drawdown measures how far capital falls from a prior peak, while risk of ruin asks whether that path can shrink capital below the amount needed to keep using the strategy. Per-trade risk, session limits, and correlated exposure should make an ordinary bad run survivable both financially and behaviorally.",
    terms: [
      {
        term: "Drawdown",
        meaning: "The decline from a bankroll or strategy peak to a later trough.",
      },
      {
        term: "Risk of ruin",
        meaning: "The probability that losses reduce capital below the level needed to continue the strategy, not only to literal zero.",
      },
      {
        term: "Correlated exposure",
        meaning: "Positions likely to fail together because they share a wallet cluster, narrative, venue, or market driver.",
      },
      {
        term: "Session loss limit",
        meaning: "A predeclared loss threshold at which trading stops for that session.",
      },
    ],
    walkthrough: {
      title: "Compare two five-loss paths",
      steps: [
        "Five consecutive 10% losses leave 0.9 to the fifth power, or about 59.0%, of starting capital.",
        "Recovering from 59.0% to the starting amount requires roughly a 69% gain.",
        "Five consecutive 1% losses leave about 95.1%, making the same ordinary streak far easier to survive.",
        "Set per-trade and session limits before trading, cap positions that share the same failure source, and remember that missing a move is not a loss that must be won back.",
      ],
    },
    checkpoint: {
      prompt:
        "Explain why five fictional $SPARK-family positions are not diversified if they share the same funder cluster and narrative catalyst, and how that should affect concurrent exposure.",
      answer:
        "The positions can fail together if the shared cluster sells or the common story loses attention, so their risks are correlated rather than independent. Treat them as one exposure bucket and cap their combined plausible loss within the portfolio and session limits.",
    },
  },

  "risk:3": {
    plainEnglish:
      "Capacity is the largest size at which a setup still has positive expected value after your own entry impact, exit impact, fees, and execution difficulty. A strong percentage return on a tiny trade cannot simply be multiplied into a large trade because AMM impact grows as size consumes more of the available reserves. Measure results in size ranges and report how much profit depends on one exceptional winner.",
    terms: [
      {
        term: "Capacity",
        meaning: "The largest deployable size before the setup's expected edge is materially degraded.",
      },
      {
        term: "Size bucket",
        meaning: "A range used to group comparable trade sizes, such as at most 0.25 SOL, 0.25 to 1 SOL, and above 1 SOL.",
      },
      {
        term: "Round-trip cost",
        meaning: "The combined entry and exit impact, fees, tips, slippage, and other execution costs.",
      },
      {
        term: "Outlier dependence",
        meaning: "The share of total profit supplied by one or a few unusually large winners.",
      },
    ],
    walkthrough: {
      title: "Find fictional $SPARK capacity",
      steps: [
        "The setup's move is +20% before execution costs.",
        "At 0.2 SOL, modeled round-trip impact and costs are 4%, leaving about +16% before other error.",
        "At 2 SOL, modeled round-trip impact and costs are 25%, turning the same apparent move into about -5%.",
        "Journal actual SOL spent and received by size bucket. If total profit is 10 SOL and one trade supplied 8 SOL, report the full result and the 2 SOL result without that outlier.",
      ],
    },
    checkpoint: {
      prompt:
        "A fictional $SPARK method earns 15% before costs. Its 0.25 SOL bucket has 3% round-trip costs, while its 2 SOL bucket has 19% costs. Explain which bucket still has modeled edge and why multiplying the small-trade return is invalid.",
      answer:
        "The 0.25 SOL bucket retains about 12% before other errors, while the 2 SOL bucket is about -4%. Multiplication is invalid because the larger order changes its own average entry and exit prices and may expose the trade to worse liquidity and execution.",
    },
  },
};
