"use client";

import { useMemo, useState } from "react";
import {
  candidatePasses,
  edgeDraftFields,
  evaluateFilter,
  methodFingerprint,
  specificationScore,
  syntheticFilterCandidates,
  validationChecks,
  workedEdgeDraft,
  type EdgeFoundryState,
  type EdgeObservation,
  type FilterConfig,
  type FilterMetrics,
} from "./data/edge-foundry";

type FoundryStage = "decode" | "specify" | "filter" | "journal" | "validate" | "automate";

const stages: { id: FoundryStage; label: string; verb: string }[] = [
  { id: "decode", label: "Decode", verb: "Observe" },
  { id: "specify", label: "Method", verb: "Define" },
  { id: "filter", label: "Filter lab", verb: "Test" },
  { id: "journal", label: "Evidence log", verb: "Journal" },
  { id: "validate", label: "Validation", verb: "Challenge" },
  { id: "automate", label: "Boundary", verb: "Automate" },
];

const formatMetric = (value: number | null, suffix = "%") => value === null ? "—" : `${Math.round(value * 100)}${suffix}`;
const formatR = (value: number | null) => value === null ? "—" : `${value >= 0 ? "+" : ""}${value.toFixed(2)}R`;

function observationMetrics(observations: EdgeObservation[]): FilterMetrics & { discipline: number | null } {
  const resolved = observations.filter((item): item is EdgeObservation & { outcomeR: number } => item.outcomeR !== null);
  const selected = resolved.filter((item) => item.ruleMatched);
  const winners = resolved.filter((item) => item.outcomeR > 0);
  const winnersCaught = selected.filter((item) => item.outcomeR > 0).length;
  const disciplined = resolved.filter((item) => (item.ruleMatched && item.decision === "paper") || (!item.ruleMatched && item.decision === "skip")).length;
  const expectancyR = selected.length ? selected.reduce((sum, item) => sum + item.outcomeR, 0) / selected.length : null;
  const baselineR = resolved.length ? resolved.reduce((sum, item) => sum + item.outcomeR, 0) / resolved.length : null;
  return {
    sample: resolved.length,
    selected: selected.length,
    winners: winners.length,
    winnersCaught,
    falsePositives: selected.filter((item) => item.outcomeR <= 0).length,
    falseNegatives: resolved.filter((item) => !item.ruleMatched && item.outcomeR > 0).length,
    precision: selected.length ? winnersCaught / selected.length : null,
    recall: winners.length ? winnersCaught / winners.length : null,
    expectancyR,
    baselineR,
    liftR: expectancyR === null || baselineR === null ? null : expectancyR - baselineR,
    discipline: resolved.length ? disciplined / resolved.length : null,
  };
}

function foundryStatus(specification: number, holdoutRevealed: boolean, observations: number, checks: number, expectancy: number | null) {
  if (specification < 80) return { label: "RAW IDEA", tone: "muted", note: "Complete the method grammar before judging the chart." };
  if (!holdoutRevealed) return { label: "HYPOTHESIS SPECIFIED", tone: "violet", note: "Freeze a toy rule and open the unseen sample before collecting your own evidence." };
  if (observations < 10) return { label: "READY TO TEST", tone: "cyan", note: "The research workflow is defined. This says nothing yet about profitability." };
  if (observations < 20 || checks < 4) return { label: "EXPLORATORY", tone: "amber", note: "Useful evidence, but still vulnerable to chance and leakage." };
  if (checks < validationChecks.length) return { label: "PAPER TESTED", tone: "cyan", note: "Promising enough to challenge across holdout data and regimes." };
  if ((expectancy ?? Number.NEGATIVE_INFINITY) <= 0) return { label: "NO EDGE YET", tone: "bad", note: "The process worked: the present rule did not survive net measurement." };
  return { label: "PAPER EVIDENCE REVIEW", tone: "good", note: "Positive paper evidence is ready for red-team review—not a profitability claim." };
}

export function EdgeFoundry({ value, onChange }: { value: EdgeFoundryState; onChange: (value: EdgeFoundryState) => void }) {
  const [stage, setStage] = useState<FoundryStage>("decode");
  const [entry, setEntry] = useState<Omit<EdgeObservation, "id" | "methodKey">>({ label: "", observedAt: "", ruleMatched: true, decision: "paper", outcomeR: null, notes: "" });

  const specification = specificationScore(value.draft);
  const currentMethodKey = methodFingerprint(value.draft);
  const currentObservations = useMemo(() => value.observations.filter((item) => item.methodKey === currentMethodKey), [currentMethodKey, value.observations]);
  const metrics = useMemo(() => observationMetrics(currentObservations), [currentObservations]);
  const activeValidation = validationChecks.filter((item) => value.validation[item.id] === currentMethodKey).map((item) => item.id);
  const config = value.holdoutAttempt?.frozenConfig ?? value.filterConfig;
  const holdoutRevealed = Boolean(value.holdoutAttempt);
  const buildCandidates = syntheticFilterCandidates.filter((candidate) => candidate.split === "build");
  const holdoutCandidates = syntheticFilterCandidates.filter((candidate) => candidate.split === "holdout");
  const buildMetrics = evaluateFilter(buildCandidates, config);
  const holdoutMetrics = evaluateFilter(holdoutCandidates, config);
  const status = foundryStatus(specification, holdoutRevealed, metrics.sample, activeValidation.length, metrics.expectancyR);
  const currentStage = stages.findIndex((item) => item.id === stage);

  const update = (next: Omit<EdgeFoundryState, "updatedAt">) => onChange({ ...next, updatedAt: new Date().toISOString() });
  const updateDraft = (key: keyof EdgeFoundryState["draft"], text: string) => update({ ...value, draft: { ...value.draft, [key]: text } });
  const loadExample = () => {
    const hasWork = Object.values(value.draft).some((field) => field.trim());
    if (hasWork && !window.confirm("Replace the current method draft with the fictional worked example? Existing cases will remain attached to their older method version.")) return;
    update({ ...value, draft: { ...workedEdgeDraft } });
  };
  const addObservation = () => {
    if (!entry.label.trim() || (entry.outcomeR !== null && !Number.isFinite(entry.outcomeR))) return;
    const observation: EdgeObservation = { ...entry, methodKey: currentMethodKey, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
    update({ ...value, observations: [...value.observations.slice(-149), observation] });
    setEntry((current) => ({ ...current, label: "", observedAt: "", outcomeR: null, notes: "" }));
  };
  const removeObservation = (id: string) => update({ ...value, observations: value.observations.filter((item) => item.id !== id) });
  const toggleValidation = (id: string) => {
    const validation = { ...value.validation };
    if (validation[id] === currentMethodKey) delete validation[id]; else validation[id] = currentMethodKey;
    update({ ...value, validation });
  };
  const updateFilter = (next: FilterConfig) => {
    if (holdoutRevealed) return;
    update({ ...value, filterConfig: next });
  };
  const revealHoldout = () => update({ ...value, holdoutAttempt: { frozenConfig: { ...value.filterConfig }, revealedAt: new Date().toISOString() } });
  const enterAutomation = () => {
    if (specification >= 80 && holdoutRevealed && !value.completedAt) update({ ...value, completedAt: new Date().toISOString() });
    setStage("automate");
  };
  const exportMethod = () => {
    const payload = { exportedAt: new Date().toISOString(), status: status.label, specification, ...value, metrics };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sol-academy-edge-method.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="foundry-shell" aria-labelledby="foundry-title">
      <header className="foundry-command">
        <div>
          <p className="eyebrow"><span>◆</span> EDGE FOUNDRY / RESEARCH WORKSPACE</p>
          <h1 id="foundry-title">Build a method that can lose an argument.</h1>
          <p>Translate a hunch into explicit selection, measure what it misses, challenge it on unseen data, and automate only the part that survives.</p>
        </div>
        <div className={`foundry-status ${status.tone}`} aria-live="polite">
          <span>CURRENT EVIDENCE STATE</span><strong>{status.label}</strong><p>{status.note}</p>
        </div>
      </header>

      <div className="foundry-hud" aria-label="Method progress">
        <div><span>SPECIFICATION</span><strong>{specification}%</strong><i><b style={{ width: `${specification}%` }} /></i></div>
        <div><span>CURRENT CASES</span><strong>{currentObservations.length}</strong><small>{value.observations.length} across all versions</small></div>
        <div><span>RULE-SET EV</span><strong className={(metrics.expectancyR ?? 0) > 0 ? "positive" : ""}>{formatR(metrics.expectancyR)}</strong><small>paper / counterfactual</small></div>
        <div><span>VALIDATION GATES</span><strong>{activeValidation.length}/{validationChecks.length}</strong><small>current method version</small></div>
      </div>

      <nav className="foundry-stages" aria-label="Edge Foundry stages">
        {stages.map((item, index) => <button type="button" key={item.id} className={stage === item.id ? "active" : ""} onClick={() => setStage(item.id)} aria-current={stage === item.id ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><small>{item.verb}</small><strong>{item.label}</strong>{index < currentStage && <b>✓</b>}</button>)}
      </nav>

      <div className="foundry-stage" key={stage}>
        {stage === "decode" && <DecodeStage onContinue={() => setStage("specify")} />}
        {stage === "specify" && <SpecifyStage value={value} updateDraft={updateDraft} loadExample={loadExample} onContinue={() => setStage("filter")} />}
        {stage === "filter" && <FilterStage config={config} setConfig={updateFilter} build={buildCandidates} buildMetrics={buildMetrics} holdout={holdoutCandidates} holdoutMetrics={holdoutMetrics} revealed={holdoutRevealed} onReveal={revealHoldout} onContinue={() => setStage("journal")} />}
        {stage === "journal" && <JournalStage entry={entry} setEntry={setEntry} add={addObservation} observations={value.observations} currentMethodKey={currentMethodKey} remove={removeObservation} metrics={metrics} onContinue={() => setStage("validate")} />}
        {stage === "validate" && <ValidateStage selected={activeValidation} toggle={toggleValidation} onContinue={enterAutomation} />}
        {stage === "automate" && <AutomateStage value={value} status={status} exportMethod={exportMethod} onBack={() => setStage("specify")} />}
      </div>

      <footer className="foundry-rule"><span>NON-NEGOTIABLE</span><p>A compelling story, positive backtest, or fast bot is not an edge. The result must survive unseen opportunities, realistic costs, capacity limits, and a predeclared shutdown rule.</p></footer>
    </section>
  );
}

function DecodeStage({ onContinue }: { onContinue: () => void }) {
  const grammar = [
    ["UNIVERSE", "Which opportunities enter the scanner?"],
    ["STATE", "When is one eligible for this exact setup?"],
    ["EVIDENCE", "What independent observations must agree?"],
    ["TRIGGER", "What timestamped change permits action?"],
    ["RISK", "What can be lost and what size can actually exit?"],
    ["EXIT", "What ends the trade in profit, failure, or time?"],
  ];
  return <div className="foundry-decode">
    <div className="foundry-stage-head"><span>01 / DECODE THE CLAIM</span><h3>Hear the slang. Reconstruct the machine.</h3><p>A sentence from chat is compressed. Your job is to expand it into variables without inventing facts.</p></div>
    <article className="decoder-case">
      <div><span>FICTIONAL TRENCH CLAIM</span><blockquote>“Bot watches fresh pairs, checks same-name coins with a few SOL in activity fees, sifts fast, cuts the slop small, and lets the senders pay.”</blockquote></div>
      <ol>
        <li><span>01</span><div><strong>Candidate generation</strong><p>Fresh public launches crossing a declared state or activity threshold.</p></div></li>
        <li><span>02</span><div><strong>Identity problem</strong><p>Several contracts share a name; chronology, authentic linkage, adoption, and ownership may disagree.</p></div></li>
        <li><span>03</span><div><strong>Proxy, not proof</strong><p>Name, age, fees, or search rank can narrow candidates; none alone proves the canonical contract.</p></div></li>
        <li><span>04</span><div><strong>Classifier trade-off</strong><p>Loose rules catch more runners and more garbage. Strict rules reject garbage and may arrive late or miss winners.</p></div></li>
        <li><span>05</span><div><strong>Payoff shape</strong><p>Many controlled misses could be rational only if rare wins remain large after every cost and failed exit.</p></div></li>
      </ol>
    </article>
    <div className="method-grammar">{grammar.map(([label, question], index) => <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><p>{question}</p></div>)}</div>
    <section className="latency-proof">
      <header><span>LATENCY MICRO-EXERCISE</span><h4>Fast at the wrong decision is still wrong.</h4><p>Compare the full decision-to-outcome chain, not one attractive millisecond number.</p></header>
      <div><article><span>LOCAL SIFT / 30 MS</span><strong>62% correct</strong><code>.62(+.55R) + .38(-1R) = -.039R</code></article><article><span>REMOTE SEARCH / 300 MS</span><strong>87% correct</strong><code>.87(+.47R) + .13(-1R) = +.279R</code></article></div>
      <footer><strong>THE SLOWER PATH WINS HERE.</strong><p>“Sift takes 30ms” is one processing stage, not detection-to-land latency. Optimize selection accuracy × executable payoff across feed, lookup, scoring, signing, landing, confirmation, and exit.</p></footer>
    </section>
    <div className="unknown-ledger"><span>STILL UNKNOWN</span><p>Sample size · false-positive rate · missed winners · feature timestamps · actual fills · baseline result · regime dependence · capacity · shutdown condition</p></div>
    <button type="button" className="primary-action" onClick={onContinue}>Specify my hypothesis <span>→</span></button>
  </div>;
}

function SpecifyStage({ value, updateDraft, loadExample, onContinue }: { value: EdgeFoundryState; updateDraft: (key: keyof EdgeFoundryState["draft"], text: string) => void; loadExample: () => void; onContinue: () => void }) {
  const groups = Array.from(new Set(edgeDraftFields.map((item) => item.group)));
  return <div className="foundry-specify">
    <div className="foundry-stage-head split"><div><span>02 / METHOD GRAMMAR</span><h3>If a stranger cannot execute the rule, it is not specified.</h3><p>Describe observable conditions. Avoid “good,” “clean,” “strong,” and “about to send” unless you define them.</p></div><button type="button" className="secondary-action" onClick={loadExample}>Load fictional worked example</button></div>
    {groups.map((group) => <section className="spec-group" key={group}><header><span>{group.toUpperCase()}</span><b>{edgeDraftFields.filter((item) => item.group === group && value.draft[item.key].trim().length >= 12).length}/{edgeDraftFields.filter((item) => item.group === group).length}</b></header><div>{edgeDraftFields.filter((item) => item.group === group).map((field) => <label key={field.key}><span>{field.label}</span>{field.key === "name" ? <input value={value.draft[field.key]} onChange={(event) => updateDraft(field.key, event.target.value)} placeholder={field.prompt} /> : <textarea value={value.draft[field.key]} onChange={(event) => updateDraft(field.key, event.target.value)} placeholder={field.prompt} rows={3} />}<small>{field.prompt}</small></label>)}</div></section>)}
    <div className="foundry-next"><p><strong>Passing this screen proves only specification.</strong> A well-written losing method is still a losing method.</p><button type="button" className="primary-action" onClick={onContinue}>Open filter lab <span>→</span></button></div>
  </div>;
}

function MetricStrip({ metrics, label }: { metrics: FilterMetrics; label: string }) {
  return <div className="filter-metrics"><span>{label}</span><div><small>Selected</small><strong>{metrics.selected}/{metrics.sample}</strong></div><div><small>Precision</small><strong>{formatMetric(metrics.precision)}</strong></div><div><small>Recall</small><strong>{formatMetric(metrics.recall)}</strong></div><div><small>Rule EV</small><strong className={(metrics.expectancyR ?? 0) > 0 ? "positive" : "negative"}>{formatR(metrics.expectancyR)}</strong></div><div><small>Baseline EV</small><strong>{formatR(metrics.baselineR)}</strong></div><div><small>Lift</small><strong className={(metrics.liftR ?? 0) > 0 ? "positive" : "negative"}>{formatR(metrics.liftR)}</strong></div><div><small>Missed winners</small><strong>{metrics.falseNegatives}</strong></div></div>;
}

function CandidateTable({ candidates, config, concealed = false }: { candidates: typeof syntheticFilterCandidates; config: FilterConfig; concealed?: boolean }) {
  return <div className={`candidate-table ${concealed ? "concealed" : ""}`}><div className="candidate-row head"><span>ID</span><span>Activity fees</span><span>Source link</span><span>Buyer growth</span><span>Rule</span><span>Outcome</span></div>{candidates.map((candidate) => { const passes = candidatePasses(candidate, config); return <div className={`candidate-row ${passes ? "selected" : ""}`} key={candidate.id}><strong>{candidate.id}</strong><span>{concealed ? "•••" : `${candidate.activityFees.toFixed(1)} SOL`}</span><span>{concealed ? "•••" : candidate.sourceLinked ? "Linked" : "No link"}</span><span>{concealed ? "•••" : `+${candidate.buyerGrowth}%`}</span><b>{concealed ? "LOCKED" : passes ? "PASS" : "SKIP"}</b><em className={!concealed && candidate.outcomeR > 0 ? "positive" : ""}>{concealed ? "?" : formatR(candidate.outcomeR)}</em></div>; })}</div>;
}

function FilterStage({ config, setConfig, build, buildMetrics, holdout, holdoutMetrics, revealed, onReveal, onContinue }: { config: FilterConfig; setConfig: (value: FilterConfig) => void; build: typeof syntheticFilterCandidates; buildMetrics: FilterMetrics; holdout: typeof syntheticFilterCandidates; holdoutMetrics: FilterMetrics; revealed: boolean; onReveal: () => void; onContinue: () => void }) {
  return <div className="foundry-filter">
    <div className="foundry-stage-head"><span>03 / PRECISION × RECALL</span><h3>A filter decides what you buy—and what you never see.</h3><p>Tune only on the build sample. Freeze the rule before revealing the holdout or you silently train on the exam.</p></div>
    <section className="dual-label-note"><div><span>IDENTITY LABEL</span><strong>Did you find the intended / canonical candidate?</strong><p>For an OG search system, precision and recall must first be scored against a declared identity label. Age, fees, or name similarity are features—not proof.</p></div><div><span>TRADE LABEL</span><strong>Did a fixed trade policy earn net R?</strong><p>A perfect identity classifier can still lose money after entry timing, exits, slippage, and latency. This toy lab uses positive net R as its label; never confuse the two tests.</p></div></section>
    <div className="filter-console">
      <aside>
        <p>TOY FILTER CONTROLS</p>
        <label><span>Minimum activity fees <b>{config.minimumFees.toFixed(1)} SOL</b></span><input disabled={revealed} type="range" min="0" max="12" step="0.5" value={config.minimumFees} onChange={(event) => setConfig({ ...config, minimumFees: Number(event.target.value) })} /></label>
        <label><span>Minimum buyer growth <b>+{config.minimumBuyerGrowth}%</b></span><input disabled={revealed} type="range" min="0" max="35" step="1" value={config.minimumBuyerGrowth} onChange={(event) => setConfig({ ...config, minimumBuyerGrowth: Number(event.target.value) })} /></label>
        <label className="filter-check"><input disabled={revealed} type="checkbox" checked={config.requireSourceLink} onChange={(event) => setConfig({ ...config, requireSourceLink: event.target.checked })} /><span>Require authentic source link</span></label>
        {revealed && <p className="frozen-rule">FROZEN ATTEMPT · Reloading or syncing will not unlock this holdout.</p>}
        <div className="filter-warning"><strong>OVERFIT ALERT</strong><p>A threshold that perfectly explains nine old rows may fail on the next six.</p></div>
      </aside>
      <div><MetricStrip metrics={buildMetrics} label="BUILD SAMPLE" /><CandidateTable candidates={build} config={config} /></div>
    </div>
    <section className={`holdout-vault ${revealed ? "open" : ""}`}>
      <header><div><span>UNTOUCHED HOLDOUT</span><h4>{revealed ? "The frozen rule meets new cases." : "Six outcomes are sealed."}</h4><p>{revealed ? "Do not retune and call this the same test. Any change creates a new hypothesis needing another holdout." : "Freeze the current thresholds before opening. A worse result is information, not failure."}</p></div>{!revealed && <button type="button" className="primary-action" onClick={onReveal}>Lock rule & reveal <span>→</span></button>}</header>
      {revealed ? <><MetricStrip metrics={holdoutMetrics} label="HOLDOUT RESULT" /><CandidateTable candidates={holdout} config={config} /></> : <CandidateTable candidates={holdout} config={config} concealed />}
    </section>
    <div className="foundry-next"><p><strong>Toy data teaches the measurement.</strong> It does not validate these fields or thresholds in a live market.</p><button type="button" className="primary-action" onClick={onContinue}>Build evidence log <span>→</span></button></div>
  </div>;
}

function JournalStage({ entry, setEntry, add, observations, currentMethodKey, remove, metrics, onContinue }: { entry: Omit<EdgeObservation, "id" | "methodKey">; setEntry: (value: Omit<EdgeObservation, "id" | "methodKey">) => void; add: () => void; observations: EdgeObservation[]; currentMethodKey: string; remove: (id: string) => void; metrics: ReturnType<typeof observationMetrics>; onContinue: () => void }) {
  return <div className="foundry-journal">
    <div className="foundry-stage-head"><span>04 / POINT-IN-TIME EVIDENCE</span><h3>Log the skips or manufacture your own genius.</h3><p>A decision journal needs candidates the rule accepted, candidates it rejected, and the later outcome under one consistent measurement policy.</p></div>
    <div className="journal-grid">
      <section className="observation-form">
        <label><span>Candidate label</span><input value={entry.label} onChange={(event) => setEntry({ ...entry, label: event.target.value })} placeholder="Exact CA suffix or replay ID" /></label>
        <label><span>Observed at</span><input value={entry.observedAt} onChange={(event) => setEntry({ ...entry, observedAt: event.target.value })} placeholder="UTC timestamp / VOD timecode" /></label>
        <div><label><span>Rule result</span><select value={entry.ruleMatched ? "pass" : "fail"} onChange={(event) => setEntry({ ...entry, ruleMatched: event.target.value === "pass" })}><option value="pass">Passed filter</option><option value="fail">Failed filter</option></select></label><label><span>Decision</span><select value={entry.decision} onChange={(event) => setEntry({ ...entry, decision: event.target.value as "paper" | "skip" })}><option value="paper">Paper entry</option><option value="skip">Skip</option></select></label></div>
        <label><span>Measured outcome (R)</span><input type="number" min="-100" max="100" step="0.1" value={entry.outcomeR ?? ""} onChange={(event) => setEntry({ ...entry, outcomeR: event.target.value === "" ? null : Math.max(-100, Math.min(100, Number(event.target.value) || 0)) })} placeholder="Leave blank while pending" /></label>
        <label><span>Point-in-time note</span><textarea rows={4} value={entry.notes} onChange={(event) => setEntry({ ...entry, notes: event.target.value })} placeholder="Visible evidence, missing fields, assumed costs, and outcome measurement rule." /></label>
        <button type="button" className="primary-action" disabled={!entry.label.trim()} onClick={add}>Log observation <span>+</span></button>
      </section>
      <section className="journal-scoreboard">
        <div><span>CASES</span><strong>{metrics.sample}</strong></div><div><span>PRECISION</span><strong>{formatMetric(metrics.precision)}</strong></div><div><span>RECALL</span><strong>{formatMetric(metrics.recall)}</strong></div><div><span>DISCIPLINE</span><strong>{formatMetric(metrics.discipline)}</strong></div><div><span>RULE EV</span><strong className={(metrics.expectancyR ?? 0) > 0 ? "positive" : ""}>{formatR(metrics.expectancyR)}</strong></div><div><span>BASELINE EV</span><strong>{formatR(metrics.baselineR)}</strong></div><div><span>LIFT</span><strong className={(metrics.liftR ?? 0) > 0 ? "positive" : ""}>{formatR(metrics.liftR)}</strong></div><div><span>MISSED WINNERS</span><strong>{metrics.falseNegatives}</strong></div>
        <p>R must use one declared risk unit and one consistent outcome horizon. Skipped-trade outcomes are counterfactual estimates, not realized PnL.</p>
      </section>
    </div>
    <div className="observation-ledger">{observations.length === 0 ? <div className="empty-ledger"><strong>NO CASES LOGGED</strong><p>Start with replay or paper decisions. A blank ledger is more honest than invented evidence.</p></div> : <><div className="observation-row head"><span>Candidate</span><span>Rule</span><span>Decision</span><span>Outcome</span><span>Evidence note</span><span /></div>{[...observations].reverse().map((item) => { const stale = item.methodKey !== currentMethodKey; return <div className={`observation-row ${stale ? "stale" : ""}`} key={item.id}><div><strong>{item.label}</strong><small>{stale ? "OLDER METHOD VERSION" : item.observedAt || "No timestamp"}</small></div><b className={item.ruleMatched ? "pass" : "skip"}>{item.ruleMatched ? "PASS" : "FAIL"}</b><span>{item.decision === "paper" ? "Paper entry" : "Skip"}</span><em className={(item.outcomeR ?? 0) > 0 ? "positive" : ""}>{formatR(item.outcomeR)}</em><p>{item.notes || "—"}</p><button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.label}`}>×</button></div>; })}</>}</div>
    <div className="foundry-next"><p><strong>Do not promote a tiny sample into certainty.</strong> Twenty cases is a workflow milestone here, not statistical proof.</p><button type="button" className="primary-action" onClick={onContinue}>Challenge the evidence <span>→</span></button></div>
  </div>;
}

function ValidateStage({ selected, toggle, onContinue }: { selected: string[]; toggle: (id: string) => void; onContinue: () => void }) {
  return <div className="foundry-validate">
    <div className="foundry-stage-head"><span>05 / ADVERSARIAL VALIDATION</span><h3>Try to kill the method before the market does.</h3><p>These are evidence claims, not celebratory badges. Mark one only after the work exists in your notebook or dataset.</p></div>
    <div className="validation-grid">{validationChecks.map((check, index) => { const active = selected.includes(check.id); return <button type="button" className={active ? "active" : ""} onClick={() => toggle(check.id)} aria-pressed={active} key={check.id}><span>{String(index + 1).padStart(2, "0")}</span><i>{active ? "✓" : ""}</i><strong>{check.label}</strong><p>{check.detail}</p></button>; })}</div>
    <section className="red-team-panel"><span>RED-TEAM QUESTIONS</span><ul><li>Could a single outlier explain the profit?</li><li>Did a feature become available only after the decision?</li><li>Are multiple wallets actually one actor?</li><li>Does the setup work after realistic exits, not displayed market cap?</li><li>Did you change thresholds after seeing the holdout?</li><li>What would a competing bot exploit about your behavior?</li></ul></section>
    <div className="foundry-next"><p><strong>A failed test is a successful research result.</strong> Retire, narrow, or relabel the method instead of moving the goalposts.</p><button type="button" className="primary-action" onClick={onContinue}>Define automation boundary <span>→</span></button></div>
  </div>;
}

function AutomateStage({ value, status, exportMethod, onBack }: { value: EdgeFoundryState; status: ReturnType<typeof foundryStatus>; exportMethod: () => void; onBack: () => void }) {
  const hasPaperEvidence = status.label === "PAPER EVIDENCE REVIEW";
  const planes = [
    ["INGEST", value.draft.universe || "Define the eligible event feed."],
    ["ENRICH", value.draft.evidence || "Define every required feature and missing-data state."],
    ["DECIDE", value.draft.trigger || "Define a deterministic trigger and disqualifiers."],
    ["RISK", value.draft.sizeRule || "Define capacity, loss, and spend limits."],
    ["ACT", value.draft.automationBoundary || "Begin with alerts and paper execution."],
    ["CONTROL", value.draft.killCondition || "Define reconciliation, monitoring, and shutdown."],
  ];
  return <div className="foundry-automate">
    <div className="foundry-stage-head"><span>06 / GUARDED AUTOMATION</span><h3>Software should execute a measured rule—not complete your thinking.</h3><p>The observer, paper logger, and alert system are valid products long before automatic entry is justified.</p></div>
    <div className="automation-map">{planes.map(([label, text], index) => <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><p>{text}</p>{index < planes.length - 1 && <b>→</b>}</div>)}</div>
    <div className="automation-verdict">
      <div className={`foundry-status ${status.tone}`}><span>CURRENT EVIDENCE STATE</span><strong>{status.label}</strong><p>{status.note}</p></div>
      <div><span>SAFEST NEXT BUILD</span><h4>{hasPaperEvidence ? "Shadow runner + independent review" : "Observer + enrichment + paper logger"}</h4><p>{hasPaperEvidence ? "Replay the frozen rule in real time without signing, reconcile every decision, stress costs and capacity, and require a separate promotion review before any capped live pilot." : "Automate collection and measurement first. It accelerates learning without turning an unfinished hypothesis into live exposure."}</p></div>
    </div>
    <section className="foundry-boundary"><div><span>OUTSIDE THIS ACADEMY</span><p>Hacking, whitelist bypassing, wash trading, fake traction, concealed multiwallet manipulation, and evasion are explained defensively—not implemented.</p></div><div><span>ALWAYS REQUIRED</span><p>Never paste a seed phrase here. Keep signing isolated, capital limited, failures observable, and the human kill switch reachable.</p></div></section>
    <div className="foundry-actions"><button type="button" className="secondary-action" onClick={onBack}>Edit method</button><button type="button" className="primary-action" onClick={exportMethod}>Export research packet <span>↓</span></button></div>
  </div>;
}
