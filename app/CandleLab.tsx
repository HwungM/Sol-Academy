"use client";

import { useMemo, useState } from "react";
import { candleScenarios, type CandleScenario } from "./data/candles";

const chartWidth = 900;
const chartHeight = 430;
const plot = { left: 52, right: 92, top: 26, priceBottom: 315, volumeTop: 342, bottom: 402 };

const formatPrice = (value: number) => `$${Number.isInteger(value) ? value : value.toFixed(1)}K`;

export function CandleChart({
  scenario,
  compact = false,
  showVolume = true,
  selectedIndex,
  onSelect,
}: {
  scenario: CandleScenario;
  compact?: boolean;
  showVolume?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}) {
  const geometry = useMemo(() => {
    const rawLow = Math.min(...scenario.candles.map((candle) => candle.low), scenario.level?.value ?? Number.POSITIVE_INFINITY);
    const rawHigh = Math.max(...scenario.candles.map((candle) => candle.high), scenario.level?.value ?? Number.NEGATIVE_INFINITY);
    const range = Math.max(rawHigh - rawLow, 1);
    const min = rawLow - range * 0.12;
    const max = rawHigh + range * 0.12;
    const plotWidth = chartWidth - plot.left - plot.right;
    const step = plotWidth / scenario.candles.length;
    const bodyWidth = Math.min(compact ? 23 : 34, step * 0.54);
    const volumeMax = Math.max(...scenario.candles.map((candle) => candle.volume), 1);
    const y = (value: number) => plot.top + ((max - value) / (max - min)) * (plot.priceBottom - plot.top);
    return { min, max, step, bodyWidth, volumeMax, y };
  }, [compact, scenario]);

  const active = scenario.candles[selectedIndex ?? Math.max(0, scenario.candles.length - 1)];
  const ticks = Array.from({ length: 5 }, (_, index) => geometry.max - ((geometry.max - geometry.min) * index) / 4);

  const activate = (index: number) => onSelect?.(index);

  return (
    <div className={`candle-chart-shell ${compact ? "is-compact" : ""}`}>
      <div className="candle-chart-status">
        <span><i /> SIMULATED TAPE</span>
        <b>{scenario.interval} CANDLES</b>
        <strong>MC SCALE · $K</strong>
      </div>
      <svg className="candle-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby={`chart-${scenario.id}-title chart-${scenario.id}-desc`}>
        <title id={`chart-${scenario.id}-title`}>{scenario.title} candlestick chart</title>
        <desc id={`chart-${scenario.id}-desc`}>A fictional training chart with {scenario.candles.length} {scenario.interval} candles. Select any candle to inspect its open, high, low, close, and volume.</desc>

        <g className="candle-grid" aria-hidden="true">
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={plot.left} x2={chartWidth - plot.right} y1={geometry.y(tick)} y2={geometry.y(tick)} />
              <text x={chartWidth - plot.right + 12} y={geometry.y(tick) + 4}>{formatPrice(tick)}</text>
            </g>
          ))}
          {scenario.candles.map((candle, index) => {
            const x = plot.left + geometry.step * (index + 0.5);
            return <line className="vertical" key={candle.time} x1={x} x2={x} y1={plot.top} y2={plot.bottom} />;
          })}
        </g>

        {scenario.level && (
          <g className="candle-level" aria-hidden="true">
            <line x1={plot.left} x2={chartWidth - plot.right} y1={geometry.y(scenario.level.value)} y2={geometry.y(scenario.level.value)} />
            <text x={plot.left + 8} y={geometry.y(scenario.level.value) - 8}>{scenario.level.label}</text>
          </g>
        )}

        <g className="candle-series">
          {scenario.candles.map((candle, index) => {
            const x = plot.left + geometry.step * (index + 0.5);
            const up = candle.close >= candle.open;
            const bodyTop = geometry.y(Math.max(candle.open, candle.close));
            const bodyBottom = geometry.y(Math.min(candle.open, candle.close));
            const bodyHeight = Math.max(3, bodyBottom - bodyTop);
            const isSelected = index === selectedIndex;
            const label = `${candle.time} — open ${formatPrice(candle.open)}, high ${formatPrice(candle.high)}, low ${formatPrice(candle.low)}, close ${formatPrice(candle.close)}, volume ${candle.volume} relative units.`;
            return (
              <g
                className={`${up ? "is-up" : "is-down"} ${isSelected ? "is-selected" : ""}`}
                key={candle.time}
                role={onSelect ? "button" : undefined}
                tabIndex={onSelect ? 0 : undefined}
                aria-label={onSelect ? label : undefined}
                onClick={() => activate(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activate(index);
                  }
                }}
              >
                <line className="wick" x1={x} x2={x} y1={geometry.y(candle.high)} y2={geometry.y(candle.low)} />
                <rect className="body" x={x - geometry.bodyWidth / 2} y={bodyTop} width={geometry.bodyWidth} height={bodyHeight} rx="2" />
                {showVolume && (
                  <rect
                    className="volume"
                    x={x - geometry.bodyWidth / 2}
                    y={plot.bottom - (candle.volume / geometry.volumeMax) * (plot.bottom - plot.volumeTop)}
                    width={geometry.bodyWidth}
                    height={(candle.volume / geometry.volumeMax) * (plot.bottom - plot.volumeTop)}
                    rx="1"
                  />
                )}
                <rect className="hit-area" x={x - geometry.step / 2} y={plot.top} width={geometry.step} height={plot.bottom - plot.top} />
              </g>
            );
          })}
        </g>

        <g className="candle-axis" aria-hidden="true">
          <text x={plot.left} y={chartHeight - 9}>{scenario.candles[0].time}</text>
          <text x={chartWidth - plot.right} y={chartHeight - 9} textAnchor="end">{scenario.candles[scenario.candles.length - 1].time}</text>
          {showVolume && <text x={plot.left} y={plot.volumeTop - 9}>VOLUME</text>}
        </g>
      </svg>
      <div className="candle-inspector" aria-live="polite">
        <span>{active.time}</span>
        <dl>
          <div><dt>O</dt><dd>{formatPrice(active.open)}</dd></div>
          <div><dt>H</dt><dd>{formatPrice(active.high)}</dd></div>
          <div><dt>L</dt><dd>{formatPrice(active.low)}</dd></div>
          <div><dt>C</dt><dd>{formatPrice(active.close)}</dd></div>
          <div><dt>VOL</dt><dd>{active.volume}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export function CandlePrimer({ onOpenLab }: { onOpenLab: () => void }) {
  const scenario = candleScenarios[0];
  return (
    <section className="candle-primer" aria-labelledby="candle-primer-title">
      <div className="candle-primer-copy">
        <p className="section-kicker">REQUIRED SCREEN LITERACY</p>
        <h2 id="candle-primer-title">Yes—these are the candles.</h2>
        <p>Axiom compresses trades into candlesticks. The body runs from open to close; the wick marks the interval’s high and low. Green and red describe that interval—not who traded or what happens next.</p>
        <ul>
          <li><span>BODY</span> Open ↔ close</li>
          <li><span>WICK</span> High / low excursion</li>
          <li><span>VOLUME</span> Activity in the interval</li>
          <li><span>TIMEFRAME</span> The size of each time bucket</li>
        </ul>
        <button className="primary-action" onClick={onOpenLab}>Open the interactive Candle Lab <span>→</span></button>
      </div>
      <CandleChart scenario={scenario} compact showVolume />
    </section>
  );
}

export function CandleLab() {
  const [scenarioId, setScenarioId] = useState(candleScenarios[0].id);
  const [selectedCandles, setSelectedCandles] = useState<Record<string, number>>({ anatomy: 4 });
  const [showVolume, setShowVolume] = useState(true);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const scenario = candleScenarios.find((item) => item.id === scenarioId) ?? candleScenarios[0];
  const selected = answers[scenario.id];
  const isRevealed = Boolean(revealed[scenario.id]);

  return (
    <div className="candle-lab">
      <header className="candle-lab-head">
        <div>
          <p className="eyebrow">CANDLE + TAPE LAB // FICTIONAL DATA</p>
          <h1>See what the chart proves—and what it cannot.</h1>
          <p>Six fast simulations teach candle anatomy, thin-liquidity impulses, failed breakouts, absorption, exhaustion, and the bonding-to-migration regime change.</p>
        </div>
        <div className="candle-lab-readout"><span>CASE BANK</span><strong>06</strong><small>NO LIVE TOKEN · NO BUY CALLS</small></div>
      </header>

      <nav className="candle-case-tabs" aria-label="Candle training cases">
        {candleScenarios.map((item) => (
          <button className={item.id === scenario.id ? "is-active" : ""} onClick={() => setScenarioId(item.id)} key={item.id}>
            <span>{item.code}</span><strong>{item.title}</strong><small>{item.state}</small>
          </button>
        ))}
      </nav>

      <section className="candle-workbench">
        <div className="candle-workbench-main">
          <div className="candle-context-line">
            <div><span>CASE {scenario.code}</span><b>{scenario.state}</b></div>
            <button className={showVolume ? "is-on" : ""} onClick={() => setShowVolume((current) => !current)} aria-pressed={showVolume}>Volume layer <i>{showVolume ? "ON" : "OFF"}</i></button>
          </div>
          <h2>{scenario.title}</h2>
          <p>{scenario.lesson}</p>
          <CandleChart
            scenario={scenario}
            showVolume={showVolume}
            selectedIndex={selectedCandles[scenario.id]}
            onSelect={(index) => setSelectedCandles((current) => ({ ...current, [scenario.id]: index }))}
          />
          <div className="candle-metrics">
            {scenario.metrics.map((metric) => <div className={metric.tone ?? "neutral"} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
          </div>
        </div>

        <aside className="candle-decode-panel">
          <div className="trench-decoder">
            <span>TRENCH → EVIDENCE</span>
            <blockquote>“{scenario.trenchPhrase}”</blockquote>
            <p>{scenario.evidenceTranslation}</p>
          </div>

          <fieldset className="candle-question">
            <legend>{scenario.prompt}</legend>
            {scenario.choices.map((choice, index) => (
              <button
                type="button"
                className={`${selected === index ? "is-selected" : ""} ${isRevealed && index === scenario.answer ? "is-correct" : ""} ${isRevealed && selected === index && index !== scenario.answer ? "is-wrong" : ""}`}
                disabled={isRevealed}
                onClick={() => setAnswers((current) => ({ ...current, [scenario.id]: index }))}
                key={choice}
              >
                <span>{String.fromCharCode(65 + index)}</span>{choice}
              </button>
            ))}
          </fieldset>

          {!isRevealed ? (
            <button className="primary-action full" disabled={selected === undefined} onClick={() => setRevealed((current) => ({ ...current, [scenario.id]: true }))}>Lock the read <span>→</span></button>
          ) : (
            <div className={`candle-feedback ${selected === scenario.answer ? "is-clean" : "is-review"}`} role="status">
              <span>{selected === scenario.answer ? "CLEAN READ" : "MODEL UPDATE"}</span>
              <p>{scenario.debrief}</p>
              <div><b>NEXT CHECK</b><p>{scenario.nextCheck}</p></div>
              <button onClick={() => {
                setRevealed((current) => ({ ...current, [scenario.id]: false }));
                setAnswers((current) => { const next = { ...current }; delete next[scenario.id]; return next; });
              }}>Run it again</button>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
