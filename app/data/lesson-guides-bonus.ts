import type { LessonGuide } from "./lesson-guide-types";

export const bonusLessonGuides: Record<string, LessonGuide> = {
  "setups:0": {
    plainEnglish:
      "A new token is not automatically a trade. Treat it as an event that may create attention somewhere else. Our fictional method starts when a new $SPARK-like token shows independently evidenced traction; we then inspect an older, genuinely related contract address (CA) and ask whether attention begins rotating into it. That is a hypothesis to test, not a promised edge.",
    terms: [
      {
        term: "Universe",
        meaning: "The complete group of events your rule is allowed to examine, including the failures.",
      },
      {
        term: "Independent traction",
        meaning: "Interest supported by distinct makers or sources, rather than activity that may come from one linked cluster.",
      },
      {
        term: "Causal hypothesis",
        meaning: "A falsifiable explanation for why the signal might lead to the outcome.",
      },
    ],
    walkthrough: {
      title: "Turn the SPARK idea into method grammar",
      steps: [
        "Event: a new SPARK-like launch attracts several apparently independent makers and attention sources.",
        "Candidate: find an older CA with evidence of real narrative or provenance relevance; the same name alone is not enough.",
        "Question: does measurable attention rotate into that older CA within a fixed horizon more often than a stated baseline?",
        "No-trade state: skip when traction looks linked, the older CA is ambiguous, or the required evidence is missing.",
      ],
    },
    checkpoint: {
      prompt: "What turns the appearance of a new SPARK-like token from a story into a testable starting condition?",
      answer:
        "A written universe and observable traction rule, followed by a separate test of an evidence-linked older CA. The new token is a catalyst candidate, not proof that rotation will occur.",
    },
  },
  "setups:1": {
    plainEnglish:
      "Before judging rotation, name the market state of both contracts. A token still on a launch curve, one nearing completion, and one trading in a migrated pool have different liquidity and risks. In the SPARK method, migration is simply a state change to record. It neither proves the new token is healthy nor makes the older CA the correct one.",
    terms: [
      {
        term: "Final stretch",
        meaning: "A late launch-curve state in which substantial demand has appeared but migration is not yet guaranteed.",
      },
      {
        term: "Migration",
        meaning: "The transition from a launch mechanism into its designated trading pool or venue.",
      },
      {
        term: "State filter",
        meaning: "A rule that admits a candidate only when it is in a named, observable market state.",
      },
    ],
    walkthrough: {
      title: "Add state to the SPARK observation",
      steps: [
        "Timestamp the new token's curve progress and maker activity when the alert fires.",
        "Confirm the older CA and the venue where it actually trades.",
        "Record whether the older CA is pre-migration, newly migrated, or established; do not mix those states in one result bucket.",
        "Skip if a few wallets appear to be forcing progress or if venue state cannot be confirmed.",
      ],
    },
    checkpoint: {
      prompt: "Why should SPARK observations be separated by curve and migration state?",
      answer:
        "Because each state has different available evidence, liquidity, costs, and failure modes. Combining them can make unlike trades look like one method.",
    },
  },
  "setups:2": {
    plainEnglish:
      "After migration, the SPARK method still needs a trigger on the older CA. 'It is the OG' is an identity claim, not a trade rule. A usable trigger could require new independent makers, rising volume, and a reclaim that holds for a defined interval. The invalidation must name the behavior whose disappearance would make the hypothesis wrong.",
    terms: [
      {
        term: "Trigger",
        meaning: "The exact observable condition that changes a candidate from watch to paper entry.",
      },
      {
        term: "Invalidation",
        meaning: "Evidence that the reason for the decision is no longer true.",
      },
      {
        term: "Horizon",
        meaning: "The time window in which the expected rotation should appear.",
      },
    ],
    walkthrough: {
      title: "Write behavior, not vibes",
      steps: [
        "Candidate label: older related CA with independently verified relevance.",
        "Example trigger: maker count and volume expand after the new-token catalyst, then price reclaims a prewritten level and holds.",
        "Example invalidation: maker growth decays and the reclaimed level fails within the stated horizon.",
        "Keep these thresholds frozen during a test batch so the rule cannot chase the chart.",
      ],
    },
    checkpoint: {
      prompt: "For the SPARK method, why is 'buy the OG' not a complete trigger?",
      answer:
        "It describes a label, not observable entry behavior. A trigger needs measurable flow or price conditions, a horizon, and a matching invalidation.",
    },
  },
  "setups:3": {
    plainEnglish:
      "A wallet alert can add evidence to the SPARK hypothesis, but it should not create the hypothesis. First determine whether the wallet bought the older CA, merely received it, or moved it between related accounts. Then test whether including that wallet signal improves decisions compared with the same rule without it.",
    terms: [
      {
        term: "Confirmation feature",
        meaning: "Extra evidence that may strengthen an existing rule but does not replace it.",
      },
      {
        term: "Incremental value",
        meaning: "The improvement produced by one feature compared with an otherwise identical baseline rule.",
      },
      {
        term: "Alert delay",
        meaning: "The time between the on-chain event and when your method can actually respond to it.",
      },
    ],
    walkthrough: {
      title: "Test wallet confirmation honestly",
      steps: [
        "Run the frozen SPARK rule without a wallet condition and label every eligible event.",
        "Create a second version that requires a classified purchase by the chosen wallet archetype.",
        "Compare precision, missed rotations, entry delay, and net paper result after costs.",
        "Do not keep only the screenshots where the wallet happened to be right.",
      ],
    },
    checkpoint: {
      prompt: "What must you establish before a tracked wallet becomes part of the SPARK entry rule?",
      answer:
        "That its activity is a relevant purchase rather than a receipt or transfer, and that adding it improves the frozen rule on comparable observations after alert delay and costs.",
    },
  },
  "execution:0": {
    plainEnglish:
      "Execution is a sequence of states, not one click. If the SPARK paper rule says 'enter the older CA,' the system must still obtain a quote, build the intended transaction, check it, sign it, submit it, observe what happened, and reconcile balances. A returned signature means submission was accepted for forwarding; it does not mean a position exists.",
    terms: [
      {
        term: "Quote",
        meaning: "An estimate of the route, input, and output available at a moment in time.",
      },
      {
        term: "Signature",
        meaning: "The transaction identifier produced from signed bytes; by itself it is not proof of success.",
      },
      {
        term: "Reconciliation",
        meaning: "Checking chain status and balances so internal position state matches reality.",
      },
    ],
    walkthrough: {
      title: "Follow one SPARK decision through the states",
      steps: [
        "The observer marks the older CA eligible under the frozen method version.",
        "Paper mode records the quote and intended minimum output without signing anything.",
        "A later execution system would log build, simulation, submission, status, and balance evidence separately.",
        "The position changes to open only after the recorded evidence says the transaction succeeded.",
      ],
    },
    checkpoint: {
      prompt: "A node returns a signature for a future SPARK trade. What position state is justified at that moment?",
      answer:
        "Submitted or pending, not open. Success and balances still need to be observed and reconciled.",
    },
  },
  "execution:1": {
    plainEnglish:
      "Three settings solve three different problems. A minimum-output or slippage bound limits the economic result you will accept. A priority fee competes for scheduler attention. A Jito tip competes on a separate delivery path. None can turn a weak SPARK selection rule into an edge, and all costs belong in the test result.",
    terms: [
      {
        term: "Minimum output",
        meaning: "The least amount of tokens a transaction may return before it should fail.",
      },
      {
        term: "Priority fee",
        meaning: "An added Solana fee used to compete for scheduling priority.",
      },
      {
        term: "Jito tip",
        meaning: "A payment used in Jito's block-engine auction; it is not the same as a priority fee.",
      },
      {
        term: "Net expectancy",
        meaning: "Average expected result after losses, price impact, fees, tips, and failures.",
      },
    ],
    walkthrough: {
      title: "Cost the SPARK hypothesis before admiring it",
      steps: [
        "Record the decision-time quote and a defensible minimum output.",
        "Estimate price impact, base fee, any priority fee or tip, and likely exit cost.",
        "Subtract those costs from every paper outcome, including failed submissions where fees would be paid.",
        "Reject the method if realistic execution erases its apparent advantage.",
      ],
    },
    checkpoint: {
      prompt: "Which execution setting protects the minimum economic result of a SPARK swap?",
      answer:
        "The minimum-output or slippage bound. Priority fees and Jito tips may affect landing, but they do not set the least acceptable output.",
    },
  },
  "execution:2": {
    plainEnglish:
      "Compute budgeting is advanced execution plumbing, so keep it bonus until the SPARK hypothesis survives replay and paper testing. A future system can simulate a transaction, estimate the compute it needs, and add a measured margin. Requesting the maximum by habit can raise cost, while a failed transaction may still charge fees.",
    terms: [
      {
        term: "Compute unit",
        meaning: "A measure of the work a Solana transaction requests from the runtime.",
      },
      {
        term: "Simulation",
        meaning: "A dry run used to inspect likely errors and resource usage without landing the transaction.",
      },
      {
        term: "Versioned assumption",
        meaning: "A rule recorded with the transaction version and current documentation it depends on.",
      },
    ],
    walkthrough: {
      title: "Keep infrastructure from contaminating method results",
      steps: [
        "During paper testing, log an explicit cost estimate rather than pretending execution is free.",
        "If execution is later prototyped, record requested compute, simulated use, actual outcome, and charged fees.",
        "Separate selection failures from construction or compute failures.",
        "Recheck fee rules whenever the transaction version or network documentation changes.",
      ],
    },
    checkpoint: {
      prompt: "When should detailed compute optimization become a priority for the SPARK project?",
      answer:
        "After the selection method shows repeatable paper evidence and execution cost is a measured bottleneck. Until then, compute internals are bonus engineering, not edge discovery.",
    },
  },
  "execution:3": {
    plainEnglish:
      "A fast SPARK alert is useful only if it is correct and recoverable. Streams can disconnect, duplicate events, or show temporary states. Start by measuring detection-to-decision and decision-to-observation time with an ordinary reliable feed. Low-level Geyser, gRPC, fork handling, and backfill tuning are advanced bonus topics after the method itself earns attention.",
    terms: [
      {
        term: "Latency budget",
        meaning: "The maximum delay each stage may use before the signal becomes too old for the method's horizon.",
      },
      {
        term: "Deduplication",
        meaning: "Preventing the same event from being counted or acted on more than once.",
      },
      {
        term: "Backfill",
        meaning: "Fetching missed historical events after a disconnect or detected gap.",
      },
      {
        term: "Commitment",
        meaning: "The degree of chain confirmation attached to an observed event.",
      },
    ],
    walkthrough: {
      title: "Measure the whole SPARK information path",
      steps: [
        "Timestamp the new-token event, completed traction checks, older-CA match, and final paper decision.",
        "Record missing and duplicate events rather than silently discarding them.",
        "Repair gaps before using the log as a replay dataset.",
        "Compare the value of a faster signal with any accuracy lost by skipping evidence checks.",
      ],
    },
    checkpoint: {
      prompt: "Why can a 30 ms SPARK detector be worse than a 300 ms detector?",
      answer:
        "If the faster path misidentifies the older CA, misses required evidence, duplicates events, or cannot repair gaps, its speed can reduce the rule's real expectancy.",
    },
  },
  "automation:0": {
    plainEnglish:
      "Do not begin with a vague request for an 'OG bot.' Describe the exact job. The first SPARK automation is an observer: it watches for new SPARK-like launches, collects evidence of independent traction, finds possible older related CAs, and sends a structured alert to a human. It does not buy, manufacture attention, bypass access rules, or hide who benefits.",
    terms: [
      {
        term: "Observer",
        meaning: "Software that gathers, classifies, and reports evidence without executing a trade.",
      },
      {
        term: "Beneficiary",
        meaning: "The person or account that gains from an automated action; naming it clarifies the bot's purpose.",
      },
      {
        term: "Authority",
        meaning: "What the software is permitted to read, change, or sign.",
      },
    ],
    walkthrough: {
      title: "Translate 'SPARK bot' into a safe specification",
      steps: [
        "Input: public launch, market, identity, and wallet evidence.",
        "Decision: apply the frozen traction and older-CA matching rules.",
        "Output: a timestamped evidence packet with confidence and missing fields.",
        "Action and authority: notify the learner only; no signing or transaction permission.",
      ],
    },
    checkpoint: {
      prompt: "What is the safest useful output for the first SPARK automation?",
      answer:
        "A timestamped, explainable alert containing the candidate older CA, supporting evidence, confidence, and missing checks for human review.",
    },
  },
  "automation:1": {
    plainEnglish:
      "Automation should follow evidence. Write and freeze the SPARK rule, label historical observations, replay them without future knowledge, paper-test new events, and only then automate alerts. An executor is not the next step merely because an observer works; guarded execution remains optional until the method has a cost model, sample plan, and kill condition.",
    terms: [
      {
        term: "Frozen rule",
        meaning: "A version of the method that cannot be edited while its evaluation sample is accumulating.",
      },
      {
        term: "Paper test",
        meaning: "A forward decision log with no real transaction, scored after its stated horizon.",
      },
      {
        term: "Kill condition",
        meaning: "A prewritten result or system state that stops the method or automation.",
      },
    ],
    walkthrough: {
      title: "Advance SPARK one permission at a time",
      steps: [
        "Manual: write the rule and label old cases.",
        "Replay: lock each choice before revealing the later outcome.",
        "Observer: automate collection and alerts while a human makes the paper decision.",
        "Executor: consider only after forward paper evidence survives costs and the safety gates are defined.",
      ],
    },
    checkpoint: {
      prompt: "The SPARK watcher finds candidates reliably. Does that make automatic buying the next required step?",
      answer:
        "No. Reliable detection is not proof of profitable selection. The frozen rule still needs leakage-resistant replay, forward paper results, costs, and a kill condition.",
    },
  },
  "automation:2": {
    plainEnglish:
      "A production system is easier to reason about when its jobs are separated. For SPARK, ingestion collects events, state stores normalized facts, the decision layer scores the frozen rule, and the control layer logs health and can stop processing. Execution and a narrow signer are advanced bonus components. If a required lookup is stale or missing, the decision should be 'no trade.'",
    terms: [
      {
        term: "Data plane",
        meaning: "The feeds, parsers, storage, and repair processes that create trustworthy observations.",
      },
      {
        term: "Decision plane",
        meaning: "The frozen features, rules, and risk gates that turn evidence into watch, skip, or paper entry.",
      },
      {
        term: "Control plane",
        meaning: "Health checks, immutable logs, reconciliation, and stop controls around the system.",
      },
      {
        term: "Fail closed",
        meaning: "Choosing no action when required evidence or a safety dependency is unavailable.",
      },
    ],
    walkthrough: {
      title: "Route one SPARK alert through the layers",
      steps: [
        "Ingest the new-token event and fetch traction and identity evidence.",
        "Normalize possible older CAs and mark confidence or missing data.",
        "Apply the frozen method version and risk gates to produce watch, skip, or paper entry.",
        "Log the complete decision packet; if identity lookup fails, emit no trade and the reason.",
      ],
    },
    checkpoint: {
      prompt: "The SPARK identity lookup times out. What should the decision layer emit?",
      answer:
        "No trade, with the missing dependency logged. Defaulting to a guessed CA would violate the method's evidence rule.",
    },
  },
  "automation:3": {
    plainEnglish:
      "The Academy's SPARK project is paper-only and never needs a seed phrase. Browser storage and source code are not secret vaults. If a separate future system ever reaches guarded execution, it should use a dedicated low-balance wallet, strict spend and position limits, a manual enable, narrow program permissions, audit logs, and a kill switch. Those controls reduce harm; they do not validate the edge.",
    terms: [
      {
        term: "Seed phrase",
        meaning: "The master secret controlling a wallet; anyone who gets it can usually control the funds.",
      },
      {
        term: "Blast radius",
        meaning: "The maximum damage possible if a component, key, or rule fails.",
      },
      {
        term: "Allowlisted program",
        meaning: "A program the signer is explicitly permitted to interact with; it is a safety boundary, not a token recommendation.",
      },
    ],
    walkthrough: {
      title: "Draw the SPARK security boundary",
      steps: [
        "Course and replay tools store learning state only and never request a secret.",
        "The observer receives public read access and notification permission, not signing permission.",
        "Any later signer is isolated and enforces tiny caps independently of the strategy process.",
        "Reserve funds remain outside the experimental system, and a human can stop it immediately.",
      ],
    },
    checkpoint: {
      prompt: "Where should a seed phrase be entered while building or testing the Academy's SPARK observer?",
      answer:
        "Nowhere. The observer needs no signing authority, and the Academy never accepts or stores a seed phrase.",
    },
  },
  "vod-capstone:0": {
    plainEnglish:
      "Point-in-time replay asks whether the SPARK rule could have made the decision before the ending was known. Choose historical new-token catalysts plus comparable failures from the same regime. Reveal evidence in timestamp order, lock skip/watch/paper-entry choices, and show outcomes only after the method's horizon. The winning chart must not choose the sample.",
    terms: [
      {
        term: "Point-in-time",
        meaning: "Using only information that was available at the exact decision moment.",
      },
      {
        term: "Control",
        meaning: "A comparable failed or ordinary case used to test whether the rule distinguishes outcomes.",
      },
      {
        term: "Leakage",
        meaning: "Future information accidentally entering a historical decision or feature.",
      },
      {
        term: "Holdout",
        meaning: "A set of observations kept unseen while the rule is designed, then used once for a fair check.",
      },
    ],
    walkthrough: {
      title: "Replay a fictional SPARK rotation",
      steps: [
        "Build a chronological candidate list before viewing final returns, including non-rotations.",
        "At each new-token catalyst, reveal only then-known traction, identity, state, and wallet evidence.",
        "Lock the older-CA decision and reason under one frozen strategy version.",
        "After the horizon expires, append the outcome and compare it with the baseline and controls.",
      ],
    },
    checkpoint: {
      prompt: "Why must failed SPARK-like catalysts be included before outcomes are revealed?",
      answer:
        "They expose the base rate and false positives. Choosing only famous rotations would let survivor knowledge masquerade as a method.",
    },
  },
  "vod-capstone:1": {
    plainEnglish:
      "A VOD is useful when you record decisions, not excitement. For each SPARK-like moment, note what was visible, what the trader said, what you infer, and which adjacent contracts were skipped. A visible purchase after maker acceleration is an observation. Claiming the trader secretly knew the creator is a story unless evidence supports it.",
    terms: [
      {
        term: "Observation",
        meaning: "A directly visible or verifiable fact with a timestamp.",
      },
      {
        term: "Inference",
        meaning: "A conclusion drawn from facts that may still be wrong and should be labeled as such.",
      },
      {
        term: "Counterfactual",
        meaning: "A nearby scenario in which the same action should have been skipped or would have failed.",
      },
    ],
    walkthrough: {
      title: "Annotate one SPARK-style VOD decision",
      steps: [
        "Pause before the decision and record market regime, token state, visible evidence, and missing checks.",
        "Write the selected older CA and every nearby candidate the trader ignored.",
        "Separate the trader's spoken reason from your own interpretation.",
        "Record management, exit, and a counterfactual that would have invalidated the same entry.",
      ],
    },
    checkpoint: {
      prompt: "Which note is valid observation: 'makers accelerated before entry' or 'the trader knew rotation was guaranteed'?",
      answer:
        "'Makers accelerated before entry' is observable if the tape shows it. Guaranteed knowledge is an unsupported inference.",
    },
  },
  "vod-capstone:2": {
    plainEnglish:
      "A screenshot can suggest entry, exit, and chart levels, but it cannot prove exact profit or capacity. For a fictional SPARK rotation, an entry near 6K and an exit near 9K may look profitable, yet fills, partial exits, price impact, fees, and failed attempts can change the result. Selling below the wick can still follow the written method correctly.",
    terms: [
      {
        term: "Cost basis",
        meaning: "The average acquisition cost of the filled position, not simply the chart price at one moment.",
      },
      {
        term: "Capacity",
        meaning: "How much size a method can enter and exit before its own impact materially changes the result.",
      },
      {
        term: "Price impact",
        meaning: "The price movement caused by the trade itself against available liquidity.",
      },
    ],
    walkthrough: {
      title: "Reconstruct instead of guessing",
      steps: [
        "List only what the screenshot visibly supports: approximate markers, times, and displayed labels.",
        "Mark unknowns such as fills, partials, route, fees, and rejected transactions.",
        "Estimate a range of net outcomes rather than one precise PnL number.",
        "Test the stated size against available depth; do not scale a tiny trade linearly.",
      ],
    },
    checkpoint: {
      prompt: "Can a SPARK chart with a 6K entry marker and 9K exit marker prove the trader earned exactly 50%?",
      answer:
        "No. Exact return requires actual fills, size, partials, price impact, fees, tips, failures, and exit details; the markers support only a rough reconstruction.",
    },
  },
  "vod-capstone:3": {
    plainEnglish:
      "The capstone is one complete, falsifiable SPARK method another learner could apply. Specify the candidate universe, independent-traction evidence, older-CA matching rule, disqualifiers, trigger, horizon, size, invalidation, exit, costs, logging fields, sample plan, holdout, failure modes, kill condition, and automation boundary. Passing means the method is ready for honest testing, not that an edge has been proven.",
    terms: [
      {
        term: "Baseline",
        meaning: "The simple comparison rule the SPARK method must outperform, such as all eligible older CAs or no trade.",
      },
      {
        term: "Precision",
        meaning: "Of the cases the rule selected, the share that met the prewritten success label.",
      },
      {
        term: "Recall",
        meaning: "Of all qualifying rotations in the labeled universe, the share the rule selected.",
      },
      {
        term: "Repeatability",
        meaning: "The ability of another person or later run to apply the same rule consistently.",
      },
    ],
    walkthrough: {
      title: "Hand the SPARK packet to a skeptic",
      steps: [
        "Freeze version 1 before looking at holdout outcomes; later edits become a new version.",
        "Ask another learner to label the same candidates from the written rule alone.",
        "Compare selections, false positives, missed rotations, and net paper expectancy with the baseline.",
        "Conclude 'no edge yet' when evidence is weak, and automate only evidence collection until the standard is met.",
      ],
    },
    checkpoint: {
      prompt: "What does completing the SPARK capstone actually prove?",
      answer:
        "It proves the hypothesis has been translated into a versioned, reproducible test plan with no-trade states. Only later holdout and forward paper evidence can show whether it has an edge.",
    },
  },
};
