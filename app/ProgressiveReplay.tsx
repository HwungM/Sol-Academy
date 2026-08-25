"use client";

import { useEffect, useId, useState } from "react";
import type { HistoricalCase } from "./data/course";

const replayActions = ["Skip", "Watch", "Paper entry", "Add", "Trim", "Exit"] as const;
const minimumRationaleLength = 12;
const maximumRationaleLength = 280;

type ReplayAction = (typeof replayActions)[number];

type ReplayDecision = {
  checkpoint: number;
  action: ReplayAction;
  rationale: string;
};

type StoredReplay = {
  version: 1;
  decisions: ReplayDecision[];
};

export type ProgressiveReplayProps = {
  historicalCase: HistoricalCase;
};

function storageKey(caseId: string) {
  return `sol-academy-replay-v1:${encodeURIComponent(caseId)}`;
}

function isReplayAction(value: unknown): value is ReplayAction {
  return typeof value === "string" && replayActions.includes(value as ReplayAction);
}

function readDecisions(historicalCase: HistoricalCase): ReplayDecision[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(storageKey(historicalCase.id));
    if (!saved) return [];

    const parsed = JSON.parse(saved) as Partial<StoredReplay>;
    if (parsed.version !== 1 || !Array.isArray(parsed.decisions)) return [];

    const valid: ReplayDecision[] = [];
    for (const candidate of parsed.decisions) {
      if (
        typeof candidate !== "object" ||
        candidate === null ||
        candidate.checkpoint !== valid.length ||
        candidate.checkpoint >= historicalCase.sequence.length ||
        !isReplayAction(candidate.action) ||
        typeof candidate.rationale !== "string"
      ) {
        break;
      }

      const rationale = candidate.rationale.trim().slice(0, maximumRationaleLength);
      if (rationale.length < minimumRationaleLength) break;
      valid.push({ checkpoint: candidate.checkpoint, action: candidate.action, rationale });
    }

    return valid;
  } catch {
    return [];
  }
}

export function ProgressiveReplay({ historicalCase }: ProgressiveReplayProps) {
  const rationaleId = useId();
  const progressDescriptionId = useId();
  const [activeCaseId, setActiveCaseId] = useState(historicalCase.id);
  const [hydratedCaseId, setHydratedCaseId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<ReplayDecision[]>([]);
  const [selectedAction, setSelectedAction] = useState<ReplayAction | null>(null);
  const [rationale, setRationale] = useState("");
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setActiveCaseId(historicalCase.id);
      setDecisions(readDecisions(historicalCase));
      setSelectedAction(null);
      setRationale("");
      setLiveMessage("");
      setHydratedCaseId(historicalCase.id);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [historicalCase]);

  const caseIsActive = activeCaseId === historicalCase.id;
  const activeDecisions = caseIsActive ? decisions : [];
  const totalCheckpoints = historicalCase.sequence.length;
  const completedCheckpoints = Math.min(activeDecisions.length, totalCheckpoints);
  const replayComplete = totalCheckpoints === 0 || completedCheckpoints === totalCheckpoints;
  const visibleCheckpointCount = replayComplete
    ? totalCheckpoints
    : Math.min(totalCheckpoints, completedCheckpoints + 1);
  const currentCheckpoint = replayComplete ? null : historicalCase.sequence[completedCheckpoints];
  const trimmedRationale = rationale.trim();
  const canLock = selectedAction !== null && trimmedRationale.length >= minimumRationaleLength;

  useEffect(() => {
    if (hydratedCaseId !== historicalCase.id || activeCaseId !== historicalCase.id) return;

    try {
      const payload: StoredReplay = { version: 1, decisions };
      window.localStorage.setItem(storageKey(historicalCase.id), JSON.stringify(payload));
    } catch {
      // The replay remains fully usable in memory when browser storage is unavailable.
    }
  }, [activeCaseId, decisions, historicalCase.id, hydratedCaseId]);

  const lockDecision = () => {
    if (!canLock || !currentCheckpoint) return;

    const checkpoint = completedCheckpoints;
    const nextDecision: ReplayDecision = {
      checkpoint,
      action: selectedAction,
      rationale: trimmedRationale,
    };
    const finishesReplay = checkpoint + 1 >= totalCheckpoints;

    setDecisions((current) => [...current.slice(0, checkpoint), nextDecision]);
    setSelectedAction(null);
    setRationale("");
    setLiveMessage(
      finishesReplay
        ? "Final decision locked. The evidence review is now available."
        : `Decision locked. Checkpoint ${checkpoint + 2} is now available.`,
    );
  };

  const restartReplay = () => {
    setDecisions([]);
    setSelectedAction(null);
    setRationale("");
    setLiveMessage("Replay restarted. Checkpoint 1 is available.");

    try {
      window.localStorage.removeItem(storageKey(historicalCase.id));
    } catch {
      // Clearing the in-memory decisions is sufficient when browser storage is unavailable.
    }
  };

  return (
    <section className="replay-shell" aria-labelledby={`${rationaleId}-title`}>
      <header className="replay-header">
        <div className="replay-heading">
          <p className="replay-eyebrow">Progressive market replay</p>
          <h2 id={`${rationaleId}-title`}>{historicalCase.name}</h2>
          <p className="replay-meta">
            <span>{historicalCase.period}</span>
            <span aria-hidden="true">/</span>
            <span>{historicalCase.archetype}</span>
          </p>
        </div>
        <button className="replay-restart" type="button" onClick={restartReplay}>
          Restart replay
        </button>
      </header>

      <div className="replay-progress" aria-describedby={progressDescriptionId}>
        <progress value={completedCheckpoints} max={Math.max(totalCheckpoints, 1)}>
          {completedCheckpoints} of {totalCheckpoints}
        </progress>
        <p id={progressDescriptionId}>
          {replayComplete
            ? `${totalCheckpoints} of ${totalCheckpoints} decisions locked`
            : `${completedCheckpoints} of ${totalCheckpoints} decisions locked`}
        </p>
      </div>

      <p className="replay-instructions">
        Read only the evidence currently on screen. Lock an action and rationale before the next
        checkpoint is revealed.
      </p>

      <ol className="replay-timeline">
        {historicalCase.sequence.slice(0, visibleCheckpointCount).map((checkpoint, index) => {
          const decision = activeDecisions[index];
          const isCurrent = !replayComplete && index === completedCheckpoints;

          return (
            <li
              className={`replay-checkpoint ${decision ? "replay-checkpoint-locked" : ""} ${
                isCurrent ? "replay-checkpoint-current" : ""
              }`}
              key={`${historicalCase.id}-${checkpoint.when}-${index}`}
            >
              <div className="replay-checkpoint-marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="replay-checkpoint-body">
                <div className="replay-checkpoint-heading">
                  <time>{checkpoint.when}</time>
                  {isCurrent && <span className="replay-current-label">Decision required</span>}
                </div>
                <p>{checkpoint.event}</p>
                {decision && (
                  <div className="replay-locked-decision">
                    <span>Locked action</span>
                    <strong>{decision.action}</strong>
                    <p>{decision.rationale}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {!replayComplete && currentCheckpoint && (
        <form
          className="replay-decision-panel"
          onSubmit={(event) => {
            event.preventDefault();
            lockDecision();
          }}
        >
          <fieldset className="replay-action-fieldset">
            <legend>What do you do at this checkpoint?</legend>
            <div className="replay-actions">
              {replayActions.map((action) => (
                <button
                  aria-pressed={selectedAction === action}
                  className={`replay-action ${
                    selectedAction === action ? "replay-action-selected" : ""
                  }`}
                  key={action}
                  onClick={() => setSelectedAction(action)}
                  type="button"
                >
                  {action}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="replay-rationale-field">
            <label htmlFor={rationaleId}>Why? State the evidence, risk, or invalidation.</label>
            <textarea
              id={rationaleId}
              maxLength={maximumRationaleLength}
              minLength={minimumRationaleLength}
              onChange={(event) => setRationale(event.target.value)}
              placeholder="Example: I would watch because maker growth is visible, but ownership and exit liquidity are still unknown."
              rows={3}
              value={rationale}
            />
            <div className="replay-rationale-meta">
              <span>
                {trimmedRationale.length < minimumRationaleLength
                  ? `${minimumRationaleLength - trimmedRationale.length} more characters required`
                  : "Rationale ready"}
              </span>
              <span>
                {rationale.length}/{maximumRationaleLength}
              </span>
            </div>
          </div>

          <button className="replay-lock" disabled={!canLock} type="submit">
            Lock decision and reveal next checkpoint
          </button>
        </form>
      )}

      {replayComplete && (
        <section className="replay-review" aria-labelledby={`${rationaleId}-review-title`}>
          <div className="replay-review-heading">
            <p className="replay-eyebrow">Evidence review unlocked</p>
            <h3 id={`${rationaleId}-review-title`}>Audit the decisions, not the outcome</h3>
            <p>{historicalCase.thesis}</p>
          </div>

          <div className="replay-review-grid">
            <article className="replay-knowable">
              <h4>Knowable at the time</h4>
              <ul>
                {historicalCase.knowable.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="replay-hindsight">
              <h4>Hindsight trap</h4>
              <p>{historicalCase.hindsightTrap}</p>
            </article>
            <article className="replay-drill">
              <h4>Replay drill</h4>
              <p>{historicalCase.drill}</p>
            </article>
          </div>
        </section>
      )}

      <p className="replay-live-message" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
    </section>
  );
}

export default ProgressiveReplay;
