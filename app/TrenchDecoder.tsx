"use client";

import { useState } from "react";
import { memeQualityDimensions, moduleTrenchLanguage } from "./data/slang";

export function TrenchDecoder({ moduleId }: { moduleId: string }) {
  const entries = moduleTrenchLanguage[moduleId] ?? [];
  const [mode, setMode] = useState<"meaning" | "evidence">("evidence");
  if (entries.length === 0) return null;

  return (
    <section className="trench-language" aria-labelledby={`trench-language-${moduleId}`}>
      <header className="trench-language-head">
        <div>
          <p className="section-kicker">LIVE LANGUAGE LAYER</p>
          <h2 id={`trench-language-${moduleId}`}>Understand the trenches without inheriting their bad logic.</h2>
          <p>These phrases are documented from public Reddit and X usage. They show how traders talk—not whether the claim inside the phrase is true.</p>
        </div>
        <div className="decoder-switch" role="group" aria-label="Trench language display mode">
          <button className={mode === "meaning" ? "is-active" : ""} onClick={() => setMode("meaning")}>What they mean</button>
          <button className={mode === "evidence" ? "is-active" : ""} onClick={() => setMode("evidence")}>Evidence mode</button>
        </div>
      </header>

      <div className="trench-language-grid">
        {entries.map((entry, index) => (
          <article key={entry.phrase}>
            <div className="trench-card-index"><span>{String(index + 1).padStart(2, "0")}</span><b>FIELD PHRASE</b></div>
            <blockquote>“{entry.phrase}”</blockquote>
            <div className="trench-translation" key={mode}>
              <span>{mode === "meaning" ? "USUALLY MEANS" : "TRANSLATE TO OBSERVATIONS"}</span>
              <p>{mode === "meaning" ? entry.heardAs : entry.operatorTranslation}</p>
            </div>
            <aside><span>DOES NOT PROVE</span><p>{entry.doesNotProve}</p></aside>
            <a href={entry.source.url} target="_blank" rel="noreferrer">{entry.source.label} <span>↗</span></a>
          </article>
        ))}
      </div>

      {moduleId === "narrative" && (
        <div className="meme-quality-desk">
          <div><p className="section-kicker">MEME LITERACY // NOT A VIBE CHECK</p><h3>Translate “this meme is fire” into eight testable dimensions.</h3></div>
          <ol>{memeQualityDimensions.map((dimension, index) => <li key={dimension.label}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{dimension.label}</strong><p>{dimension.check}</p></div></li>)}</ol>
        </div>
      )}
    </section>
  );
}

