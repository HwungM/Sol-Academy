"use client";

import { useId, useRef, useState } from "react";
import {
  examScenarios,
  executionChecklist,
  platformTranslations,
  practiceScenarios,
  readinessDomains,
  setupBridge,
  type ReadinessDomain,
  type ReadinessScenario,
  type TerminalSnapshot as TerminalSnapshotData,
} from "./data/readiness";
import { candleScenarios } from "./data/candles";
import { CandleChart } from "./CandleLab";

type ReadinessTab = "brief" | "practice" | "exam";

export type ReadinessExamResult = {
  score: number;
  domainScores: Record<string, number>;
  passed: boolean;
  criticalClear: boolean;
};

export type ReadinessLabProps = {
  practiceAnswers: Record<string, number>;
  examBest?: number;
  examDomains: Record<string, number>;
  examPassedAt?: string;
  screenOriented: boolean;
  qualityVodNotes: number;
  onPracticeAnswer: (scenarioId: string, answer: number) => void;
  onExamResult: (result: ReadinessExamResult) => void;
  onOpenVod: () => void;
};

const optionLetters = ["A", "B", "C", "D"] as const;

const snapshotFields: Array<[keyof TerminalSnapshotData, string]> = [
  ["state", "State"],
  ["age", "Age"],
  ["marketCap", "Market cap"],
  ["liquidity", "Liquidity"],
  ["volume", "Volume"],
  ["makers", "Makers"],
  ["buySell", "Buy / sell"],
  ["dev", "Dev"],
  ["top10", "Top 10"],
  ["snipers", "Snipers"],
  ["bundle", "Bundle"],
  ["proTraders", "Pro traders"],
];

function formatPassedAt(value?: string) {
  if (!value) return "Not cleared";
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) return "Cleared";
  return `Cleared ${timestamp.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

function TerminalSnapshot({ scenario }: { scenario: ReadinessScenario }) {
  const fields = scenario.snapshot
    ? snapshotFields.filter(([key]) => Boolean(scenario.snapshot?.[key]))
    : [];
  const chart = candleScenarios.find((item) => item.id === scenario.snapshot?.chartId);

  return (
    <section className="terminal-snapshot" aria-label={`Terminal snapshot for ${scenario.title}`}>
      <header className="terminal-snapshot-bar">
        <div className="terminal-window-controls" aria-hidden="true"><span /><span /><span /></div>
        <p>SIMULATED TERMINAL // READ ONLY</p>
        <span className="terminal-live-state"><i aria-hidden="true" /> PAPER</span>
      </header>
      <div className="terminal-snapshot-body">
        <div className="terminal-token-row">
          <div className="terminal-token-mark" aria-hidden="true">S</div>
          <div>
            <p className="terminal-token-symbol">SCENARIO FEED</p>
            <p className="terminal-token-context">{scenario.context}</p>
          </div>
          <span className="terminal-domain-tag">{scenario.domain}</span>
        </div>
        {fields.length > 0 ? (
          <dl className="terminal-metric-grid">
            {fields.map(([key, label]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{scenario.snapshot?.[key]}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="terminal-empty-state">
            <span aria-hidden="true">NO MARKET FEED</span>
            <p>This decision depends on the written evidence, not a chart.</p>
          </div>
        )}
        {chart ? <div className="readiness-candle-chart"><CandleChart scenario={chart} compact showVolume /></div> : (
          <div className="terminal-tape" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
        )}
      </div>
      <footer className="terminal-snapshot-footer">
        <span>Execution disabled</span><span>Training environment</span>
      </footer>
    </section>
  );
}

function ScenarioOptions({
  scenario,
  selected,
  reveal,
  onSelect,
}: {
  scenario: ReadinessScenario;
  selected: number | undefined;
  reveal: boolean;
  onSelect: (answer: number) => void;
}) {
  return (
    <fieldset className="scenario-options">
      <legend>{scenario.prompt}</legend>
      <div className="scenario-option-list">
        {scenario.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = scenario.answer === index;
          const stateClass = reveal
            ? isCorrect
              ? "is-correct"
              : isSelected
                ? "is-incorrect"
                : ""
            : isSelected
              ? "is-selected"
              : "";

          return (
            <button
              className={`scenario-option ${stateClass}`}
              type="button"
              aria-pressed={isSelected}
              disabled={reveal}
              onClick={() => onSelect(index)}
              key={option}
            >
              <span aria-hidden="true">{optionLetters[index]}</span>
              <strong>{option}</strong>
              {reveal && isCorrect && <em>Correct</em>}
              {reveal && isSelected && !isCorrect && <em>Selected</em>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function DomainScoreGrid({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="readiness-domain-scores">
      {readinessDomains.map((domain) => {
        const score = scores[domain] ?? 0;
        return (
          <div className={score >= 50 ? "is-clear" : ""} key={domain}>
            <span>{domain}</span>
            <strong>{score}%</strong>
            <i aria-hidden="true"><b style={{ width: `${Math.max(0, Math.min(100, score))}%` }} /></i>
          </div>
        );
      })}
    </div>
  );
}

function BriefPanel({
  screenOriented,
  qualityVodNotes,
  examBest,
  examDomains,
  examPassedAt,
  onOpenVod,
}: Pick<
  ReadinessLabProps,
  "screenOriented" | "qualityVodNotes" | "examBest" | "examDomains" | "examPassedAt" | "onOpenVod"
>) {
  const gateClear = screenOriented && Boolean(examPassedAt) && qualityVodNotes >= 2;

  return (
    <div className="readiness-brief" role="tabpanel" id="readiness-panel-brief" aria-labelledby="readiness-tab-brief">
      <section className={`readiness-gate ${gateClear ? "is-clear" : ""}`}>
        <div>
          <p className="readiness-kicker">READINESS PROTOCOL</p>
          <h2>{gateClear ? "VOD literacy verified." : "Three proofs. No vanity rank."}</h2>
          <p>
            The gate measures whether you can read a terminal, make a bounded decision, and document a trader&apos;s process without inventing evidence.
          </p>
        </div>
        <div className="readiness-gate-status" aria-label="Readiness requirements">
          <div className={screenOriented ? "is-clear" : ""}>
            <span>01</span><p><strong>Screen orientation</strong><small>{screenOriented ? "8 of 8 core modules cleared" : "Clear all 8 core modules"}</small></p>
          </div>
          <div className={examPassedAt ? "is-clear" : ""}>
            <span>02</span><p><strong>Unseen performance exam</strong><small>{examPassedAt ? formatPassedAt(examPassedAt) : `Best ${examBest ?? 0}% / target 85%`}</small></p>
          </div>
          <div className={qualityVodNotes >= 2 ? "is-clear" : ""}>
            <span>03</span><p><strong>Evidence-grade VOD notes</strong><small>{Math.min(qualityVodNotes, 2)} of 2 complete</small></p>
            <button type="button" onClick={onOpenVod}>Open VOD lab</button>
          </div>
        </div>
      </section>

      <section className="readiness-section" aria-labelledby="translation-title">
        <div className="readiness-section-heading">
          <div><p className="readiness-kicker">CROSS-PLATFORM TRANSLATION</p><h2 id="translation-title">Read concepts, not button labels.</h2></div>
          <p>Axiom and BullX expose similar questions through different surfaces. The operator question is the portable skill.</p>
        </div>
        <div className="translation-table" role="table" aria-label="Axiom and BullX feature translation">
          <div className="translation-row translation-head" role="row">
            <span role="columnheader">Concept</span><span role="columnheader">Axiom</span><span role="columnheader">BullX</span><span role="columnheader">Operator question</span>
          </div>
          {platformTranslations.map((item) => (
            <div className="translation-row" role="row" key={item.concept}>
              <strong role="cell">{item.concept}</strong><span role="cell">{item.axiom}</span><span role="cell">{item.bullx}</span><p role="cell">{item.operatorQuestion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="readiness-section" aria-labelledby="setups-title">
        <div className="readiness-section-heading">
          <div><p className="readiness-kicker">SETUP BRIDGE</p><h2 id="setups-title">Four setup families. Unlimited implementations.</h2></div>
          <p>Each method needs a universe, evidence, trigger, and invalidation. Automation comes after the manual decision survives measurement.</p>
        </div>
        <div className="setup-bridge-grid">
          {setupBridge.map((setup, index) => (
            <article key={setup.name}>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{setup.name}</h3>
              <dl>
                <div><dt>Universe</dt><dd>{setup.universe}</dd></div>
                <div><dt>Evidence</dt><dd>{setup.evidence}</dd></div>
                <div><dt>Trigger</dt><dd>{setup.trigger}</dd></div>
                <div><dt>Invalidation</dt><dd>{setup.invalidation}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="readiness-section readiness-execution" aria-labelledby="execution-title">
        <div className="readiness-section-heading">
          <div><p className="readiness-kicker">EXECUTION CHECK</p><h2 id="execution-title">Before a click becomes risk.</h2></div>
          <p>This lab never submits transactions. Use the sequence to understand what a terminal action represents economically.</p>
        </div>
        <ol>
          {executionChecklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
        </ol>
      </section>

      {(examBest ?? 0) > 0 && (
        <section className="readiness-section readiness-saved-score" aria-labelledby="saved-score-title">
          <div className="readiness-section-heading">
            <div><p className="readiness-kicker">SAVED PERFORMANCE</p><h2 id="saved-score-title">Best exam: {examBest}%</h2></div>
            <p>Every domain must remain at or above 50%; a single critical error blocks the gate even when the headline score is high.</p>
          </div>
          <DomainScoreGrid scores={examDomains} />
        </section>
      )}
    </div>
  );
}

function PracticePanel({ practiceAnswers, onPracticeAnswer }: Pick<ReadinessLabProps, "practiceAnswers" | "onPracticeAnswer">) {
  const [domain, setDomain] = useState<ReadinessDomain>(readinessDomains[0]);
  const [index, setIndex] = useState(0);
  const scenarios = practiceScenarios.filter((item) => item.domain === domain);
  const active = scenarios[Math.min(index, scenarios.length - 1)];
  const answer = practiceAnswers[active.id];
  const answered = typeof answer === "number";
  const answeredCount = practiceScenarios.filter((item) => typeof practiceAnswers[item.id] === "number").length;
  const correctCount = practiceScenarios.filter((item) => practiceAnswers[item.id] === item.answer).length;

  const chooseDomain = (next: ReadinessDomain) => {
    setDomain(next);
    setIndex(0);
  };

  return (
    <div className="readiness-practice" role="tabpanel" id="readiness-panel-practice" aria-labelledby="readiness-tab-practice">
      <header className="readiness-workbench-header">
        <div><p className="readiness-kicker">PRACTICE DECK // FEEDBACK ON</p><h2>Build the read before the timer.</h2><p>Two drills per domain. Commit to an answer, then inspect the reasoning.</p></div>
        <div className="readiness-workbench-stat"><span>Deck progress</span><strong>{answeredCount}<small> / {practiceScenarios.length}</small></strong><p>{correctCount} correct</p></div>
      </header>

      <div className="readiness-domain-tabs" aria-label="Practice domain">
        {readinessDomains.map((item) => {
          const domainItems = practiceScenarios.filter((scenario) => scenario.domain === item);
          const domainAnswered = domainItems.filter((scenario) => typeof practiceAnswers[scenario.id] === "number").length;
          return <button className={domain === item ? "is-active" : ""} type="button" aria-pressed={domain === item} onClick={() => chooseDomain(item)} key={item}><span>{item}</span><small>{domainAnswered}/{domainItems.length}</small></button>;
        })}
      </div>

      <div className="scenario-workspace">
        <div className="scenario-workspace-main">
          <div className="scenario-index"><span>{domain}</span><p>Case {index + 1} / {scenarios.length}</p>{active.criticalError && <em>Critical decision</em>}</div>
          <h2>{active.title}</h2>
          <TerminalSnapshot scenario={active} />
        </div>
        <div className="scenario-decision-panel">
          <ScenarioOptions scenario={active} selected={answer} reveal={answered} onSelect={(selected) => onPracticeAnswer(active.id, selected)} />
          {answered && (
            <div className={`scenario-feedback ${answer === active.answer ? "is-correct" : "is-incorrect"}`} role="status">
              <span>{answer === active.answer ? "READ CONFIRMED" : "RECALIBRATE"}</span>
              <strong>{answer === active.answer ? "Correct decision." : `Correct answer: ${optionLetters[active.answer]}`}</strong>
              <p>{active.explanation}</p>
            </div>
          )}
          <div className="scenario-navigation">
            <button type="button" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))}>Previous</button>
            <button type="button" disabled={!answered || index >= scenarios.length - 1} onClick={() => setIndex((current) => Math.min(scenarios.length - 1, current + 1))}>Next case</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function scoreExam(answers: Record<string, number>): ReadinessExamResult {
  const correct = examScenarios.filter((scenario) => answers[scenario.id] === scenario.answer).length;
  const score = Math.round((correct / examScenarios.length) * 100);
  const domainScores = Object.fromEntries(
    readinessDomains.map((domain) => {
      const scenarios = examScenarios.filter((scenario) => scenario.domain === domain);
      const domainCorrect = scenarios.filter((scenario) => answers[scenario.id] === scenario.answer).length;
      return [domain, Math.round((domainCorrect / scenarios.length) * 100)];
    }),
  );
  const criticalClear = examScenarios
    .filter((scenario) => scenario.criticalError)
    .every((scenario) => answers[scenario.id] === scenario.answer);
  const domainFloorClear = readinessDomains.every((domain) => domainScores[domain] >= 50);

  return { score, domainScores, criticalClear, passed: score >= 85 && domainFloorClear && criticalClear };
}

function ExamPanel({ screenOriented, examBest, examPassedAt, onExamResult }: Pick<ReadinessLabProps, "screenOriented" | "examBest" | "examPassedAt" | "onExamResult">) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReadinessExamResult | null>(null);
  const active = examScenarios[index];
  const selected = answers[active.id];
  const answeredCount = Object.keys(answers).filter((id) => examScenarios.some((scenario) => scenario.id === id)).length;
  const allAnswered = answeredCount === examScenarios.length;

  const startExam = () => {
    setAnswers({});
    setResult(null);
    setIndex(0);
    setStarted(true);
  };

  const submitExam = () => {
    if (!allAnswered) return;
    const nextResult = scoreExam(answers);
    setResult(nextResult);
    onExamResult(nextResult);
  };

  if (!screenOriented) {
    return (
      <div className="readiness-exam readiness-exam-locked" role="tabpanel" id="readiness-panel-exam" aria-labelledby="readiness-tab-exam">
        <span className="readiness-lock-mark" aria-hidden="true">08</span>
        <p className="readiness-kicker">EXAM LOCKED</p><h2>Clear the eight core modules first.</h2>
        <p>The practice deck remains open. The scored exam unlocks when the terminal vocabulary and decision sequence are screen-oriented.</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="readiness-exam readiness-exam-intro" role="tabpanel" id="readiness-panel-exam" aria-labelledby="readiness-tab-exam">
        <div className="exam-briefing-copy">
          <p className="readiness-kicker">UNSEEN PERFORMANCE EXAM</p>
          <h2>Sixteen decisions. Eight domains. Zero answer reveal.</h2>
          <p>These cases are separate from practice. Work from the evidence available at decision time; no transaction is submitted.</p>
          <ul>
            <li><strong>85%+</strong><span>headline score</span></li>
            <li><strong>50%+</strong><span>in every domain</span></li>
            <li><strong>0</strong><span>critical errors</span></li>
          </ul>
          <button className="readiness-primary-action" type="button" onClick={startExam}>{examPassedAt ? "Retake exam" : "Begin readiness exam"}</button>
        </div>
        <aside className="exam-record">
          <p>OPERATOR RECORD</p><strong>{examBest ?? 0}%</strong><span>Personal best</span>
          <div><small>Status</small><b>{formatPassedAt(examPassedAt)}</b></div>
        </aside>
      </div>
    );
  }

  return (
    <div className="readiness-exam" role="tabpanel" id="readiness-panel-exam" aria-labelledby="readiness-tab-exam">
      <header className="readiness-workbench-header exam-session-header">
        <div><p className="readiness-kicker">READINESS EXAM // {result ? "REVIEW" : "FEEDBACK LOCKED"}</p><h2>{result ? (result.passed ? "Gate cleared." : "Gate held.") : "Commit to the visible evidence."}</h2></div>
        <div className="readiness-workbench-stat"><span>{result ? "Final score" : "Answered"}</span><strong>{result ? `${result.score}%` : answeredCount}<small>{result ? "" : ` / ${examScenarios.length}`}</small></strong><p>{result ? (result.criticalClear ? "Critical clear" : "Critical error") : `Case ${index + 1} of ${examScenarios.length}`}</p></div>
      </header>

      {result && (
        <section className={`exam-result ${result.passed ? "is-pass" : "is-hold"}`} aria-live="polite">
          <div><span>{result.passed ? "PERFORMANCE VERIFIED" : "RECALIBRATION REQUIRED"}</span><h3>{result.passed ? "You passed the unseen exam." : "The rank stays locked."}</h3><p>{result.passed ? "Complete two evidence-grade VOD notes to finish the full readiness gate." : "Review the misses below, return to the practice deck, then retake with a clean answer set."}</p></div>
          <DomainScoreGrid scores={result.domainScores} />
        </section>
      )}

      <nav className="exam-question-map" aria-label="Exam questions">
        {examScenarios.map((scenario, questionIndex) => {
          const hasAnswer = typeof answers[scenario.id] === "number";
          const isCorrect = result && answers[scenario.id] === scenario.answer;
          return <button type="button" className={`${index === questionIndex ? "is-active" : ""} ${hasAnswer ? "is-answered" : ""} ${result ? (isCorrect ? "is-correct" : "is-incorrect") : ""}`} aria-current={index === questionIndex ? "step" : undefined} onClick={() => setIndex(questionIndex)} key={scenario.id}><span>{questionIndex + 1}</span><small>{scenario.domain}</small></button>;
        })}
      </nav>

      <div className="scenario-workspace exam-workspace">
        <div className="scenario-workspace-main">
          <div className="scenario-index"><span>{active.domain}</span><p>Case {index + 1} / {examScenarios.length}</p>{active.criticalError && result && <em>Critical decision</em>}</div>
          <h2>{active.title}</h2>
          <TerminalSnapshot scenario={active} />
        </div>
        <div className="scenario-decision-panel">
          <ScenarioOptions scenario={active} selected={selected} reveal={Boolean(result)} onSelect={(answer) => setAnswers((current) => ({ ...current, [active.id]: answer }))} />
          {result && (
            <div className={`scenario-feedback ${selected === active.answer ? "is-correct" : "is-incorrect"}`}>
              <span>{selected === active.answer ? "READ CONFIRMED" : active.criticalError ? "CRITICAL MISS" : "RECALIBRATE"}</span>
              <strong>{selected === active.answer ? "Correct decision." : `Correct answer: ${optionLetters[active.answer]}`}</strong><p>{active.explanation}</p>
            </div>
          )}
          <div className="scenario-navigation exam-navigation">
            <button type="button" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))}>Previous</button>
            {index < examScenarios.length - 1 ? (
              <button type="button" disabled={typeof selected !== "number" && !result} onClick={() => setIndex((current) => Math.min(examScenarios.length - 1, current + 1))}>Next case</button>
            ) : result ? (
              <button type="button" onClick={startExam}>Retake exam</button>
            ) : (
              <button className="readiness-primary-action" type="button" disabled={!allAnswered} onClick={submitExam}>Submit {answeredCount}/{examScenarios.length}</button>
            )}
          </div>
          {!result && index < examScenarios.length - 1 && allAnswered && <button className="exam-submit-ready" type="button" onClick={submitExam}>Submit completed exam</button>}
        </div>
      </div>
    </div>
  );
}

export function ReadinessLab(props: ReadinessLabProps) {
  const headingId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [tab, setTab] = useState<ReadinessTab>("brief");
  const tabs: Array<{ id: ReadinessTab; label: string; detail: string }> = [
    { id: "brief", label: "Operator brief", detail: "Translate the screen" },
    { id: "practice", label: "Practice deck", detail: "16 coached cases" },
    { id: "exam", label: "Readiness exam", detail: "16 unseen cases" },
  ];

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="readiness-lab" aria-labelledby={headingId}>
      <header className="readiness-page-lead">
        <div>
          <p className="readiness-kicker">DAY 3 // PERFORMANCE GATE</p>
          <h1 id={headingId}>Prove the screen is legible.</h1>
          <p>Translate any terminal, diagnose a setup, survive the critical decisions, then show your work in the VOD notebook.</p>
        </div>
        <aside aria-label="Training environment status"><span><i aria-hidden="true" /> SIMULATION</span><strong>No capital at risk</strong><small>Transactions disabled by design</small></aside>
      </header>

      <div className="readiness-tabs" role="tablist" aria-label="Day 3 readiness sections">
        {tabs.map((item, index) => (
          <button
            type="button"
            role="tab"
            id={`readiness-tab-${item.id}`}
            aria-controls={`readiness-panel-${item.id}`}
            aria-selected={tab === item.id}
            tabIndex={tab === item.id ? 0 : -1}
            className={tab === item.id ? "is-active" : ""}
            onClick={() => setTab(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); focusTab(index + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); focusTab(index - 1); }
              if (event.key === "Home") { event.preventDefault(); focusTab(0); }
              if (event.key === "End") { event.preventDefault(); focusTab(tabs.length - 1); }
            }}
            ref={(node) => { tabRefs.current[index] = node; }}
            key={item.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span><p><strong>{item.label}</strong><small>{item.detail}</small></p>
          </button>
        ))}
      </div>

      {tab === "brief" && <BriefPanel {...props} />}
      {tab === "practice" && <PracticePanel practiceAnswers={props.practiceAnswers} onPracticeAnswer={props.onPracticeAnswer} />}
      {tab === "exam" && <ExamPanel screenOriented={props.screenOriented} examBest={props.examBest} examPassedAt={props.examPassedAt} onExamResult={props.onExamResult} />}
    </section>
  );
}
