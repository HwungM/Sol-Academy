"use client";

import { useEffect, useMemo, useState } from "react";
import {
  diagnosticQuestions,
  modules,
  researchCutoff,
  sourceMap,
  sources,
  type Module,
  type Question,
} from "./data/course";
import { drills, glossary, historicalCases } from "./data/labs";

type View = "dashboard" | "path" | "module" | "drills" | "lab" | "glossary" | "sources";
type LabTab = "calculators" | "history" | "vod";

type VodEntry = {
  id: string;
  url: string;
  timestamp: string;
  action: string;
  observation: string;
  thesis: string;
  invalidation: string;
  evidenceGrade: string;
};

type Progress = {
  completed: string[];
  scores: Record<string, number>;
  notes: Record<string, string>;
  diagnosticScore?: number;
  drillAnswers: Record<string, number>;
  vodEntries: VodEntry[];
};

type OperatorRank = {
  code: string;
  name: string;
  min: number;
};

type OperatorStats = {
  xp: number;
  rank: OperatorRank;
  nextRank?: OperatorRank;
  rankProgress: number;
  answeredDrills: number;
  correctDrills: number;
};

const emptyProgress: Progress = {
  completed: [],
  scores: {},
  notes: {},
  drillAnswers: {},
  vodEntries: [],
};

const navItems: { view: View; label: string; mark: string }[] = [
  { view: "dashboard", label: "Command center", mark: "01" },
  { view: "path", label: "Curriculum", mark: "02" },
  { view: "drills", label: "Decision drills", mark: "03" },
  { view: "lab", label: "Operator lab", mark: "04" },
  { view: "glossary", label: "Field glossary", mark: "05" },
  { view: "sources", label: "Evidence library", mark: "06" },
];

const operatorRanks: OperatorRank[] = [
  { code: "R1", name: "Observer", min: 0 },
  { code: "R2", name: "Scanner", min: 250 },
  { code: "R3", name: "Chain Reader", min: 600 },
  { code: "R4", name: "Tape Reader", min: 1000 },
  { code: "R5", name: "Risk Operator", min: 1500 },
  { code: "R6", name: "Systems Operator", min: 2100 },
];

const pct = (value: number) => `${Math.round(value)}%`;
const formatNumber = (value: number, digits = 2) =>
  Number.isFinite(value)
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value)
    : "—";

function getOperatorStats(progress: Progress): OperatorStats {
  const answeredDrills = drills.filter((drill) => progress.drillAnswers[drill.id] !== undefined).length;
  const correctDrills = drills.filter((drill) => progress.drillAnswers[drill.id] === drill.answer).length;
  const xp =
    progress.completed.length * 100 +
    answeredDrills * 10 +
    correctDrills * 40 +
    (progress.diagnosticScore !== undefined ? 50 : 0) +
    Math.min(progress.vodEntries.length, 8) * 75;
  const rankIndex = operatorRanks.findLastIndex((rank) => xp >= rank.min);
  const rank = operatorRanks[Math.max(rankIndex, 0)];
  const nextRank = operatorRanks[rankIndex + 1];
  const rankProgress = nextRank
    ? ((xp - rank.min) / (nextRank.min - rank.min)) * 100
    : 100;

  return { xp, rank, nextRank, rankProgress, answeredDrills, correctDrills };
}

function useCourseProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("sol-academy-progress-v1");
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<Progress>;
          setProgress({
            ...emptyProgress,
            ...parsed,
            completed: parsed.completed ?? [],
            scores: parsed.scores ?? {},
            notes: parsed.notes ?? {},
            drillAnswers: parsed.drillAnswers ?? {},
            vodEntries: parsed.vodEntries ?? [],
          });
        }
      } catch {
        setProgress(emptyProgress);
      } finally {
        setHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("sol-academy-progress-v1", JSON.stringify(progress));
  }, [hydrated, progress]);

  return { progress, setProgress, hydrated };
}

export default function AcademyApp() {
  const { progress, setProgress, hydrated } = useCourseProgress();
  const [view, setView] = useState<View>("dashboard");
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [labTab, setLabTab] = useState<LabTab>("calculators");

  const completion = (progress.completed.length / modules.length) * 100;
  const operatorStats = useMemo(() => getOperatorStats(progress), [progress]);
  const activeModule = modules.find((item) => item.id === activeModuleId) ?? modules[0];

  const navigate = (next: View) => {
    setView(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setView("module");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLab = (tab: LabTab) => {
    setLabTab(tab);
    navigate("lab");
  };

  const saveScore = (moduleId: string, score: number) => {
    setProgress((current) => {
      const best = Math.max(current.scores[moduleId] ?? 0, score);
      const completed = best >= 80
        ? Array.from(new Set([...current.completed, moduleId]))
        : current.completed;
      return { ...current, scores: { ...current.scores, [moduleId]: best }, completed };
    });
  };

  const nextIncomplete = modules.find((item) => !progress.completed.includes(item.id)) ?? modules.at(-1)!;

  return (
    <div className="academy-shell">
      <a className="skip-link" href="#academy-content">Skip to academy content</a>
      <aside id="academy-navigation" className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="brand-block">
          <button className="brand" onClick={() => navigate("dashboard")} aria-label="Sol Academy home">
            <span className="brand-orbit"><i /></span>
            <span><strong>SOL</strong><small>ACADEMY</small></span>
          </button>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">×</button>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          <p className="nav-label">LEARN / OPERATE</p>
          {navItems.map((item) => (
            <button
              key={item.view}
              className={view === item.view || (view === "module" && item.view === "path") ? "active" : ""}
              onClick={() => navigate(item.view)}
              aria-current={view === item.view || (view === "module" && item.view === "path") ? "page" : undefined}
            >
              <span>{item.mark}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-progress">
          <div className="progress-ring" role="progressbar" aria-label="Course completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(completion)} style={{ "--progress": `${completion * 3.6}deg` } as React.CSSProperties}>
            <span>{Math.round(completion)}%</span>
          </div>
          <div><strong>{operatorStats.rank.name}</strong><small>{operatorStats.xp} XP · {progress.completed.length}/{modules.length} modules</small></div>
        </div>

        <div className="sidebar-note">
          <span>RESEARCH CUTOFF</span>
          <strong>{researchCutoff}</strong>
          <p>Protocol rules change. Every technical lesson points back to evidence.</p>
        </div>
      </aside>

      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <main id="academy-content" className="main-stage">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation" aria-controls="academy-navigation" aria-expanded={mobileOpen}>MENU</button>
          <div className="topbar-status"><i /> <span>LOCAL MODE</span><b>Progress stays in your browser</b></div>
          <div className="topbar-tape" aria-label="Simulated market telemetry"><span>SIM</span><b>MC 42.8K</b><i>LIQ 11.4K</i><em>FLOW +17%</em></div>
          <div className="topbar-rank"><span>{operatorStats.rank.code}</span><strong>{operatorStats.rank.name}</strong><b>{operatorStats.xp} XP</b></div>
        </header>

        {!hydrated ? (
          <div className="loading-state"><span /><p>Loading your academy…</p></div>
        ) : (
          <>
            {view === "dashboard" && (
              <Dashboard
                progress={progress}
                completion={completion}
                nextModule={nextIncomplete}
                openModule={openModule}
                navigate={navigate}
                openLab={openLab}
                stats={operatorStats}
                setProgress={setProgress}
              />
            )}
            {view === "path" && <Curriculum progress={progress} openModule={openModule} />}
            {view === "module" && (
              <ModuleView
                module={activeModule}
                progress={progress}
                saveScore={saveScore}
                saveNote={(note) => setProgress((current) => ({ ...current, notes: { ...current.notes, [activeModule.id]: note } }))}
                openModule={openModule}
                back={() => navigate("path")}
              />
            )}
            {view === "drills" && <Drills progress={progress} setProgress={setProgress} />}
            {view === "lab" && (
              <OperatorLab
                tab={labTab}
                setTab={setLabTab}
                progress={progress}
                setProgress={setProgress}
              />
            )}
            {view === "glossary" && <Glossary />}
            {view === "sources" && <Sources />}
          </>
        )}
      </main>
    </div>
  );
}

function Dashboard({
  progress,
  completion,
  nextModule,
  openModule,
  navigate,
  openLab,
  stats,
  setProgress,
}: {
  progress: Progress;
  completion: number;
  nextModule: Module;
  openModule: (id: string) => void;
  navigate: (view: View) => void;
  openLab: (tab: LabTab) => void;
  stats: OperatorStats;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}) {
  const nextDrill = drills.find((drill) => progress.drillAnswers[drill.id] === undefined);
  const hasPassed = (numbers: number[]) => numbers.every((number) => {
    const courseModule = modules.find((item) => item.number === number);
    return courseModule ? progress.completed.includes(courseModule.id) : false;
  });
  const badges = [
    { mark: "SL", label: "Screen literate", unlocked: (progress.diagnosticScore ?? 0) >= 80 },
    { mark: "MM", label: "Market mechanic", unlocked: hasPassed([1, 2, 3, 4]) },
    { mark: "WC", label: "Wallet cartographer", unlocked: hasPassed([5, 6]) },
    { mark: "RF", label: "Risk first", unlocked: hasPassed([9]) },
    { mark: "TA", label: "Tape analyst", unlocked: progress.vodEntries.length >= 3 },
  ];

  return (
    <div className="page dashboard-page">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span>◆</span> THE OPERATOR’S PRE-VOD SYSTEM</p>
          <h1>Read the chain.<br /><em>Read the crowd.</em><br />Control the downside.</h1>
          <p className="hero-lead">A ruthless, evidence-first curriculum for understanding Solana memecoin markets before you copy a trader, touch a bot, or mistake a screenshot for a strategy.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => openModule(nextModule.id)}>Continue: {nextModule.shortTitle}<span>→</span></button>
            <button className="ghost-action" onClick={() => navigate("drills")}>Test my screen literacy</button>
          </div>
          <div className="hero-proof">
            <span><strong>{modules.length}</strong> sequenced modules</span>
            <span><strong>{glossary.length}</strong> field terms</span>
            <span><strong>{drills.length}</strong> decision drills</span>
          </div>
        </div>

        <div className="signal-console" role="img" aria-label="Simulated trading-terminal chart showing the five-stage decision stack">
          <div className="console-head"><span>DECISION STACK</span><b>NO AUTOBUY</b></div>
          <div className="console-livebar" aria-hidden="true"><span><i /> PAPER FEED</span><b>AGE 06:14</b><b>MAKERS 184</b><b className="positive">BUY/SELL 1.34</b></div>
          <div className="signal-chart" aria-hidden="true">
            <div className="chart-grid-lines" />
            <div className="candle c1 down" /><div className="candle c2 up" /><div className="candle c3 up" />
            <div className="candle c4 down" /><div className="candle c5 up" /><div className="candle c6 up" />
            <div className="chart-line line-a" /><div className="chart-line line-b" />
            <span className="chart-tag tag-a">ENTRY IS NOT EDGE</span>
            <span className="chart-tag tag-b">EXIT IS PART OF THE SETUP</span>
          </div>
          <ol className="stack-list">
            <li><span>01</span><div><strong>IDENTITY + STATE</strong><small>Exact CA, program, curve or pool</small></div><b>REQUIRED</b></li>
            <li><span>02</span><div><strong>OWNERSHIP EVIDENCE</strong><small>Dev, funder, clusters, cost bases</small></div><b>REQUIRED</b></li>
            <li><span>03</span><div><strong>INDEPENDENT DEMAND</strong><small>Makers, flow, narrative, response</small></div><b>REQUIRED</b></li>
            <li><span>04</span><div><strong>RISK + CAPACITY</strong><small>Loss path, size, executable exit</small></div><b>REQUIRED</b></li>
            <li><span>05</span><div><strong>EXECUTION STATE</strong><small>Bound, fee, tip, confirmation</small></div><b>LAST</b></li>
          </ol>
        </div>
      </section>

      <section className="operator-hud" aria-label="Operator progression and missions">
        <div className="rank-console">
          <div className="rank-code">{stats.rank.code}</div>
          <div className="rank-copy">
            <span>OPERATOR RANK</span>
            <h2>{stats.rank.name}</h2>
            <p>{stats.nextRank ? `${stats.nextRank.min - stats.xp} XP TO ${stats.nextRank.name.toUpperCase()}` : "MAXIMUM ACADEMY RANK"}</p>
          </div>
          <strong>{stats.xp}<small> XP</small></strong>
          <div className="rank-track" role="progressbar" aria-label="Progress to next operator rank" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(stats.rankProgress)}><i style={{ width: `${stats.rankProgress}%` }} /></div>
        </div>

        <div className="mission-deck">
          <button onClick={() => openModule(nextModule.id)}>
            <span>PRIMARY MISSION</span><strong>{progress.completed.length === modules.length ? "Replay any module" : `Clear M${String(nextModule.number).padStart(2, "0")}`}</strong><small>+100 XP · {nextModule.shortTitle}</small><b>OPEN →</b>
          </button>
          <button onClick={() => navigate("drills")} className={!nextDrill ? "cleared" : ""}>
            <span>FIELD READ</span><strong>{nextDrill ? nextDrill.label : "Drill deck cleared"}</strong><small>{stats.correctDrills}/{drills.length} clean reads</small><b>{nextDrill ? "RUN →" : "REPLAY →"}</b>
          </button>
          <button onClick={() => openLab("vod")} className={progress.vodEntries.length >= 3 ? "cleared" : ""}>
            <span>TAPE WORK</span><strong>Log a VOD decision</strong><small>{progress.vodEntries.length} evidence-grade reads saved</small><b>LOG →</b>
          </button>
        </div>

        <div className="badge-rack">
          <div><span>ACHIEVEMENTS</span><strong>{badges.filter((badge) => badge.unlocked).length}/{badges.length} UNLOCKED</strong></div>
          <ul>{badges.map((badge) => <li className={badge.unlocked ? "unlocked" : ""} key={badge.label} title={badge.label}><b>{badge.unlocked ? "✓" : badge.mark}</b><span>{badge.label}</span></li>)}</ul>
        </div>
      </section>

      <section className="dashboard-strip">
        <div className="completion-card">
          <div className="section-label">YOUR RUN</div>
          <div className="completion-head"><strong>{Math.round(completion)}%</strong><span>VOD readiness</span></div>
          <div className="wide-progress"><i style={{ width: `${completion}%` }} /></div>
          <p>{progress.completed.length === 0 ? "Start with the game map. Speed will make sense later." : `${progress.completed.length} modules passed at 80% or better.`}</p>
        </div>
        <div className="reality-card">
          <div className="section-label">THE REALITY CHECK</div>
          <blockquote>“A 70 ms bot that buys every new token is a sophisticated machine for buying the base rate.”</blockquote>
          <p>Selection → sizing → execution → exit → accounting. Miss one layer and the screenshot lies.</p>
        </div>
        <div className="continue-card">
          <div className="section-label">NEXT GATE</div>
          <span className="module-number">{String(nextModule.number).padStart(2, "0")}</span>
          <div><strong>{nextModule.shortTitle}</strong><small>{nextModule.duration} · {nextModule.difficulty}</small></div>
          <button onClick={() => openModule(nextModule.id)} aria-label={`Open ${nextModule.title}`}>→</button>
        </div>
      </section>

      <section className="phase-preview">
        <div className="section-heading">
          <div><p className="eyebrow">THE LEARNING ORDER</p><h2>Three phases. No skipped foundations.</h2></div>
          <button onClick={() => navigate("path")}>View full curriculum →</button>
        </div>
        <div className="phase-cards">
          {[
            { phase: "Foundation", range: "01—04", text: "Market structure, math, lifecycle, and screen literacy.", color: "violet" },
            { phase: "Operator", range: "05—09", text: "Wallet evidence, narratives, tape, risk, and public setups.", color: "green" },
            { phase: "Systems", range: "10—12", text: "Execution, automation, replay, and VOD capstone.", color: "amber" },
          ].map((item) => (
            <article className={`phase-card ${item.color}`} key={item.phase}>
              <span>{item.range}</span><h3>{item.phase}</h3><p>{item.text}</p>
              <b>{modules.filter((module) => module.phase === item.phase).filter((module) => progress.completed.includes(module.id)).length}/{modules.filter((module) => module.phase === item.phase).length} passed</b>
            </article>
          ))}
        </div>
      </section>

      <Diagnostic progress={progress} setProgress={setProgress} />
    </div>
  );
}

function Diagnostic({ progress, setProgress }: { progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>> }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = Math.round((diagnosticQuestions.filter((item) => answers[item.id] === item.answer).length / diagnosticQuestions.length) * 100);

  const submit = () => {
    setSubmitted(true);
    setProgress((current) => ({ ...current, diagnosticScore: score }));
  };

  return (
    <section className="diagnostic-section">
      <div className="diagnostic-intro">
        <div><p className="eyebrow">10-QUESTION BASELINE</p><h2>Can you read the screen—or only the colors?</h2></div>
        <div className="diagnostic-score"><span>{progress.diagnosticScore ?? "—"}{progress.diagnosticScore !== undefined && "%"}</span><small>best baseline</small></div>
        <button className="primary-action" onClick={() => { setOpen(!open); setSubmitted(false); setAnswers({}); }}>{open ? "Close diagnostic" : "Take diagnostic"}<span>{open ? "↑" : "↓"}</span></button>
      </div>
      {open && (
        <div className="quiz-panel diagnostic-quiz">
          {diagnosticQuestions.map((item, index) => (
            <QuestionBlock key={item.id} question={item} index={index} selected={answers[item.id]} submitted={submitted} onSelect={(answer) => !submitted && setAnswers((current) => ({ ...current, [item.id]: answer }))} />
          ))}
          {!submitted ? (
            <button className="primary-action full" disabled={Object.keys(answers).length !== diagnosticQuestions.length} onClick={submit}>Score my baseline <span>→</span></button>
          ) : (
            <div className={`score-result ${score >= 80 ? "pass" : "review"}`}>
              <span>{score}%</span><div><b className="xp-award">BASELINE LOGGED · +50 XP</b><strong>{score >= 80 ? "Screen-literate foundation" : "Good—now we know the gaps"}</strong><p>{score >= 80 ? "The course will turn that vocabulary into repeatable decisions." : "Start at Module 1. The score is a map, not a judgment."}</p></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Curriculum({ progress, openModule }: { progress: Progress; openModule: (id: string) => void }) {
  return (
    <div className="page curriculum-page">
      <PageLead eyebrow="THE CURRICULUM" title="Learn the market in dependency order." body="Every module ends with a scored knowledge check. Pass at 80% to mark it complete; jump anywhere when you need a reference." />
      {(["Foundation", "Operator", "Systems"] as const).map((phase) => (
        <section className="curriculum-phase" key={phase}>
          <div className="phase-divider"><span>{phase}</span><i /></div>
          <div className="module-grid">
            {modules.filter((module) => module.phase === phase).map((module) => {
              const completed = progress.completed.includes(module.id);
              const score = progress.scores[module.id];
              return (
                <article className={`module-card ${completed ? "complete" : ""}`} key={module.id}>
                  <div className="module-card-top"><span>{String(module.number).padStart(2, "0")}</span><b>{completed ? "PASSED" : module.difficulty.toUpperCase()}</b></div>
                  <h3>{module.title}</h3><p>{module.outcome}</p>
                  <div className="module-meta"><span>{module.duration}</span><span>{module.quiz.length} checks</span>{score !== undefined && <span>Best {score}%</span>}</div>
                  <button onClick={() => openModule(module.id)}>{completed ? "Review module" : "Open module"}<span>→</span></button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function ModuleView({
  module,
  progress,
  saveScore,
  saveNote,
  openModule,
  back,
}: {
  module: Module;
  progress: Progress;
  saveScore: (id: string, score: number) => void;
  saveNote: (note: string) => void;
  openModule: (id: string) => void;
  back: () => void;
}) {
  const index = modules.findIndex((item) => item.id === module.id);
  const next = modules[index + 1];
  const passed = progress.completed.includes(module.id);
  return (
    <div className="page module-page">
      <button className="back-link" onClick={back}>← Curriculum</button>
      <header className="module-hero">
        <div className="module-index">MODULE {String(module.number).padStart(2, "0")} / {String(modules.length).padStart(2, "0")}</div>
        <p className="eyebrow">{module.phase.toUpperCase()} · {module.duration.toUpperCase()}</p>
        <h1>{module.title}</h1>
        <p>{module.kicker}</p>
        <div className="outcome-box"><span>OUTCOME</span><p>{module.outcome}</p><b>{passed ? "PASSED" : (progress.scores[module.id] !== undefined ? `BEST ${progress.scores[module.id]}%` : "NOT SCORED")}</b></div>
      </header>

      <div className="lesson-layout">
        <article className="lesson-content">
          {module.sections.map((section, sectionIndex) => (
            <section className="lesson-section" id={`section-${sectionIndex}`} key={section.title}>
              <div className="lesson-number">{String(sectionIndex + 1).padStart(2, "0")}</div>
              <p className="section-kicker">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.formula && <div className="formula-card"><span>MODEL</span><code>{section.formula}</code></div>}
              {section.example && <div className="example-card"><span>OPERATOR EXAMPLE</span><p>{section.example}</p></div>}
              {section.warning && <div className="warning-card"><span>⚠ FIELD NOTE</span><p>{section.warning}</p></div>}
              {section.sources && <SourceChips ids={section.sources} />}
            </section>
          ))}

          <section className="takeaway-panel">
            <p className="section-kicker">LOCK IT IN</p><h2>What leaves the room with you</h2>
            <ol>{module.takeaways.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
          </section>

          <Quiz questions={module.quiz} previousScore={progress.scores[module.id]} onScore={(score) => saveScore(module.id, score)} />

          <section className="notes-panel">
            <div><p className="section-kicker">PRIVATE NOTES</p><h2>Explain it in your own words.</h2></div>
            <textarea aria-label={`Notes for ${module.title}`} value={progress.notes[module.id] ?? ""} onChange={(event) => saveNote(event.target.value)} placeholder="What changed in how you see the screen? What still feels fuzzy? Notes save on this device." />
          </section>

          {next && <button className="next-module" onClick={() => openModule(next.id)}><span>NEXT MODULE</span><strong>{String(next.number).padStart(2, "0")} · {next.title}</strong><b>→</b></button>}
        </article>

        <aside className="lesson-rail">
          <div className="rail-card"><span>MODULE MAP</span>{module.sections.map((section, itemIndex) => <a href={`#section-${itemIndex}`} key={section.title}><b>{String(itemIndex + 1).padStart(2, "0")}</b>{section.title}</a>)}</div>
          <div className="rail-card source-rail"><span>EVIDENCE RULE</span><p>A label is not a fact until you know its provider, definition, time window, denominator, and exclusions.</p></div>
        </aside>
      </div>
    </div>
  );
}

function Quiz({ questions, previousScore, onScore }: { questions: Question[]; previousScore?: number; onScore: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = Math.round((questions.filter((item) => answers[item.id] === item.answer).length / questions.length) * 100);
  const submit = () => { setSubmitted(true); onScore(score); };
  const retry = () => { setAnswers({}); setSubmitted(false); };
  return (
    <section className="quiz-panel module-quiz">
      <div className="quiz-head"><div><p className="section-kicker">KNOWLEDGE CHECK</p><h2>Prove the distinction.</h2></div><span>PASS ≥ 80%</span></div>
      {previousScore !== undefined && <p className="previous-score">Current best: {previousScore}%</p>}
      {questions.map((item, index) => <QuestionBlock key={item.id} question={item} index={index} selected={answers[item.id]} submitted={submitted} onSelect={(answer) => !submitted && setAnswers((current) => ({ ...current, [item.id]: answer }))} />)}
      {!submitted ? <button className="primary-action full" disabled={Object.keys(answers).length !== questions.length} onClick={submit}>Submit module check <span>→</span></button> : (
        <div className={`score-result ${score >= 80 ? "pass" : "review"}`} role="status"><span>{score}%</span><div>{score >= 80 && <b className="xp-award">MODULE CLEAR · {(previousScore ?? 0) < 80 ? "+100 XP" : "BEST SCORE SAVED"}</b>}<strong>{score >= 80 ? "Module passed" : "Model update required"}</strong><p>{score >= 80 ? "The module is now counted in VOD readiness." : "A wrong answer is useful when its explanation changes your model."}</p><button onClick={retry}>Try again</button></div></div>
      )}
    </section>
  );
}

function QuestionBlock({ question, index, selected, submitted, onSelect }: { question: Question; index: number; selected?: number; submitted: boolean; onSelect: (answer: number) => void }) {
  return (
    <div className={`question-block ${submitted ? (selected === question.answer ? "correct" : "incorrect") : ""}`}>
      <div className="question-prompt"><span>{String(index + 1).padStart(2, "0")}</span><strong>{question.prompt}</strong></div>
      <div className="answer-grid" role="radiogroup" aria-label={`Answer choices for question ${index + 1}`}>
        {question.options.map((option, optionIndex) => (
          <button key={option} role="radio" aria-checked={selected === optionIndex} className={`${selected === optionIndex ? "selected" : ""} ${submitted && optionIndex === question.answer ? "right-answer" : ""}`} onClick={() => onSelect(optionIndex)}>
            <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
          </button>
        ))}
      </div>
      {submitted && <p className="explanation"><b>{selected === question.answer ? "Correct." : "Correction."}</b> {question.explanation}</p>}
    </div>
  );
}

function Drills({ progress, setProgress }: { progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>> }) {
  const [active, setActive] = useState(drills[0].id);
  const drill = drills.find((item) => item.id === active) ?? drills[0];
  const selected = progress.drillAnswers[drill.id];
  const answered = selected !== undefined;
  const answeredCount = drills.filter((item) => progress.drillAnswers[item.id] !== undefined).length;
  const correctCount = drills.filter((item) => progress.drillAnswers[item.id] === item.answer).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : undefined;
  const activeIndex = drills.findIndex((item) => item.id === active);
  const nextDrill = drills[(activeIndex + 1) % drills.length];
  const answer = (choice: number) => setProgress((current) => ({ ...current, drillAnswers: { ...current.drillAnswers, [drill.id]: choice } }));
  return (
    <div className="page drills-page">
      <PageLead eyebrow="DECISION DRILLS" title="Turn labels into the next question." body="These are not buy calls. They train the exact move experts make between a screen metric and a defensible decision." />
      <div className="simulation-hud" aria-label="Decision drill performance"><span><i /> SIMULATION ONLINE</span><b>{answeredCount}/{drills.length} CASES LOGGED</b><b>{correctCount} CLEAN READS</b><strong>{accuracy === undefined ? "—" : `${accuracy}%`}<small> ACCURACY</small></strong></div>
      <div className="drill-tabs" role="tablist" aria-label="Decision drills">{drills.map((item, index) => <button role="tab" aria-selected={item.id === active} className={item.id === active ? "active" : ""} onClick={() => setActive(item.id)} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}{progress.drillAnswers[item.id] !== undefined && <b>✓</b>}</button>)}</div>
      <section className="drill-stage">
        <div className="drill-context">
          <p className="eyebrow">{drill.label.toUpperCase()} · {drill.skill.toUpperCase()}</p><h2>{drill.title}</h2><p>{drill.setup}</p>
          <div className="metric-board">{drill.metrics.map((metric) => <div className={metric.tone ?? "neutral"} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div>
        </div>
        <div className="drill-decision">
          <span className="section-kicker">YOUR DECISION</span><h3>{drill.prompt}</h3>
          <div className="drill-choices">{drill.choices.map((choice, index) => <button disabled={answered} className={`${selected === index ? "selected" : ""} ${answered && index === drill.answer ? "correct" : ""}`} onClick={() => answer(index)} key={choice}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div>
          {answered && <div className={`drill-debrief ${selected === drill.answer ? "pass" : "review"}`} role="status"><b className="xp-award">READ LOGGED · +{selected === drill.answer ? 50 : 10} XP</b><strong>{selected === drill.answer ? "Clean read." : "Slow the inference down."}</strong>{drill.debrief.map((item) => <p key={item}>{item}</p>)}<div className="debrief-actions"><button onClick={() => setActive(nextDrill.id)}>Next simulation →</button><button onClick={() => setProgress((current) => { const next = { ...current.drillAnswers }; delete next[drill.id]; return { ...current, drillAnswers: next }; })}>Reset this drill</button></div></div>}
        </div>
      </section>
    </div>
  );
}

function OperatorLab({ tab, setTab, progress, setProgress }: { tab: LabTab; setTab: (tab: LabTab) => void; progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>> }) {
  return (
    <div className="page lab-page">
      <PageLead eyebrow="OPERATOR LAB" title="Calculate, replay, annotate." body="Use toy models to build intuition, timestamped history to fight hindsight, and a structured worksheet to extract decisions from public VODs." />
      <div className="lab-tabs">{(["calculators", "history", "vod"] as LabTab[]).map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item === "calculators" ? "Math desk" : item === "history" ? "Historical tape" : "VOD notebook"}</button>)}</div>
      {tab === "calculators" && <Calculators />}
      {tab === "history" && <HistoryLab />}
      {tab === "vod" && <VodNotebook progress={progress} setProgress={setProgress} />}
    </div>
  );
}

function Calculators() {
  const [reserveSol, setReserveSol] = useState(10);
  const [reserveTokens, setReserveTokens] = useState(1_000_000_000);
  const [buySol, setBuySol] = useState(1);
  const [feePct, setFeePct] = useState(1.25);
  const effective = Math.max(0, buySol * (1 - feePct / 100));
  const k = Math.max(0.000001, reserveSol * reserveTokens);
  const tokensOut = reserveTokens - k / Math.max(0.000001, reserveSol + effective);
  const startPrice = reserveSol / Math.max(1, reserveTokens);
  const averagePrice = buySol / Math.max(0.000001, tokensOut);
  const endPrice = (reserveSol + effective) / Math.max(0.000001, reserveTokens - tokensOut);
  const impact = (averagePrice / startPrice - 1) * 100;

  const [bankroll, setBankroll] = useState(20);
  const [riskPct, setRiskPct] = useState(1);
  const [invalidPct, setInvalidPct] = useState(30);
  const [capacity, setCapacity] = useState(1);
  const allowedLoss = bankroll * riskPct / 100;
  const theoreticalSize = allowedLoss / Math.max(0.01, invalidPct / 100);
  const executableSize = Math.min(theoreticalSize, capacity);

  const [winRate, setWinRate] = useState(35);
  const [avgWin, setAvgWin] = useState(3);
  const [avgLoss, setAvgLoss] = useState(1);
  const [costR, setCostR] = useState(0.08);
  const expectancy = winRate / 100 * avgWin - (1 - winRate / 100) * avgLoss - costR;

  return (
    <div className="calculator-grid">
      <section className="calculator-card wide">
        <div className="calculator-head"><span>01</span><div><p>TOY CONSTANT-PRODUCT AMM</p><h2>How size changes the fill</h2></div></div>
        <p className="calculator-note">Educational x·y model. It does not reproduce Pump’s virtual-reserve constants, live fees, routes, or competing state changes.</p>
        <div className="calculator-body">
          <div className="input-grid">
            <NumberField label="SOL reserve" value={reserveSol} setValue={setReserveSol} step={1} />
            <NumberField label="Token reserve" value={reserveTokens} setValue={setReserveTokens} step={1000000} />
            <NumberField label="Your buy (SOL)" value={buySol} setValue={setBuySol} step={0.1} />
            <NumberField label="Fee (%)" value={feePct} setValue={setFeePct} step={0.05} />
          </div>
          <div className="result-board">
            <div><span>Tokens out</span><strong>{formatNumber(tokensOut, 0)}</strong></div>
            <div><span>Avg fill / token</span><strong>{averagePrice.toExponential(3)} SOL</strong></div>
            <div><span>Ending spot</span><strong>{endPrice.toExponential(3)} SOL</strong></div>
            <div className={impact > 10 ? "danger" : "good"}><span>Model impact</span><strong>{pct(impact)}</strong></div>
          </div>
        </div>
      </section>
      <section className="calculator-card">
        <div className="calculator-head"><span>02</span><div><p>RISK + CAPACITY</p><h2>Does the setup have a valid size?</h2></div></div>
        <div className="input-grid vertical">
          <NumberField label="Bankroll (SOL)" value={bankroll} setValue={setBankroll} step={1} />
          <NumberField label="Allowed risk (%)" value={riskPct} setValue={setRiskPct} step={0.25} />
          <NumberField label="Failure loss (%)" value={invalidPct} setValue={setInvalidPct} step={5} />
          <NumberField label="Measured capacity (SOL)" value={capacity} setValue={setCapacity} step={0.25} />
        </div>
        <div className="compact-results"><p><span>Allowed loss</span><strong>{formatNumber(allowedLoss)} SOL</strong></p><p><span>Theoretical size</span><strong>{formatNumber(theoreticalSize)} SOL</strong></p><p><span>Capacity-capped size</span><strong>{formatNumber(executableSize)} SOL</strong></p></div>
        <p className="calculator-note">Stops can slip or fail. Use a scenario loss—not a fantasy fill.</p>
      </section>
      <section className="calculator-card">
        <div className="calculator-head"><span>03</span><div><p>EXPECTANCY</p><h2>Win rate is not the system</h2></div></div>
        <div className="input-grid vertical">
          <NumberField label="Win rate (%)" value={winRate} setValue={setWinRate} step={1} />
          <NumberField label="Average win (R)" value={avgWin} setValue={setAvgWin} step={0.25} />
          <NumberField label="Average loss (R)" value={avgLoss} setValue={setAvgLoss} step={0.25} />
          <NumberField label="Average cost (R)" value={costR} setValue={setCostR} step={0.01} />
        </div>
        <div className={`expectancy-result ${expectancy >= 0 ? "positive" : "negative"}`}><span>MODEL EV / TRADE</span><strong>{expectancy >= 0 ? "+" : ""}{formatNumber(expectancy)}R</strong><p>{expectancy >= 0 ? "Positive model—not proof. Test the distribution and live fills." : "Negative before tail and execution surprises."}</p></div>
      </section>
    </div>
  );
}

function NumberField({ label, value, setValue, step }: { label: string; value: number; setValue: (value: number) => void; step: number }) {
  return <label className="number-field"><span>{label}</span><input type="number" value={value} step={step} min={0} onChange={(event) => setValue(Number(event.target.value))} /></label>;
}

function HistoryLab() {
  const [open, setOpen] = useState(historicalCases[0].id);
  const item = historicalCases.find((entry) => entry.id === open) ?? historicalCases[0];
  return (
    <div className="history-layout">
      <aside className="history-list">{historicalCases.map((entry, index) => <button className={entry.id === open ? "active" : ""} onClick={() => setOpen(entry.id)} key={entry.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{entry.name}</strong><small>{entry.period}</small></div></button>)}</aside>
      <article className="history-case">
        <p className="eyebrow">{item.archetype.toUpperCase()} · {item.period}</p><h2>{item.name}</h2><p className="history-thesis">{item.thesis}</p>
        <div className="timeline">{item.sequence.map((event) => <div key={`${event.when}-${event.event}`}><span>{event.when}</span><i /><p>{event.event}</p></div>)}</div>
        <div className="history-columns"><div><span className="section-kicker">KNOWABLE THEN</span><ul>{item.knowable.map((fact) => <li key={fact}>{fact}</li>)}</ul></div><div><span className="section-kicker">HINDSIGHT TRAP</span><p>{item.hindsightTrap}</p></div></div>
        <div className="history-drill"><span>REPLAY ASSIGNMENT</span><p>{item.drill}</p></div>
        <SourceChips ids={item.sources} />
      </article>
    </div>
  );
}

function VodNotebook({ progress, setProgress }: { progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>> }) {
  const [draft, setDraft] = useState<Omit<VodEntry, "id">>({ url: "https://kick.com/hotted/videos", timestamp: "", action: "", observation: "", thesis: "", invalidation: "", evidenceGrade: "Visible on screen" });
  const add = () => {
    if (!draft.timestamp || !draft.observation) return;
    const entry: VodEntry = { ...draft, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
    setProgress((current) => ({ ...current, vodEntries: [...current.vodEntries, entry] }));
    setDraft((current) => ({ ...current, timestamp: "", action: "", observation: "", thesis: "", invalidation: "" }));
  };
  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(progress.vodEntries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "sol-academy-vod-notes.json"; link.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="vod-layout">
      <section className="vod-protocol">
        <p className="eyebrow">THE 11-LINE OBSERVATION PROTOCOL</p><h2>Make the VOD give up its decision process.</h2>
        <ol>{[
          "Evidence: URL, date, timecode, screenshot, exact spoken claim.",
          "Identity: exact CA, narrative, launchpad, route.",
          "Lifecycle: prebond, final stretch, migrating, post-migration.",
          "Snapshot: interval, MC, liquidity, volume window, makers, holders.",
          "Labels: provider, definition, denominator, current vs initial.",
          "Trigger: what visibly changed before the decision?",
          "Execution: intended size, actual fill, impact, costs, failures.",
          "Risk: invalidation, loss budget, exit/tranche rule.",
          "Outcome: realized net flow, holding time, partials.",
          "Counterfactual: what was skipped and what would falsify it?",
          "Evidence grade: on-chain / screen / spoken / inference.",
        ].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        <a className="external-action" href="https://kick.com/hotted/videos" target="_blank" rel="noreferrer">Open Hotted’s public VOD page ↗</a>
        <p className="retention-note">Public VOD availability is dynamic. Kick says verified-channel replays may be retained for up to 30 days, with at most 30 replays. Archive your URL, date, timestamp, and contemporaneous note. The academy does not verify titles or income claims.</p>
      </section>
      <section className="vod-notebook">
        <div className="notebook-head"><div><p className="section-kicker">NEW OBSERVATION</p><h2>Lock the evidence before the story.</h2></div><span>{progress.vodEntries.length} saved</span></div>
        <div className="notebook-form">
          <label><span>VOD URL</span><input value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} /></label>
          <div className="form-row"><label><span>Timestamp</span><input placeholder="01:24:36" value={draft.timestamp} onChange={(event) => setDraft({ ...draft, timestamp: event.target.value })} /></label><label><span>Action</span><input placeholder="Buy / skip / trim / sell" value={draft.action} onChange={(event) => setDraft({ ...draft, action: event.target.value })} /></label></div>
          <label><span>Visible observation</span><textarea placeholder="What changed on screen? No motive yet." value={draft.observation} onChange={(event) => setDraft({ ...draft, observation: event.target.value })} /></label>
          <label><span>Your thesis / inference</span><textarea placeholder="Why might that evidence matter?" value={draft.thesis} onChange={(event) => setDraft({ ...draft, thesis: event.target.value })} /></label>
          <label><span>Invalidation / counterfactual</span><textarea placeholder="What next event would make the read wrong?" value={draft.invalidation} onChange={(event) => setDraft({ ...draft, invalidation: event.target.value })} /></label>
          <label><span>Evidence grade</span><select value={draft.evidenceGrade} onChange={(event) => setDraft({ ...draft, evidenceGrade: event.target.value })}><option>On-chain verified</option><option>Visible on screen</option><option>Spoken claim</option><option>Analyst inference</option></select></label>
          <button className="primary-action full" onClick={add} disabled={!draft.timestamp || !draft.observation}>Save observation <span>＋</span></button>
        </div>
        {progress.vodEntries.length > 0 && (
          <div className="saved-observations">
            <div className="saved-head"><strong>Saved tape</strong><button onClick={exportNotes}>Export JSON</button></div>
            {[...progress.vodEntries].reverse().map((entry) => (
              <article key={entry.id}>
                <div><span>{entry.timestamp}</span><b>{entry.action || "OBSERVE"}</b><small>{entry.evidenceGrade}</small></div>
                <p><strong>VISIBLE</strong> {entry.observation}</p>
                {entry.thesis && <p><strong>INFERENCE</strong> {entry.thesis}</p>}
                {entry.invalidation && <p><strong>INVALIDATION</strong> {entry.invalidation}</p>}
                <button onClick={() => setProgress((current) => ({ ...current, vodEntries: current.vodEntries.filter((item) => item.id !== entry.id) }))}>Remove</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Glossary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(glossary.map((item) => item.category))).sort()];
  const filtered = useMemo(() => glossary.filter((item) => {
    const matchesQuery = `${item.term} ${item.aliases ?? ""} ${item.definition} ${item.nuance ?? ""}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "All" || item.category === category);
  }), [query, category]);
  return (
    <div className="page glossary-page">
      <PageLead eyebrow="FIELD GLOSSARY" title="Translate trench slang into observable facts." body="Terms change across providers and desks. When a definition is not universal, the glossary tells you what to ask next." />
      <div className="filter-bar"><label><span>SEARCH</span><input placeholder="Try: bundle, dev bot, OG…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label><span>CATEGORY</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><b>{filtered.length} TERMS</b></div>
      <div className="glossary-grid">{filtered.map((item) => <article key={item.term}><div><span>{item.category}</span><h2>{item.term}</h2>{item.aliases && <small>{item.aliases}</small>}</div><p>{item.definition}</p>{item.nuance && <aside><b>NUANCE</b>{item.nuance}</aside>}</article>)}</div>
      {filtered.length === 0 && <div className="empty-state">No term matched. Try a broader search.</div>}
    </div>
  );
}

function Sources() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(sources.map((item) => item.category)))];
  const filtered = sources.filter((source) => category === "All" || source.category === category);
  return (
    <div className="page sources-page">
      <PageLead eyebrow="EVIDENCE LIBRARY" title="Primary mechanics. Scoped claims. Visible caveats." body={`Research cutoff: ${researchCutoff}. Protocol behavior is versioned; re-open the linked documentation before relying on a current fee, route, or detector.`} />
      <div className="source-policy"><span>THE SOURCE RULE</span><p>Official protocol documentation establishes mechanics. Transparent datasets establish scoped base rates. Investigations establish evidence patterns. Community language supplies leads—not truth.</p></div>
      <div className="category-tabs">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <div className="source-list">{filtered.map((source, index) => <a href={source.url} target="_blank" rel="noreferrer" key={source.id}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{source.category} · {source.date}</p><h2>{source.title}</h2><strong>{source.publisher}</strong><small>{source.note}</small></div><b>↗</b></a>)}</div>
      <div className="limits-panel"><h2>What this academy will not pretend</h2><ul><li>On-chain relationships alone do not prove real-world identity or intent.</li><li>Wallet-level realized PnL is not a human win rate.</li><li>Graduation is not durable success; market cap is not exit liquidity.</li><li>Public VOD availability is not audited proof of income.</li><li>No historical winner establishes a replicable strategy without controls.</li></ul></div>
    </div>
  );
}

function PageLead({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <header className="page-lead"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{body}</p></header>;
}

function SourceChips({ ids }: { ids: string[] }) {
  return <div className="source-chips"><span>Evidence</span>{ids.map((id) => { const source = sourceMap[id]; return source ? <a href={source.url} target="_blank" rel="noreferrer" key={id}>{source.publisher} ↗</a> : null; })}</div>;
}
