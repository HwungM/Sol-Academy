export type ArtAsset = {
  src: string;
  alt: string;
};

const asset = (group: string, id: string, alt: string): ArtAsset => ({
  src: `/art/${group}/${id}.webp`,
  alt,
});

export const moduleArt: Record<string, ArtAsset> = {
  "game-map": asset("modules", "game-map", "A physical market survival atlas with one disciplined route reaching the summit"),
  "money-math": asset("modules", "money-math", "A precision liquidity chamber separating expected and executed value"),
  lifecycle: asset("modules", "lifecycle", "A connected turbine carrying one signal through the token lifecycle"),
  terminal: asset("modules", "terminal", "Layered market evidence aligning through a central signal decoder"),
  wallets: asset("modules", "wallets", "A funding graph revealing a concealed common root beneath separate wallets"),
  narrative: asset("modules", "narrative", "An anchored origin signal surrounded by weaker delayed echoes"),
  tape: asset("modules", "tape", "Incoming order flow absorbed by a dense lattice and redistributed higher"),
  risk: asset("modules", "risk", "A mechanical sizing aperture controlling exposure before a volatile chamber"),
  setups: asset("modules", "setups", "Four strategy tracks converging on one precision selector"),
  execution: asset("modules", "execution", "A transaction capsule passing through finality gates into a confirmed chamber"),
  automation: asset("modules", "automation", "An observer-first automation engine with a separate reconciliation loop"),
  "vod-capstone": asset("modules", "vod-capstone", "A replay lens reconstructing a historical decision from stacked evidence"),
};

export const drillArt: Record<string, ArtAsset> = {
  "ready-screen": asset("drills", "ready-screen", "An unresolved core measured by nine independent probes"),
  "hidden-cluster": asset("drills", "hidden-cluster", "Separate wallet nodes converging on one hidden funding root"),
  "absorbed-sell": asset("drills", "absorbed-sell", "A heavy sell absorbed by a tension lattice and five independent receivers"),
  "og-race": asset("drills", "og-race", "Four competing origin candidates with different provenance and control clues"),
  "signature-limbo": asset("drills", "signature-limbo", "A transaction capsule suspended between submission and confirmation"),
  "field-note-a": asset("drills", "field-note-a", "A disciplined exit plane below an unstable final price spike"),
};

export const historyArt: Record<string, ArtAsset> = {
  "cycle-map": asset("history", "cycle-map", "A single attention signal evolving from a monolith into a dense launch network"),
  "industrial-farming": asset("history", "industrial-farming", "A forensic cutaway of one hub feeding a repeated launch network"),
  "graduation-base-rate": asset("history", "graduation-base-rate", "A launch funnel where only a tiny number of particles graduate"),
  "bome-acceleration": asset("history", "bome-acceleration", "Compressed time gates expanding one launch signal into a broad chamber"),
  "goat-fartcoin": asset("history", "goat-fartcoin", "Attention rotating from a complex source to a simpler adjacent object"),
  "pnut-dev-sold": asset("history", "pnut-dev-sold", "An abandoned creator shell beside an independently growing support network"),
  "trump-float": asset("history", "trump-float", "One floating supply segment exposed while four segments remain locked"),
  "libra-collapse": asset("history", "libra-collapse", "A glass pressure tower collapsed inside a minute-scale ring"),
  "2026-denominators": asset("history", "2026-denominators", "Two instruments measuring different populations and producing different base rates"),
};

export const sectionArt = {
  dashboard: asset("sections", "dashboard", "Noisy signals resolving through successive evidence filters"),
  path: asset("sections", "path", "Eight essential modules leading into four optional specialist branches"),
  drills: asset("sections", "drills", "Evidence passing through guarded decision routes"),
  lab: asset("sections", "lab", "A research bench turning raw observations into a validated rule"),
  sources: asset("sections", "sources", "Evidence layers anchored inside a verification frame"),
} satisfies Record<string, ArtAsset>;
